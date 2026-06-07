# Cloud Functions for Firebase

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Versions disponibles](#versions-disponibles)
- [Langages supportés](#langages-supportés)
- [Types de déclencheurs](#types-de-déclencheurs)
- [Gestion et déploiement](#gestion-et-déploiement)
- [Tests et surveillance](#tests-et-surveillance)
- [Quotas et limites](#quotas-et-limites)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Cloud Functions for Firebase permet d'exécuter du code backend en réponse à des événements déclenchés par des fonctionnalités Firebase et des requêtes HTTPS, sans avoir à provisionner ni gérer de serveur.

Le code JavaScript, TypeScript ou Python s'exécute dans un environnement géré par Google. Il n'est pas nécessaire de gérer ni de faire évoluer vos propres serveurs.

## Versions disponibles

### 2e génération (recommandée)

Version actuelle recommandée, construite sur Cloud Run et Eventarc :

- Performances améliorées
- Meilleur contrôle de la concurrence
- Plus d'options de configuration (CPU, mémoire, timeout)
- Support des événements via Eventarc

### 1re génération

Version précédente, maintenue pour la compatibilité. Nouvelles fonctions à créer en 2e génération.

## Langages supportés

| Langage | Statut |
| ------- | ------ |
| TypeScript (Node.js) | Stable, recommandé |
| JavaScript (Node.js) | Stable |
| Python | Stable |
| Dart | Expérimental |

## Types de déclencheurs

### Appels directs

- **Fonctions appelables** : appelées directement depuis l'app cliente via les SDK Firebase
- **Flux Genkit** : intégration avec Genkit pour les workflows IA
- **Requêtes HTTP** : endpoints HTTP/HTTPS classiques
- **Mise en file d'attente** : tâches différées avec Cloud Tasks
- **Exécution programmée** : fonctions CRON planifiées

### Événements Firebase

| Source | Description |
| ------ | ----------- |
| Authentication | Création/suppression d'utilisateur, événements bloquants |
| Cloud Firestore | Création, mise à jour, suppression de documents |
| Realtime Database | Écriture, création, mise à jour, suppression de nœuds |
| Cloud Storage | Upload, suppression, archivage de fichiers |
| Remote Config | Mise à jour de la configuration |
| Alertes Firebase | Alertes Crashlytics, Performance, App Distribution |

### Autres événements

- **Pub/Sub** : messages sur des topics Google Cloud Pub/Sub
- **Data Connect** : événements SQL Connect
- **Test Lab** : résultats de tests
- **Événements personnalisés** : via Firebase Extensions et Eventarc

## Gestion et déploiement

### Configuration

- **Options de déploiement** : région, mémoire, timeout, instances min/max, concurrence
- **Configuration d'environnement** : variables d'environnement, secrets (Secret Manager)
- **Gestion des dépendances** : `package.json` (Node.js) ou `requirements.txt` (Python)
- **Organisation** : structurer les fonctions en modules et fichiers séparés
- **Optimisation réseau** : connexions persistantes, configuration VPC

### Déploiement

```bash
# Déployer toutes les fonctions
firebase deploy --only functions

# Déployer une fonction spécifique
firebase deploy --only functions:maFonction

# Déployer un groupe de fonctions
firebase deploy --only functions:groupe
```

## Tests et surveillance

### Tests

- **Émulateur local** : exécuter et tester les fonctions localement avec l'Emulator Suite
- **Tests unitaires** : framework de test avec le SDK Firebase Functions Test
- **Tests interactifs** : appeler les fonctions depuis le shell Firebase

### Surveillance

- **Journalisation** : logs structurés avec Cloud Logging
- **Visualisation** : métriques dans la console Firebase et Google Cloud
- **Signalement d'erreurs** : intégration Error Reporting

## Quotas et limites

- **Timeout max** : 540 secondes (9 minutes) pour les fonctions HTTP, configurable
- **Mémoire** : de 128 Mo à 32 Go
- **Taille du déploiement** : 100 Mo compressé
- **Invocations** : dépend du plan (Spark gratuit limité, Blaze pay-as-you-go)
- **Emplacements** : multiples régions disponibles dans le monde

## Parcours de démarrage

1. **Installer** Firebase CLI : `npm install -g firebase-tools`
2. **Initialiser** le projet : `firebase init functions`
3. **Choisir** le langage (TypeScript recommandé)
4. **Écrire** une première fonction
5. **Tester** localement avec l'émulateur
6. **Déployer** avec `firebase deploy --only functions`

### Exemple de fonction simple

```typescript
import { onRequest } from "firebase-functions/v2/https";

export const helloWorld = onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
```

### Exemple de déclencheur Firestore

```typescript
import { onDocumentCreated } from "firebase-functions/v2/firestore";

export const onUserCreated = onDocumentCreated(
  "users/{userId}",
  (event) => {
    const snapshot = event.data;
    const data = snapshot?.data();
    console.log("Nouvel utilisateur:", data?.name);
  }
);
```

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/functions?hl=fr)
- [Premiers pas](https://firebase.google.com/docs/functions/get-started?hl=fr)
- [Fonctions appelables](https://firebase.google.com/docs/functions/callable?hl=fr)
- [Déclencheurs Firestore](https://firebase.google.com/docs/functions/firestore-events?hl=fr)
- [Émulateur](https://firebase.google.com/docs/emulator-suite?hl=fr)
- [Référence API](https://firebase.google.com/docs/reference/functions?hl=fr)
