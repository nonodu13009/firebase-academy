# Firebase Authentication

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Méthodes d'authentification](#méthodes-dauthentification)
- [Plateformes supportées](#plateformes-supportées)
- [Administration et configuration](#administration-et-configuration)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Authentication est une plateforme d'identité tout-en-un et sécurisée qui simplifie la connexion des utilisateurs à vos applications. Elle fournit des services backend, des SDK faciles à utiliser et des bibliothèques d'interface utilisateur prêtes à l'emploi pour authentifier les utilisateurs.

Firebase Authentication s'intègre étroitement avec les autres services Firebase et exploite des standards industriels comme OAuth 2.0 et OpenID Connect.

## Fonctionnalités clés

- **Interface prédéfinie (FirebaseUI)** : bibliothèque d'interface complète pour gérer les flux de connexion
- **Authentification multi-fournisseurs** : support de nombreuses méthodes de connexion
- **Multi-Factor Authentication (MFA)** : support SMS et TOTP pour une sécurité renforcée
- **Liaison de comptes** : fusionner plusieurs identités pour un même utilisateur
- **Authentification anonyme** : créer des comptes temporaires convertibles
- **Gestion des sessions** : cookies de session, persistance configurable
- **Personnalisation** : gestionnaires email personnalisés, domaines email personnalisés

## Méthodes d'authentification

### Fournisseurs d'identité

| Fournisseur | iOS+ | Android | Web | Flutter |
| ----------- | ---- | ------- | --- | ------- |
| Email/Mot de passe | Oui | Oui | Oui | Oui |
| Lien email (passwordless) | Oui | Oui | Oui | Oui |
| Google | Oui | Oui | Oui | Oui |
| Facebook | Oui | Oui | Oui | Oui |
| Apple | Oui | Oui | Oui | Oui |
| Twitter | Oui | Oui | Oui | - |
| GitHub | Oui | Oui | Oui | - |
| Microsoft | Oui | Oui | Oui | - |
| Yahoo | Oui | Oui | Oui | - |
| Numéro de téléphone | Oui | Oui | Oui | Oui |
| Game Center | Oui | - | - | - |
| Play Games | - | Oui | - | - |
| OpenID Connect | Oui | Oui | Oui | - |
| SAML | - | - | Oui | - |
| Authentification personnalisée | Oui | Oui | Oui | Oui |
| Anonyme | Oui | Oui | Oui | Oui |

### SSO (Single Sign-On)

Support d'entreprise avec fournisseurs SAML et OIDC pour le Web.

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)
- C++
- Unity

## Administration et configuration

### SDK Admin

- Gestion programmatique des utilisateurs (création, suppression, mise à jour)
- Importation d'utilisateurs en masse
- Jetons personnalisés (custom tokens)
- Vérification de tokens d'ID
- Gestion MFA
- Gestion des sessions utilisateur
- Cookies de session
- Revendications personnalisées (custom claims)

### Configuration

- OAuth programmatique
- CLI Firebase
- Gestionnaires email personnalisés
- Extension Cloud Functions
- Fonctions de blocage
- Domaines email personnalisés

## Fonctionnalités avancées

### Extension avec Cloud Functions

Déclenchez du code backend en réponse à des événements d'authentification (création de compte, suppression, connexion).

### Fonctions de blocage

Personnalisez les flux d'authentification en exécutant du code avant ou après certaines opérations (avant la création d'un utilisateur, avant la connexion, etc.).

### Gestion de l'état d'authentification

Surveillez l'état de connexion en temps réel avec des listeners dédiés. Configurez la persistance de session (locale, session, aucune).

## Parcours de démarrage

1. **Ajouter Firebase** à votre projet (console Firebase)
2. **Installer le SDK** Firebase Authentication pour votre plateforme
3. **Configurer les fournisseurs** d'authentification dans la console
4. **Implémenter les flux** de connexion/inscription dans votre app
5. **Sécuriser les données** avec des règles de sécurité basées sur l'authentification

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/auth?hl=fr)
- [Guide iOS+](https://firebase.google.com/docs/auth/ios/start?hl=fr)
- [Guide Android](https://firebase.google.com/docs/auth/android/start?hl=fr)
- [Guide Web](https://firebase.google.com/docs/auth/web/start?hl=fr)
- [Guide Flutter](https://firebase.google.com/docs/auth/flutter/start?hl=fr)
- [Référence API](https://firebase.google.com/docs/reference/js/auth?hl=fr)
