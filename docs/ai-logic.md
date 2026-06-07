# Firebase AI Logic

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Capacités principales](#capacités-principales)
- [Architecture](#architecture)
- [SDK et plateformes](#sdk-et-plateformes)
- [Sécurité en production](#sécurité-en-production)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase AI Logic est un service permettant de créer des applications mobiles et web optimisées par l'IA en utilisant les modèles Gemini de Google. Il fournit des SDK clients pour accéder aux modèles d'IA directement depuis vos applications, avec une couche de sécurité et de gestion intégrée.

## Capacités principales

### Entrées multimodales

- Texte, images, PDF, vidéos et audio
- Requêtes en langage naturel
- Certains modèles Gemini génèrent des sorties multimodales

### Fonctionnalités IA

| Fonctionnalité | Description |
| -------------- | ----------- |
| Génération de texte | Production de texte et de code |
| Chat multitour | Conversations avec historique |
| Génération d'images | Création et analyse d'images |
| Streaming bidirectionnel | Audio en temps réel via Live API |
| Appel de fonction | Interaction avec des APIs et services externes |
| Ancrage Google Search | Enrichissement des réponses avec des données web |
| Ancrage Google Maps | Données géographiques et localisation |
| Analyse de documents | Compréhension de PDF et documents |
| Analyse vidéo | Compréhension du contenu vidéo |
| Sorties structurées | Réponses formatées en JSON |

## Architecture

```
SDK Client → Service Proxy Firebase → Fournisseur Gemini API
```

Le service proxy Firebase agit comme passerelle entre votre application et les API Gemini :

- Gère l'authentification et la protection des clés API
- Masque les clés API côté serveur (jamais exposées au client)
- Permet les limites de débit par utilisateur

### Fournisseurs d'API

| Fournisseur | Description |
| ----------- | ----------- |
| Gemini Developer API | Tier gratuit disponible, idéal pour le prototypage |
| Vertex AI Gemini API | Production, plus de contrôle et de régions |

## SDK et plateformes

| Plateforme | Langage |
| ---------- | ------- |
| iOS+ | Swift |
| Android | Kotlin, Java |
| Web | JavaScript, TypeScript |
| Flutter | Dart |
| Unity | C# |

## Sécurité en production

### Firebase App Check

Intégration native avec App Check pour protéger contre les utilisations abusives.

### Limites de débit

Limites de débit par utilisateur configurables par défaut pour éviter les abus et contrôler les coûts.

### Infrastructure scalable

Conçu pour les applications mobiles et web en production, avec mise à l'échelle automatique.

### Remote Config

Utilisez Remote Config pour :

- Basculer entre les modèles Gemini
- Ajuster les paramètres de génération
- Activer/désactiver des fonctionnalités IA par segment

## Parcours de démarrage

1. **Configurer** le projet Firebase et enregistrer l'application
2. **Activer** Firebase AI Logic dans la console
3. **Choisir** le fournisseur d'API (Gemini Developer ou Vertex AI)
4. **Installer** le SDK pour votre plateforme
5. **Initialiser** le service dans votre application
6. **Envoyer** des requêtes aux modèles Gemini
7. **Sécuriser** avec App Check et Remote Config en production

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/ai-logic?hl=fr)
- [Modèles et quotas](https://firebase.google.com/docs/ai-logic/models?hl=fr)
- [Tarifs](https://firebase.google.com/docs/ai-logic/pricing?hl=fr)
- [Guide de démarrage](https://firebase.google.com/docs/ai-logic/get-started?hl=fr)
