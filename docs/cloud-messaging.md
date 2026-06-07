# Firebase Cloud Messaging (FCM)

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Types de messages](#types-de-messages)
- [Options de ciblage](#options-de-ciblage)
- [Architecture](#architecture)
- [Méthodes d'envoi](#méthodes-denvoi)
- [Plateformes supportées](#plateformes-supportées)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Cloud Messaging (FCM) est une solution de messagerie multiplateforme permettant d'envoyer des messages et des notifications de manière fiable et gratuite. FCM permet d'informer les applications clientes de la disponibilité de nouvelles données et d'envoyer des notifications pour encourager l'engagement.

Les messages peuvent transporter jusqu'à 4 096 octets de payload.

## Types de messages

### Messages de notification

Affichés directement à l'utilisateur par le système :

- Titre et corps du message
- Image (optionnelle)
- Action au clic
- Gérés automatiquement quand l'app est en arrière-plan

### Messages de données

Traités par l'application côté client :

- Payload personnalisé (paires clé-valeur)
- L'application décide de l'affichage et du traitement
- Toujours livrés à l'application (premier plan et arrière-plan)

### Messages combinés

Contiennent à la fois une notification et des données. La notification est affichée automatiquement en arrière-plan, les données sont transmises à l'application.

## Options de ciblage

| Méthode | Description | Cas d'usage |
| ------- | ----------- | ----------- |
| Appareil unique | Token d'enregistrement spécifique | Messages personnalisés |
| Groupe d'appareils | Ensemble de tokens groupés | Multi-appareils d'un même utilisateur |
| Topic (sujet) | Abonnement par sujet | Diffusion à des segments d'intérêt |
| Condition | Combinaison logique de topics | Ciblage avancé multi-critères |

## Architecture

Une implémentation FCM nécessite deux composants :

### 1. Environnement de confiance (serveur)

Créer, cibler et envoyer des messages via :

- Cloud Functions for Firebase
- Serveur d'application avec SDK Admin
- API HTTP v1 FCM

### 2. Application cliente

Recevoir et traiter les messages sur :

- Apple (APNs)
- Android (FCM transport)
- Web (Web Push)

## Méthodes d'envoi

| Méthode | Description |
| ------- | ----------- |
| Firebase Admin SDK | Envoi programmatique depuis un serveur |
| API HTTP v1 | Protocole REST pour l'envoi de messages |
| Console Firebase | Interface graphique pour le marketing et les tests |
| Cloud Functions | Envoi déclenché par des événements Firebase |

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)
- C++
- Unity

## Fonctionnalités avancées

### Messagerie par topics

Abonnez des appareils à des sujets et envoyez des messages à tous les abonnés :

```javascript
// Côté client : s'abonner à un topic
import { getMessaging, subscribe } from "firebase/messaging";
```

### Groupes d'appareils

Regroupez les tokens d'un même utilisateur pour garantir la livraison sur tous ses appareils.

### Gestion des tokens

- Renouvellement automatique des tokens d'enregistrement
- Nettoyage des tokens obsolètes
- Stockage côté serveur pour l'envoi ciblé

### Analyse avec BigQuery

Exportez les données de livraison vers BigQuery pour :

- Comprendre les taux de livraison
- Analyser l'engagement par notification
- Optimiser les campagnes

### Insights IA

Utilisez les insights basés sur l'IA pour optimiser vos campagnes de notifications.

## Parcours de démarrage

1. **Configurer le SDK** Firebase et FCM sur votre application
2. **Développer le client** : ajouter la gestion des messages et l'abonnement aux topics
3. **Tester** via la console Firebase (notification composer)
4. **Développer le serveur** : logique d'envoi avec Admin SDK ou API HTTP v1
5. **Analyser** les résultats avec Analytics et BigQuery

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/cloud-messaging?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/cloud-messaging/ios/client?hl=fr)
- [Guide Android](https://firebase.google.com/docs/cloud-messaging/android/client?hl=fr)
- [Guide Web](https://firebase.google.com/docs/cloud-messaging/js/client?hl=fr)
- [Envoi de messages](https://firebase.google.com/docs/cloud-messaging/send-message?hl=fr)
- [Topics](https://firebase.google.com/docs/cloud-messaging/android/topic-messaging?hl=fr)
- [Tableau de bord FCM](https://status.firebase.google.com/cloud-messaging/)
