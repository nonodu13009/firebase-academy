# Niveau 1 - Les donnees

## Table des Matières

- [Objectif](#objectif)
- [Firestore en 2 minutes](#firestore-en-2-minutes)
- [Etape 1 - Activer Firestore](#etape-1---activer-firestore)
- [Etape 2 - Creer une note](#etape-2---creer-une-note)
- [Etape 3 - Lire les notes](#etape-3---lire-les-notes)
- [Etape 4 - Modifier une note](#etape-4---modifier-une-note)
- [Etape 5 - Supprimer une note](#etape-5---supprimer-une-note)
- [Etape 6 - Ecouter en temps reel](#etape-6---ecouter-en-temps-reel)
- [Etape 7 - Construire l'interface](#etape-7---construire-linterface)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

A la fin de ce niveau, tu auras :

- Un CRUD complet (Creer, Lire, Modifier, Supprimer) de notes
- Les notes qui se mettent a jour en temps reel
- Une interface fonctionnelle pour gerer tes notes

## Firestore en 2 minutes

Firestore, c'est une base de donnees. Mais pas comme MySQL ou PostgreSQL.

Pense a un **classeur** :

- Le **classeur** = ta base de donnees
- Chaque **onglet** = une **collection** (ex: "notes", "users")
- Chaque **fiche dans un onglet** = un **document** (ex: une note specifique)
- Chaque **ligne sur la fiche** = un **champ** (ex: titre, contenu, date)

Pas de tables, pas de colonnes, pas de SQL. Tu stockes des objets JSON dans des collections.

### Exemple concret

```
notes/                          <-- collection
  abc123/                       <-- document (ID automatique)
    titre: "Ma premiere note"   <-- champ
    contenu: "Hello Firebase"   <-- champ
    creeLe: 2026-06-07          <-- champ
  def456/
    titre: "Courses"
    contenu: "Pain, lait, cafe"
    creeLe: 2026-06-07
```

## Etape 1 - Activer Firestore

1. Console Firebase > **Firestore Database** dans le menu de gauche
2. Clique **Creer une base de donnees**
3. Mode : **Mode test** (on securisera au niveau 3)
4. Emplacement : `europe-west1` (Belgique) ou `eur3` (Europe multi-region)
5. Clique **Activer**

> Le mode test autorise tout le monde a lire et ecrire pendant 30 jours.
> C'est volontaire pour apprendre. On verrouillera au niveau 3.

## Etape 2 - Creer une note

Cree `src/lib/notes.ts` :

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

// Creer une nouvelle note
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
- `addDoc` cree un nouveau document avec un ID genere automatiquement
- `serverTimestamp()` met la date du serveur (pas du navigateur)
- Ca retourne l'ID du document cree

### Teste dans la console du navigateur

Tu peux tester rapidement en important cette fonction dans ta page principale et en l'appelant. Verifie dans l'emulateur Firestore (localhost:4000) que le document apparait.

## Etape 3 - Lire les notes

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

Deux facons de lire :

- `getDocs` : recupere plusieurs documents d'un coup (une liste)
- `getDoc` : recupere un seul document par son ID
- `query` + `orderBy` : trie les resultats (ici, les plus recentes en premier)

## Etape 4 - Modifier une note

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

## Etape 5 - Supprimer une note

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

Simple. Un document supprime disparait immediatement de tous les ecrans connectes (grace au temps reel).

## Etape 6 - Ecouter en temps reel

C'est la magie de Firestore. Au lieu de demander les donnees une fois, tu **ecoutes** les changements. Des qu'une note est ajoutee, modifiee ou supprimee, ton app le sait instantanement.

Ajoute dans `src/lib/notes.ts` :

```typescript
import {
  // ... imports existants
  onSnapshot,
} from "firebase/firestore";

// Ecouter les notes en temps reel
export function ecouterNotes(callback: (notes: Note[]) => void) {
  const q = query(collection(db, "notes"), orderBy("creeLe", "desc"));

  // onSnapshot retourne une fonction pour arreter l'ecoute
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

La difference avec `getDocs` :

- `getDocs` : tu demandes les donnees UNE fois
- `onSnapshot` : tu ecoutes en CONTINU. Chaque modification declenche le callback.

### Utilisation dans un composant React

```typescript
"use client";

import { useEffect, useState } from "react";
import { ecouterNotes, Note } from "@/lib/notes";

export default function ListeNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Commence a ecouter
    const unsubscribe = ecouterNotes((nouvellesNotes) => {
      setNotes(nouvellesNotes);
    });

    // Arrete d'ecouter quand le composant est demonte
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

## Etape 7 - Construire l'interface

Maintenant, assemble le tout dans une vraie page. Cree `src/app/page.tsx` :

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

Lance ton app (`npm run dev`) et l'emulateur (`firebase emulators:start`) en parallele. Tu as un gestionnaire de notes fonctionnel.

## Ce que tu sais faire maintenant

- Structurer des donnees dans Firestore (collections, documents, champs)
- Creer, lire, modifier, supprimer des documents
- Ecouter les changements en temps reel
- Construire une interface CRUD complete

### Concepts cles a retenir

| Concept | Ce que ca fait |
| ------- | -------------- |
| `addDoc` | Cree un document avec un ID auto |
| `getDoc` | Lit un document par son ID |
| `getDocs` | Lit plusieurs documents |
| `updateDoc` | Modifie des champs d'un document |
| `deleteDoc` | Supprime un document |
| `onSnapshot` | Ecoute les changements en continu |
| `query` + `orderBy` | Trie les resultats |
| `serverTimestamp()` | Date du serveur (fiable) |

---

> Passe au [Niveau 2 - Les utilisateurs](niveau-2-utilisateurs.md) pour ajouter l'inscription et la connexion.
