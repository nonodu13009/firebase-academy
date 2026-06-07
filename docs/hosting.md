# Firebase Hosting

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Configuration](#configuration)
- [Déploiement](#déploiement)
- [Contenu dynamique](#contenu-dynamique)
- [Frameworks supportés](#frameworks-supportés)
- [Domaines personnalisés](#domaines-personnalisés)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase Hosting est un service d'hébergement de contenu web de qualité production pour les développeurs. En une seule commande, vous pouvez déployer rapidement des applications web et servir du contenu statique et dynamique sur un CDN (réseau de diffusion de contenu) mondial.

Firebase Hosting offre un hébergement rapide et sécurisé avec certificat SSL provisionné automatiquement.

## Fonctionnalités clés

- **CDN mondial** : contenu distribué sur des serveurs edge dans le monde entier
- **SSL automatique** : certificats HTTPS provisionnés et renouvelés automatiquement
- **Déploiement en une commande** : `firebase deploy` depuis la CLI
- **Rollback instantané** : revenir à une version précédente en un clic
- **URLs de prévisualisation** : tester avant la mise en production
- **Intégration GitHub** : déploiement automatique via les pull requests
- **Contenu dynamique** : intégration Cloud Functions et Cloud Run
- **Multi-sites** : héberger plusieurs sites sur un même projet Firebase

## Configuration

### Fichier `firebase.json`

Le fichier `firebase.json` configure le comportement d'hébergement :

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Options de configuration

- **public** : répertoire contenant les fichiers à déployer
- **ignore** : fichiers à exclure du déploiement
- **rewrites** : règles de réécriture d'URL (SPA, Cloud Functions, Cloud Run)
- **redirects** : redirections HTTP (301, 302)
- **headers** : en-têtes HTTP personnalisés
- **i18n** : réécritures basées sur la langue

## Déploiement

### Commandes de base

```bash
# Déployer le site
firebase deploy --only hosting

# Prévisualiser sur un canal
firebase hosting:channel:deploy preview

# Déployer sur un site spécifique (multi-sites)
firebase deploy --only hosting:monsite
```

### Canaux de prévisualisation

Créez des URLs de prévisualisation temporaires pour tester avant la mise en production :

```bash
firebase hosting:channel:deploy preview --expires 7d
```

### Intégration GitHub

Configurez le déploiement automatique via les pull requests GitHub pour des previews automatiques et un déploiement sur merge.

## Contenu dynamique

### Cloud Functions

Servez du contenu dynamique via Cloud Functions :

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"
      }
    ]
  }
}
```

### Cloud Run

Redirigez vers des conteneurs Cloud Run :

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "/app/**",
        "run": {
          "serviceId": "mon-service",
          "region": "europe-west1"
        }
      }
    ]
  }
}
```

## Frameworks supportés

Firebase Hosting supporte le déploiement de frameworks web modernes :

- Angular
- Next.js
- Flutter Web
- Express.js
- Autres frameworks via la configuration personnalisée

## Domaines personnalisés

- Connectez votre propre domaine à Firebase Hosting
- SSL automatique pour les domaines personnalisés
- Support des sous-domaines
- Gestion DNS simplifiée

## Parcours de démarrage

1. **Installer** Firebase CLI : `npm install -g firebase-tools`
2. **Se connecter** : `firebase login`
3. **Initialiser** : `firebase init hosting`
4. **Configurer** le répertoire public et les options
5. **Tester** localement : `firebase serve`
6. **Déployer** : `firebase deploy --only hosting`
7. **(Optionnel)** Configurer un domaine personnalisé

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/hosting?hl=fr)
- [Premiers pas](https://firebase.google.com/docs/hosting/quickstart?hl=fr)
- [Configuration](https://firebase.google.com/docs/hosting/full-config?hl=fr)
- [Contenu dynamique](https://firebase.google.com/docs/hosting/serverless-overview?hl=fr)
- [Domaines personnalisés](https://firebase.google.com/docs/hosting/custom-domain?hl=fr)
- [Quotas et tarification](https://firebase.google.com/docs/hosting/usage-quotas-pricing?hl=fr)
