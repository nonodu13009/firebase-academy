# Cloud Firestore

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Modèle de données](#modèle-de-données)
- [Éditions disponibles](#éditions-disponibles)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Sécurité](#sécurité)
- [Intégrations](#intégrations)
- [Outils et surveillance](#outils-et-surveillance)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Cloud Firestore est une base de données NoSQL cloud évolutive de Firebase et Google Cloud. Elle permet de stocker et synchroniser des données entre clients avec des modèles de données riches et des capacités d'interrogation puissantes.

Firestore offre une synchronisation en temps réel, un accès hors connexion et une intégration transparente avec les autres produits Firebase.

## Modèle de données

### Documents et Collections

Firestore stocke les données dans des **documents**, organisés en **collections** :

- **Document** : unité de stockage contenant des paires clé-valeur (champs). Taille max : 1 Mo.
- **Collection** : conteneur de documents. Ne peut pas contenir d'autres collections directement.
- **Sous-collection** : collection imbriquée dans un document.

### Types de données supportés

- Chaîne de caractères (string)
- Nombre (integer, float)
- Booléen
- Map (objet imbriqué)
- Tableau (array)
- Null
- Horodatage (timestamp)
- Point géographique (geopoint)
- Référence (reference vers un autre document)
- Blob (données binaires)

## Éditions disponibles

### Édition Standard

Opérations principales de base de données avec les fonctionnalités classiques.

### Édition Enterprise

- Mode natif avec opérations Core et Pipeline
- Compatibilité MongoDB
- Fonctionnalités avancées de gestion

## Fonctionnalités clés

### Gestion des données

- **Ajouter et structurer** les données avec des documents et collections
- **Transactions** : opérations atomiques sur plusieurs documents
- **Écritures par lot** : modifications groupées pour la performance
- **Requêtes simples et composées** : filtrage, tri, pagination
- **Accès hors connexion** : synchronisation automatique à la reconnexion
- **Recherche vectorielle** : recherche par embeddings vectoriels

### Requêtes

- Requêtes simples sur un seul champ
- Requêtes composées avec filtres multiples
- Requêtes de groupe de collections
- Requêtes d'agrégation (count, sum, average)
- Pagination avec curseurs
- Écoute en temps réel (listeners)

### Temps réel

Abonnez-vous aux modifications de documents ou collections pour recevoir les mises à jour instantanément dans votre application.

## Sécurité

- **Règles de sécurité** : définition de règles au niveau du serveur pour contrôler l'accès
- **Contrôle d'accès par champ** : restrictions granulaires
- **Identity and Access Management (IAM)** : gestion des permissions serveur
- **Chiffrement côté serveur avec CMEK** : clés de chiffrement gérées par le client

## Intégrations

| Service | Description |
| ------- | ----------- |
| BigQuery | Export et analyse avancée des données |
| Cloud Functions (2e gén.) | Déclencheurs sur les modifications de données |
| API REST | Accès programmatique via HTTP |
| API RPC | Accès via gRPC |
| Firebase AI Logic | Recherche vectorielle et IA |

### Bibliothèques clientes

Swift, Kotlin, Java, JavaScript, Python, Go, PHP, C#, Ruby, C++, Unity, Dart (Flutter).

## Outils et surveillance

- **Key Visualizer** : analyse les patterns d'utilisation des clés
- **Sauvegardes planifiées** : protection des données automatique
- **Récupération PITR** (Point-In-Time Recovery) : restauration à un instant précis
- **Émulateur** : tests locaux sans affecter la production
- **Monitoring** : métriques de performance et journaux d'audit

## Parcours de démarrage

1. **Créer une base de données** Firestore dans la console Firebase
2. **Configurer les règles de sécurité** (mode test ou production)
3. **Installer le SDK** pour votre plateforme
4. **Initialiser Firestore** dans votre application
5. **Ajouter des données** avec `setDoc()` ou `addDoc()`
6. **Lire des données** avec `getDoc()` ou `onSnapshot()`
7. **Sécuriser** avec des règles de sécurité adaptées

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/firestore?hl=fr)
- [Démarrage rapide](https://firebase.google.com/docs/firestore/quickstart?hl=fr)
- [Ajouter des données](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=fr)
- [Lire des données](https://firebase.google.com/docs/firestore/query-data/get-data?hl=fr)
- [Règles de sécurité](https://firebase.google.com/docs/firestore/security/get-started?hl=fr)
- [Référence API Web](https://firebase.google.com/docs/reference/js/firestore?hl=fr)
