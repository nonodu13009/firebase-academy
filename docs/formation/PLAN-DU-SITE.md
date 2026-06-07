# Plan du site - Formation Firebase

## Table des Matières

- [Vision du projet](#vision-du-projet)
- [Arborescence des pages](#arborescence-des-pages)
- [Navigation](#navigation)
- [Page par page - Detail complet](#page-par-page---detail-complet)
- [Composants globaux](#composants-globaux)
- [Glossaire interactif - Specification](#glossaire-interactif---specification)
- [Systeme de progression](#systeme-de-progression)
- [Contenu et ressources](#contenu-et-ressources)
- [Design et UX](#design-et-ux)
- [Stack technique](#stack-technique)
- [Structure des fichiers](#structure-des-fichiers)

---

## Vision du projet

**Nom** : Firebase Academy (ou nom a definir)

**Pitch** : Un site de formation Firebase interactif, progressif et accessible. L'apprenant part de zero et arrive a maitriser Firebase en construisant une vraie app (NoteFlow) niveau par niveau.

**Principe cle** : aucun mot technique ne reste sans explication. Au survol, chaque terme est defini. Au clic, on approfondit.

**Public** : developpeur debutant/junior, francophone, qui connait les bases de JavaScript/React mais pas Firebase.

**Ton** : direct, pedagogique, pas de jargon. Tutoiement. Phrases courtes.

---

## Arborescence des pages

```
/                                 → Page d'accueil
/formation                        → Vue d'ensemble de la formation (les 7 niveaux)
/formation/niveau-0               → Niveau 0 - Decouverte
/formation/niveau-1               → Niveau 1 - Les donnees
/formation/niveau-2               → Niveau 2 - Les utilisateurs
/formation/niveau-3               → Niveau 3 - La securite
/formation/niveau-4               → Niveau 4 - Les fichiers et le backend
/formation/niveau-5               → Niveau 5 - En ligne
/formation/niveau-6               → Niveau 6 - Niveau pro
/glossaire                        → Glossaire complet (tous les termes)
/glossaire/[terme]                → Page dediee d'un terme (optionnel, ancre possible)
/exemples                         → Tous les produits Firebase illustres
/reference                        → Index des 24 fiches produit
/reference/[produit]              → Fiche de reference d'un produit (ex: /reference/firestore)
/a-propos                         → Qui a fait ce site, pourquoi, credits
```

---

## Navigation

### Header (fixe, toutes les pages)

```
[Logo Firebase Academy]    Formation    Glossaire    Exemples    Reference    [Barre de recherche]
```

- **Logo** : retour a l'accueil
- **Formation** : menu deroulant avec les 7 niveaux
- **Glossaire** : page du glossaire complet
- **Exemples** : page des exemples concrets
- **Reference** : menu deroulant avec les 24 fiches produit (groupees : Build / Run / IA)
- **Barre de recherche** : recherche globale (dans la formation, le glossaire, les fiches)

### Sidebar (pages formation uniquement)

Visible sur desktop, hamburger sur mobile :

```
FORMATION
├── Niveau 0 - Decouverte        [✓ ou ○]
├── Niveau 1 - Les donnees       [✓ ou ○]
├── Niveau 2 - Les utilisateurs  [✓ ou ○]
├── Niveau 3 - La securite       [✓ ou ○]
├── Niveau 4 - Backend           [✓ ou ○]
├── Niveau 5 - En ligne          [✓ ou ○]
└── Niveau 6 - Niveau pro        [✓ ou ○]

RESSOURCES
├── Glossaire
├── Exemples concrets
└── Fiches reference
```

Les coches indiquent la progression (stockee en localStorage).

### Footer

```
[Logo]
Formation Firebase - De 0 a 100
Fait avec Next.js + Firebase

Liens utiles                    Ressources
├── Documentation Firebase FR   ├── Glossaire
├── Console Firebase            ├── Exemples concrets
├── Firebase YouTube            ├── Fiches reference
├── Firebase Blog               └── GitHub du projet NoteFlow
└── Firebase Status
```

### Breadcrumb (fil d'Ariane)

Present sur toutes les pages sauf l'accueil :

```
Accueil > Formation > Niveau 2 - Les utilisateurs
Accueil > Reference > Cloud Firestore
Accueil > Glossaire
```

---

## Page par page - Detail complet

### 1. Page d'accueil `/`

**Objectif** : donner envie de commencer. Expliquer ce qu'on va apprendre en 10 secondes.

**Sections** :

1. **Hero**
   - Titre : "Apprends Firebase en construisant une vraie app"
   - Sous-titre : "De zero a la production, niveau par niveau. En francais, sans jargon."
   - Bouton CTA : "Commencer la formation" → `/formation`
   - Visuel : illustration ou screenshot de NoteFlow

2. **Ce que tu vas construire**
   - Screenshot/mockup de NoteFlow
   - Liste des fonctionnalites (auth, CRUD, upload, deploiement, IA)
   - Stack affiche : Next.js + TypeScript + Tailwind + Firebase

3. **Les 7 niveaux en un coup d'oeil**
   - Timeline visuelle verticale avec les 7 niveaux
   - Chaque niveau : icone + titre + description en 1 ligne
   - Estimation du temps par niveau (optionnel)

4. **3 piliers du site**
   - Carte 1 : "Formation progressive" - 7 niveaux, un projet fil rouge
   - Carte 2 : "Aucun mot incompris" - glossaire interactif, tout est explique
   - Carte 3 : "Exemples du monde reel" - chaque feature illustree concretement

5. **Prerequis**
   - Liste simple (JS/TS bases, React, Node.js, compte Google)
   - Message : "Pas besoin de connaitre Firebase"

6. **CTA final**
   - "Pret a commencer ?" + bouton → `/formation/niveau-0`

---

### 2. Vue d'ensemble formation `/formation`

**Objectif** : vue panoramique de la formation. Savoir ou on en est.

**Sections** :

1. **Le projet NoteFlow**
   - Description courte
   - Stack technique
   - Screenshot final de l'app

2. **Les 7 niveaux - Cartes cliquables**
   - Chaque carte contient :
     - Numero du niveau
     - Titre
     - Description (2 lignes max)
     - Liste des produits Firebase couverts (icones)
     - Indicateur de progression (pas commence / en cours / termine)
   - Clic → page du niveau

3. **Ressources complementaires**
   - Lien vers le glossaire
   - Lien vers les exemples concrets
   - Lien vers les fiches reference

---

### 3. Pages de niveau `/formation/niveau-[0-6]`

**Objectif** : le coeur de la formation. Chaque page = un tutoriel complet.

**Layout** :

```
[Sidebar gauche]        [Contenu principal]          [TOC droite]
Navigation des          Le tutoriel                  Table des matieres
niveaux + ressources    (texte + code + schemas)     du niveau en cours
```

**Contenu principal** :

1. **En-tete du niveau**
   - Numero + titre ("Niveau 2 - Les utilisateurs")
   - Badge des produits Firebase couverts
   - "Ce que tu sauras faire a la fin" (3-4 bullets)

2. **Corps du tutoriel**
   - Sections avec titres clairs (H2, H3)
   - Blocs de code avec coloration syntaxique + bouton copier
   - Les termes techniques sont des `<GlossaryTerm>` (voir spec glossaire)
   - Tableaux recapitulatifs
   - Callouts (info, attention, astuce) :
     - Info (bleu) : complements d'information
     - Attention (orange) : pieges courants
     - Astuce (vert) : raccourcis et bonnes pratiques

3. **Resume de fin**
   - "Ce que tu sais faire maintenant" (checklist)
   - Tableau des concepts cles
   - Boutons : "Niveau precedent" ← → "Niveau suivant"

**Table des matieres (droite, desktop)** :

- Liste des H2/H3 du niveau en cours
- Surlignage de la section visible (scroll spy)
- Fixe au scroll

**Navigation inter-niveaux (bas de page)** :

```
← Niveau 1 - Les donnees        Niveau 3 - La securite →
```

---

### 4. Page glossaire `/glossaire`

**Objectif** : dictionnaire de tous les termes techniques, cherchable et filtrable.

**Sections** :

1. **Barre de recherche**
   - Recherche instantanee (filtre en temps reel)
   - Placeholder : "Chercher un terme... (ex: API, SDK, NoSQL)"

2. **Navigation alphabetique**
   - Barre de lettres cliquables : A B C D E F G H I J K L M N O P Q R S T U V W
   - Scroll vers la lettre cliquee

3. **Liste des termes**
   - Chaque terme :
     - **Mot** en gras
     - Explication en 2-3 phrases simples
     - Lien "Rechercher sur le web" → ouvre Google dans un nouvel onglet
     - Lien "Voir dans la formation" → ancre vers le niveau ou le terme est utilise (si applicable)

4. **Stats**
   - "X termes dans le glossaire"

---

### 5. Page exemples `/exemples`

**Objectif** : chaque produit Firebase illustre avec des exemples du monde reel.

**Sections** :

1. **Filtre par categorie**
   - Boutons : Tous | Build | Run | IA

2. **Cartes produit**
   - Chaque carte :
     - Icone du produit
     - Nom du produit
     - Brief en 1 phrase ("C'est quoi en vrai")
     - 2-3 exemples concrets avec icones (Netflix, Uber, Spotify...)
     - Lien vers la fiche reference complete
     - Lien vers le niveau de formation ou c'est utilise

---

### 6. Index reference `/reference`

**Objectif** : acces aux 24 fiches techniques detaillees.

**Sections** :

1. **Filtre par categorie**
   - Build (12 produits) | Run (10 produits) | IA (1 produit)

2. **Grille de cartes**
   - Chaque carte :
     - Icone
     - Nom du produit
     - Description 1 ligne
     - Clic → `/reference/[produit]`

---

### 7. Fiche reference `/reference/[produit]`

**Objectif** : documentation complete d'un produit Firebase.

**Contenu** : le contenu des 24 fichiers `.md` du dossier `docs/` (authentication.md, firestore.md, etc.)

**Layout** : meme layout que les pages de formation (sidebar + contenu + TOC droite)

**Elements supplementaires** :

- Lien vers la doc officielle Firebase (en francais)
- Lien vers le niveau de formation correspondant
- Lien vers les exemples concrets du produit
- Termes techniques avec glossaire interactif

---

### 8. Page a propos `/a-propos`

**Contenu** :

- Qui a fait ce site et pourquoi
- Stack utilisee
- Credits (Firebase, Google, etc.)
- Lien vers le GitHub du projet

---

## Composants globaux

### `<CodeBlock>`

Bloc de code avec :

- Coloration syntaxique (TypeScript, JSON, bash, Firestore rules)
- Bouton "Copier" en haut a droite
- Nom du fichier affiche si fourni (ex: `src/lib/firebase.ts`)
- Numero de lignes (optionnel)

### `<GlossaryTerm>`

Le composant cle du site. Englobe chaque mot technique dans le contenu.

```jsx
<GlossaryTerm term="API">API</GlossaryTerm>
```

Comportement detaille dans la section suivante.

### `<Callout type="info|warning|tip">`

Encadre colore pour les remarques :

- `info` (bleu) : complement d'information
- `warning` (orange) : attention, piege courant
- `tip` (vert) : astuce, raccourci

```
┌─ 💡 Astuce ────────────────────────────┐
│ Tu peux tester tes regles dans         │
│ l'emulateur avant de deployer.         │
└────────────────────────────────────────┘
```

### `<ProductBadge>`

Pastille avec l'icone et le nom d'un produit Firebase. Cliquable → fiche reference.

```
[🔥 Firestore]  [🔐 Authentication]  [📦 Storage]
```

### `<LevelCard>`

Carte de niveau sur la page formation :

```
┌──────────────────────────────────┐
│  0                               │
│  Decouverte                      │
│  Ton premier projet Firebase     │
│  [Console] [CLI] [Emulateur]     │
│                        ○ A faire │
└──────────────────────────────────┘
```

### `<NavigationLevel>`

Navigation precedent/suivant en bas de chaque page de formation :

```
┌──────────────────────────────────────────────┐
│  ← Niveau 1 - Les donnees                   │
│                    Niveau 3 - La securite →  │
└──────────────────────────────────────────────┘
```

### `<SearchBar>`

Barre de recherche globale :

- Recherche dans les titres de niveaux, les termes du glossaire, les noms de produits
- Resultats groupes par categorie (Formation / Glossaire / Reference)
- Raccourci clavier : `Ctrl+K` ou `Cmd+K` pour ouvrir

### `<ProgressBar>`

Barre de progression globale affichee sur les pages de formation :

```
Progression : ████████░░░░ 4/7 niveaux
```

### `<TableOfContents>`

Table des matieres laterale (droite) :

- Generee automatiquement depuis les H2/H3 de la page
- Scroll spy : surligne la section visible
- Fixe au scroll (sticky)
- Masquee sur mobile

### `<BackToTop>`

Bouton flottant "Retour en haut" qui apparait apres un scroll de 300px.

---

## Glossaire interactif - Specification

C'est la feature centrale du site. Voici le comportement detaille.

### Dans le contenu

Chaque terme technique est entoure d'un composant `<GlossaryTerm>` :

```
Tu vas utiliser <GlossaryTerm term="Firestore">Firestore</GlossaryTerm>
pour stocker tes donnees dans une <GlossaryTerm term="collection">collection</GlossaryTerm>.
```

### Apparence dans le texte

Le mot est affiche avec :

- Un soulignement pointille (pas plein, pour ne pas confondre avec un lien classique)
- Une couleur legerement differente du texte normal (ex: bleu fonce ou couleur d'accent)
- Un curseur `help` au survol (le point d'interrogation)

```css
.glossary-term {
  border-bottom: 1px dashed currentColor;
  cursor: help;
  color: var(--color-accent);
}
```

### Au survol (hover) - Tooltip

Un tooltip apparait au-dessus ou en dessous du mot :

```
┌─────────────────────────────────────────────┐
│  Firestore                                  │
│                                             │
│  La base de donnees NoSQL de Firebase.      │
│  Stocke des donnees sous forme de           │
│  documents dans des collections. Se         │
│  synchronise en temps reel.                 │
│                                             │
│  🔗 Rechercher sur le web                   │
│  📖 Voir la fiche reference                 │
└─────────────────────────────────────────────┘
```

**Contenu du tooltip** :

1. Titre du terme en gras
2. Definition courte (2-3 phrases, issues du glossaire.md)
3. Lien "Rechercher sur le web" → ouvre Google dans un nouvel onglet
4. Lien "Voir la fiche reference" → lien interne vers `/reference/[produit]` ou `/glossaire#[terme]`

**Comportement** :

- Apparait apres 300ms de survol (evite les ouvertures accidentelles)
- Reste visible tant que la souris est sur le mot OU sur le tooltip
- Disparait apres 200ms quand la souris quitte le mot et le tooltip
- Sur mobile : apparait au tap, se ferme au tap ailleurs
- Position : au-dessus par defaut, en dessous si pas de place
- Largeur max : 320px
- Z-index eleve (au-dessus de tout)

### Au clic

Deux options au clic sur le mot :

- **Sur desktop** : ouvre le tooltip (meme comportement que hover, mais persiste)
- **Sur le lien "Rechercher"** : ouvre Google dans un nouvel onglet avec la recherche pre-remplie
- **Sur le lien "Voir la fiche"** : navigue vers la page de reference ou le glossaire

### Donnees du glossaire

Les definitions sont stockees dans un fichier JSON charge une seule fois :

```typescript
// glossary-data.ts
export const glossary: Record<string, GlossaryEntry> = {
  "API": {
    term: "API",
    fullTerm: "Application Programming Interface",
    definition: "Un guichet. Ton app envoie une demande...",
    searchUrl: "https://www.google.com/search?q=API+c%27est+quoi",
    referenceLink: null,
    formationLevel: null,
  },
  "Firestore": {
    term: "Firestore",
    fullTerm: "Cloud Firestore",
    definition: "La base de donnees NoSQL de Firebase...",
    searchUrl: "https://www.google.com/search?q=Cloud+Firestore+c%27est+quoi",
    referenceLink: "/reference/firestore",
    formationLevel: "/formation/niveau-1",
  },
  // ... ~80 termes
};
```

---

## Systeme de progression

### Stockage

La progression est stockee en **localStorage** (pas de backend necessaire) :

```typescript
{
  "firebase-academy-progress": {
    "niveau-0": "completed",   // "not-started" | "in-progress" | "completed"
    "niveau-1": "completed",
    "niveau-2": "in-progress",
    "niveau-3": "not-started",
    "niveau-4": "not-started",
    "niveau-5": "not-started",
    "niveau-6": "not-started",
    "lastVisited": "/formation/niveau-2",
    "startedAt": "2026-06-07"
  }
}
```

### Marquage de progression

- Quand l'utilisateur ouvre un niveau pour la premiere fois → `in-progress`
- En bas de chaque niveau, un bouton "Marquer comme termine" → `completed`
- La sidebar et la page `/formation` refletent l'etat

### Affichage

- Sidebar : icone par niveau (○ pas commence, ◐ en cours, ✓ termine)
- Page formation : barre de progression + etat sur chaque carte
- Accueil : "Reprendre ou tu en etais" si progression existante

---

## Contenu et ressources

### Liens externes utilises dans le site

**Documentation Firebase officielle**

| Lien | URL |
| ---- | --- |
| Documentation Firebase FR | https://firebase.google.com/docs?hl=fr |
| Console Firebase | https://console.firebase.google.com |
| Firebase YouTube | https://www.youtube.com/@firebase |
| Firebase Blog | https://firebase.blog |
| Firebase Status | https://status.firebase.google.com |
| Firebase Pricing | https://firebase.google.com/pricing?hl=fr |
| Firebase Extensions Hub | https://extensions.dev |

**Documentation Firebase par produit**

| Produit | URL |
| ------- | --- |
| Authentication | https://firebase.google.com/docs/auth?hl=fr |
| Firestore | https://firebase.google.com/docs/firestore?hl=fr |
| Realtime Database | https://firebase.google.com/docs/database?hl=fr |
| Cloud Storage | https://firebase.google.com/docs/storage?hl=fr |
| Cloud Functions | https://firebase.google.com/docs/functions?hl=fr |
| Hosting | https://firebase.google.com/docs/hosting?hl=fr |
| App Hosting | https://firebase.google.com/docs/app-hosting?hl=fr |
| App Check | https://firebase.google.com/docs/app-check?hl=fr |
| Security Rules | https://firebase.google.com/docs/rules?hl=fr |
| Extensions | https://firebase.google.com/docs/extensions?hl=fr |
| Emulator Suite | https://firebase.google.com/docs/emulator-suite?hl=fr |
| SQL Connect | https://firebase.google.com/docs/sql-connect?hl=fr |
| Analytics | https://firebase.google.com/docs/analytics?hl=fr |
| Crashlytics | https://firebase.google.com/docs/crashlytics?hl=fr |
| Performance | https://firebase.google.com/docs/perf-mon?hl=fr |
| Remote Config | https://firebase.google.com/docs/remote-config?hl=fr |
| Cloud Messaging | https://firebase.google.com/docs/cloud-messaging?hl=fr |
| In-App Messaging | https://firebase.google.com/docs/in-app-messaging?hl=fr |
| A/B Testing | https://firebase.google.com/docs/ab-testing?hl=fr |
| App Distribution | https://firebase.google.com/docs/app-distribution?hl=fr |
| Test Lab | https://firebase.google.com/docs/test-lab?hl=fr |
| AdMob | https://firebase.google.com/docs/admob?hl=fr |
| AI Logic | https://firebase.google.com/docs/ai-logic?hl=fr |

**Outils et librairies**

| Outil | URL |
| ----- | --- |
| Next.js | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| TypeScript | https://www.typescriptlang.org/docs |
| Firebase npm | https://www.npmjs.com/package/firebase |
| Firebase CLI npm | https://www.npmjs.com/package/firebase-tools |
| Shadcn UI | https://ui.shadcn.com |
| Lucide Icons | https://lucide.dev |

### Fichiers de contenu source

Tous les contenus du site sont deja rediges dans :

```
docs/formation/
├── 0_INDEX.md              → Page /formation
├── niveau-0-decouverte.md  → Page /formation/niveau-0
├── niveau-1-donnees.md     → Page /formation/niveau-1
├── niveau-2-utilisateurs.md→ Page /formation/niveau-2
├── niveau-3-securite.md    → Page /formation/niveau-3
├── niveau-4-backend.md     → Page /formation/niveau-4
├── niveau-5-deploiement.md → Page /formation/niveau-5
├── niveau-6-pro.md         → Page /formation/niveau-6
├── glossaire.md            → Page /glossaire + donnees des tooltips
├── exemples-concrets.md    → Page /exemples

docs/
├── 0_INDEX.md              → Page /reference
├── authentication.md       → Page /reference/authentication
├── firestore.md            → Page /reference/firestore
├── ... (24 fiches)         → Pages /reference/[produit]
```

---

## Design et UX

### Theme

- **Mode** : Dark mode par defaut, toggle light/dark
- **Palette** : inspiree Firebase (orange #FFCA28, bleu fonce, gris charbon)
- **Typographie** : font sans-serif moderne (Inter ou Geist)
- **Code** : font monospace (JetBrains Mono ou Fira Code)

### Responsive

| Breakpoint | Layout |
| ---------- | ------ |
| Mobile (< 768px) | Contenu seul, sidebar en hamburger, TOC masquee |
| Tablette (768-1024px) | Sidebar retractable, TOC masquee |
| Desktop (> 1024px) | Sidebar + contenu + TOC trois colonnes |

### Animations

- Transition douce entre les pages (fade)
- Tooltip du glossaire : apparition en fondu (150ms)
- Boutons : hover avec legere elevation
- Progression : animation de remplissage de la barre
- Pas d'animations lourdes, priorite a la performance

### Accessibilite

- Contraste suffisant (WCAG AA minimum)
- Navigation au clavier (tab, enter, escape pour les tooltips)
- Aria labels sur les composants interactifs
- Taille de police minimum 16px pour le corps de texte
- Focus visible sur les elements interactifs

---

## Stack technique

```
Next.js 14+ (App Router)
├── TypeScript
├── Tailwind CSS
├── Shadcn UI (composants)
├── Lucide Icons (icones)
├── next-mdx-remote ou contentlayer (rendu des .md)
├── shiki ou rehype-pretty-code (coloration syntaxique)
└── localStorage (progression)
```

### Pourquoi ces choix

| Choix | Raison |
| ----- | ------ |
| Next.js App Router | Routing simple, SSG pour les performances |
| MDX | Le contenu est deja en markdown, on le rend directement |
| Shadcn UI | Composants accessibles, customisables, dark mode natif |
| localStorage | Pas de backend pour la progression, zero friction |
| SSG (Static Site Generation) | Tout le contenu est connu a l'avance, pas besoin de serveur |

### Deploiement

Firebase Hosting (meta : le site de formation Firebase est heberge sur Firebase).

---

## Structure des fichiers

```
noteflow-academy/
├── public/
│   ├── images/
│   │   ├── hero.png
│   │   ├── noteflow-screenshot.png
│   │   └── firebase-products/     (icones des produits)
│   │       ├── firestore.svg
│   │       ├── auth.svg
│   │       └── ...
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             (layout global : header, footer, theme)
│   │   ├── page.tsx               (accueil)
│   │   ├── formation/
│   │   │   ├── page.tsx           (vue d'ensemble)
│   │   │   └── [niveau]/
│   │   │       └── page.tsx       (page dynamique par niveau)
│   │   ├── glossaire/
│   │   │   └── page.tsx
│   │   ├── exemples/
│   │   │   └── page.tsx
│   │   ├── reference/
│   │   │   ├── page.tsx           (index des fiches)
│   │   │   └── [produit]/
│   │   │       └── page.tsx       (fiche dynamique par produit)
│   │   └── a-propos/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── formation/
│   │   │   ├── LevelCard.tsx
│   │   │   ├── NavigationLevel.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── glossary/
│   │   │   ├── GlossaryTerm.tsx   (le composant tooltip inline)
│   │   │   ├── GlossaryTooltip.tsx(le tooltip lui-meme)
│   │   │   ├── GlossarySearch.tsx (barre de recherche glossaire)
│   │   │   └── GlossaryList.tsx   (liste alphabetique)
│   │   ├── content/
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── Callout.tsx
│   │   │   ├── ProductBadge.tsx
│   │   │   └── SearchBar.tsx
│   │   └── ui/                    (shadcn components)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── tooltip.tsx
│   │       └── ...
│   │
│   ├── data/
│   │   ├── glossary.ts            (donnees du glossaire, ~80 termes)
│   │   ├── products.ts            (liste des 24 produits avec metadonnees)
│   │   └── levels.ts              (metadonnees des 7 niveaux)
│   │
│   ├── content/
│   │   ├── formation/             (fichiers .mdx des 7 niveaux)
│   │   │   ├── niveau-0.mdx
│   │   │   ├── niveau-1.mdx
│   │   │   └── ...
│   │   └── reference/             (fichiers .mdx des 24 fiches)
│   │       ├── authentication.mdx
│   │       ├── firestore.mdx
│   │       └── ...
│   │
│   ├── hooks/
│   │   ├── useProgress.ts         (gestion progression localStorage)
│   │   ├── useSearch.ts           (logique recherche globale)
│   │   └── useScrollSpy.ts        (surlignage TOC)
│   │
│   ├── lib/
│   │   ├── mdx.ts                 (chargement et rendu MDX)
│   │   └── utils.ts               (utilitaires)
│   │
│   └── styles/
│       └── globals.css            (variables CSS, theme, base)
│
├── content/                        (les .md sources, copies depuis docs/)
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── firebase.json                   (config hosting)
└── README.md
```

---

## Recapitulatif pour Claude Design

### Ce qu'il doit produire

1. **8 pages** : accueil, formation (overview), 7 niveaux (template unique), glossaire, exemples, reference (index), reference (fiche), a propos
2. **14 composants** : Header, Footer, Sidebar, Breadcrumb, ThemeToggle, LevelCard, NavigationLevel, ProgressBar, TableOfContents, GlossaryTerm, GlossaryTooltip, CodeBlock, Callout, ProductBadge, SearchBar
3. **Dark mode** par defaut avec toggle
4. **Responsive** (mobile, tablette, desktop)
5. **Glossaire interactif** : tooltip au survol des termes techniques

### Ce qu'il a comme contenu

- 7 fichiers de formation (niveaux 0 a 6) avec tout le texte et le code
- 1 glossaire complet (~80 termes)
- 1 fichier d'exemples concrets (24 produits illustres)
- 24 fiches de reference technique
- Ce plan du site avec toutes les specs

### Liens de reference design

- [Shadcn UI](https://ui.shadcn.com) pour les composants
- [Lucide Icons](https://lucide.dev) pour les icones
- Theme sombre inspire de la doc Firebase / Vercel / Tailwind
