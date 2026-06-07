# Firebase Performance Monitoring

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Mesures automatiques](#mesures-automatiques)
- [Traces personnalisées](#traces-personnalisées)
- [Attributs et segmentation](#attributs-et-segmentation)
- [Alertes](#alertes)
- [Protection des données](#protection-des-données)
- [Plateformes supportées](#plateformes-supportées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Performance Monitoring est un service permettant d'obtenir des informations sur les caractéristiques de performances de vos applications. Le SDK collecte automatiquement les données de performances, que vous pouvez examiner et analyser dans la console Firebase.

Lorsque vous intégrez le SDK, vous n'avez pas besoin d'écrire du code avant que votre application ne commence à surveiller automatiquement les aspects cruciaux des performances.

## Mesures automatiques

### Applications natives (iOS/Android)

- **Temps de démarrage** : durée entre le lancement et l'affichage du premier écran
- **Affichage à l'écran** : temps de rendu des écrans
- **Traces premier plan/arrière-plan** : temps passé dans chaque état

### Applications Web

- **First Contentful Paint** : temps avant le premier affichage de contenu
- **Interactivité** : temps avant que la page soit interactive
- **Chargement de page** : temps de chargement complet

### Tous les types d'applications

- **Requêtes réseau HTTP/S** : temps de réponse, taille des payloads, taux de succès

## Traces personnalisées

Une trace est un rapport contenant des données capturées entre deux moments dans votre application. Vous pouvez instrumenter des traces de code personnalisées pour capturer les performances dans des situations spécifiques.

### Exemple Web

```javascript
import { trace } from "firebase/performance";

const t = trace(perf, "custom_trace");
t.start();

// ... code à mesurer ...

t.putMetric("item_count", 42);
t.stop();
```

### Métriques personnalisées

Ajoutez des compteurs et des métriques aux traces pour suivre des événements spécifiques à votre application (nombre d'éléments chargés, temps de calcul, etc.).

## Attributs et segmentation

Les métriques peuvent être filtrées et segmentées par :

| Attribut | Description |
| -------- | ----------- |
| Pays | Localisation géographique de l'utilisateur |
| Appareil | Modèle de l'appareil |
| Version d'app | Version de l'application |
| Système d'exploitation | OS et version |
| Attributs personnalisés | Valeurs ajoutées par le développeur |

## Alertes

Configurez des alertes personnalisées pour être notifié quand les performances se dégradent :

- Seuils de temps de réponse
- Taux d'erreur réseau
- Temps de démarrage anormal
- Notifications par email ou intégrations

## Protection des données

Performance Monitoring ne stocke pas de manière permanente d'informations permettant d'identifier personnellement l'utilisateur (noms, adresses email, numéros de téléphone).

Lors de la surveillance des requêtes réseau, Performance Monitoring utilise des URLs agrégées et anonymes (paramètres d'URL exclus) pour créer des formats d'URL.

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)

## Parcours de démarrage

1. **Ajouter le SDK** Performance Monitoring à votre application
2. **Vérifier** la collecte automatique dans la console (données visibles sous ~12h)
3. **(Optionnel)** Instrumenter des traces personnalisées
4. **(Optionnel)** Ajouter des métriques et attributs personnalisés
5. **Configurer** des alertes de performance
6. **Analyser** les données dans la console Firebase

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/perf-mon?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/perf-mon/get-started-ios?hl=fr)
- [Guide Android](https://firebase.google.com/docs/perf-mon/get-started-android?hl=fr)
- [Guide Web](https://firebase.google.com/docs/perf-mon/get-started-web?hl=fr)
- [Traces personnalisées](https://firebase.google.com/docs/perf-mon/custom-code-traces?hl=fr)
