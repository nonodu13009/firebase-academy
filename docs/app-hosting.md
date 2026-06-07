# Firebase App Hosting

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Différence avec Firebase Hosting](#différence-avec-firebase-hosting)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Frameworks compatibles](#frameworks-compatibles)
- [Déploiement](#déploiement)
- [Configuration](#configuration)
- [Surveillance](#surveillance)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase App Hosting est un service d'hébergement serverless conçu pour les applications web full-stack modernes avec rendu côté serveur (SSR). Il gère automatiquement la compilation, le déploiement et la mise à l'échelle de vos applications.

## Différence avec Firebase Hosting

| Critère | Firebase Hosting | App Hosting |
| ------- | ---------------- | ----------- |
| Type de contenu | Statique + rewrites | Full-stack SSR |
| Frameworks | Manuel | Détection automatique |
| Build | Local (CLI) | Cloud (automatique) |
| Scaling | CDN statique | Serverless auto-scaling |
| Git | Optionnel (GitHub Actions) | Natif (deploy on push) |

## Fonctionnalités clés

- **Déploiement automatique** : push sur Git = déploiement automatique
- **Compilation cloud** : build automatique dans le cloud
- **Auto-scaling** : mise à l'échelle automatique sans configuration
- **Multi-environnements** : déployer plusieurs backends (staging, production)
- **Domaines personnalisés** : associer vos propres domaines
- **Intégration Firebase SDK** : accès natif aux services Firebase
- **Cache optimisé** : gestion intelligente du cache de contenu

## Frameworks compatibles

- Next.js
- Angular (avec SSR)
- Autres frameworks avec adaptateurs compatibles

## Déploiement

### Méthodes de déploiement

1. **Git Push** : déploiement automatique à chaque push sur la branche configurée
2. **Console Firebase** : déclenchement manuel depuis l'interface
3. **Méthodes alternatives** : CLI et API pour les cas spécifiques

### Multi-environnements

Gérez plusieurs environnements (développement, staging, production) avec des backends séparés, chacun lié à sa propre branche Git.

### Monodépôts

Support des monorepos avec configuration pour cibler le bon sous-répertoire.

## Configuration

### Backends

Configurez et gérez les backends (instances de votre application) avec :

- Région de déploiement
- Branche Git source
- Variables d'environnement
- Secrets (via Secret Manager)

### Cache de contenu

Optimisez les performances avec des stratégies de cache adaptées :

- Cache des assets statiques
- Cache des pages SSR
- Invalidation automatique au déploiement

## Surveillance

- **Gestion des déploiements** : historique et rollback des versions
- **Surveillance des routes** : monitoring des performances par route
- **Journalisation** : logs structurés pour le débogage
- **Cloud Audit Logging** : traçabilité des opérations

## Parcours de démarrage

1. **Créer un projet** Firebase (ou en utiliser un existant)
2. **Connecter** votre dépôt GitHub
3. **Configurer** le backend (framework, branche, région)
4. **Déployer** automatiquement via un push
5. **Associer** un domaine personnalisé (optionnel)

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/app-hosting?hl=fr)
- [Fonctionnement](https://firebase.google.com/docs/app-hosting/about-app-hosting?hl=fr)
- [Tarification](https://firebase.google.com/docs/app-hosting/pricing-and-billing?hl=fr)
- [Comparaison serverless](https://firebase.google.com/docs/app-hosting/compare-serverless?hl=fr)
