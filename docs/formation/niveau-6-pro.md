# Niveau 6 - Niveau pro

## Table des Matières

- [Objectif](#objectif)
- [Étape 1 - Google Analytics](#etape-1---google-analytics)
- [Étape 2 - Remote Config](#etape-2---remote-config)
- [Étape 3 - Firebase AI Logic](#etape-3---firebase-ai-logic)
- [Étape 4 - Performance Monitoring](#etape-4---performance-monitoring)
- [Étape 5 - App Check](#etape-5---app-check)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)
- [La suite](#la-suite)

## Objectif

À la fin de ce niveau, tu auras :

- Des statistiques d'utilisation de NoteFlow
- La possibilité de changer le comportement de l'app sans déployer
- Un assistant IA intégré pour résumer les notes
- Le monitoring des performances
- La protection contre les abus

## Étape 1 - Google Analytics

### En 2 minutes

Analytics répond à une question simple : **"Que font les utilisateurs dans mon app ?"**

Tu sauras combien de personnes utilisent NoteFlow, quelles fonctionnalités sont populaires, d'où viennent tes utilisateurs.

### Configurer

Si tu as activé Analytics à la création du projet (niveau 0), c'est déjà fait. Sinon :

1. Console Firebase > **Analytics**
2. Clique **Activer Google Analytics**

### Tracker des événements dans NoteFlow

Le SDK collecte automatiquement les visites de pages. Pour les actions spécifiques, ajoute des événements :

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
- **Événements** : quelles actions sont les plus fréquentes
- **Rétention** : combien d'utilisateurs reviennent
- **Démographie** : pays, langue, appareil

## Étape 2 - Remote Config

### En 2 minutes

Remote Config permet de changer le comportement de l'app **sans déployer une nouvelle version**.

Cas concret : tu veux limiter le nombre de notes gratuites à 10. Demain, tu veux passer à 20. Avec Remote Config, tu changes la valeur dans la console Firebase et c'est instantané.

### Configurer

1. Console Firebase > **Remote Config**
2. Clique **Créer une configuration**
3. Ajoute un paramètre : `max_notes_gratuites` = `10`
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

| Paramètre               | Utilité                                      |
| ------------------------ | -------------------------------------------- |
| `max_notes_gratuites`    | Limiter les notes en plan gratuit             |
| `feature_partage_actif`  | Activer/désactiver le partage sans déployer   |
| `message_banniere`       | Afficher un message d'annonce                 |
| `couleur_accent`         | Changer le thème sans déployer                |

## Étape 3 - Firebase AI Logic

### En 2 minutes

Firebase AI Logic te donne accès aux modèles Gemini (l'IA de Google) directement depuis ton app. Pas besoin de gérer des clés API côté client ni de monter un serveur.

### Configurer

1. Console Firebase > **AI Logic**
2. Active le service
3. Choisis **Gemini Developer API** (gratuit pour commencer)

### Installer le SDK

```bash
npm install @firebase/ai
```

### Ajouter un résumé automatique des notes

Crée `src/lib/ai.ts` :

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

### Intégrer dans l'interface

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

## Étape 4 - Performance Monitoring

### En 2 minutes

Performance Monitoring mesure automatiquement la vitesse de ton app : temps de chargement des pages, latence réseau, lenteurs.

### Configurer

```typescript
import { getPerformance } from "firebase/performance";

// Initialise Performance Monitoring (une seule fois)
const perf = getPerformance();
```

C'est tout. Le SDK collecte automatiquement :

- Le temps de chargement de chaque page
- La latence des requêtes réseau (Firestore, Storage)
- Le First Contentful Paint

### Traces personnalisées

Pour mesurer des opérations spécifiques :

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
- Latence réseau par endpoint
- Tendances sur le temps (l'app ralentit ou accélère ?)
- Segmentation par pays, appareil, version

## Étape 5 - App Check

### En 2 minutes

App Check vérifie que les requêtes à Firebase viennent bien de TON app et pas d'un script malveillant. C'est un bouclier contre les abus.

### Configurer pour le Web

1. Console Firebase > **App Check**
2. Sélectionne ton app Web
3. Active **reCAPTCHA Enterprise**
4. Note la clé de site

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

### Activer la vérification

1. Console Firebase > **App Check**
2. Surveille les métriques pendant quelques jours
3. Quand tu confirmes que le trafic est normal, active l'application (enforcement)

## Ce que tu sais faire maintenant

- Tracker des événements utilisateur avec Analytics
- Modifier le comportement de l'app à distance avec Remote Config
- Intégrer l'IA Gemini pour résumer et analyser du texte
- Surveiller les performances de l'app
- Protéger l'app contre les abus avec App Check

## La suite

Félicitations. Tu as construit NoteFlow de zéro à la production, en passant par chaque couche de Firebase.

### Ce que tu maîtrises

| Niveau | Compétence                                          |
| ------ | --------------------------------------------------- |
| 0      | Projet Firebase, CLI, émulateur                     |
| 1      | Firestore CRUD, temps réel                          |
| 2      | Authentication, protection des pages                |
| 3      | Règles de sécurité, validation                      |
| 4      | Cloud Storage, Cloud Functions                      |
| 5      | Déploiement, CI/CD, domaine                         |
| 6      | Analytics, Remote Config, IA, Performance, App Check |

### Pour aller plus loin

- **Partage collaboratif** : permettre à plusieurs utilisateurs d'éditer la même note en temps réel
- **Notifications push** : prévenir quand une note partagée est modifiée (Cloud Messaging)
- **Recherche full-text** : chercher dans le contenu des notes (Extensions ou Algolia)
- **Mode hors ligne avancé** : synchronisation quand l'utilisateur revient en ligne
- **Tests automatisés** : règles de sécurité + Cloud Functions

### Ressources

- Les 24 fiches de référence sont dans le dossier `docs/` (un fichier par produit Firebase)
- [Documentation officielle Firebase](https://firebase.google.com/docs?hl=fr)
- [Firebase YouTube](https://www.youtube.com/@firebase)
- [Firebase Blog](https://firebase.blog)

---

> Tu as terminé la formation. Bravo.
