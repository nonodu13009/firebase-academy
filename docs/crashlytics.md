# Firebase Crashlytics

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Concepts clés](#concepts-clés)
- [Plateformes supportées](#plateformes-supportées)
- [Intégrations](#intégrations)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Crashlytics est un outil de rapport de plantage en temps réel qui aide les développeurs à suivre, prioriser et résoudre les problèmes de stabilité affectant la qualité des applications. Crashlytics regroupe intelligemment les plantages et met en évidence les circonstances qui les ont précédés.

## Fonctionnalités principales

### Rapports de plantages groupés

Crashlytics regroupe intelligemment les plantages similaires et met en évidence les circonstances qui les ont précédés, facilitant la gestion des problèmes multiples.

### Insights basés sur l'IA

La plateforme propose des insights sur les plantages ainsi que des conseils utiles pour identifier les problèmes de stabilité courants et comprendre leurs causes.

### Intégration Analytics

Les erreurs s'enregistrent automatiquement comme événements `app_exception` dans Google Analytics, permettant une corrélation avec d'autres événements utilisateur pour mieux comprendre le contexte.

### Alertes personnalisables

Recevez des alertes en temps réel sur :

- Nouveaux problèmes détectés
- Problèmes régressifs (réapparition après correction)
- Problèmes en croissance rapide
- Seuils personnalisés configurables

## Concepts clés

### Problèmes (Issues)

Groupements d'événements de plantage partageant un point de défaillance commun. Le système analyse les frames de la trace de la pile, le message d'exception et le code d'erreur pour organiser les données.

### Variantes

Sous-groupes au sein d'un problème avec des traces de pile similaires mais pas identiques. Permettent d'identifier les différentes manifestations d'un même bug.

### Personnalisation des rapports

- **Journaux personnalisés** : ajoutez du contexte avec des messages de log
- **Clés personnalisées** : associez des paires clé-valeur aux rapports
- **Erreurs non fatales** : suivez les exceptions gérées
- **Rapports d'activation** : permettez aux utilisateurs d'envoyer des rapports manuellement

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Android NDK (C/C++)
- Flutter (Dart)
- Unity (C#)

## Intégrations

| Service | Description |
| ------- | ----------- |
| Google Analytics | Corrélation plantages/comportements utilisateur |
| Google Play | Suivi des erreurs ANR et plantages Play Console |
| BigQuery | Export pour tableaux de bord et analyses personnalisés |
| Cloud Logging | Journalisation centralisée |
| Jira | Création automatique de tickets |
| Slack | Notifications de problèmes |

## Parcours de démarrage

1. **Associer** l'application via la console Firebase
2. **Intégrer le SDK** Crashlytics (Swift Package Manager, Gradle ou Pub)
3. **Forcer un plantage** de test pour vérifier l'intégration
4. **Consulter** les rapports dans la console Firebase
5. **(Optionnel)** Ajouter des journaux, clés et erreurs non fatales personnalisés
6. **(Optionnel)** Configurer l'export vers BigQuery

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/crashlytics?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/crashlytics/get-started?platform=ios&hl=fr)
- [Guide Android](https://firebase.google.com/docs/crashlytics/get-started?platform=android&hl=fr)
- [Guide Flutter](https://firebase.google.com/docs/crashlytics/get-started?platform=flutter&hl=fr)
- [Personnalisation des rapports](https://firebase.google.com/docs/crashlytics/customize-crash-reports?hl=fr)
- [Export BigQuery](https://firebase.google.com/docs/crashlytics/bigquery-export?hl=fr)
