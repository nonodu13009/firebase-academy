# Firebase Realtime Database

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Modèle de données](#modèle-de-données)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Sécurité et règles](#sécurité-et-règles)
- [Plateformes supportées](#plateformes-supportées)
- [Performance et scalabilité](#performance-et-scalabilité)
- [Comparaison avec Firestore](#comparaison-avec-firestore)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Realtime Database est une base de données NoSQL hébergée dans le cloud qui permet de stocker et synchroniser des données entre utilisateurs en temps réel. Les données sont stockées au format JSON et synchronisées en temps réel avec chaque client connecté.

Lorsque vous créez des applications multiplateformes avec les SDK iOS, Android et JavaScript, tous les clients partagent une même instance Realtime Database et reçoivent automatiquement les mises à jour avec les données les plus récentes.

## Modèle de données

### Structure JSON

Toutes les données sont stockées sous forme d'un arbre JSON unique :

```json
{
  "users": {
    "user1": {
      "name": "Jean-Michel",
      "email": "jm@example.com"
    },
    "user2": {
      "name": "Marie",
      "email": "marie@example.com"
    }
  }
}
```

### Bonnes pratiques de structuration

- **Aplatir les données** : éviter l'imbrication profonde
- **Dénormaliser** : dupliquer les données pour optimiser les lectures
- **Limiter la profondeur** : les requêtes récupèrent tous les nœuds enfants

## Fonctionnalités clés

- **Synchronisation en temps réel** : les données sont synchronisées sur tous les appareils connectés en millisecondes
- **Accès hors ligne** : les SDK maintiennent un cache local, les modifications sont synchronisées à la reconnexion
- **Accessibilité client** : accès direct depuis un appareil mobile ou un navigateur (pas de serveur d'application requis)
- **Scalabilité** : support de plusieurs instances de bases de données pour la montée en charge

## Sécurité et règles

### Comprendre les règles

Les règles de sécurité Realtime Database contrôlent l'accès en lecture et écriture aux données. Elles sont déclaratives et s'appliquent à chaque nœud de l'arbre JSON.

### Structure des règles

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

### Fonctionnalités des règles

- **Conditions d'accès** : basées sur l'authentification, les données existantes, les nouvelles données
- **Validation des données** : `.validate` pour vérifier le format et le type des données
- **Indexation** : `.indexOn` pour optimiser les requêtes

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)
- C++
- Unity
- Admin SDK (Node.js, Java, Python, Go)
- REST API

## Performance et scalabilité

### Optimisation

- **Profilage** : outil intégré pour analyser les performances
- **Indexation** : optimiser les requêtes avec des index
- **Surveillance** : monitoring de l'utilisation et des performances

### Scalabilité

- **Plusieurs bases de données** : répartir la charge sur plusieurs instances
- **Sharding** : partitionner les données entre instances
- **Limites** : quotas par projet (consultables dans la console)

### Sauvegardes

Sauvegardes automatisées disponibles pour les plans Blaze.

## Comparaison avec Firestore

| Critère | Realtime Database | Cloud Firestore |
| ------- | ----------------- | --------------- |
| Modèle de données | Arbre JSON | Documents et collections |
| Requêtes | Tri/filtrage limité | Requêtes composées |
| Scalabilité | Scaling manuel | Scaling automatique |
| Hors ligne | iOS, Android | iOS, Android, Web |
| Tarification | Bande passante + stockage | Opérations + stockage |

## Parcours de démarrage

1. **Créer une base** Realtime Database dans la console Firebase
2. **Configurer les règles** de sécurité
3. **Installer le SDK** pour votre plateforme
4. **Initialiser** la base de données dans votre app
5. **Lire et écrire** des données avec les méthodes du SDK
6. **Écouter les changements** en temps réel avec des listeners

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/database?hl=fr)
- [Structure des données](https://firebase.google.com/docs/database/web/structure-data?hl=fr)
- [Lecture et écriture](https://firebase.google.com/docs/database/web/read-and-write?hl=fr)
- [Règles de sécurité](https://firebase.google.com/docs/database/security?hl=fr)
- [Série vidéo : Firebase pour les développeurs SQL](https://firebase.google.com/docs/database/video-series?hl=fr)
