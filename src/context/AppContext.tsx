"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { playSound } from "@/lib/sound";

export interface AvatarConfig {
  type: "fox" | "panda" | "owl" | "koala";
  color: string;
  accessories: string[];
}

export interface UserProfile {
  nickname: string;
  ageGroup: "3-5" | "6-8" | "9-12";
  avatar: AvatarConfig;
  xp: number;
  coins: number;
  diamonds: number; // Nouvelle monnaie rare
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  completedQuizzes: string[];
  unlockedBadges: string[]; // liste de badgeId
  unlockedAccessories: string[]; // Liste des accessoires achetés
  unlockedPets: string[]; // Liste des compagnons achetés
  unlockedTreeAnimals?: string[]; // Liste des animaux d'arbre achetés
  activePet: "none" | "fox" | "cat" | "koala" | "dragon" | "unicorn" | "panda" | "lion"; // Compagnon équipé
  timeSpentToday: number; // en secondes
  maxTimeLimit: number; // en minutes (limite parents)
  soundEnabled: boolean;
  readAloudEnabled: boolean;
  parentCode?: string;
}

interface AppContextType {
  profile: UserProfile | null;
  onboardUser: (nickname: string, ageGroup: "3-5" | "6-8" | "9-12", avatar: AvatarConfig, parentCode: string) => void;
  addXp: (amount: number) => { leveledUp: boolean; currentLevel: number; newLevel: number };
  addCoins: (amount: number) => void;
  addDiamonds: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (lessonId: string, badgeInfo: { id: string; name: string; emoji: string }) => boolean; // renvoie true si nouveau badge débloqué
  buyAccessory: (accessoryId: string, price: number) => boolean; // renvoie true si achat réussi
  buyPet: (petId: string, price: number) => boolean; // renvoie true si achat réussi
  buyTreeAnimal: (animalId: string, price: number) => boolean; // renvoie true si achat réussi
  equipAccessory: (accessoryId: string) => void;
  equipPet: (petId: UserProfile["activePet"]) => void;
  updateAvatarColor: (color: string) => void;
  updateTimeSpent: (seconds: number) => void;
  updateMaxTimeLimit: (minutes: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReadAloudEnabled: (enabled: boolean) => void;
  changeAgeGroup: (ageGroup: "3-5" | "6-8" | "9-12") => void;
  resetProgress: () => void;
  getLevel: () => number;
  getXpForNextLevel: () => number;
  getXpPercent: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_ACCESSORIES = ["none"];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

          setProfile({
            ...parsed,
            streak: updatedStreak,
            lastActiveDate: todayStr,
            avatar: {
              ...parsedAvatar,
              accessories: initialAccessories,
            },
            diamonds: parsed.diamonds || 0,
            unlockedAccessories: parsed.unlockedAccessories || DEFAULT_ACCESSORIES,
            unlockedPets: parsed.unlockedPets || ["none"],
            unlockedTreeAnimals: parsed.unlockedTreeAnimals || [],
            activePet: parsed.activePet || "none",
            timeSpentToday: parsed.lastActiveDate === todayStr ? (parsed.timeSpentToday || 0) : 0,
            maxTimeLimit: parsed.maxTimeLimit || 20,
            parentCode: parsed.parentCode || "2912",
          });
        } catch (e) {
          console.error("Erreur de lecture du profil sauvegardé", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Sauvegarder dans le localStorage à chaque modification du profil
  useEffect(() => {
    if (isLoaded && profile) {
      localStorage.setItem("explorakids_profile", JSON.stringify(profile));
    }
  }, [profile, isLoaded]);

  // Initialisation de l'utilisateur
  const onboardUser = (nickname: string, ageGroup: "3-5" | "6-8" | "9-12", avatar: AvatarConfig, parentCode: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const newProfile: UserProfile = {
      nickname,
      ageGroup,
      avatar,
      xp: 0,
      coins: 20, // 20 pièces offertes à la création
      diamonds: 0, // 0 diamants au départ
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
      soundEnabled: true,
      readAloudEnabled: ageGroup === "3-5", // Activer par défaut pour les petits
      parentCode,
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
        return {
          ...prev,
          xp: updatedXp,
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

  // Finir une leçon (flashcards lues)
  const completeLesson = (lessonId: string) => {
    setProfile(prev => {
      if (!prev) return null;
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + 15, // 15 XP pour avoir lu la leçon
        coins: prev.coins + 2 // 2 pièces (réduit)
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

      return {
        ...prev,
        completedQuizzes: updatedCompleted,
        xp: updatedXp,
        coins: updatedCoins,
        unlockedBadges: updatedBadges
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

  // Acheter un accessoire dans le magasin
  const buyAccessory = (accessoryId: string, price: number) => {
    let success = false;
    setProfile(prev => {
      if (!prev) return null;
      if (prev.unlockedAccessories.includes(accessoryId)) return prev; // Déjà débloqué
      if (prev.coins < price) return prev; // Pas assez de sous

      success = true;
      return {
        ...prev,
        coins: prev.coins - price,
        unlockedAccessories: [...prev.unlockedAccessories, accessoryId]
      };
    });
    return success;
  };

  // Acheter un compagnon
  const buyPet = (petId: string, price: number) => {
    let success = false;
    setProfile(prev => {
      if (!prev) return null;
      if (prev.unlockedPets.includes(petId)) return prev; // Déjà débloqué
      if (prev.diamonds < price) return prev; // Pas assez de diamants

      success = true;
      return {
        ...prev,
        diamonds: prev.diamonds - price,
        unlockedPets: [...prev.unlockedPets, petId]
      };
    });
    return success;
  };

  // Acheter un animal pour l'arbre
  const buyTreeAnimal = (animalId: string, price: number) => {
    let success = false;
    setProfile(prev => {
      if (!prev) return null;
      const currentAnimals = prev.unlockedTreeAnimals || [];
      if (currentAnimals.includes(animalId)) return prev; // Déjà débloqué
      if (prev.diamonds < price) return prev; // Pas assez de diamants

      success = true;
      return {
        ...prev,
        diamonds: prev.diamonds - price,
        unlockedTreeAnimals: [...currentAnimals, animalId]
      };
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
      
      if (currentAccs.includes(accessoryId)) {
        const updated = currentAccs.filter(a => a !== accessoryId);
        return {
          ...prev,
          avatar: {
            ...prev.avatar,
            accessories: updated
          }
        };
      }
      
      const getAccessoryCategory = (id: string): string => {
        if (["crown", "magic-hat", "headphones"].includes(id)) return "head";
        if (id === "glasses") return "eyes";
        if (id === "bow-tie") return "neck";
        if (id === "shield") return "left-hand";
        if (id === "wand") return "right-hand";
        if (["super-cape", "balloon"].includes(id)) return "back";
        return "other";
      };
      
      const category = getAccessoryCategory(accessoryId);
      const updated = currentAccs.filter(a => getAccessoryCategory(a) !== category);
      updated.push(accessoryId);
      
      return {
        ...prev,
        avatar: {
          ...prev.avatar,
          accessories: updated
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
  const changeAgeGroup = (ageGroup: "3-5" | "6-8" | "9-12") => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ageGroup,
        // Activer la voix automatique par défaut si on passe sur 3-5 ans
        readAloudEnabled: ageGroup === "3-5" ? true : prev.readAloudEnabled
      };
    });
  };

  // Réinitialiser tout
  const resetProgress = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("explorakids_profile");
    }
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        onboardUser,
        addXp,
        addCoins,
        addDiamonds,
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
        setSoundEnabled,
        setReadAloudEnabled,
        changeAgeGroup,
        resetProgress,
        getLevel,
        getXpForNextLevel,
        getXpPercent,
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
