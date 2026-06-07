# Google Analytics pour Firebase

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Capacités clés](#capacités-clés)
- [Événements et propriétés](#événements-et-propriétés)
- [Audiences](#audiences)
- [Intégrations Firebase](#intégrations-firebase)
- [Plateformes supportées](#plateformes-supportées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Google Analytics est une solution de mesure d'application **gratuite** qui fournit des insights sur l'utilisation et l'engagement des utilisateurs. Firebase s'appuie sur Google Analytics, offrant des rapports illimités sur jusqu'à 500 événements distincts configurables via le SDK Firebase.

Analytics est au cœur de Firebase : il alimente les fonctionnalités de ciblage de Remote Config, A/B Testing, Cloud Messaging et In-App Messaging.

## Capacités clés

### Rapports illimités

Analytics génère un nombre illimité de rapports couvrant jusqu'à 500 événements distincts. Les données sont accessibles via le tableau de bord dans la console Firebase :

- **Données récapitulatives** : utilisateurs actifs, données démographiques, rétention
- **Données détaillées** : articles les plus achetés, comportements spécifiques, conversions

### Segmentation d'audience

Créez des audiences personnalisées dans la console Firebase basées sur :

- Données d'appareil (modèle, OS, version)
- Événements personnalisés
- Propriétés utilisateur
- Données démographiques

### Collecte automatique

Le SDK capture automatiquement plusieurs événements et propriétés utilisateur sans code supplémentaire :

- `first_open` : première ouverture de l'app
- `session_start` : début de session
- `screen_view` : vue d'écran
- `app_update` : mise à jour de l'app
- Et bien d'autres...

## Événements et propriétés

### Types d'événements

| Type | Description | Exemple |
| ---- | ----------- | ------- |
| Automatiques | Collectés par le SDK sans code | `first_open`, `session_start` |
| Recommandés | Prédéfinis avec des paramètres standard | `purchase`, `sign_up`, `share` |
| Personnalisés | Définis par le développeur | `level_complete`, `add_to_cart` |

### Propriétés utilisateur

Attributs persistants associés à un utilisateur pour la segmentation :

- Propriétés automatiques (âge, pays, appareil)
- Propriétés personnalisées (plan d'abonnement, préférences)

## Audiences

Les audiences créées dans Firebase peuvent être utilisées pour :

- Cibler des notifications push (FCM)
- Personnaliser l'expérience (Remote Config)
- Tester des variantes (A/B Testing)
- Afficher des messages ciblés (In-App Messaging)

## Intégrations Firebase

| Service | Interaction |
| ------- | ----------- |
| **BigQuery** | Analyse personnalisée avancée et liaison de sources multiples |
| **Crashlytics** | Enregistrement automatique d'événements de plantage par version et région |
| **FCM** | Journalisation automatique des notifications, rapports de campagnes |
| **Remote Config** | Modification du comportement de l'app par audience sans redistribution |
| **Google Tag Manager** | Gestion de l'implémentation Analytics à distance après distribution |
| **A/B Testing** | Mesure de l'impact des variantes sur les métriques clés |
| **In-App Messaging** | Ciblage des messages intégrés par audience |

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)
- C++
- Unity

## Parcours de démarrage

1. **Associer** votre application à Firebase (le SDK commence la collecte automatique)
2. **Vérifier** les données dans la console Firebase (visibles sous quelques heures)
3. **Enregistrer** des événements personnalisés pertinents pour votre activité
4. **Créer** des audiences personnalisées dans la console
5. **Cibler** vos audiences avec FCM, Remote Config, A/B Testing

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/analytics?hl=fr)
- [Événements et propriétés](https://firebase.google.com/docs/analytics/events?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/analytics/get-started?platform=ios&hl=fr)
- [Guide Android](https://firebase.google.com/docs/analytics/get-started?platform=android&hl=fr)
- [Guide Web](https://firebase.google.com/docs/analytics/get-started?platform=web&hl=fr)
- [Export BigQuery](https://firebase.google.com/docs/analytics/bigquery?hl=fr)
