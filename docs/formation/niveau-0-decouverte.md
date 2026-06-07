# Niveau 0 - Decouverte

## Table des Matières

- [Objectif](#objectif)
- [Firebase en 2 minutes](#firebase-en-2-minutes)
- [Etape 1 - Creer ton projet Firebase](#etape-1---creer-ton-projet-firebase)
- [Etape 2 - Installer les outils](#etape-2---installer-les-outils)
- [Etape 3 - Creer l'app NoteFlow](#etape-3---creer-lapp-noteflow)
- [Etape 4 - Connecter Firebase a ton app](#etape-4---connecter-firebase-a-ton-app)
- [Etape 5 - L'emulateur local](#etape-5---lemulateur-local)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

A la fin de ce niveau, tu auras :

- Un projet Firebase cree et configure
- Une app Next.js connectee a Firebase
- L'emulateur local qui tourne (pour travailler sans toucher a la prod)

## Firebase en 2 minutes

Firebase, c'est une boite a outils pour developper des apps web et mobiles sans gerer de serveur.

Imagine que tu veux construire une maison :

- **Sans Firebase** : tu dois fabriquer tes briques, ton ciment, ta plomberie, ton electricite. Seul.
- **Avec Firebase** : les briques, la plomberie et l'electricite sont deja la. Toi, tu dessines la maison.

Concretement, Firebase te donne :

| Besoin | Service Firebase | En une phrase |
| ------ | ---------------- | ------------- |
| Stocker des donnees | Firestore | Une base de donnees, sans SQL, sans serveur |
| Gerer les comptes utilisateurs | Authentication | Connexion Google, email, telephone, etc. |
| Stocker des fichiers | Cloud Storage | Upload d'images, PDF, videos |
| Executer du code cote serveur | Cloud Functions | Des fonctions qui tournent dans le cloud |
| Mettre en ligne | Hosting | Un site en ligne en une commande |

Il y en a d'autres (on les verra plus tard). Pour l'instant, retiens ces 5 la.

### Le plan gratuit (Spark)

Firebase a un plan gratuit genereux. Pour NoteFlow en phase d'apprentissage, tu ne paieras rien.

- 1 Go de stockage Firestore
- 50 000 lectures/jour
- 20 000 ecritures/jour
- 5 Go de stockage fichiers
- 10 Go de transfert hosting/mois

Ca couvre largement un projet d'apprentissage et meme un petit projet en production.

## Etape 1 - Creer ton projet Firebase

1. Va sur [console.firebase.google.com](https://console.firebase.google.com)
2. Clique sur **Ajouter un projet**
3. Nom du projet : `noteflow` (ou ce que tu veux)
4. Google Analytics : **active-le** (on s'en servira au niveau 6)
5. Choisis le compte Analytics par defaut
6. Clique **Creer le projet**

Tu arrives sur le dashboard de ton projet. C'est ton QG Firebase.

### Ce que tu vois

- **Menu de gauche** : tous les services Firebase (on les decouvrira un par un)
- **Centre** : un resume de ton projet
- **Engrenage en haut** : les parametres du projet

## Etape 2 - Installer les outils

### Firebase CLI

La CLI (Command Line Interface) est ton outil principal pour interagir avec Firebase depuis ton terminal.

```bash
npm install -g firebase-tools
```

Puis connecte-toi :

```bash
firebase login
```

Un navigateur s'ouvre, connecte-toi avec ton compte Google.

Verifie que ca marche :

```bash
firebase projects:list
```

Tu dois voir `noteflow` dans la liste.

## Etape 3 - Creer l'app NoteFlow

Cree le projet Next.js :

```bash
npx create-next-app@latest noteflow --typescript --tailwind --app --src-dir --eslint
cd noteflow
```

Installe Firebase :

```bash
npm install firebase
```

## Etape 4 - Connecter Firebase a ton app

### Enregistrer l'app dans Firebase

1. Dans la console Firebase, clique sur l'icone **Web** (`</>`) pour ajouter une app
2. Nom de l'app : `noteflow-web`
3. Coche **Configurer Firebase Hosting** (on s'en servira plus tard)
4. Clique **Enregistrer l'application**
5. Firebase te donne un bloc de configuration. **Copie-le.**

### Creer le fichier de configuration

Cree le fichier `src/lib/firebase.ts` :

```typescript
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Evite d'initialiser plusieurs fois (important avec Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default app;
```

### Creer le fichier `.env.local`

A la racine du projet, cree `.env.local` avec les valeurs de ta console Firebase :

```
NEXT_PUBLIC_FIREBASE_API_KEY=ta-cle-ici
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=noteflow-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=noteflow-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=noteflow-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

> Ces valeurs ne sont PAS des secrets. Elles sont publiques par design.
> La securite se fait via les Security Rules (niveau 3).

## Etape 5 - L'emulateur local

L'emulateur, c'est une copie de Firebase qui tourne sur ta machine. Tu peux tout tester sans toucher aux vraies donnees.

### Initialiser Firebase dans le projet

```bash
firebase init
```

Selectionne (avec espace) :

- Firestore
- Functions
- Hosting
- Storage
- Emulators

Pour chaque question, accepte les valeurs par defaut sauf :

- **Public directory** : `out` (pour Next.js export statique) ou `.next` si tu utilises App Hosting
- **Single-page app** : `Yes`

### Configurer les emulateurs

```bash
firebase init emulators
```

Active :

- Authentication Emulator
- Firestore Emulator
- Storage Emulator
- Functions Emulator

### Demarrer les emulateurs

```bash
firebase emulators:start
```

Ouvre [http://localhost:4000](http://localhost:4000) : c'est l'interface des emulateurs.

Tu y vois :

- L'etat de chaque emulateur (vert = ok)
- Un acces direct a Firestore, Auth, Storage locaux
- Les logs en temps reel

### Connecter ton app aux emulateurs

Modifie `src/lib/firebase.ts` pour basculer sur les emulateurs en dev :

```typescript
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// En dev, utilise les emulateurs
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}

export { db, auth, storage };
export default app;
```

## Ce que tu sais faire maintenant

- Creer un projet Firebase
- Installer et configurer la CLI
- Connecter une app Next.js a Firebase
- Utiliser l'emulateur pour travailler en local

---

> Passe au [Niveau 1 - Les donnees](niveau-1-donnees.md) pour creer tes premieres notes dans Firestore.
