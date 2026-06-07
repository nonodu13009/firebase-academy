# Firebase Security Rules

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Produits concernés](#produits-concernés)
- [Syntaxe et structure](#syntaxe-et-structure)
- [Conditions et expressions](#conditions-et-expressions)
- [Bonnes pratiques](#bonnes-pratiques)
- [Tests et déploiement](#tests-et-déploiement)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Les règles de sécurité Firebase permettent de définir des règles précises appliquées par le serveur pour protéger les données de votre base de données et de votre espace de stockage. Elles déterminent qui peut lire ou écrire des données, comment les données sont structurées et quels index existent.

Les règles s'exécutent sur les serveurs Firebase, jamais côté client. Elles ne peuvent pas être contournées.

## Produits concernés

Les règles de sécurité s'appliquent à trois produits Firebase :

| Produit | Langage de règles |
| ------- | ----------------- |
| Cloud Firestore | CEL (Common Expression Language) |
| Realtime Database | JSON avec expressions JavaScript-like |
| Cloud Storage | CEL (Common Expression Language) |

## Syntaxe et structure

### Règles Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Règle pour les utilisateurs
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // Règle pour les posts publics
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
  }
}
```

### Règles Realtime Database

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid",
        ".validate": "newData.hasChildren(['name', 'email'])"
      }
    }
  }
}
```

### Règles Cloud Storage

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

## Conditions et expressions

### Variables disponibles

| Variable | Description |
| -------- | ----------- |
| `request.auth` | Informations sur l'utilisateur authentifié |
| `request.auth.uid` | UID de l'utilisateur |
| `request.auth.token` | Claims du token (email, custom claims, etc.) |
| `request.resource` | Données envoyées par le client (écriture) |
| `resource.data` | Données existantes dans la base (lecture) |
| `request.time` | Horodatage de la requête |
| `request.method` | Type d'opération (get, list, create, update, delete) |

### Opérations de match

- `read` = `get` + `list`
- `write` = `create` + `update` + `delete`

### Fonctions personnalisées

```
function isOwner(userId) {
  return request.auth != null && request.auth.uid == userId;
}

function isAdmin() {
  return request.auth.token.admin == true;
}
```

## Bonnes pratiques

1. **Commencer restrictif** : refuser tout par défaut, ouvrir au cas par cas
2. **Valider les données** : vérifier la structure et les types des données écrites
3. **Utiliser l'authentification** : baser les règles sur `request.auth`
4. **Éviter les règles trop larges** : ne jamais utiliser `allow read, write: if true` en production
5. **Tester avant de déployer** : utiliser l'émulateur et les tests unitaires
6. **Limiter la taille** : valider `request.resource.size` pour les uploads
7. **Custom Claims** : utiliser les claims personnalisés pour les rôles (admin, éditeur, etc.)

## Tests et déploiement

### Tests avec l'émulateur

Testez vos règles localement avec l'émulateur Firebase sans affecter la production.

### Tests unitaires

Utilisez le SDK `@firebase/rules-unit-testing` pour écrire des tests automatisés sur vos règles.

### Déploiement

```bash
# Déployer les règles Firestore
firebase deploy --only firestore:rules

# Déployer les règles Storage
firebase deploy --only storage

# Déployer les règles Realtime Database
firebase deploy --only database
```

## Parcours de démarrage

1. **Comprendre** le modèle de sécurité Firebase
2. **Écrire** des règles pour votre cas d'usage
3. **Tester** avec l'émulateur local
4. **Déployer** en production
5. **Surveiller** les accès dans la console

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/rules?hl=fr)
- [Règles Firestore](https://firebase.google.com/docs/firestore/security/get-started?hl=fr)
- [Règles Realtime Database](https://firebase.google.com/docs/database/security?hl=fr)
- [Règles Cloud Storage](https://firebase.google.com/docs/storage/security?hl=fr)
- [Tests de règles](https://firebase.google.com/docs/rules/unit-tests?hl=fr)
