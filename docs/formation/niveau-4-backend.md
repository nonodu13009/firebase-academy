# Niveau 4 - Les fichiers et le backend

## Table des Matières

- [Objectif](#objectif)
- [Cloud Storage en 2 minutes](#cloud-storage-en-2-minutes)
- [Cloud Functions en 2 minutes](#cloud-functions-en-2-minutes)
- [Etape 1 - Upload de fichiers joints](#etape-1---upload-de-fichiers-joints)
- [Etape 2 - Afficher les fichiers](#etape-2---afficher-les-fichiers)
- [Etape 3 - Securiser le stockage](#etape-3---securiser-le-stockage)
- [Etape 4 - Premiere Cloud Function](#etape-4---premiere-cloud-function)
- [Etape 5 - Function declenchee par Firestore](#etape-5---function-declenchee-par-firestore)
- [Etape 6 - Tester en local](#etape-6---tester-en-local)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

A la fin de ce niveau, tu auras :

- L'upload de fichiers (images, PDF) attaches aux notes
- Des regles de securite sur les fichiers
- Une Cloud Function qui compte les notes automatiquement
- Une Cloud Function declenchee quand une note est creee

## Cloud Storage en 2 minutes

Cloud Storage, c'est un **disque dur dans le cloud**. Tu y mets des fichiers (images, PDF, videos) et tu obtiens une URL pour y acceder.

Structure :

```
noteflow-bucket/
  users/
    uid123/
      notes/
        noteABC/
          photo.jpg
          document.pdf
    uid456/
      notes/
        ...
```

Chaque utilisateur a son propre dossier. Les fichiers d'une note sont regroupes ensemble.

## Cloud Functions en 2 minutes

Cloud Functions, c'est du code qui tourne sur les serveurs Google **sans que tu geres de serveur**.

Deux types :

- **Declenchees par un evenement** : "Quand une note est creee, envoie un email"
- **Appelees directement** : "Quand l'utilisateur clique sur ce bouton, execute cette logique"

Tu ecris la fonction, tu la deploies, Firebase s'occupe du reste (scaling, disponibilite, logs).

## Etape 1 - Upload de fichiers joints

### Activer Cloud Storage

1. Console Firebase > **Storage** dans le menu
2. Clique **Commencer**
3. Mode test (on securisera apres)
4. Emplacement : meme region que Firestore

### Creer le service d'upload

Cree `src/lib/storage.ts` :

```typescript
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth } from "./firebase";

export interface FichierJoint {
  nom: string;
  url: string;
  type: string;
  taille: number;
  chemin: string;
}

// Upload un fichier pour une note
export async function uploadFichier(
  noteId: string,
  fichier: File
): Promise<FichierJoint> {
  const user = auth.currentUser;
  if (!user) throw new Error("Non connecte");

  // Chemin : users/{uid}/notes/{noteId}/{nomFichier}
  const chemin = `users/${user.uid}/notes/${noteId}/${fichier.name}`;
  const storageRef = ref(storage, chemin);

  // Upload
  await uploadBytes(storageRef, fichier);

  // Recupere l'URL de telechargement
  const url = await getDownloadURL(storageRef);

  return {
    nom: fichier.name,
    url,
    type: fichier.type,
    taille: fichier.size,
    chemin,
  };
}

// Supprimer un fichier
export async function supprimerFichier(chemin: string) {
  const storageRef = ref(storage, chemin);
  await deleteObject(storageRef);
}
```

### Ajouter le composant d'upload

Cree `src/components/UploadFichier.tsx` :

```typescript
"use client";

import { useState } from "react";
import { uploadFichier, FichierJoint } from "@/lib/storage";

interface Props {
  noteId: string;
  onUpload: (fichier: FichierJoint) => void;
}

export default function UploadFichier({ noteId, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limite : 10 Mo
    if (file.size > 10 * 1024 * 1024) {
      alert("Fichier trop volumineux (max 10 Mo)");
      return;
    }

    setUploading(true);
    try {
      const fichier = await uploadFichier(noteId, file);
      onUpload(fichier);
    } catch (err) {
      alert("Erreur lors de l'upload");
    }
    setUploading(false);
  };

  return (
    <label className="cursor-pointer text-blue-600 text-sm">
      {uploading ? "Upload en cours..." : "Ajouter un fichier"}
      <input
        type="file"
        onChange={handleChange}
        className="hidden"
        accept="image/*,.pdf"
      />
    </label>
  );
}
```

### Stocker les references dans Firestore

Quand un fichier est uploade, stocke sa reference dans le document de la note :

```typescript
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

// Ajouter un fichier a une note
export async function ajouterFichierANote(noteId: string, fichier: FichierJoint) {
  await updateDoc(doc(db, "notes", noteId), {
    fichiers: arrayUnion(fichier),
  });
}
```

`arrayUnion` ajoute un element a un tableau sans ecraser les elements existants.

## Etape 2 - Afficher les fichiers

Dans ton composant de note, affiche les fichiers joints :

```typescript
{note.fichiers?.map((f: FichierJoint) => (
  <a
    key={f.chemin}
    href={f.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 text-sm underline block"
  >
    {f.nom} ({(f.taille / 1024).toFixed(0)} Ko)
  </a>
))}
```

Pour les images, affiche un apercu :

```typescript
{f.type.startsWith("image/") ? (
  <img src={f.url} alt={f.nom} className="max-w-xs rounded mt-2" />
) : (
  <a href={f.url}>{f.nom}</a>
)}
```

## Etape 3 - Securiser le stockage

Ouvre le fichier `storage.rules` :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Chaque utilisateur ne peut acceder qu'a SON dossier
    match /users/{userId}/{allPaths=**} {

      // Lire : seulement le proprietaire
      allow read: if request.auth != null
                  && request.auth.uid == userId;

      // Ecrire : seulement le proprietaire
      // + limite de taille (10 Mo)
      // + types autorises (images et PDF)
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024
                   && (request.resource.contentType.matches('image/.*')
                       || request.resource.contentType == 'application/pdf');
    }
  }
}
```

Ce que ca protege :

- Personne ne peut acceder aux fichiers d'un autre utilisateur
- Taille max : 10 Mo par fichier
- Types autorises : images et PDF uniquement

## Etape 4 - Premiere Cloud Function

### Initialiser les fonctions

Si pas deja fait :

```bash
firebase init functions
```

Choisis **TypeScript**. Un dossier `functions/` est cree.

### Ecrire une fonction appelable

Ouvre `functions/src/index.ts` :

```typescript
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

initializeApp();
const db = getFirestore();

// Fonction appelable : compter les notes d'un utilisateur
export const compterMesNotes = onCall(async (request) => {
  // Verifie que l'utilisateur est connecte
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Connexion requise");
  }

  const userId = request.auth.uid;
  const snapshot = await db
    .collection("notes")
    .where("userId", "==", userId)
    .count()
    .get();

  return { total: snapshot.data().count };
});
```

### Appeler depuis le client

```typescript
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const compterMesNotes = httpsCallable(functions, "compterMesNotes");

// Appel
const result = await compterMesNotes();
console.log("Nombre de notes :", result.data.total);
```

## Etape 5 - Function declenchee par Firestore

Quand une note est creee, on peut executer du code automatiquement.

Dans `functions/src/index.ts` :

```typescript
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// Declenchee quand une note est creee
export const onNoteCreated = onDocumentCreated(
  "notes/{noteId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const data = snapshot.data();
    const userId = data.userId;

    // Exemple : mettre a jour un compteur dans le profil utilisateur
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const currentCount = userDoc.data()?.noteCount || 0;
      await userRef.update({ noteCount: currentCount + 1 });
    } else {
      await userRef.set({ noteCount: 1 });
    }

    console.log(`Note creee par ${userId}. Compteur mis a jour.`);
  }
);
```

### Autres evenements disponibles

| Evenement | Se declenche quand... |
| --------- | --------------------- |
| `onDocumentCreated` | Un document est cree |
| `onDocumentUpdated` | Un document est modifie |
| `onDocumentDeleted` | Un document est supprime |
| `onDocumentWritten` | Un document est cree, modifie ou supprime |

## Etape 6 - Tester en local

Les Cloud Functions tournent dans l'emulateur. Pas besoin de deployer pour tester.

```bash
# Compile les fonctions TypeScript
cd functions && npm run build && cd ..

# Demarre tout
firebase emulators:start
```

Dans l'interface emulateur (`localhost:4000`), tu vois :

- Les logs des fonctions en temps reel
- Les declenchements automatiques quand tu crees/modifies des documents
- Les erreurs eventuelles

## Ce que tu sais faire maintenant

- Uploader et afficher des fichiers (images, PDF)
- Securiser l'acces aux fichiers par utilisateur
- Ecrire des Cloud Functions appelables
- Ecrire des Cloud Functions declenchees par des evenements Firestore
- Tester tout ca en local avec l'emulateur

### Concepts cles a retenir

| Concept | Ce que ca fait |
| ------- | -------------- |
| `ref(storage, chemin)` | Pointe vers un fichier dans le stockage |
| `uploadBytes` | Envoie un fichier |
| `getDownloadURL` | Recupere l'URL publique d'un fichier |
| `onCall` | Function appelable depuis le client |
| `onDocumentCreated` | Function declenchee par un evenement Firestore |
| `HttpsError` | Erreur structuree renvoyee au client |

---

> Passe au [Niveau 5 - En ligne](niveau-5-deploiement.md) pour mettre NoteFlow en production.
