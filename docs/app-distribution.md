# Firebase App Distribution

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Méthodes de distribution](#méthodes-de-distribution)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase App Distribution simplifie la distribution des applications préliminaires aux testeurs de confiance. En déployant rapidement vos applications sur les appareils des testeurs, vous pouvez obtenir des commentaires rapidement et fréquemment.

## Fonctionnalités principales

### Distribution rapide

Distribuez rapidement des versions anticipées à vos testeurs grâce à une intégration rapide, sans SDK à installer et avec une distribution instantanée des applications.

### Multiplateforme

Gérez simultanément les distributions de préversions iOS et Android depuis une seule interface.

### Gestion des testeurs

- Organisez les testeurs en groupes
- Gérez les invitations par email
- Suivez l'état d'acceptation et de téléchargement
- Activez les commentaires intégrés à l'application

### Intégration CI/CD

Automatisez les distributions en intégrant la CLI Firebase dans vos pipelines d'intégration continue.

### Support Android App Bundles

Distribuez des versions de test pour vos Android App Bundles dans Google Play.

### Intégration Crashlytics

Accédez à des métriques de stabilité automatiques pour vos versions de test.

## Méthodes de distribution

### iOS

| Méthode | Description |
| ------- | ----------- |
| Console Firebase | Interface web |
| CLI Firebase | Ligne de commande |
| fastlane | Automatisation CI/CD |
| API REST | Intégration programmatique |

### Android

| Méthode | Description |
| ------- | ----------- |
| Console Firebase | Interface web |
| CLI Firebase | Ligne de commande |
| fastlane | Automatisation CI/CD |
| Gradle | Plugin de build Android |
| API REST | Intégration programmatique |

## Parcours de démarrage

1. **Importer** votre version (APK, AAB ou IPA) via la méthode choisie
2. **Inviter** des testeurs qui recevront un email d'intégration
3. **Collecter** les commentaires et surveiller la stabilité
4. **Itérer** : chaque nouvelle version est importée et les testeurs sont notifiés

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/app-distribution?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/app-distribution/ios/distribute-console?hl=fr)
- [Guide Android](https://firebase.google.com/docs/app-distribution/android/distribute-console?hl=fr)
- [fastlane](https://firebase.google.com/docs/app-distribution/ios/distribute-fastlane?hl=fr)
- [CI/CD](https://firebase.google.com/docs/app-distribution/android/distribute-gradle?hl=fr)
