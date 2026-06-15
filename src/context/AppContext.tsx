"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { playSound } from "@/lib/sound";
import { supabase, cloudEnabled } from "@/lib/supabase";

export interface AvatarConfig {
  type: "fox" | "panda" | "owl" | "koala";
  color: string;
  accessories: string[];
}

export interface UserProfile {
  nickname: string;
  ageGroup: "facile" | "difficile";
  avatar: AvatarConfig;
  xp: number;
  coins: number;
  diamonds: number; // Monnaie rare (sans-faute)
  crystals: number; // Cristaux : monnaie spéciale (dépensable) gagnée en maîtrisant le thème secret
  maxCrystals: number; // Pic de cristaux jamais atteint -> garde le monde ultime débloqué même après dépense
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  completedQuizzes: string[];
  unlockedBadges: string[]; // liste de badgeId
  unlockedAccessories: string[]; // Liste des accessoires achetés
  unlockedPets: string[]; // Liste des compagnons achetés
  unlockedTreeAnimals?: string[]; // Liste des animaux d'arbre achetés
  activePet: "none" | "fox" | "cat" | "koala" | "dragon" | "unicorn" | "panda" | "lion" | "griffon"; // Compagnon équipé
  timeSpentToday: number; // en secondes
  maxTimeLimit: number; // en minutes (limite parents)
  timeLimitEnabled: boolean; // si false, la limite de temps d'écran est désactivée (site toujours accessible)
  soundEnabled: boolean;
  readAloudEnabled: boolean;
  parentCode?: string;
  accountCode?: string; // Code à 4 chiffres pour retrouver/recharger son compte sur cet appareil
  codeHint?: string; // Indice pour se souvenir du code de connexion (en cas d'oubli)
  wateringCans: number; // Arrosoirs gagnés (5 bonnes réponses d'affilée)
  treeGrowth: number; // Pourcentage de croissance globale continue (0 à 100)
  templeBricks: number; // Briques gagnées (5 bonnes réponses d'affilée dans le Temple)
  templeGrowth: number; // Croissance du Temple des Sages (0 à 100)
  isCheatEnabled?: boolean;
  savedCoins?: number;
  savedDiamonds?: number;
}

// Résumé d'un compte sauvegardé sur l'appareil (pour l'écran de connexion)
export interface AccountSummary {
  accountCode: string;
  nickname: string;
  avatar: AvatarConfig;
  codeHint?: string;
}

interface AppContextType {
  profile: UserProfile | null;
  isLoaded: boolean;
  onboardUser: (nickname: string, ageGroup: "facile" | "difficile", avatar: AvatarConfig, parentCode: string, accountCode: string, codeHint: string) => void;
  // Comptes locaux (connexion par code à 4 chiffres + indice)
  listAccounts: () => AccountSummary[];
  loginWithCode: (code: string) => { error: string | null };
  logout: () => void;
  changeAccountCode: (newCode: string, newHint?: string) => { error: string | null };
  addXp: (amount: number) => { leveledUp: boolean; currentLevel: number; newLevel: number };
  addCoins: (amount: number) => void;
  resetCoins: () => void; // remet les pièces à 0 (ne touche pas aux diamants)
  addDiamonds: (amount: number) => void;
  addCrystals: (amount: number) => void; // ajoute des cristaux (monnaie du monde ultime)
  addWateringCan: () => void;
  useWateringCan: () => boolean; // retourne true si l'arrosoir a été utilisé avec succès
  addBrick: () => void; // gagner une brique (5 bonnes réponses d'affilée dans le Temple)
  useBrick: () => boolean; // dépenser une brique pour agrandir le Temple
  growTemple: (amount: number) => void; // faire grandir le Temple (quiz/leçon du Temple)
  completeLesson: (lessonId: string) => void;
  completeQuiz: (lessonId: string, badgeInfo: { id: string; name: string; emoji: string }) => boolean; // renvoie true si nouveau badge débloqué
  buyAccessory: (accessoryId: string, price: number, currency?: "coins" | "diamonds" | "crystals") => boolean;
  buyPet: (petId: string, price: number, currency?: "coins" | "diamonds" | "crystals") => boolean;
  buyTreeAnimal: (animalId: string, price: number, currency?: "coins" | "diamonds" | "crystals") => boolean;
  equipAccessory: (accessoryId: string) => void;
  equipPet: (petId: UserProfile["activePet"]) => void;
  updateAvatarColor: (color: string) => void;
  updateTimeSpent: (seconds: number) => void;
  updateMaxTimeLimit: (minutes: number) => void;
  setTimeLimitEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReadAloudEnabled: (enabled: boolean) => void;
  changeAgeGroup: (ageGroup: "facile" | "difficile") => void;
  resetProgress: () => void;
  getLevel: () => number;
  getXpForNextLevel: () => number;
  getXpPercent: () => number;
  toggleCheatCode: () => void;
  // Sauvegarde cloud + comptes (actif uniquement si un projet Supabase est connecté)
  cloudEnabled: boolean;
  userEmail: string | null;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const calculateLevelFromXp = (xp: number): number => {
  let tempXp = xp;
  let lvl = 1;
  let req = 100;
  while (tempXp >= req) {
    tempXp -= req;
    lvl++;
    req += 50;
  }
  return lvl;
};

const getGrowthPercentFromLevel = (level: number): number => {
  let stage = "sprout";
  if (level <= 2) stage = "sprout";
  else if (level <= 4) stage = "sapling";
  else if (level <= 6) stage = "young";
  else if (level <= 9) stage = "mature";
  else stage = "magic";

  let percentInStage = 0;
  if (stage === 'sprout') percentInStage = ((Math.min(level, 2) - 1) / 2) * 100;
  else if (stage === 'sapling') percentInStage = ((level - 3) / 2) * 100;
  else if (stage === 'young') percentInStage = ((level - 5) / 2) * 100;
  else if (stage === 'mature') percentInStage = ((level - 7) / 3) * 100;
  else percentInStage = 100;

  if (stage === 'sprout') return 0 + (percentInStage / 100) * 20;
  if (stage === 'sapling') return 20 + (percentInStage / 100) * 20;
  if (stage === 'young') return 40 + (percentInStage / 100) * 20;
  if (stage === 'mature') return 60 + (percentInStage / 100) * 30;
  return 95;
};

const DEFAULT_ACCESSORIES = ["none"];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Charger la progression depuis le localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("explorakids_profile");
      if (stored) {
        try {
          const parsed: UserProfile = JSON.parse(stored);
          
          // Vérification de la streak journalière
          const todayStr = new Date().toISOString().split("T")[0];
          let updatedStreak = parsed.streak;
          
          if (parsed.lastActiveDate && parsed.lastActiveDate !== todayStr) {
            const lastActive = new Date(parsed.lastActiveDate);
            const today = new Date(todayStr);
            const diffTime = Math.abs(today.getTime() - lastActive.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              updatedStreak += 1; // Jour consécutif
            } else if (diffDays > 1) {
              updatedStreak = 1; // Streak réinitialisée
            }
          }
          
          const parsedAvatar = parsed.avatar || { type: "fox", color: "orange", accessories: [] };
          let initialAccessories = parsedAvatar.accessories || [];
          if ((parsedAvatar as any).accessory && (parsedAvatar as any).accessory !== "none" && initialAccessories.length === 0) {
            initialAccessories = [(parsedAvatar as any).accessory];
          }

          let initialTreeGrowth = parsed.treeGrowth;
          if (initialTreeGrowth === undefined) {
            const calculatedLvl = calculateLevelFromXp(parsed.xp || 0);
            initialTreeGrowth = getGrowthPercentFromLevel(calculatedLvl);
          }

          setProfile({
            ...parsed,
            ageGroup: ((["facile", "difficile"].includes(parsed.ageGroup as string) ? parsed.ageGroup : "facile") as "facile" | "difficile"),
            streak: updatedStreak,
            lastActiveDate: todayStr,
            avatar: {
              ...parsedAvatar,
              accessories: initialAccessories,
            },
            diamonds: parsed.diamonds || 0,
            crystals: parsed.crystals || 0,
            maxCrystals: parsed.maxCrystals || parsed.crystals || 0,
            unlockedAccessories: parsed.unlockedAccessories || DEFAULT_ACCESSORIES,
            unlockedPets: parsed.unlockedPets || ["none"],
            unlockedTreeAnimals: parsed.unlockedTreeAnimals || [],
            activePet: parsed.activePet || "none",
            timeSpentToday: parsed.lastActiveDate === todayStr ? (parsed.timeSpentToday || 0) : 0,
            maxTimeLimit: parsed.maxTimeLimit || 20,
            timeLimitEnabled: parsed.timeLimitEnabled !== false,
            parentCode: parsed.parentCode || "2912",
            wateringCans: parsed.wateringCans || 0,
            treeGrowth: initialTreeGrowth,
            templeBricks: parsed.templeBricks || 0,
            templeGrowth: parsed.templeGrowth || 0,
          });
        } catch (e) {
          console.error("Erreur de lecture du profil sauvegardé", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Sauvegarder dans le localStorage à chaque modification du profil,
  // et tenir à jour le registre multi-comptes (indexé par code de connexion).
  useEffect(() => {
    if (isLoaded && profile) {
      localStorage.setItem("explorakids_profile", JSON.stringify(profile));
      if (profile.accountCode) upsertAccount(profile);
    }
  }, [profile, isLoaded]);

  // ===== Comptes locaux (connexion par code à 4 chiffres) =====
  const ACCOUNTS_KEY = "explorakids_accounts";
  const readAccounts = (): UserProfile[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      return raw ? (JSON.parse(raw) as UserProfile[]) : [];
    } catch {
      return [];
    }
  };
  const upsertAccount = (p: UserProfile) => {
    if (typeof window === "undefined" || !p.accountCode) return;
    const all = readAccounts().filter((a) => a.accountCode !== p.accountCode);
    all.push(p);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(all));
  };
  const removeAccount = (code?: string) => {
    if (typeof window === "undefined" || !code) return;
    const all = readAccounts().filter((a) => a.accountCode !== code);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(all));
  };
  const listAccounts = (): AccountSummary[] =>
    readAccounts()
      .filter((a) => a.accountCode)
      .map((a) => ({
        accountCode: a.accountCode as string,
        nickname: a.nickname,
        avatar: a.avatar || { type: "fox", color: "orange", accessories: [] },
        codeHint: a.codeHint,
      }));
  const loginWithCode = (code: string): { error: string | null } => {
    const found = readAccounts().find((a) => a.accountCode === code.trim());
    if (!found) return { error: "Aucun compte ne correspond à ce code." };
    localStorage.setItem("explorakids_profile", JSON.stringify(found));
    setProfile(found);
    return { error: null };
  };
  const logout = () => {
    // Le compte reste sauvegardé dans le registre ; on quitte juste la session active.
    if (typeof window !== "undefined") localStorage.removeItem("explorakids_profile");
    setProfile(null);
  };
  // Changer le code de connexion (et éventuellement l'indice) du compte actif.
  const changeAccountCode = (newCode: string, newHint?: string): { error: string | null } => {
    if (!profile) return { error: "Aucun compte actif." };
    const code = newCode.trim();
    if (!/^\d{4}$/.test(code)) return { error: "Le code doit faire exactement 4 chiffres." };
    const clash = readAccounts().some((a) => a.accountCode === code && a.accountCode !== profile.accountCode);
    if (clash) return { error: "Ce code est déjà utilisé par un autre compte." };
    removeAccount(profile.accountCode); // retire l'ancienne entrée ; l'autosave réécrira sous le nouveau code
    setProfile({
      ...profile,
      accountCode: code,
      codeHint: newHint && newHint.trim() ? newHint.trim() : profile.codeHint,
    });
    return { error: null };
  };

  // ===== Sauvegarde cloud + comptes (Supabase) — actif seulement si configuré =====
  const saveCloudProfile = async (uid: string, p: UserProfile) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: uid, data: p, updated_at: new Date().toISOString() });
    if (error) console.error("Sauvegarde cloud échouée", error.message);
  };

  const loadCloudProfile = async (uid: string) => {
    if (!supabase) return;
    const { data, error } = await supabase.from("profiles").select("data").eq("id", uid).maybeSingle();
    if (error) { console.error("Lecture cloud échouée", error.message); return; }
    if (data && data.data && Object.keys(data.data).length > 0) {
      // Progression trouvée dans le cloud : on la restaure (multi-appareils).
      setProfile(data.data as UserProfile);
    } else if (profile) {
      // Pas encore de profil cloud : on y pousse la progression locale (1re synchro).
      saveCloudProfile(uid, profile);
    }
  };

  // Initialiser la session et écouter les changements de connexion
  useEffect(() => {
    if (!cloudEnabled || !supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      if (u) { setUserId(u.id); setUserEmail(u.email ?? null); loadCloudProfile(u.id); }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      setUserId(u?.id ?? null);
      setUserEmail(u?.email ?? null);
      if (u) loadCloudProfile(u.id);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Synchroniser la progression vers le cloud (anti-rebond) quand l'utilisateur est connecté
  useEffect(() => {
    if (!cloudEnabled || !supabase || !userId || !profile || !isLoaded) return;
    const t = setTimeout(() => { saveCloudProfile(userId, profile); }, 800);
    return () => clearTimeout(t);
  }, [profile, userId, isLoaded]);

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { error: "Sauvegarde cloud non configurée." };
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };
  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: "Sauvegarde cloud non configurée." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };
  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setUserId(null);
    setUserEmail(null);
  };

  // Initialisation de l'utilisateur
  const onboardUser = (nickname: string, ageGroup: "facile" | "difficile", avatar: AvatarConfig, parentCode: string, accountCode: string, codeHint: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const newProfile: UserProfile = {
      nickname,
      ageGroup,
      avatar,
      accountCode,
      codeHint,
      xp: 0,
      coins: 20, // 20 pièces offertes à la création
      diamonds: 0, // 0 diamants au départ
      crystals: 0, // 0 cristaux au départ
      maxCrystals: 0,
      streak: 1,
      lastActiveDate: todayStr,
      completedLessons: [],
      completedQuizzes: [],
      unlockedBadges: [],
      unlockedAccessories: [...DEFAULT_ACCESSORIES],
      unlockedPets: ["none"],
      unlockedTreeAnimals: [],
      activePet: "none",
      timeSpentToday: 0,
      maxTimeLimit: 20,
      timeLimitEnabled: true,
      soundEnabled: true,
      readAloudEnabled: false, // Lecture voix-off non activée par défaut en Normal
      parentCode,
      wateringCans: 0,
      treeGrowth: 0,
      templeBricks: 0,
      templeGrowth: 0,
    };
    setProfile(newProfile);
  };

  // Calcul du niveau (chaque niveau demande 100 XP * niveau)
  // Niveau 1: 0 - 99 XP
  // Niveau 2: 100 - 249 XP (+150 XP requis)
  // Niveau 3: 250 - 449 XP (+200 XP requis)
  // Niveau 4: 450 - 699 XP (+250 XP requis) etc.
  const getLevel = (): number => {
    if (!profile) return 1;
    let tempXp = profile.xp;
    let lvl = 1;
    let req = 100;
    while (tempXp >= req) {
      tempXp -= req;
      lvl++;
      req += 50;
    }
    return lvl;
  };

  const getXpLimitForLevel = (lvl: number): number => {
    let limit = 0;
    for (let i = 1; i < lvl; i++) {
      limit += 100 + (i - 1) * 50;
    }
    return limit;
  };

  const getXpForNextLevel = (): number => {
    const lvl = getLevel();
    return 100 + (lvl - 1) * 50;
  };

  const getXpPercent = (): number => {
    if (!profile) return 0;
    const currentLvl = getLevel();
    const floorXp = getXpLimitForLevel(currentLvl);
    const nextLimit = getXpForNextLevel();
    const earnedInCurrentLvl = profile.xp - floorXp;
    return Math.min(Math.max((earnedInCurrentLvl / nextLimit) * 100, 0), 100);
  };

  // Ajouter de l'XP et vérifier le passage de niveau
  const addXp = (amount: number) => {
    let leveledUp = false;
    let currentLvl = 1;
    let newLvl = 1;

    if (profile) {
      currentLvl = getLevel();
      const updatedXp = profile.xp + amount;
      
      // Temporairement calculer pour le retour
      let tempXp = updatedXp;
      let lvl = 1;
      let req = 100;
      while (tempXp >= req) {
        tempXp -= req;
        lvl++;
        req += 50;
      }
      newLvl = lvl;
      leveledUp = newLvl > currentLvl;

      setProfile(prev => {
        if (!prev) return null;
        // Croissance lente de 0.005% par XP gagné
        let growthBonus = amount * 0.005;
        // Si passage de niveau, +0.5% de croissance globale
        if (leveledUp) {
          growthBonus += 0.5;
        }
        const newGrowth = Math.min(100, (prev.treeGrowth || 0) + growthBonus);

        return {
          ...prev,
          xp: updatedXp,
          treeGrowth: newGrowth
        };
      });

      if (leveledUp && profile.soundEnabled) {
        setTimeout(() => playSound("levelup"), 600);
      }
    }

    return { leveledUp, currentLevel: currentLvl, newLevel: newLvl };
  };

  // Ajouter des pièces
  const addCoins = (amount: number) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        coins: prev.coins + amount
      };
    });
  };

  // Remet les pièces à zéro (ex: game over à un quiz). Ne touche pas aux diamants.
  const resetCoins = () => {
    setProfile(prev => {
      if (!prev) return null;
      if (prev.coins === 0) return prev;
      return {
        ...prev,
        coins: 0
      };
    });
  };

  // Finir une leçon (flashcards lues)
  const completeLesson = (lessonId: string) => {
    setProfile(prev => {
      if (!prev) return null;
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      const xpEarned = 15;
      const updatedXp = prev.xp + xpEarned;
      
      const currentLvl = calculateLevelFromXp(prev.xp);
      const newLvl = calculateLevelFromXp(updatedXp);
      const leveledUp = newLvl > currentLvl;
      
      let growthBonus = xpEarned * 0.005;
      if (leveledUp) {
        growthBonus += 0.5;
      }
      const newGrowth = Math.min(100, (prev.treeGrowth || 0) + growthBonus);

      if (leveledUp && prev.soundEnabled) {
        setTimeout(() => playSound("levelup"), 600);
      }

      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: updatedXp,
        coins: prev.coins + 2, // 2 pièces (réduit)
        treeGrowth: newGrowth
      };
    });
  };

  // Finir un quiz
  const completeQuiz = (lessonId: string, badgeInfo: { id: string; name: string; emoji: string }) => {
    let unlockedNewBadge = false;
    
    setProfile(prev => {
      if (!prev) return null;
      
      const alreadyDone = prev.completedQuizzes.includes(lessonId);
      const updatedCompleted = alreadyDone ? prev.completedQuizzes : [...prev.completedQuizzes, lessonId];
      
      // Points additionnels si c'est la première fois
      const xpEarned = alreadyDone ? 10 : 35; // 35 XP première fois, 10 XP les fois suivantes
      const coinsEarned = alreadyDone ? 1 : 5; // 5 pièces première fois, 1 après (réduit)

      const updatedXp = prev.xp + xpEarned;
      const updatedCoins = prev.coins + coinsEarned;

      let updatedBadges = [...prev.unlockedBadges];
      if (!prev.unlockedBadges.includes(badgeInfo.id)) {
        updatedBadges.push(badgeInfo.id);
        unlockedNewBadge = true;
      }

      const currentLvl = calculateLevelFromXp(prev.xp);
      const newLvl = calculateLevelFromXp(updatedXp);
      const leveledUp = newLvl > currentLvl;
      
      let growthBonus = xpEarned * 0.005;
      if (leveledUp) {
        growthBonus += 0.5;
      }
      const newGrowth = Math.min(100, (prev.treeGrowth || 0) + growthBonus);

      if (leveledUp && prev.soundEnabled) {
        setTimeout(() => playSound("levelup"), 600);
      }

      return {
        ...prev,
        completedQuizzes: updatedCompleted,
        xp: updatedXp,
        coins: updatedCoins,
        unlockedBadges: updatedBadges,
        treeGrowth: newGrowth
      };
    });

    return unlockedNewBadge;
  };

  // Ajouter des diamants
  const addDiamonds = (amount: number) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        diamonds: prev.diamonds + amount
      };
    });
  };

  // Gagner des cristaux (monnaie du monde ultime, gagnée en maîtrisant le thème secret)
  const addCrystals = (amount: number) => {
    setProfile(prev => {
      if (!prev) return null;
      const newCrystals = (prev.crystals || 0) + amount;
      return {
        ...prev,
        crystals: newCrystals,
        maxCrystals: Math.max(prev.maxCrystals || 0, newCrystals)
      };
    });
  };

  // Gagner un arrosoir (5 bonnes réponses d'affilée)
  const addWateringCan = () => {
    setProfile(prev => {
      if (!prev) return null;
      return { ...prev, wateringCans: (prev.wateringCans || 0) + 1 };
    });
  };

  // Utiliser un arrosoir pour booster la croissance de l'arbre
  const useWateringCan = (): boolean => {
    if (!profile || (profile.wateringCans || 0) <= 0) return false;

    const currentLvl = getLevel();
    const updatedXp = profile.xp + 50;

    let tempXp = updatedXp;
    let lvl = 1;
    let req = 100;
    while (tempXp >= req) {
      tempXp -= req;
      lvl++;
      req += 50;
    }
    const newLvl = lvl;
    const leveledUp = newLvl > currentLvl;

    setProfile(prev => {
      if (!prev || (prev.wateringCans || 0) <= 0) return prev;
      // L'arrosoir ajoute directement +1% de croissance globale
      // + 0.25% de la part de l'XP (+50 * 0.005%) = 1.25% de croissance totale
      let growthBonus = 1.0 + 0.25;
      if (leveledUp) {
        growthBonus += 0.5;
      }
      const newGrowth = Math.min(100, (prev.treeGrowth || 0) + growthBonus);

      return {
        ...prev,
        wateringCans: prev.wateringCans - 1,
        xp: updatedXp,
        treeGrowth: newGrowth
      };
    });

    if (leveledUp && profile.soundEnabled) {
      setTimeout(() => playSound("levelup"), 600);
    }

    return true;
  };

  // Gagner une brique (5 bonnes réponses d'affilée dans le Temple)
  const addBrick = () => {
    setProfile(prev => {
      if (!prev) return null;
      return { ...prev, templeBricks: (prev.templeBricks || 0) + 1 };
    });
  };

  // Faire grandir le Temple directement (récompense de quiz/leçon du Temple)
  const growTemple = (amount: number) => {
    setProfile(prev => {
      if (!prev) return null;
      return { ...prev, templeGrowth: Math.min(100, (prev.templeGrowth || 0) + amount) };
    });
  };

  // Utiliser une brique pour agrandir le Temple (miroir de l'arrosoir pour l'arbre)
  const useBrick = (): boolean => {
    if (!profile || (profile.templeBricks || 0) <= 0) return false;

    const currentLvl = getLevel();
    const updatedXp = profile.xp + 50;

    let tempXp = updatedXp;
    let lvl = 1;
    let req = 100;
    while (tempXp >= req) {
      tempXp -= req;
      lvl++;
      req += 50;
    }
    const newLvl = lvl;
    const leveledUp = newLvl > currentLvl;

    setProfile(prev => {
      if (!prev || (prev.templeBricks || 0) <= 0) return prev;
      let growthBonus = 7.0; // une brique fait grandir le Temple beaucoup plus vite
      if (leveledUp) {
        growthBonus += 1.5;
      }
      const newGrowth = Math.min(100, (prev.templeGrowth || 0) + growthBonus);
      return {
        ...prev,
        templeBricks: prev.templeBricks - 1,
        xp: updatedXp,
        templeGrowth: newGrowth
      };
    });

    if (leveledUp && profile.soundEnabled) {
      setTimeout(() => playSound("levelup"), 600);
    }

    return true;
  };

  // Calcule la déduction selon la monnaie ; renvoie null si solde insuffisant
  const payPatch = (prev: UserProfile, currency: "coins" | "diamonds" | "crystals", price: number) => {
    if (currency === "coins") return prev.coins >= price ? { coins: prev.coins - price } : null;
    if (currency === "diamonds") return prev.diamonds >= price ? { diamonds: prev.diamonds - price } : null;
    return (prev.crystals || 0) >= price ? { crystals: (prev.crystals || 0) - price } : null;
  };

  // Acheter un accessoire (pièces par défaut, ou diamants/cristaux)
  const buyAccessory = (accessoryId: string, price: number, currency: "coins" | "diamonds" | "crystals" = "coins") => {
    let success = false;
    setProfile(prev => {
      if (!prev) return null;
      if (prev.unlockedAccessories.includes(accessoryId)) return prev;
      const patch = payPatch(prev, currency, price);
      if (!patch) return prev;
      success = true;
      return { ...prev, ...patch, unlockedAccessories: [...prev.unlockedAccessories, accessoryId] };
    });
    return success;
  };

  // Acheter un compagnon (diamants par défaut, ou pièces/cristaux)
  const buyPet = (petId: string, price: number, currency: "coins" | "diamonds" | "crystals" = "diamonds") => {
    let success = false;
    setProfile(prev => {
      if (!prev) return null;
      if (prev.unlockedPets.includes(petId)) return prev;
      const patch = payPatch(prev, currency, price);
      if (!patch) return prev;
      success = true;
      return { ...prev, ...patch, unlockedPets: [...prev.unlockedPets, petId] };
    });
    return success;
  };

  // Acheter un animal pour l'arbre (diamants par défaut, ou pièces/cristaux)
  const buyTreeAnimal = (animalId: string, price: number, currency: "coins" | "diamonds" | "crystals" = "diamonds") => {
    let success = false;
    setProfile(prev => {
      if (!prev) return null;
      const currentAnimals = prev.unlockedTreeAnimals || [];
      if (currentAnimals.includes(animalId)) return prev;
      const patch = payPatch(prev, currency, price);
      if (!patch) return prev;
      success = true;
      return { ...prev, ...patch, unlockedTreeAnimals: [...currentAnimals, animalId] };
    });
    return success;
  };

  // Équiper un accessoire (multi-accessoires avec catégories)
  const equipAccessory = (accessoryId: string) => {
    setProfile(prev => {
      if (!prev) return null;
      
      let currentAccs = prev.avatar.accessories || [];
      currentAccs = currentAccs.filter(a => a !== "none");
      
      if (accessoryId === "none") {
        return {
          ...prev,
          avatar: {
            ...prev.avatar,
            accessories: []
          }
        };
      }
      
      // Clic sur l'accessoire déjà équipé => on le retire.
      if (currentAccs.includes(accessoryId)) {
        return {
          ...prev,
          avatar: {
            ...prev.avatar,
            accessories: []
          }
        };
      }

      // Un seul accessoire à la fois : les illustrations composites n'en montrent
      // qu'un, donc équiper un accessoire remplace le précédent.
      return {
        ...prev,
        avatar: {
          ...prev.avatar,
          accessories: [accessoryId]
        }
      };
    });
  };

  // Équiper un compagnon
  const equipPet = (petId: UserProfile["activePet"]) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        activePet: petId
      };
    });
  };

  // Modifier la couleur de l'avatar
  const updateAvatarColor = (color: string) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        avatar: {
          ...prev.avatar,
          color
        }
      };
    });
  };

  // Incrémenter le temps passé
  const updateTimeSpent = (seconds: number) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        timeSpentToday: prev.timeSpentToday + seconds
      };
    });
  };

  // Mettre à jour la limite maximale de temps (en minutes)
  const updateMaxTimeLimit = (minutes: number) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        maxTimeLimit: minutes
      };
    });
  };

  // Activer/Désactiver la limite de temps d'écran
  const setTimeLimitEnabled = (enabled: boolean) => {
    setProfile(prev => {
      if (!prev) return null;
      return { ...prev, timeLimitEnabled: enabled };
    });
  };

  // Activer/Désactiver le son
  const setSoundEnabled = (enabled: boolean) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        soundEnabled: enabled
      };
    });
  };

  // Activer/Désactiver la lecture automatique à voix haute
  const setReadAloudEnabled = (enabled: boolean) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        readAloudEnabled: enabled
      };
    });
  };

  // Modifier la tranche d'âge / difficulté
  const changeAgeGroup = (ageGroup: "facile" | "difficile") => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ageGroup,
      };
    });
  };

  // Réinitialiser tout (supprime aussi le compte du registre local)
  const resetProgress = () => {
    if (typeof window !== "undefined") {
      removeAccount(profile?.accountCode);
      localStorage.removeItem("explorakids_profile");
    }
    setProfile(null);
  };

  // Activer/Désactiver le code de triche 7194 (illimité)
  const toggleCheatCode = () => {
    setProfile(prev => {
      if (!prev) return null;
      const wasCheatEnabled = !!prev.isCheatEnabled;
      if (wasCheatEnabled) {
        // Désactiver et restaurer les valeurs d'origine
        return {
          ...prev,
          isCheatEnabled: false,
          coins: prev.savedCoins ?? prev.coins,
          diamonds: prev.savedDiamonds ?? prev.diamonds
        };
      } else {
        // Activer le cheat et sauvegarder les valeurs actuelles
        return {
          ...prev,
          isCheatEnabled: true,
          savedCoins: prev.coins,
          savedDiamonds: prev.diamonds,
          coins: 99999,
          diamonds: 99999
        };
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        isLoaded,
        onboardUser,
        listAccounts,
        loginWithCode,
        logout,
        changeAccountCode,
        addXp,
        addCoins,
        resetCoins,
        addDiamonds,
        addWateringCan,
        useWateringCan,
        addBrick,
        useBrick,
        growTemple,
        completeLesson,
        completeQuiz,
        buyAccessory,
        buyPet,
        buyTreeAnimal,
        equipAccessory,
        equipPet,
        updateAvatarColor,
        updateTimeSpent,
        updateMaxTimeLimit,
        setTimeLimitEnabled,
        setSoundEnabled,
        setReadAloudEnabled,
        changeAgeGroup,
        resetProgress,
        getLevel,
        getXpForNextLevel,
        getXpPercent,
        toggleCheatCode,
        addCrystals,
        cloudEnabled,
        userEmail,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
