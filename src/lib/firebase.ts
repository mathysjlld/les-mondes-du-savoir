// Sauvegarde cloud via Firebase (Auth + Firestore) — activée UNIQUEMENT si un projet
// est connecté via les variables d'environnement. Sans elles, cloudEnabled = false et
// l'app fonctionne comme avant (progression en localStorage). Aucun coût, aucune régression.
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const cloudEnabled = Boolean(config.apiKey && config.projectId && config.appId);

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

if (cloudEnabled) {
  app = getApps().length ? getApps()[0] : initializeApp(config as Record<string, string>);
  _auth = getAuth(app);
  _db = getFirestore(app);
}

export const auth = _auth;
export const db = _db;

// Messages d'erreur d'authentification lisibles (français) à partir des codes Firebase.
export function authErrorMessage(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/email-already-in-use": return "Cet email a déjà un compte. Essaie de te connecter.";
    case "auth/invalid-email": return "L'adresse email n'est pas valide.";
    case "auth/weak-password": return "Le mot de passe doit faire au moins 6 caractères.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found": return "Email ou mot de passe incorrect.";
    case "auth/too-many-requests": return "Trop de tentatives. Réessaie dans un moment.";
    case "auth/network-request-failed": return "Problème de connexion. Vérifie internet.";
    default: return (e as { message?: string })?.message ?? "Une erreur est survenue.";
  }
}
