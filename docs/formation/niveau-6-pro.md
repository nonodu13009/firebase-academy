# Niveau 6 - Niveau pro

## Table des Matières

- [Objectif](#objectif)
- [Etape 1 - Google Analytics](#etape-1---google-analytics)
- [Etape 2 - Remote Config](#etape-2---remote-config)
- [Etape 3 - Firebase AI Logic](#etape-3---firebase-ai-logic)
- [Etape 4 - Performance Monitoring](#etape-4---performance-monitoring)
- [Etape 5 - App Check](#etape-5---app-check)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)
- [La suite](#la-suite)

## Objectif

A la fin de ce niveau, tu auras :

- Des statistiques d'utilisation de NoteFlow
- La possibilite de changer le comportement de l'app sans deployer
- Un assistant IA integre pour resumer les notes
- Le monitoring des performances
- La protection contre les abus

## Etape 1 - Google Analytics

### En 2 minutes

Analytics repond a une question simple : **"Que font les utilisateurs dans mon app ?"**

Tu sauras combien de personnes utilisent NoteFlow, quelles fonctionnalites sont populaires, d'ou viennent tes utilisateurs.

### Configurer

Si tu as active Analytics a la creation du projet (niveau 0), c'est deja fait. Sinon :

1. Console Firebase > **Analytics**
2. Clique **Activer Google Analytics**

### Tracker des evenements dans NoteFlow

Le SDK collecte automatiquement les visites de pages. Pour les actions specifiques, ajoute des evenements :

```typescript
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

// Quand une note est creee
logEvent(analytics, "note_created");

// Quand un fichier est uploade
logEvent(analytics, "file_uploaded", {
  file_type: "image/jpeg",
  file_size_kb: 245,
});

// Quand une note est partagee
logEvent(analytics, "note_shared", {
  shared_with_count: 3,
});
```

### Ce que tu vois dans la console

- **Utilisateurs actifs** : combien de personnes utilisent l'app en ce moment
- **Evenements** : quelles actions sont les plus frequentes
- **Retention** : combien d'utilisateurs reviennent
- **Demographie** : pays, langue, appareil

## Etape 2 - Remote Config

### En 2 minutes

Remote Config permet de changer le comportement de l'app **sans deployer une nouvelle version**.

Cas concret : tu veux limiter le nombre de notes gratuites a 10. Demain, tu veux passer a 20. Avec Remote Config, tu changes la valeur dans la console Firebase et c'est instantane.

### Configurer

1. Console Firebase > **Remote Config**
2. Clique **Creer une configuration**
3. Ajoute un parametre : `max_notes_gratuites` = `10`
4. Publie

### Utiliser dans l'app

```typescript
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

const remoteConfig = getRemoteConfig();

// Valeurs par defaut (utilisees si le fetch echoue)
remoteConfig.defaultConfig = {
  max_notes_gratuites: 10,
  feature_partage_actif: true,
  couleur_accent: "#3B82F6",
};

// Recupere les valeurs du serveur
await fetchAndActivate(remoteConfig);

// Utilise les valeurs
const maxNotes = getValue(remoteConfig, "max_notes_gratuites").asNumber();
const partageActif = getValue(remoteConfig, "feature_partage_actif").asBoolean();
const couleur = getValue(remoteConfig, "couleur_accent").asString();
```

### Cas d'usage pour NoteFlow

| Parametre | Utilite |
| --------- | ------- |
| `max_notes_gratuites` | Limiter les notes en plan gratuit |
| `feature_partage_actif` | Activer/desactiver le partage sans deployer |
| `message_banniere` | Afficher un message d'annonce |
| `couleur_accent` | Changer le theme sans deployer |

## Etape 3 - Firebase AI Logic

### En 2 minutes

Firebase AI Logic te donne acces aux modeles Gemini (l'IA de Google) directement depuis ton app. Pas besoin de gerer des cles API cote client ni de monter un serveur.

### Configurer

1. Console Firebase > **AI Logic**
2. Active le service
3. Choisis **Gemini Developer API** (gratuit pour commencer)

### Installer le SDK

```bash
npm install @firebase/ai
```

### Ajouter un resume automatique des notes

Cree `src/lib/ai.ts` :

```typescript
import app from "./firebase";
import { getAI, getGenerativeModel, GoogleAIBackend } from "@firebase/ai";

const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.0-flash" });

// Resumer une note
export async function resumerNote(contenu: string): Promise<string> {
  const result = await model.generateContent(
    `Resume ce texte en 2-3 phrases courtes, en francais :\n\n${contenu}`
  );
  return result.response.text();
}

// Suggerer des tags pour une note
export async function suggererTags(titre: string, contenu: string): Promise<string[]> {
  const result = await model.generateContent(
    `Donne-moi 3 a 5 tags pertinents pour cette note. Reponds uniquement avec les tags separes par des virgules, sans explication.

Titre: ${titre}
Contenu: ${contenu}`
  );

  return result.response.text().split(",").map((tag) => tag.trim());
}
```

### Integrer dans l'interface

```typescript
import { resumerNote } from "@/lib/ai";

// Bouton "Resumer" dans le composant de note
const [resume, setResume] = useState("");

const handleResume = async () => {
  const r = await resumerNote(note.contenu);
  setResume(r);
};

// Dans le JSX
<button onClick={handleResume} className="text-purple-600 text-sm">
  Resumer avec l'IA
</button>
{resume && <p className="text-sm text-gray-500 mt-2 italic">{resume}</p>}
```

## Etape 4 - Performance Monitoring

### En 2 minutes

Performance Monitoring mesure automatiquement la vitesse de ton app : temps de chargement des pages, latence reseau, lenteurs.

### Configurer

```typescript
import { getPerformance } from "firebase/performance";

// Initialise Performance Monitoring (une seule fois)
const perf = getPerformance();
```

C'est tout. Le SDK collecte automatiquement :

- Le temps de chargement de chaque page
- La latence des requetes reseau (Firestore, Storage)
- Le First Contentful Paint

### Traces personnalisees

Pour mesurer des operations specifiques :

```typescript
import { trace } from "firebase/performance";

// Mesurer le temps de recherche
const t = trace(perf, "recherche_notes");
t.start();

const resultats = await rechercherNotes(query);

t.putMetric("nombre_resultats", resultats.length);
t.stop();
```

### Ce que tu vois dans la console

- Temps de chargement moyen par page
- Latence reseau par endpoint
- Tendances sur le temps (l'app ralentit ou accelere ?)
- Segmentation par pays, appareil, version

## Etape 5 - App Check

### En 2 minutes

App Check verifie que les requetes a Firebase viennent bien de TON app et pas d'un script malveillant. C'est un bouclier contre les abus.

### Configurer pour le Web

1. Console Firebase > **App Check**
2. Selectionne ton app Web
3. Active **reCAPTCHA Enterprise**
4. Note la cle de site

### Activer dans l'app

```typescript
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// En production uniquement
if (process.env.NODE_ENV === "production") {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("TA_CLE_RECAPTCHA"),
    isTokenAutoRefreshEnabled: true,
  });
}
```

### Mode debug (pour le dev)

```typescript
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
```

### Activer la verification

1. Console Firebase > **App Check**
2. Surveille les metriques pendant quelques jours
3. Quand tu confirmes que le trafic est normal, active l'application (enforcement)

## Ce que tu sais faire maintenant

- Tracker des evenements utilisateur avec Analytics
- Modifier le comportement de l'app a distance avec Remote Config
- Integrer l'IA Gemini pour resumer et analyser du texte
- Surveiller les performances de l'app
- Proteger l'app contre les abus avec App Check

## La suite

Felicitations. Tu as construit NoteFlow de zero a la production, en passant par chaque couche de Firebase.

### Ce que tu maitrises

| Niveau | Competence |
| ------ | ---------- |
| 0 | Projet Firebase, CLI, emulateur |
| 1 | Firestore CRUD, temps reel |
| 2 | Authentication, protection des pages |
| 3 | Regles de securite, validation |
| 4 | Cloud Storage, Cloud Functions |
| 5 | Deploiement, CI/CD, domaine |
| 6 | Analytics, Remote Config, IA, Performance, App Check |

### Pour aller plus loin

- **Partage collaboratif** : permettre a plusieurs utilisateurs d'editer la meme note en temps reel
- **Notifications push** : prevenir quand une note partagee est modifiee (Cloud Messaging)
- **Recherche full-text** : chercher dans le contenu des notes (Extensions ou Algolia)
- **Mode hors ligne avance** : synchronisation quand l'utilisateur revient en ligne
- **Tests automatises** : regles de securite + Cloud Functions

### Ressources

- Les 24 fiches de reference sont dans le dossier `docs/` (un fichier par produit Firebase)
- [Documentation officielle Firebase](https://firebase.google.com/docs?hl=fr)
- [Firebase YouTube](https://www.youtube.com/@firebase)
- [Firebase Blog](https://firebase.blog)

---

> Tu as termine la formation. Bravo.
