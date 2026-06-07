# Firebase Remote Config

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Fonctionnement technique](#fonctionnement-technique)
- [Paramètres et conditions](#paramètres-et-conditions)
- [Limites techniques](#limites-techniques)
- [Intégrations](#intégrations)
- [Plateformes supportées](#plateformes-supportées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Remote Config est un service cloud permettant de modifier le comportement et l'apparence de vos applications sans publier de mises à jour. C'est une solution gratuite et pour un nombre illimité d'utilisateurs actifs par jour.

Remote Config permet de gérer des paramètres côté serveur et de les distribuer aux applications clientes, avec la possibilité de cibler des segments d'utilisateurs spécifiques.

## Fonctionnalités principales

### Déploiement rapide des modifications

Ajustez les valeurs de paramètres à distance pour modifier l'apparence ou le fonctionnement applicatif. Idéal pour les promotions saisonnières, les changements d'UI, les feature flags.

### Personnalisation par segments

Proposez des variantes différentes selon :

- La version de l'application
- La langue de l'utilisateur
- Les audiences Google Analytics
- Les segments importés
- Les conditions de signaux personnalisés

### Déploiements progressifs

Lancez progressivement de nouvelles fonctionnalités vers des pourcentages ciblés d'utilisateurs et comparez les résultats avec un groupe de contrôle.

### Tests A/B

Validez les améliorations applicatives sur différents segments avant un déploiement global. Intégration native avec Firebase A/B Testing.

### Personnalisation par machine learning

Optimisez automatiquement l'expérience utilisateur pour atteindre des objectifs stratégiques (engagement, revenus, événements personnalisés).

## Fonctionnement technique

### Architecture

1. **Console Firebase** : définir les paramètres et valeurs
2. **Backend Remote Config** : stocker et servir les configurations
3. **SDK client** : récupérer, mettre en cache et activer les valeurs

### Cycle de vie des valeurs

```
Valeurs par défaut (app) → Fetch (serveur) → Cache local → Activate → Utilisation
```

### Récupération en temps réel

Ajoutez la fonctionnalité "en temps réel Remote Config" pour que les applications récupèrent automatiquement les dernières valeurs dès leur publication, sans attendre le prochain fetch.

## Paramètres et conditions

### Types de paramètres

Les paramètres Remote Config sont des paires clé-valeur. Types supportés :

- String
- Number
- Boolean
- JSON

### Conditions

Les conditions déterminent quels utilisateurs reçoivent quelle valeur :

- Version de l'app
- Plateforme (iOS, Android, Web)
- Pays/région
- Langue
- Audience Analytics
- Propriété utilisateur
- Percentile aléatoire (pour les déploiements progressifs)

## Limites techniques

| Limite | Valeur |
| ------ | ------ |
| Paramètres par type de modèle | 3 000 max |
| Versions de modèle stockées | 300 par type |
| Tests A/B + déploiements combinés | 24 max |

### Règles de bonnes pratiques

- Ne pas utiliser pour des mises à jour nécessitant l'autorisation utilisateur
- Ne pas stocker de données sensibles (mots de passe, clés API)
- Ne pas contourner les exigences des plateformes (App Store, Google Play)

## Intégrations

| Service | Description |
| ------- | ----------- |
| A/B Testing | Valider les améliorations avant déploiement |
| Google Analytics | Ciblage par audience |
| Crashlytics | Corrélation config/stabilité |
| Cloud Functions | Extension des fonctionnalités |
| BigQuery | Export et analyse des données de config |

## Plateformes supportées

### Clients

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)
- C++
- Unity

### Serveur

- Node.js (SDK Admin)
- Python (SDK Admin)
- Go (SDK Admin)
- Java (SDK Admin)

## Parcours de démarrage

1. **Définir** les aspects de l'app modifiables via paramètres
2. **Configurer** les valeurs par défaut dans l'app avec `setDefaults()`
3. **Créer** les paramètres dans la console Firebase
4. **Récupérer** les valeurs avec `fetchAndActivate()`
5. **Écouter** les mises à jour en temps réel (optionnel)
6. **Cibler** des audiences spécifiques avec des conditions

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/remote-config?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/remote-config/get-started?platform=ios&hl=fr)
- [Guide Android](https://firebase.google.com/docs/remote-config/get-started?platform=android&hl=fr)
- [Guide Web](https://firebase.google.com/docs/remote-config/get-started?platform=web&hl=fr)
- [Temps réel](https://firebase.google.com/docs/remote-config/real-time?hl=fr)
- [Personnalisation](https://firebase.google.com/docs/remote-config/personalization?hl=fr)
