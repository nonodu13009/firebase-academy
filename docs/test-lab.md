# Firebase Test Lab

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Types de tests](#types-de-tests)
- [Infrastructure](#infrastructure)
- [Intégration](#intégration)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Limitations](#limitations)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Test Lab est une infrastructure de test cloud permettant de valider les applications Android et iOS sur divers appareils et configurations hébergés dans les centres de données Google. Il permet de simuler des configurations matérielles réelles mondiales.

## Types de tests

### Android

| Type | Description |
| ---- | ----------- |
| Tests d'instrumentation | Tests unitaires et d'intégration écrits par le développeur |
| Tests Robo | Exploration automatique de l'interface (IA) |
| Scripts Robo | Exploration guidée avec scripts personnalisés |
| Boucles de jeu | Tests spécifiques pour les jeux |
| Appareils virtuels | Tests sur émulateurs Android accélérés (ARM) |

### iOS+

| Type | Description |
| ---- | ----------- |
| XCTest | Framework de test natif Apple |
| Tests Robo | Exploration automatique de l'interface |
| Scripts Robo | Exploration guidée |
| Boucles de jeu | Tests pour les jeux |
| Tests d'intégration Flutter | Tests cross-platform Flutter |

## Infrastructure

- **Appareils physiques** : appareils de production dans les centres de données Google
- **Appareils virtuels** : émulateurs Android accélérés sur hôtes ARM
- **Matrice de test** : combinaison d'appareils, versions OS, paramètres régionaux et orientations
- **Paramètres régionaux** : test avec différentes langues et locales
- **API à jour** : appareils maintenus avec les dernières versions

## Intégration

| Outil | Description |
| ----- | ----------- |
| Console Firebase | Interface web pour lancer et visualiser les tests |
| Android Studio | Lancement direct depuis l'IDE |
| gcloud CLI | Ligne de commande pour l'automatisation |
| CI/CD | Intégration dans les pipelines de build |

## Parcours de démarrage

1. **Préparer** l'application et choisir le type de test
2. **Configurer** la matrice de test (appareils, OS, locales)
3. **Lancer** les tests via l'outil choisi
4. **Analyser** les rapports dans la console Firebase (logs, screenshots, vidéos)
5. **Corriger** les problèmes détectés et relancer

## Limitations

- Test Lab n'est **pas destiné** aux tests de charge sur les serveurs backend
- Quotas gratuits limités (plan Spark), usage extensif sur plan Blaze
- Certains appareils physiques peuvent ne pas être disponibles à tout moment

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/test-lab?hl=fr)
- [Guide Android](https://firebase.google.com/docs/test-lab/android/get-started?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/test-lab/ios/get-started?hl=fr)
- [gcloud CLI](https://firebase.google.com/docs/test-lab/android/command-line?hl=fr)
- [Dépannage](https://firebase.google.com/docs/test-lab/troubleshooting?hl=fr)
