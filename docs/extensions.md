# Firebase Extensions

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Extensions officielles](#extensions-officielles)
- [Installation et gestion](#installation-et-gestion)
- [Publier une extension](#publier-une-extension)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Les Firebase Extensions sont des packages de code préconstruits qui ajoutent des fonctionnalités à vos applications Firebase en quelques clics. Elles automatisent des tâches courantes et s'intègrent avec les services Firebase et les API tierces.

Chaque extension effectue une tâche spécifique ou un ensemble de tâches en réponse à des requêtes HTTPS ou à des événements Firebase (Firestore, Authentication, Storage, etc.).

## Extensions officielles

| Extension | Description |
| --------- | ----------- |
| Envoi d'emails déclenché | Envoie des emails via un modèle à partir d'un document Firestore |
| Suppression de données utilisateur | Supprime automatiquement les données d'un utilisateur quand il est supprimé |
| Génération de bundles Firestore | Crée des bundles de données Firestore pour un chargement rapide |
| Redimensionnement d'images | Redimensionne automatiquement les images uploadées dans Storage |
| Export vers BigQuery | Exporte les données d'une collection Firestore vers BigQuery |
| Traduction de texte | Traduit automatiquement les chaînes de texte dans Firestore |
| Compteurs distribués | Gère des compteurs distribués à haute performance dans Firestore |
| Raccourcissement d'URL | Raccourcit les URLs stockées dans Firestore via Bitly |
| Limitation des nœuds DB | Limite le nombre de nœuds enfants dans Realtime Database |

## Installation et gestion

### Installation

1. Parcourez le catalogue d'extensions dans la console Firebase
2. Sélectionnez une extension et configurez les paramètres
3. L'extension déploie automatiquement les Cloud Functions nécessaires

### Gestion

- **Mise à jour** : recevez des notifications quand une nouvelle version est disponible
- **Reconfiguration** : modifiez les paramètres sans réinstaller
- **Désinstallation** : supprimez l'extension et ses ressources
- **Manifest** : gérez les extensions via un fichier de configuration

### Permissions

Chaque extension reçoit un compte de service dédié avec les permissions minimales nécessaires à son fonctionnement.

## Publier une extension

### Processus de publication

1. **Développer** les fonctions Cloud Functions de l'extension
2. **Configurer** les paramètres et options
3. **Documenter** l'extension (PREINSTALL.md, POSTINSTALL.md)
4. **Gérer** les événements de cycle de vie (installation, mise à jour, désinstallation)
5. **Implémenter** les hooks utilisateur si nécessaire
6. **Publier** sur le catalogue Firebase Extensions

### Fichier extension.yaml

Le fichier `extension.yaml` définit la configuration de l'extension : nom, version, description, paramètres, ressources déployées et permissions requises.

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/extensions?hl=fr)
- [Catalogue d'extensions](https://extensions.dev?hl=fr)
- [Guide d'installation](https://firebase.google.com/docs/extensions/install-extensions?hl=fr)
- [Guide de publication](https://firebase.google.com/docs/extensions/publishers?hl=fr)
