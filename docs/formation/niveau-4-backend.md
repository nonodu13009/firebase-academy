# Niveau 4 - Les fichiers et le backend

## Table des Matières

- [Objectif](#objectif)
- [Cloud Storage en 2 minutes](#cloud-storage-en-2-minutes)
- [Cloud Functions en 2 minutes](#cloud-functions-en-2-minutes)
- [Étape 1 - Upload de fichiers joints](#etape-1---upload-de-fichiers-joints)
- [Étape 2 - Afficher les fichiers](#etape-2---afficher-les-fichiers)
- [Étape 3 - Sécuriser le stockage](#etape-3---securiser-le-stockage)
- [Étape 4 - Première Cloud Function](#etape-4---premiere-cloud-function)
- [Étape 5 - Function déclenchée par Firestore](#etape-5---function-declenchee-par-firestore)
- [Étape 6 - Tester en local](#etape-6---tester-en-local)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

À la fin de ce niveau, tu auras :

- L'upload de fichiers (images, PDF) attachés aux notes
- Des règles de sécurité sur les fichiers
- Une Cloud Function qui compte les notes automatiquement
- Une Cloud Function déclenchée quand une note est créée

## Cloud Storage en 2 minutes

Cloud Storage, c'est un **disque dur dans le cloud**. Tu y mets des fichiers (images, PDF, vidéos) et tu obtiens une URL pour y accéder.

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

Chaque utilisateur a son propre dossier. Les fichiers d'une note sont regroupés ensemble.

## Cloud Functions en 2 minutes

Cloud Functions, c'est du code qui tourne sur les serveurs Google **sans que tu gères de serveur**.

Deux types :

- **Déclenchées par un événement** : "Quand une note est créée, envoie un email"
- **Appelées directement** : "Quand l'utilisateur clique sur ce bouton, exécute cette logique"

Tu écris la fonction, tu la déploies, Firebase s'occupe du reste (scaling, disponibilité, logs).

## Étape 1 - Upload de fichiers joints

### Activer Cloud Storage

1. Console Firebase > **Storage** dans le menu
2. Clique **Commencer**
3. Mode test (on sécurisera après)
4. Emplacement : même région que Firestore

### Créer le service d'upload

Crée `src/lib/storage.ts` :

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
  if (!user) throw new Error("Non connecté");

  // Chemin : users/{uid}/notes/{noteId}/{nomFichier}
  const chemin = `users/${user.uid}/notes/${noteId}/${fichier.name}`;
  const storageRef = ref(storage, chemin);

  // Upload
  await uploadBytes(storageRef, fichier);

  // Récupère l'URL de téléchargement
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

Crée `src/components/UploadFichier.tsx` :

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

### Stocker les références dans Firestore

Quand un fichier est uploadé, stocke sa référence dans le document de la note :

```typescript
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

// Ajouter un fichier à une note
export async function ajouterFichierANote(noteId: string, fichier: FichierJoint) {
  await updateDoc(doc(db, "notes", noteId), {
    fichiers: arrayUnion(fichier),
  });
}
```

`arrayUnion` ajoute un élément à un tableau sans écraser les éléments existants.

## Étape 2 - Afficher les fichiers

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

Pour les images, affiche un aperçu :

```typescript
{f.type.startsWith("image/") ? (
  <img src={f.url} alt={f.nom} className="max-w-xs rounded mt-2" />
) : (
  <a href={f.url}>{f.nom}</a>
)}
```

## Étape 3 - Sécuriser le stockage

Ouvre le fichier `storage.rules` :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Chaque utilisateur ne peut accéder qu'à SON dossier
    match /users/{userId}/{allPaths=**} {

      // Lire : seulement le propriétaire
      allow read: if request.auth != null
                  && request.auth.uid == userId;

      // Écrire : seulement le propriétaire
      // + limite de taille (10 Mo)
      // + types autorisés (images et PDF)
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024
                   && (request.resource.contentType.matches('image/.*')
                       || request.resource.contentType == 'application/pdf');
    }
  }
}
```

Ce que ça protège :

- Personne ne peut accéder aux fichiers d'un autre utilisateur
- Taille max : 10 Mo par fichier
- Types autorisés : images et PDF uniquement

## Étape 4 - Première Cloud Function

### Initialiser les fonctions

Si pas déjà fait :

```bash
firebase init functions
```

Choisis **TypeScript**. Un dossier `functions/` est créé.

### Écrire une fonction appelable

Ouvre `functions/src/index.ts` :

```typescript
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";

initializeApp();
const db = getFirestore();

// Fonction appelable : compter les notes d'un utilisateur
export const compterMesNotes = onCall(async (request) => {
  // Vérifie que l'utilisateur est connecté
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

## Étape 5 - Function déclenchée par Firestore

Quand une note est créée, on peut exécuter du code automatiquement.

Dans `functions/src/index.ts` :

```typescript
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// Déclenchée quand une note est créée
export const onNoteCreated = onDocumentCreated(
  "notes/{noteId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const data = snapshot.data();
    const userId = data.userId;

    // Exemple : mettre à jour un compteur dans le profil utilisateur
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const currentCount = userDoc.data()?.noteCount || 0;
      await userRef.update({ noteCount: currentCount + 1 });
    } else {
      await userRef.set({ noteCount: 1 });
    }

    console.log(`Note créée par ${userId}. Compteur mis à jour.`);
  }
);
```

### Autres événements disponibles

| Événement             | Se déclenche quand...                         |
| --------------------- | --------------------------------------------- |
| `onDocumentCreated`   | Un document est créé                          |
| `onDocumentUpdated`   | Un document est modifié                       |
| `onDocumentDeleted`   | Un document est supprimé                      |
| `onDocumentWritten`   | Un document est créé, modifié ou supprimé     |

## Étape 6 - Tester en local

Les Cloud Functions tournent dans l'émulateur. Pas besoin de déployer pour tester.

```bash
# Compile les fonctions TypeScript
cd functions && npm run build && cd ..

# Démarre tout
firebase emulators:start
```

Dans l'interface émulateur (`localhost:4000`), tu vois :

- Les logs des fonctions en temps réel
- Les déclenchements automatiques quand tu crées/modifies des documents
- Les erreurs éventuelles

## Ce que tu sais faire maintenant

- Uploader et afficher des fichiers (images, PDF)
- Sécuriser l'accès aux fichiers par utilisateur
- Écrire des Cloud Functions appelables
- Écrire des Cloud Functions déclenchées par des événements Firestore
- Tester tout ça en local avec l'émulateur

### Concepts clés à retenir

| Concept               | Ce que ça fait                                      |
| --------------------- | --------------------------------------------------- |
| `ref(storage, chemin)` | Pointe vers un fichier dans le stockage            |
| `uploadBytes`         | Envoie un fichier                                   |
| `getDownloadURL`      | Récupère l'URL publique d'un fichier                |
| `onCall`              | Function appelable depuis le client                 |
| `onDocumentCreated`   | Function déclenchée par un événement Firestore      |
| `HttpsError`          | Erreur structurée renvoyée au client                |

---

> Passe au [Niveau 5 - En ligne](niveau-5-deploiement.md) pour mettre NoteFlow en production.
