export interface Command {
  command: string;
  summary: string;
  explanation: string;
  context: string;
}

export interface CommandGroup {
  level: number;
  title: string;
  description: string;
  commands: Command[];
}

export const commandGroups: CommandGroup[] = [
  {
    level: 0,
    title: "Découverte",
    description: "Installation des outils, création du projet et premier lancement de l'émulateur.",
    commands: [
      {
        command: "npm install -g firebase-tools",
        summary: "Installe la CLI Firebase sur ta machine",
        explanation: "La CLI (Command Line Interface) est ton outil principal pour interagir avec Firebase depuis le terminal. Le flag `-g` l'installe globalement : tu pourras utiliser la commande `firebase` depuis n'importe quel dossier, pas seulement ce projet.",
        context: "C'est la toute première commande à exécuter, une seule fois. Si tu l'as déjà installée, tu peux la mettre à jour avec la même commande.",
      },
      {
        command: "firebase login",
        summary: "Connecte ton compte Google à la CLI",
        explanation: "Un navigateur s'ouvre et te demande de te connecter avec ton compte Google. La CLI obtient un token d'authentification qui lui permet de gérer tes projets Firebase. Ce token est stocké localement, tu n'auras pas besoin de te reconnecter à chaque fois.",
        context: "Obligatoire après l'installation. Sans cette étape, aucune commande Firebase ne fonctionnera car la CLI ne sait pas qui tu es.",
      },
      {
        command: "firebase projects:list",
        summary: "Affiche tous tes projets Firebase",
        explanation: "Liste tous les projets Firebase associés à ton compte Google. Tu vois le nom, l'ID, et l'état de chaque projet. C'est un bon moyen de vérifier que la connexion fonctionne et que ton projet `noteflow` apparaît bien.",
        context: "Commande de vérification. Si ta liste est vide, c'est que tu n'as pas encore créé de projet dans la console Firebase.",
      },
      {
        command: "npx create-next-app@latest noteflow --typescript --tailwind --app --src-dir --eslint",
        summary: "Crée un nouveau projet Next.js préconfigurée",
        explanation: "Cette commande crée un dossier `noteflow/` avec un projet Next.js complet. Les flags configurent tout d'un coup : `--typescript` pour le typage, `--tailwind` pour le CSS, `--app` pour le App Router, `--src-dir` pour organiser le code dans `src/`, et `--eslint` pour la qualité du code. `npx` exécute le package sans l'installer globalement.",
        context: "C'est la création de l'app NoteFlow elle-même. Tu exécutes cette commande une seule fois, dans le dossier où tu veux créer le projet.",
      },
      {
        command: "cd noteflow",
        summary: "Entre dans le dossier du projet",
        explanation: "`cd` signifie « change directory ». Tu te déplaces dans le dossier `noteflow/` qui vient d'être créé. Toutes les commandes suivantes s'exécutent depuis ce dossier.",
        context: "À exécuter juste après la création du projet. Si tu ouvres un nouveau terminal, assure-toi d'être dans ce dossier avant de lancer les autres commandes.",
      },
      {
        command: "npm install firebase",
        summary: "Installe le SDK Firebase dans ton projet",
        explanation: "Ajoute la bibliothèque Firebase comme dépendance du projet. Le SDK te donne accès à Firestore, Authentication, Storage, et tous les services Firebase depuis ton code JavaScript/TypeScript. Le package est ajouté dans `node_modules/` et référencé dans `package.json`.",
        context: "C'est le pont entre ton code et Firebase. Sans ce package, tu ne peux pas utiliser `import { ... } from 'firebase/...'` dans tes fichiers.",
      },
      {
        command: "firebase init",
        summary: "Initialise Firebase dans le dossier du projet",
        explanation: "Lance un assistant interactif qui te demande quels services Firebase tu veux utiliser (Firestore, Functions, Hosting, Storage, Emulators). Il crée les fichiers de configuration nécessaires : `firebase.json`, `firestore.rules`, `storage.rules`, `.firebaserc`. Tu sélectionnes les options avec la barre d'espace et tu valides avec Entrée.",
        context: "À exécuter une seule fois dans le dossier du projet. C'est cette commande qui « lie » ton dossier local à ton projet Firebase en ligne.",
      },
      {
        command: "firebase init emulators",
        summary: "Configure les émulateurs locaux",
        explanation: "Lance un assistant spécifique pour configurer quels émulateurs tu veux utiliser (Auth, Firestore, Storage, Functions). Tu choisis les ports pour chaque service. Les émulateurs te permettent de développer sans toucher aux données de production — tout reste sur ta machine.",
        context: "Complémentaire à `firebase init`. Si tu as déjà sélectionné les émulateurs lors du `firebase init`, cette commande te permet de reconfigurer les ports ou d'ajouter de nouveaux émulateurs.",
      },
      {
        command: "firebase emulators:start",
        summary: "Démarre tous les émulateurs locaux",
        explanation: "Lance les émulateurs que tu as configurés. Tu obtiens une copie locale de Firebase : Firestore sur le port 8080, Auth sur 9099, Storage sur 9199. L'interface d'administration est accessible sur `http://localhost:4000`. Les données sont éphémères — elles disparaissent quand tu stoppes les émulateurs (sauf si tu utilises `--export-on-exit`).",
        context: "C'est ta commande du quotidien en développement. Tu lances les émulateurs dans un terminal, et ton serveur Next.js dans un autre. Les deux tournent en parallèle.",
      },
    ],
  },
  {
    level: 1,
    title: "Les données",
    description: "Lancement du serveur de développement pour construire l'interface CRUD.",
    commands: [
      {
        command: "npm run dev",
        summary: "Lance le serveur de développement Next.js",
        explanation: "Démarre un serveur local (par défaut sur `http://localhost:3000`) qui recompile automatiquement ton code à chaque modification. Le Hot Reload te permet de voir les changements en temps réel dans le navigateur sans recharger la page manuellement.",
        context: "Ta deuxième commande quotidienne (avec `firebase emulators:start`). Tu la lances dans un terminal dédié et tu la laisses tourner pendant que tu développes.",
      },
    ],
  },
  {
    level: 3,
    title: "La sécurité",
    description: "Déploiement des règles de sécurité pour protéger les données en production.",
    commands: [
      {
        command: "firebase deploy --only firestore:rules",
        summary: "Déploie uniquement les règles de sécurité Firestore",
        explanation: "Envoie le contenu de ton fichier `firestore.rules` sur les serveurs Firebase. Les règles sont immédiatement actives : chaque requête à ta base de données est évaluée contre ces règles. Le flag `--only firestore:rules` évite de déployer tout le reste (hosting, functions, etc.).",
        context: "À exécuter chaque fois que tu modifies `firestore.rules`. C'est critique de le faire AVANT de mettre l'app en production pour passer du mode test (tout ouvert) au mode sécurisé.",
      },
    ],
  },
  {
    level: 4,
    title: "Les fichiers et le backend",
    description: "Initialisation des Cloud Functions et compilation du code backend.",
    commands: [
      {
        command: "firebase init functions",
        summary: "Initialise le dossier Cloud Functions",
        explanation: "Crée un dossier `functions/` à la racine du projet avec sa propre configuration : `package.json`, `tsconfig.json`, et un fichier `src/index.ts` de démarrage. Tu choisis le langage (TypeScript recommandé) et Firebase installe les dépendances. Ce dossier est un projet Node.js indépendant de ton app Next.js.",
        context: "À exécuter quand tu as besoin de logique côté serveur pour la première fois. Le dossier `functions/` a ses propres `node_modules` et son propre build.",
      },
      {
        command: "cd functions && npm run build && cd ..",
        summary: "Compile les Cloud Functions TypeScript",
        explanation: "Cette chaîne de commandes fait 3 choses : 1) entre dans le dossier `functions/`, 2) compile le TypeScript en JavaScript (car Cloud Functions exécute du JS), 3) revient au dossier racine. Le `&&` garantit que chaque commande ne s'exécute que si la précédente a réussi.",
        context: "Obligatoire avant de tester ou déployer les fonctions. Si tu modifies le code dans `functions/src/`, tu dois recompiler. L'émulateur peut aussi le faire automatiquement.",
      },
    ],
  },
  {
    level: 5,
    title: "En ligne",
    description: "Déploiement en production, Cloud Functions, CI/CD et previews GitHub.",
    commands: [
      {
        command: "npm run build",
        summary: "Génère la version de production de l'app",
        explanation: "Compile et optimise tout le code Next.js pour la production. Le résultat est un dossier `out/` (en mode export statique) ou `.next/` (en mode SSR) contenant des fichiers HTML, CSS et JS minifiés. C'est cette version optimisée que tu déploies, pas le code source.",
        context: "Exécute cette commande avant chaque déploiement. Si le build échoue (erreurs TypeScript, imports manquants), corrige les erreurs avant de déployer.",
      },
      {
        command: "firebase deploy",
        summary: "Déploie tout sur Firebase en une commande",
        explanation: "Envoie en production tous les éléments configurés : le site web (Hosting), les règles de sécurité (Firestore + Storage), les Cloud Functions, et les index Firestore. Firebase gère le SSL, le CDN mondial et le scaling. Ton app est en ligne en quelques secondes.",
        context: "La commande « tout-en-un ». Pratique mais parfois trop large — préfère les déploiements ciblés (`--only`) quand tu n'as modifié qu'un service.",
      },
      {
        command: "firebase deploy --only hosting",
        summary: "Déploie uniquement le site web",
        explanation: "Envoie le contenu du dossier `out/` (ou le dossier configuré dans `firebase.json`) sur le CDN de Firebase Hosting. Les fichiers sont servis depuis le serveur le plus proche de chaque utilisateur. L'ancienne version est remplacée instantanément, mais tu peux revenir en arrière depuis la console.",
        context: "La commande la plus fréquente. Tu l'utilises quand tu n'as modifié que le frontend (composants, styles, pages) sans toucher aux rules ou aux functions.",
      },
      {
        command: "firebase deploy --only functions",
        summary: "Déploie uniquement les Cloud Functions",
        explanation: "Compile et déploie toutes les Cloud Functions du dossier `functions/`. Chaque fonction est déployée individuellement sur l'infrastructure Google Cloud. Le déploiement prend 1-2 minutes car Google provisionne les containers.",
        context: "À utiliser quand tu modifies la logique backend sans toucher au frontend. Plus lent que le déploiement hosting car chaque fonction est packagée et déployée séparément.",
      },
      {
        command: "firebase deploy --only functions:compterMesNotes",
        summary: "Déploie une seule Cloud Function spécifique",
        explanation: "Déploie uniquement la fonction nommée `compterMesNotes`, sans toucher aux autres. Le nom après les deux-points correspond au nom de l'export dans `functions/src/index.ts`. Beaucoup plus rapide que de redéployer toutes les fonctions.",
        context: "Utile quand tu as beaucoup de functions et que tu ne veux pas tout redéployer. Particulièrement pratique pour les hotfixes en production.",
      },
      {
        command: "firebase init hosting:github",
        summary: "Configure les previews automatiques via GitHub Actions",
        explanation: "Lie ton projet Firebase à un dépôt GitHub et crée un workflow GitHub Actions. À chaque Pull Request, l'app est automatiquement buildée et déployée sur une URL de preview temporaire. Quand la PR est mergée sur `main`, le déploiement de production se fait automatiquement.",
        context: "Configuration du CI/CD. Tu l'exécutes une fois pour mettre en place le pipeline. Ensuite, tout est automatique à chaque push et PR.",
      },
      {
        command: "firebase hosting:channel:deploy staging",
        summary: "Crée une URL de preview temporaire",
        explanation: "Déploie l'app sur un « channel » nommé `staging` (ou tout autre nom). Tu obtiens une URL comme `ton-projet--staging-abc123.web.app`. Le channel est indépendant de la production : tu peux le partager avec un client ou une équipe QA pour tester avant de mettre en prod.",
        context: "Alternative manuelle aux previews GitHub. Utile pour montrer une version spécifique à quelqu'un sans passer par une PR. Les channels expirent après 7 jours par défaut.",
      },
    ],
  },
  {
    level: 6,
    title: "Niveau pro",
    description: "Ajout du SDK d'IA pour les fonctionnalités Gemini.",
    commands: [
      {
        command: "npm install @firebase/ai",
        summary: "Installe le SDK Firebase AI Logic",
        explanation: "Ajoute le package d'IA de Firebase à ton projet. Ce SDK te donne accès aux modèles Gemini directement depuis le navigateur, sans avoir besoin de clé API côté client. La sécurité est gérée par Firebase (App Check, quotas, etc.).",
        context: "À installer quand tu veux intégrer l'IA dans ton app. Le SDK est léger et n'impacte pas les performances si tu ne l'utilises pas.",
      },
    ],
  },
];
