# Niveau 2 - Les utilisateurs

## Table des Matières

- [Objectif](#objectif)
- [Authentication en 2 minutes](#authentication-en-2-minutes)
- [Étape 1 - Activer Authentication](#etape-1---activer-authentication)
- [Étape 2 - Le hook useAuth](#etape-2---le-hook-useauth)
- [Étape 3 - Connexion avec Google](#etape-3---connexion-avec-google)
- [Étape 4 - Connexion par email](#etape-4---connexion-par-email)
- [Étape 5 - La page de connexion](#etape-5---la-page-de-connexion)
- [Étape 6 - Protéger les pages](#etape-6---proteger-les-pages)
- [Étape 7 - Associer les notes à un utilisateur](#etape-7---associer-les-notes-a-un-utilisateur)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

À la fin de ce niveau, tu auras :

- Connexion Google et email/mot de passe
- Chaque utilisateur ne voit que SES notes
- Les pages protégées (pas de contenu sans connexion)
- Un profil utilisateur basique

## Authentication en 2 minutes

Imagine un videur de boîte de nuit. Il vérifie ton identité, te donne un bracelet, et tant que tu portes le bracelet tu peux entrer et sortir librement.

Firebase Authentication, c'est le videur :

- Il vérifie qui tu es (Google, email, téléphone...)
- Il te donne un **token** (le bracelet)
- Ton app vérifie le token à chaque action

Toi, tu n'as pas à gérer les mots de passe, le chiffrement, les sessions. Firebase s'en occupe.

## Étape 1 - Activer Authentication

1. Console Firebase > **Authentication** dans le menu
2. Clique **Commencer**
3. Onglet **Méthode de connexion**
4. Active **Google** (le plus simple pour commencer)
   - Sélectionne ton email comme email d'assistance
   - Clique **Enregistrer**
5. Active **Adresse e-mail/Mot de passe**
   - Clique **Enregistrer**

## Étape 2 - Le hook useAuth

Crée un hook React qui gère tout l'état d'authentification. Crée `src/hooks/useAuth.ts` :

```typescript
"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return { user, loading, signOut };
}
```

Ce qui se passe :

- `onAuthStateChanged` écoute l'état de connexion en continu
- Quand l'utilisateur se connecte ou se déconnecte, le state se met à jour
- `loading` est `true` tant qu'on ne sait pas si l'utilisateur est connecté ou non

## Étape 3 - Connexion avec Google

Crée `src/lib/auth.ts` :

```typescript
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// Connexion Google (popup)
export async function connexionGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// Inscription par email
export async function inscriptionEmail(email: string, motDePasse: string) {
  const result = await createUserWithEmailAndPassword(auth, email, motDePasse);
  return result.user;
}

// Connexion par email
export async function connexionEmail(email: string, motDePasse: string) {
  const result = await signInWithEmailAndPassword(auth, email, motDePasse);
  return result.user;
}
```

Trois méthodes, trois cas d'usage :

- `signInWithPopup` : ouvre une fenêtre Google, l'utilisateur choisit son compte, c'est fait
- `createUserWithEmailAndPassword` : crée un nouveau compte
- `signInWithEmailAndPassword` : connecte un compte existant

## Étape 4 - Connexion par email

Le flux email a deux étapes : inscription (création de compte) et connexion (compte existant).

Les erreurs courantes à gérer :

| Code d'erreur                | Signification         | Message à afficher                                    |
| ---------------------------- | --------------------- | ----------------------------------------------------- |
| `auth/email-already-in-use`  | Compte déjà existant  | "Un compte existe déjà avec cet email"                |
| `auth/wrong-password`        | Mauvais mot de passe  | "Mot de passe incorrect"                              |
| `auth/user-not-found`        | Pas de compte         | "Aucun compte avec cet email"                         |
| `auth/weak-password`         | Mot de passe trop court | "Le mot de passe doit faire au moins 6 caractères"  |

## Étape 5 - La page de connexion

Crée `src/app/connexion/page.tsx` :

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { connexionGoogle, connexionEmail, inscriptionEmail } from "@/lib/auth";

export default function Connexion() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [isInscription, setIsInscription] = useState(false);
  const [erreur, setErreur] = useState("");

  const handleGoogle = async () => {
    try {
      await connexionGoogle();
      router.push("/");
    } catch (err: any) {
      setErreur("Erreur de connexion Google");
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");

    try {
      if (isInscription) {
        await inscriptionEmail(email, motDePasse);
      } else {
        await connexionEmail(email, motDePasse);
      }
      router.push("/");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setErreur("Un compte existe deja avec cet email");
      } else if (err.code === "auth/wrong-password") {
        setErreur("Mot de passe incorrect");
      } else if (err.code === "auth/user-not-found") {
        setErreur("Aucun compte avec cet email");
      } else {
        setErreur("Une erreur est survenue");
      }
    }
  };

  return (
    <main className="max-w-md mx-auto p-8 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">NoteFlow</h1>

      <button
        onClick={handleGoogle}
        className="w-full p-3 border rounded-lg mb-6 flex items-center justify-center gap-2 hover:bg-gray-50"
      >
        Continuer avec Google
      </button>

      <div className="text-center text-gray-400 mb-6">ou</div>

      <form onSubmit={handleEmail} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="w-full p-3 border rounded-lg"
          minLength={6}
          required
        />

        {erreur && <p className="text-red-500 text-sm">{erreur}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          {isInscription ? "S'inscrire" : "Se connecter"}
        </button>
      </form>

      <button
        onClick={() => setIsInscription(!isInscription)}
        className="w-full mt-4 text-sm text-gray-500"
      >
        {isInscription
          ? "Deja un compte ? Se connecter"
          : "Pas de compte ? S'inscrire"}
      </button>
    </main>
  );
}
```

## Étape 6 - Protéger les pages

Crée un composant qui bloque l'accès aux pages si l'utilisateur n'est pas connecté.

Crée `src/components/AuthGuard.tsx` :

```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/connexion");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
```

Utilise-le dans ton layout ou dans chaque page protégée :

```typescript
// src/app/page.tsx
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      {/* ton contenu protégé ici */}
    </AuthGuard>
  );
}
```

## Étape 7 - Associer les notes à un utilisateur

Chaque note doit appartenir à un utilisateur. Modifie `src/lib/notes.ts` :

```typescript
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export interface Note {
  id?: string;
  titre: string;
  contenu: string;
  userId: string;
  creeLe?: Date;
  modifieLe?: Date;
}

// Créer une note liée à l'utilisateur connecté
export async function creerNote(titre: string, contenu: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Non connecté");

  const docRef = await addDoc(collection(db, "notes"), {
    titre,
    contenu,
    userId: user.uid,
    creeLe: serverTimestamp(),
    modifieLe: serverTimestamp(),
  });

  return docRef.id;
}

// Écouter uniquement les notes de l'utilisateur connecté
export function ecouterMesNotes(callback: (notes: Note[]) => void) {
  const user = auth.currentUser;
  if (!user) throw new Error("Non connecté");

  const q = query(
    collection(db, "notes"),
    where("userId", "==", user.uid),
    orderBy("creeLe", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Note[];

    callback(notes);
  });
}
```

Le changement clé : `where("userId", "==", user.uid)` filtre les notes pour ne montrer que celles de l'utilisateur connecté.

## Ce que tu sais faire maintenant

- Configurer l'authentification Google et email
- Créer un hook React pour l'état de connexion
- Construire une page de connexion/inscription
- Protéger des pages contre les accès non autorisés
- Lier les données à un utilisateur spécifique

### Concepts clés à retenir

| Concept                          | Ce que ça fait                              |
| -------------------------------- | ------------------------------------------- |
| `onAuthStateChanged`             | Écoute l'état de connexion en continu       |
| `signInWithPopup`                | Connexion via un fournisseur (Google)       |
| `auth.currentUser`               | L'utilisateur actuellement connecté         |
| `user.uid`                       | L'identifiant unique de l'utilisateur       |
| `where("userId", "==", uid)`     | Filtre les documents par propriétaire       |

---

> Passe au [Niveau 3 - La sécurité](niveau-3-securite.md) pour verrouiller l'accès à tes données.
