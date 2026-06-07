# Firebase Local Emulator Suite

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Émulateurs disponibles](#émulateurs-disponibles)
- [Installation et configuration](#installation-et-configuration)
- [Utilisation](#utilisation)
- [Avantages](#avantages)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

La Firebase Local Emulator Suite permet de tester votre application dans des conditions réelles sans affecter les données de production. Elle reproduit localement les principaux services Firebase pour le développement, les tests et l'intégration continue.

L'Emulator Suite fournit une interface web (Emulator UI) pour visualiser les données, les logs et l'état des services émulés.

## Émulateurs disponibles

| Émulateur | Description | Port par défaut |
| --------- | ----------- | --------------- |
| Authentication | Flux d'authentification complets | 9099 |
| Cloud Firestore | Base de données Firestore locale | 8080 |
| Realtime Database | Base de données temps réel locale | 9000 |
| Cloud Storage | Stockage de fichiers local | 9199 |
| Cloud Functions | Exécution locale des fonctions | 5001 |
| Hosting | Serveur d'hébergement local | 5000 |
| App Hosting | Hébergement full-stack local | - |
| Extensions | Test des extensions Firebase | - |
| Pub/Sub | Messagerie Pub/Sub locale | 8085 |
| Emulator UI | Interface web de gestion | 4000 |

## Installation et configuration

### Prérequis

- Node.js installé
- Firebase CLI installée : `npm install -g firebase-tools`
- Java JDK 11+ (pour Firestore et Realtime Database)

### Initialisation

```bash
# Initialiser les émulateurs
firebase init emulators

# Sélectionner les émulateurs à installer
# Configurer les ports (optionnel)
```

### Configuration dans firebase.json

```json
{
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "database": { "port": 9000 },
    "storage": { "port": 9199 },
    "functions": { "port": 5001 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 }
  }
}
```

## Utilisation

### Démarrage

```bash
# Démarrer tous les émulateurs configurés
firebase emulators:start

# Démarrer avec import/export de données
firebase emulators:start --import=./data --export-on-exit

# Exécuter une commande avec les émulateurs
firebase emulators:exec "npm test"
```

### Connexion depuis l'application

```javascript
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

// Connecter aux émulateurs en mode développement
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099');
connectStorageEmulator(storage, 'localhost', 9199);
```

### Import/Export de données

Sauvegardez et restaurez l'état des émulateurs :

```bash
# Exporter les données
firebase emulators:export ./saved-data

# Importer au démarrage
firebase emulators:start --import=./saved-data
```

## Avantages

- **Développement rapide** : pas besoin de connexion internet ni de projet Firebase distant
- **Tests reproductibles** : données prévisibles et réinitialisables
- **Gratuit** : aucun coût lié aux opérations Firebase
- **CI/CD** : intégration dans les pipelines de tests automatisés
- **Sécurité** : testez les règles de sécurité sans risque

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/emulator-suite?hl=fr)
- [Connexion et prototypage](https://firebase.google.com/docs/emulator-suite/connect_and_prototype?hl=fr)
- [Installation](https://firebase.google.com/docs/emulator-suite/install_and_configure?hl=fr)
