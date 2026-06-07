# Niveau 5 - En ligne

## Table des Matières

- [Objectif](#objectif)
- [Le deploiement en 2 minutes](#le-deploiement-en-2-minutes)
- [Etape 1 - Preparer l'app pour la production](#etape-1---preparer-lapp-pour-la-production)
- [Etape 2 - Deployer sur Firebase Hosting](#etape-2---deployer-sur-firebase-hosting)
- [Etape 3 - Deployer les Cloud Functions](#etape-3---deployer-les-cloud-functions)
- [Etape 4 - Domaine personnalise](#etape-4---domaine-personnalise)
- [Etape 5 - Previews automatiques avec GitHub](#etape-5---previews-automatiques-avec-github)
- [Etape 6 - Checklist de mise en production](#etape-6---checklist-de-mise-en-production)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

A la fin de ce niveau, tu auras :

- NoteFlow en ligne, accessible par n'importe qui
- Un domaine personnalise (optionnel)
- Le deploiement automatise via GitHub
- Une checklist de production validee

## Le deploiement en 2 minutes

Deployer, c'est passer de "ca marche sur mon ordi" a "ca marche pour tout le monde".

Avec Firebase, c'est une commande :

```bash
firebase deploy
```

Ca deploie tout en meme temps :

- Le site web (Hosting)
- Les regles de securite (Firestore + Storage)
- Les Cloud Functions
- Les index Firestore

Firebase gere le SSL (HTTPS), le CDN mondial, et le scaling automatique.

## Etape 1 - Preparer l'app pour la production

### Variables d'environnement

Verifie que ton `.env.local` contient les bonnes valeurs de production (celles de la console Firebase, pas de l'emulateur).

### Desactiver les emulateurs en production

Dans `src/lib/firebase.ts`, verifie que les emulateurs ne sont actifs qu'en dev :

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

Corrige les erreurs si le build echoue. Un build qui passe = une app deployable.

### Choix du mode de deploiement

| Mode | Quand l'utiliser | Commande |
| ---- | ---------------- | -------- |
| Export statique | App sans SSR (client-side only) | `next export` puis Hosting |
| App Hosting | App avec SSR (recommande pour Next.js) | Automatique via Git |
| Hosting + Functions | SSR via Cloud Functions (ancien mode) | Config manuelle |

Pour NoteFlow, le plus simple est l'**export statique** (notre app est 100% client-side avec Firebase) ou **App Hosting** si tu veux du SSR.

## Etape 2 - Deployer sur Firebase Hosting

### Option A : Export statique (simple)

Dans `next.config.ts` :

```typescript
const nextConfig = {
  output: "export",
};

export default nextConfig;
```

Build et deploie :

```bash
npm run build
firebase deploy --only hosting
```

### Option B : App Hosting (SSR)

1. Console Firebase > **App Hosting**
2. Connecte ton depot GitHub
3. Choisis la branche `main`
4. Firebase detecte automatiquement Next.js
5. Chaque push sur `main` = deploiement automatique

## Etape 3 - Deployer les Cloud Functions

```bash
# Compile les fonctions
cd functions && npm run build && cd ..

# Deploie les fonctions
firebase deploy --only functions
```

Pour deployer une fonction specifique :

```bash
firebase deploy --only functions:compterMesNotes
```

### Verifier le deploiement

1. Console Firebase > **Functions**
2. Tu vois la liste de tes fonctions deployees
3. Chaque fonction a son URL, ses logs, ses metriques

## Etape 4 - Domaine personnalise

### Ajouter un domaine

1. Console Firebase > **Hosting** > **Domaines personnalises**
2. Clique **Ajouter un domaine personnalise**
3. Entre ton domaine (ex: `noteflow.app`)
4. Firebase te donne des enregistrements DNS a configurer
5. Ajoute ces enregistrements chez ton registrar (OVH, Namecheap, Google Domains...)
6. Attends la propagation DNS (quelques minutes a 48h)

### SSL automatique

Firebase provisionne automatiquement un certificat SSL. Ton site est accessible en HTTPS sans aucune configuration.

## Etape 5 - Previews automatiques avec GitHub

### Configurer les previews

```bash
firebase init hosting:github
```

Firebase te demande :

- Le depot GitHub (`ton-username/noteflow`)
- La branche de production (`main`)
- Creer un workflow GitHub Actions pour les pull requests

### Comment ca marche

1. Tu crees une branche et une Pull Request
2. GitHub Actions build l'app et la deploie sur une URL de preview
3. L'URL apparait en commentaire dans la PR
4. Tu (ou ton equipe) testez sur cette URL
5. Tu merges la PR, le deploiement de production se fait automatiquement

### Resultat

```
Pull Request #12 → preview-noteflow--pr12-abc123.web.app
Merge sur main   → noteflow.web.app (production)
```

## Etape 6 - Checklist de mise en production

Avant de considerer ton app comme "en production", verifie chaque point :

### Securite

- [ ] Les regles Firestore sont en mode production (pas mode test)
- [ ] Les regles Storage sont en mode production
- [ ] Les variables d'environnement sont correctes
- [ ] Pas de secrets dans le code source
- [ ] Les emulateurs sont desactives en prod

### Donnees

- [ ] Les index Firestore necessaires sont crees
- [ ] Les backups sont configures (plan Blaze)

### Authentification

- [ ] Les domaines autorises sont configures (console > Auth > Settings)
- [ ] Les fournisseurs de connexion sont actives

### Performance

- [ ] Le build Next.js passe sans erreur
- [ ] Les images sont optimisees
- [ ] Le cache est configure dans `firebase.json`

### Monitoring

- [ ] Google Analytics est active
- [ ] Les alertes budget sont configurees (console Google Cloud)

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

- Deployer une app Next.js sur Firebase Hosting
- Deployer les Cloud Functions
- Configurer un domaine personnalise avec SSL
- Mettre en place les previews automatiques via GitHub
- Valider une checklist de production

### Commandes a retenir

| Commande | Ce que ca fait |
| -------- | -------------- |
| `firebase deploy` | Deploie tout |
| `firebase deploy --only hosting` | Deploie le site uniquement |
| `firebase deploy --only functions` | Deploie les fonctions uniquement |
| `firebase deploy --only firestore:rules` | Deploie les regles Firestore |
| `firebase hosting:channel:deploy preview` | Cree une URL de preview |

---

> Passe au [Niveau 6 - Niveau pro](niveau-6-pro.md) pour ajouter analytics, config a distance et IA.
