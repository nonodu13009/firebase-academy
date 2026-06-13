# Niveau 1 - Les données

## Table des Matières

- [Objectif](#objectif)
- [Firestore en 2 minutes](#firestore-en-2-minutes)
- [Étape 1 - Activer Firestore](#etape-1---activer-firestore)
- [Étape 2 - Créer une note](#etape-2---creer-une-note)
- [Étape 3 - Lire les notes](#etape-3---lire-les-notes)
- [Étape 4 - Modifier une note](#etape-4---modifier-une-note)
- [Étape 5 - Supprimer une note](#etape-5---supprimer-une-note)
- [Étape 6 - Écouter en temps réel](#etape-6---ecouter-en-temps-reel)
- [Étape 7 - Construire l'interface](#etape-7---construire-linterface)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

À la fin de ce niveau, tu auras :

- Un CRUD complet (Créer, Lire, Modifier, Supprimer) de notes
- Les notes qui se mettent à jour en temps réel
- Une interface fonctionnelle pour gérer tes notes

## Firestore en 2 minutes

Firestore, c'est une base de données. Mais pas comme MySQL ou PostgreSQL.

Pense à un **classeur** :

- Le **classeur** = ta base de données
- Chaque **onglet** = une **collection** (ex: "notes", "users")
- Chaque **fiche dans un onglet** = un **document** (ex: une note spécifique)
- Chaque **ligne sur la fiche** = un **champ** (ex: titre, contenu, date)

Pas de tables, pas de colonnes, pas de SQL. Tu stockes des objets JSON dans des collections.

### Exemple concret

```
notes/                          <-- collection
  abc123/                       <-- document (ID automatique)
    titre: "Ma première note"   <-- champ
    contenu: "Hello Firebase"   <-- champ
    creeLe: 2026-06-07          <-- champ
  def456/
    titre: "Courses"
    contenu: "Pain, lait, café"
    creeLe: 2026-06-07
```

## Étape 1 - Activer Firestore

1. Console Firebase > **Firestore Database** dans le menu de gauche
2. Clique **Créer une base de données**
3. Mode : **Mode test** (on sécurisera au niveau 3)
4. Emplacement : `europe-west1` (Belgique) ou `eur3` (Europe multi-région)
5. Clique **Activer**

> Le mode test autorise tout le monde à lire et écrire pendant 30 jours.
> C'est volontaire pour apprendre. On verrouillera au niveau 3.

## Étape 2 - Créer une note

Crée `src/lib/notes.ts` :

```typescript
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Le type d'une note
export interface Note {
  id?: string;
  titre: string;
  contenu: string;
  creeLe?: Date;
  modifieLe?: Date;
}

// Créer une nouvelle note
export async function creerNote(titre: string, contenu: string) {
  const docRef = await addDoc(collection(db, "notes"), {
    titre,
    contenu,
    creeLe: serverTimestamp(),
    modifieLe: serverTimestamp(),
  });

  return docRef.id;
}
```

Ce qui se passe :

- `collection(db, "notes")` pointe vers la collection "notes"
- `addDoc` crée un nouveau document avec un ID généré automatiquement
- `serverTimestamp()` met la date du serveur (pas du navigateur)
- Ça retourne l'ID du document créé

### Teste dans la console du navigateur

Tu peux tester rapidement en important cette fonction dans ta page principale et en l'appelant. Vérifie dans l'émulateur Firestore (localhost:4000) que le document apparaît.

## Étape 3 - Lire les notes

Ajoute dans `src/lib/notes.ts` :

```typescript
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Lire toutes les notes
export async function lireNotes(): Promise<Note[]> {
  const q = query(collection(db, "notes"), orderBy("creeLe", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Note[];
}

// Lire une seule note par son ID
export async function lireNote(id: string): Promise<Note | null> {
  const docSnap = await getDoc(doc(db, "notes", id));

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() } as Note;
}
```

Deux façons de lire :

- `getDocs` : récupère plusieurs documents d'un coup (une liste)
- `getDoc` : récupère un seul document par son ID
- `query` + `orderBy` : trie les résultats (ici, les plus récentes en premier)

## Étape 4 - Modifier une note

Ajoute dans `src/lib/notes.ts` :

```typescript
import {
  // ... imports existants
  updateDoc,
} from "firebase/firestore";

// Modifier une note existante
export async function modifierNote(id: string, titre: string, contenu: string) {
  await updateDoc(doc(db, "notes", id), {
    titre,
    contenu,
    modifieLe: serverTimestamp(),
  });
}
```

`updateDoc` ne touche qu'aux champs que tu lui donnes. Les autres champs restent intacts.

## Étape 5 - Supprimer une note

Ajoute dans `src/lib/notes.ts` :

```typescript
import {
  // ... imports existants
  deleteDoc,
} from "firebase/firestore";

// Supprimer une note
export async function supprimerNote(id: string) {
  await deleteDoc(doc(db, "notes", id));
}
```

Simple. Un document supprimé disparaît immédiatement de tous les écrans connectés (grâce au temps réel).

## Étape 6 - Écouter en temps réel

C'est la magie de Firestore. Au lieu de demander les données une fois, tu **écoutes** les changements. Dès qu'une note est ajoutée, modifiée ou supprimée, ton app le sait instantanément.

Ajoute dans `src/lib/notes.ts` :

```typescript
import {
  // ... imports existants
  onSnapshot,
} from "firebase/firestore";

// Écouter les notes en temps réel
export function ecouterNotes(callback: (notes: Note[]) => void) {
  const q = query(collection(db, "notes"), orderBy("creeLe", "desc"));

  // onSnapshot retourne une fonction pour arrêter l'écoute
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Note[];

    callback(notes);
  });

  return unsubscribe;
}
```

La différence avec `getDocs` :

- `getDocs` : tu demandes les données UNE fois
- `onSnapshot` : tu écoutes en CONTINU. Chaque modification déclenche le callback.

### Utilisation dans un composant React

```typescript
"use client";

import { useEffect, useState } from "react";
import { ecouterNotes, Note } from "@/lib/notes";

export default function ListeNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Commence à écouter
    const unsubscribe = ecouterNotes((nouvellesNotes) => {
      setNotes(nouvellesNotes);
    });

    // Arrête d'écouter quand le composant est démonté
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.titre}</h3>
          <p>{note.contenu}</p>
        </div>
      ))}
    </div>
  );
}
```

## Étape 7 - Construire l'interface

Maintenant, assemble le tout dans une vraie page. Crée `src/app/page.tsx` :

```typescript
"use client";

import { useState, useEffect } from "react";
import {
  creerNote,
  ecouterNotes,
  modifierNote,
  supprimerNote,
  Note,
} from "@/lib/notes";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = ecouterNotes(setNotes);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) return;

    if (editId) {
      await modifierNote(editId, titre, contenu);
      setEditId(null);
    } else {
      await creerNote(titre, contenu);
    }

    setTitre("");
    setContenu("");
  };

  const handleEdit = (note: Note) => {
    setEditId(note.id!);
    setTitre(note.titre);
    setContenu(note.contenu);
  };

  const handleDelete = async (id: string) => {
    await supprimerNote(id);
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">NoteFlow</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          placeholder="Contenu de la note..."
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          className="w-full p-3 border rounded-lg h-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">{note.titre}</h3>
            <p className="text-gray-600 mt-2">{note.contenu}</p>
            <div className="mt-3 space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="text-blue-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(note.id!)}
                className="text-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
```

Lance ton app (`npm run dev`) et l'émulateur (`firebase emulators:start`) en parallèle. Tu as un gestionnaire de notes fonctionnel.

## Ce que tu sais faire maintenant

- Structurer des données dans Firestore (collections, documents, champs)
- Créer, lire, modifier, supprimer des documents
- Écouter les changements en temps réel
- Construire une interface CRUD complète

### Concepts clés à retenir

| Concept              | Ce que ça fait                        |
| -------------------- | ------------------------------------- |
| `addDoc`             | Crée un document avec un ID auto      |
| `getDoc`             | Lit un document par son ID            |
| `getDocs`            | Lit plusieurs documents               |
| `updateDoc`          | Modifie des champs d'un document      |
| `deleteDoc`          | Supprime un document                  |
| `onSnapshot`         | Écoute les changements en continu     |
| `query` + `orderBy`  | Trie les résultats                    |
| `serverTimestamp()`  | Date du serveur (fiable)              |

---

> Passe au [Niveau 2 - Les utilisateurs](niveau-2-utilisateurs.md) pour ajouter l'inscription et la connexion.
