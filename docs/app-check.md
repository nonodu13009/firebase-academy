# Firebase App Check

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnement](#fonctionnement)
- [Fournisseurs par défaut](#fournisseurs-par-défaut)
- [Fournisseurs personnalisés](#fournisseurs-personnalisés)
- [Protection des ressources](#protection-des-ressources)
- [Surveillance et application](#surveillance-et-application)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase App Check protège vos ressources backend contre les utilisations abusives et les accès non autorisés. Il vérifie que les requêtes entrantes proviennent bien de votre application légitime et non d'un client non autorisé.

App Check fonctionne avec les services Firebase (Firestore, Storage, Cloud Functions, etc.) et peut aussi protéger vos propres backends personnalisés.

## Fonctionnement

App Check utilise des fournisseurs d'attestation spécifiques à chaque plateforme pour vérifier l'authenticité de l'application :

1. L'application demande un jeton App Check au fournisseur d'attestation
2. Le fournisseur vérifie l'authenticité de l'application
3. App Check émet un jeton signé
4. Le jeton est envoyé avec chaque requête aux services Firebase
5. Les services vérifient le jeton avant de répondre

## Fournisseurs par défaut

| Plateforme | Fournisseur | Description |
| ---------- | ----------- | ----------- |
| iOS+ | DeviceCheck | Vérification au niveau de l'appareil Apple |
| iOS+ | App Attest | Attestation au niveau de l'app (iOS 14+) |
| Android | Play Integrity | Vérification via Google Play |
| Web | reCAPTCHA Enterprise | Protection anti-bot avancée |
| Web | reCAPTCHA v3 | Protection anti-bot standard |

## Fournisseurs personnalisés

Vous pouvez créer vos propres fournisseurs App Check pour :

- **Côté serveur** : implémenter votre propre logique de vérification
- **Côté client** : intégrer des solutions d'attestation tierces

Disponible pour iOS+, Android, Web, Flutter, Unity, C++.

## Protection des ressources

### Services Firebase protégés

- Cloud Firestore
- Realtime Database
- Cloud Storage
- Cloud Functions
- Authentication (Identity Platform)

### Ressources personnalisées

Protégez vos propres backends :

1. **Côté client** : envoyez le jeton App Check avec vos requêtes
2. **Côté serveur** : vérifiez le jeton avec le SDK Admin Firebase

## Surveillance et application

### Métriques de requêtes

Surveillez les requêtes dans la console Firebase pour identifier :

- Requêtes avec jeton valide
- Requêtes avec jeton invalide ou absent
- Proportion de trafic légitime vs suspect

### Application progressive

1. **Mode surveillance** : collectez les métriques sans bloquer les requêtes
2. **Mode application** : bloquez les requêtes sans jeton valide
3. **Activation progressive** : activez par service, un à la fois

## Parcours de démarrage

1. **Enregistrer** votre app avec un fournisseur d'attestation
2. **Ajouter** le SDK App Check à votre app
3. **Initialiser** App Check avec le fournisseur choisi
4. **Surveiller** les métriques dans la console
5. **Activer** l'application quand le trafic légitime est confirmé

### Debug et tests

Utilisez le **fournisseur de débogage** pour les environnements de développement et de CI/CD, afin d'éviter de bloquer les requêtes pendant les tests.

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/app-check?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/app-check/ios/start?hl=fr)
- [Guide Android](https://firebase.google.com/docs/app-check/android/start?hl=fr)
- [Guide Web](https://firebase.google.com/docs/app-check/web/start?hl=fr)
- [Fournisseur personnalisé](https://firebase.google.com/docs/app-check/custom-provider?hl=fr)
