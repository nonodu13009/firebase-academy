# Niveau 5 - En ligne

## Table des Matières

- [Objectif](#objectif)
- [Le déploiement en 2 minutes](#le-déploiement-en-2-minutes)
- [Étape 1 - Préparer l'app pour la production](#étape-1---préparer-lapp-pour-la-production)
- [Étape 2 - Déployer sur Firebase Hosting](#étape-2---déployer-sur-firebase-hosting)
- [Étape 3 - Déployer les Cloud Functions](#étape-3---déployer-les-cloud-functions)
- [Étape 4 - Domaine personnalisé](#étape-4---domaine-personnalisé)
- [Étape 5 - Previews automatiques avec GitHub](#étape-5---previews-automatiques-avec-github)
- [Étape 6 - Checklist de mise en production](#étape-6---checklist-de-mise-en-production)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

À la fin de ce niveau, tu auras :

- NoteFlow en ligne, accessible par n'importe qui
- Un domaine personnalisé (optionnel)
- Le déploiement automatisé via GitHub
- Une checklist de production validée

## Le déploiement en 2 minutes

Déployer, c'est passer de "ça marche sur mon ordi" à "ça marche pour tout le monde".

Avec Firebase, c'est une commande :

```bash
firebase deploy
```

Ça déploie tout en même temps :

- Le site web (Hosting)
- Les règles de sécurité (Firestore + Storage)
- Les Cloud Functions
- Les index Firestore

Firebase gère le SSL (HTTPS), le CDN mondial, et le scaling automatique.

## Étape 1 - Préparer l'app pour la production

### Variables d'environnement

Vérifie que ton `.env.local` contient les bonnes valeurs de production (celles de la console Firebase, pas de l'émulateur).

### Désactiver les émulateurs en production

Dans `src/lib/firebase.ts`, vérifie que les émulateurs ne sont actifs qu'en dev :

```typescript
if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}
```

### Build Next.js

```bash
npm run build
```

Corrige les erreurs si le build échoue. Un build qui passe = une app déployable.

### Choix du mode de déploiement

| Mode | Quand l'utiliser | Commande |
| ---- | ---------------- | -------- |
| Export statique | App sans SSR (client-side only) | `next export` puis Hosting |
| App Hosting | App avec SSR (recommandé pour Next.js) | Automatique via Git |
| Hosting + Functions | SSR via Cloud Functions (ancien mode) | Config manuelle |

Pour NoteFlow, le plus simple est l'**export statique** (notre app est 100% client-side avec Firebase) ou **App Hosting** si tu veux du SSR.

## Étape 2 - Déployer sur Firebase Hosting

### Option A : Export statique (simple)

Dans `next.config.ts` :

```typescript
const nextConfig = {
  output: "export",
};

export default nextConfig;
```

Build et déploie :

```bash
npm run build
firebase deploy --only hosting
```

### Option B : App Hosting (SSR)

1. Console Firebase > **App Hosting**
2. Connecte ton dépôt GitHub
3. Choisis la branche `main`
4. Firebase détecte automatiquement Next.js
5. Chaque push sur `main` = déploiement automatique

## Étape 3 - Déployer les Cloud Functions

```bash
# Compile les fonctions
cd functions && npm run build && cd ..

# Déploie les fonctions
firebase deploy --only functions
```

Pour déployer une fonction spécifique :

```bash
firebase deploy --only functions:compterMesNotes
```

### Vérifier le déploiement

1. Console Firebase > **Functions**
2. Tu vois la liste de tes fonctions déployées
3. Chaque fonction a son URL, ses logs, ses métriques

## Étape 4 - Domaine personnalisé

### Ajouter un domaine

1. Console Firebase > **Hosting** > **Domaines personnalisés**
2. Clique **Ajouter un domaine personnalisé**
3. Entre ton domaine (ex: `noteflow.app`)
4. Firebase te donne des enregistrements DNS à configurer
5. Ajoute ces enregistrements chez ton registrar (OVH, Namecheap, Google Domains...)
6. Attends la propagation DNS (quelques minutes à 48h)

### SSL automatique

Firebase provisionne automatiquement un certificat SSL. Ton site est accessible en HTTPS sans aucune configuration.

## Étape 5 - Previews automatiques avec GitHub

### Configurer les previews

```bash
firebase init hosting:github
```

Firebase te demande :

- Le dépôt GitHub (`ton-username/noteflow`)
- La branche de production (`main`)
- Créer un workflow GitHub Actions pour les pull requests

### Comment ça marche

1. Tu crées une branche et une Pull Request
2. GitHub Actions build l'app et la déploie sur une URL de preview
3. L'URL apparaît en commentaire dans la PR
4. Tu (ou ton équipe) testez sur cette URL
5. Tu merges la PR, le déploiement de production se fait automatiquement

### Résultat

```
Pull Request #12 → preview-noteflow--pr12-abc123.web.app
Merge sur main   → noteflow.web.app (production)
```

## Étape 6 - Checklist de mise en production

Avant de considérer ton app comme "en production", vérifie chaque point :

### Sécurité

- [ ] Les règles Firestore sont en mode production (pas mode test)
- [ ] Les règles Storage sont en mode production
- [ ] Les variables d'environnement sont correctes
- [ ] Pas de secrets dans le code source
- [ ] Les émulateurs sont désactivés en prod

### Données

- [ ] Les index Firestore nécessaires sont créés
- [ ] Les backups sont configurés (plan Blaze)

### Authentification

- [ ] Les domaines autorisés sont configurés (console > Auth > Settings)
- [ ] Les fournisseurs de connexion sont activés

### Performance

- [ ] Le build Next.js passe sans erreur
- [ ] Les images sont optimisées
- [ ] Le cache est configuré dans `firebase.json`

### Monitoring

- [ ] Google Analytics est activé
- [ ] Les alertes budget sont configurées (console Google Cloud)

### Configuration `firebase.json` finale

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|jpg|jpeg|gif|png|svg|ico|webp|woff2)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "functions": {
    "source": "functions",
    "predeploy": ["npm --prefix \"$RESOURCE_DIR\" run build"]
  }
}
```

## Ce que tu sais faire maintenant

- Déployer une app Next.js sur Firebase Hosting
- Déployer les Cloud Functions
- Configurer un domaine personnalisé avec SSL
- Mettre en place les previews automatiques via GitHub
- Valider une checklist de production

### Commandes à retenir

| Commande | Ce que ça fait |
| -------- | -------------- |
| `firebase deploy` | Déploie tout |
| `firebase deploy --only hosting` | Déploie le site uniquement |
| `firebase deploy --only functions` | Déploie les fonctions uniquement |
| `firebase deploy --only firestore:rules` | Déploie les règles Firestore |
| `firebase hosting:channel:deploy preview` | Crée une URL de preview |

---

> Passe au [Niveau 6 - Niveau pro](niveau-6-pro.md) pour ajouter analytics, config à distance et IA.
