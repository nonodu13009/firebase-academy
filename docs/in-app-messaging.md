# Firebase In-App Messaging

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Formats de messages](#formats-de-messages)
- [Ciblage](#ciblage)
- [Plateformes supportées](#plateformes-supportées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase In-App Messaging aide à susciter l'engagement des utilisateurs actifs en envoyant des messages ciblés et contextuels qui les encouragent à utiliser les fonctionnalités clés de votre application.

Contrairement aux notifications push (FCM), les messages In-App s'affichent uniquement lorsque l'utilisateur est activement dans l'application, au moment le plus opportun.

## Formats de messages

| Format | Description | Cas d'usage |
| ------ | ----------- | ----------- |
| **Fiche (Card)** | Message avec image et boutons d'action | Promotion, mise en avant de fonctionnalité |
| **Bannière** | Bandeau en haut ou bas de l'écran | Information discrète, rappel |
| **Modal** | Fenêtre centrée avec overlay | Annonce importante, demande d'action |
| **Image seule** | Image plein écran cliquable | Visuel de campagne, événement spécial |

## Ciblage

### Par audience

Intégration avec Google Analytics pour cibler selon :

- Caractéristiques démographiques
- Historique comportemental
- Audiences personnalisées
- Segments importés

### Par déclencheur

Configurez quand le message apparaît :

- Ouverture de l'application
- Événement Analytics spécifique
- Achat in-app
- Atteinte d'un niveau (jeux)

### Personnalisation

- Style et apparence personnalisables
- Déclencheurs d'affichage configurables
- Fréquence d'affichage contrôlable
- Dates de début et fin de campagne

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Flutter (Dart)

> **Note** : In-App Messaging n'est pas disponible pour le Web.

## Parcours de démarrage

1. **Associer** l'application à Firebase
2. **Intégrer** le SDK Firebase In-App Messaging
3. **Créer** un premier message dans la console Firebase
4. **Configurer** l'audience, le déclencheur et le format
5. **Publier** et suivre les métriques d'engagement
6. **(Optionnel)** Utiliser A/B Testing pour optimiser les messages

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/in-app-messaging?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/in-app-messaging/get-started?platform=ios&hl=fr)
- [Guide Android](https://firebase.google.com/docs/in-app-messaging/get-started?platform=android&hl=fr)
- [Guide Flutter](https://firebase.google.com/docs/in-app-messaging/get-started?platform=flutter&hl=fr)
- [Personnalisation](https://firebase.google.com/docs/in-app-messaging/customize-messages?hl=fr)
