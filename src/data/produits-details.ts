export interface ProductDetail {
  name: string;
  docUrl: string;
  summary: string;
  useCase: string;
  projectStage: string;
  examples: {
    title: string;
    description: string;
  }[];
}

export interface Subcategory {
  label: string;
  items: ProductDetail[];
}

export type CategoryContent = ProductDetail | Subcategory;

export function isSubcategory(item: CategoryContent): item is Subcategory {
  return "items" in item;
}

export function isDetailed(item: ProductDetail): boolean {
  return item.summary !== "";
}

// --- BASES DE DONNÉES ET STOCKAGE ---

export const databases: CategoryContent[] = [
  {
    label: "PostgreSQL",
    items: [
      {
        name: "SQL Connect",
        docUrl: "https://firebase.google.com/docs/sql-connect?hl=fr",
        summary: "SQL Connect permet d'utiliser une base de données PostgreSQL managée directement depuis Firebase. C'est la solution idéale quand ton app a besoin de relations complexes entre les données (jointures, contraintes, transactions ACID) que les bases NoSQL ne gèrent pas nativement.",
        useCase: "Tu choisis SQL Connect quand ton modèle de données est très structuré : un système de facturation avec des relations clients/commandes/produits, un outil de gestion RH avec des hiérarchies, ou toute app où l'intégrité relationnelle est critique.",
        projectStage: "Début de projet, lors du choix de la base de données. C'est une décision d'architecture qui se prend avant d'écrire le moindre code métier.",
        examples: [
          {
            title: "Système de réservation en ligne",
            description: "Tu crées les tables `rooms`, `bookings`, `users` avec des clés étrangères. SQL Connect garantit qu'une réservation ne peut pas exister sans un utilisateur valide. Tu écris des requêtes SQL classiques pour vérifier les disponibilités avec des jointures, et les transactions empêchent les doubles réservations.",
          },
          {
            title: "Dashboard analytique interne",
            description: "Tu stockes les métriques de vente dans des tables relationnelles. Grâce au SQL, tu peux faire des agrégations complexes (GROUP BY, HAVING, sous-requêtes) pour calculer le chiffre d'affaires par région, par mois, par produit — des opérations très lourdes en NoSQL.",
          },
          {
            title: "App e-commerce avec gestion de stock",
            description: "Les tables `products`, `inventory`, `orders`, `order_items` sont liées. Quand un client valide sa commande, une transaction SQL décrémente le stock et crée la commande de façon atomique. Si le stock est insuffisant, tout est annulé automatiquement.",
          },
        ],
      },
    ],
  },
  {
    label: "NoSQL",
    items: [
      {
        name: "Firestore",
        docUrl: "https://firebase.google.com/docs/firestore?hl=fr",
        summary: "Cloud Firestore est la base de données NoSQL phare de Firebase. Elle stocke les données dans des documents organisés en collections, se synchronise en temps réel avec les clients, et scale automatiquement. C'est le choix par défaut pour la majorité des apps Firebase.",
        useCase: "Firestore excelle quand tu as besoin de synchronisation en temps réel (chat, collaboration), de données flexibles (pas de schéma figé), et d'une montée en charge sans configuration. Il fonctionne aussi hors-ligne : les données sont mises en cache et synchronisées au retour du réseau.",
        projectStage: "Dès le début du développement. Firestore est généralement le premier service Firebase que tu configures, juste après Authentication.",
        examples: [
          {
            title: "App de notes collaboratives",
            description: "Chaque note est un document dans une collection `notes`. Tu écoutes les changements en temps réel avec `onSnapshot()` : quand un collaborateur modifie une note, tous les autres voient la mise à jour instantanément, sans rechargement de page.",
          },
          {
            title: "Fil d'actualité d'un réseau social",
            description: "Les posts sont des documents avec des sous-collections `comments` et `likes`. Tu utilises des requêtes composées (`.where('author', '==', userId).orderBy('createdAt', 'desc').limit(20)`) pour paginer le fil. Les compteurs de likes sont mis à jour avec `increment()`.",
          },
          {
            title: "Panier d'achat en temps réel",
            description: "Le panier de chaque utilisateur est un document qui contient un tableau d'articles. Tu utilises `arrayUnion()` et `arrayRemove()` pour ajouter/retirer des produits. Le mode hors-ligne permet au client de modifier son panier même sans connexion — tout se synchronise au retour.",
          },
        ],
      },
      {
        name: "Realtime Database",
        docUrl: "https://firebase.google.com/docs/database?hl=fr",
        summary: "Realtime Database est la première base de données de Firebase. C'est un grand arbre JSON synchronisé en temps réel entre tous les clients connectés. Plus simple que Firestore mais moins puissante en requêtes.",
        useCase: "Utilise Realtime Database quand tu as besoin d'une latence ultra-faible (jeux multijoueurs, indicateurs de présence) ou pour des données simples qui changent très souvent. Elle est aussi utile comme complément à Firestore pour des cas très spécifiques.",
        projectStage: "Au choix de la base de données, ou plus tard en complément de Firestore pour des fonctionnalités temps réel spécifiques (présence, curseurs partagés).",
        examples: [
          {
            title: "Indicateur de présence en ligne",
            description: "Tu utilises le système `onDisconnect()` intégré : quand un utilisateur se connecte, tu écris `online: true` dans `/status/userId`. Tu configures `onDisconnect().set({online: false})` pour que Firebase mette automatiquement le statut à offline si la connexion est perdue.",
          },
          {
            title: "Chat en temps réel basique",
            description: "Les messages sont des nœuds dans `/chats/roomId/messages/`. Tu écoutes les nouveaux enfants avec `onChildAdded()` pour afficher chaque message dès qu'il arrive. La latence est de l'ordre de la milliseconde, plus rapide que Firestore pour ce cas d'usage.",
          },
          {
            title: "Tableau de scores en direct",
            description: "Les scores sont stockés dans `/leaderboard/` et triés avec `.orderByChild('score').limitToLast(10)`. Chaque mise à jour de score est immédiatement reflétée chez tous les joueurs connectés. Tu utilises des transactions pour éviter les conditions de course sur les scores.",
          },
        ],
      },
    ],
  },
  {
    label: "Stockage d'objets",
    items: [
      {
        name: "Storage",
        docUrl: "https://firebase.google.com/docs/storage?hl=fr",
        summary: "Cloud Storage permet de stocker et servir des fichiers (images, vidéos, PDF, etc.) uploadés par les utilisateurs. Il est construit sur Google Cloud Storage, avec un SDK client simple et des règles de sécurité intégrées.",
        useCase: "Dès que ton app doit gérer des fichiers utilisateur : photos de profil, pièces jointes, documents uploadés. Storage gère les uploads volumineux, les reprises en cas de coupure réseau, et te donne des URLs de téléchargement sécurisées.",
        projectStage: "En cours de développement, quand tu ajoutes des fonctionnalités d'upload. Typiquement après avoir mis en place Firestore et Authentication.",
        examples: [
          {
            title: "Upload de photo de profil",
            description: "L'utilisateur choisit une image, tu la compresses côté client, puis tu l'uploades dans `users/{userId}/avatar.jpg`. Tu récupères l'URL de téléchargement avec `getDownloadURL()` et tu la stockes dans le document Firestore de l'utilisateur.",
          },
          {
            title: "Galerie d'images d'un produit",
            description: "Tu uploades chaque image dans `products/{productId}/images/`. Tu utilises `listAll()` pour lister toutes les images d'un produit. Les Security Rules vérifient que seul l'admin peut uploader, mais tout le monde peut lire. Tu génères des miniatures avec une Cloud Function déclenchée à l'upload.",
          },
          {
            title: "Partage de documents PDF",
            description: "Les utilisateurs uploadent des PDF dans `documents/{docId}/`. Tu affiches une barre de progression grâce aux événements `state_changed` du task d'upload. Les métadonnées (nom original, taille, type) sont stockées dans Firestore pour indexation et recherche.",
          },
        ],
      },
    ],
  },
];

// --- SÉCURITÉ ---

export const security: CategoryContent[] = [
  {
    name: "App Check",
    docUrl: "https://firebase.google.com/docs/app-check?hl=fr",
    summary: "App Check protège tes services Firebase contre les abus en vérifiant que les requêtes proviennent bien de ton app légitime (et pas d'un bot ou d'un script malveillant). Il utilise des fournisseurs d'attestation (reCAPTCHA Enterprise pour le web, DeviceCheck/Play Integrity pour mobile).",
    useCase: "App Check est ta ligne de défense contre le scraping, les attaques par force brute, et l'utilisation frauduleuse de tes API. Sans lui, n'importe qui peut appeler tes endpoints Firebase avec un simple script curl.",
    projectStage: "En pré-production, avant de déployer en public. C'est une couche de sécurité à activer quand ton app est fonctionnelle et que tu veux la durcir.",
    examples: [
      {
        title: "Protéger Firestore contre le scraping",
        description: "Tu actives App Check avec reCAPTCHA Enterprise. Dans la console Firebase, tu coches « Appliquer » pour Firestore. Désormais, seules les requêtes accompagnées d'un token App Check valide passent. Un script Python qui essaie de lire ta base se fait rejeter automatiquement.",
      },
      {
        title: "Sécuriser une API Cloud Functions",
        description: "Dans ta Cloud Function, tu vérifies le token App Check avec `app.appCheck().verifyToken()`. Si le token est invalide ou absent, tu renvoies une erreur 401. Cela empêche les appels directs à ton API sans passer par ton app.",
      },
      {
        title: "Limiter l'accès à Cloud Storage",
        description: "Tu appliques App Check sur Storage pour que seule ton app puisse uploader des fichiers. Même si quelqu'un récupère la config Firebase (qui est publique), il ne pourra pas utiliser Storage sans un token d'attestation valide.",
      },
    ],
  },
  {
    name: "Authentication",
    docUrl: "https://firebase.google.com/docs/auth?hl=fr",
    summary: "Firebase Authentication gère tout le cycle d'authentification de tes utilisateurs : inscription, connexion, réinitialisation de mot de passe, et gestion de session. Il supporte l'email/mot de passe, les providers sociaux (Google, Apple, Facebook, GitHub), le téléphone, et l'authentification anonyme.",
    useCase: "C'est le socle de toute app avec des comptes utilisateur. Authentication fournit un `uid` unique pour chaque utilisateur, que tu utilises ensuite dans tes Security Rules Firestore et Storage pour contrôler l'accès aux données.",
    projectStage: "Tout au début du projet, c'est souvent le premier service Firebase implémenté. Sans Authentication, tu ne peux pas sécuriser les autres services.",
    examples: [
      {
        title: "Connexion Google en un clic",
        description: "Tu configures le provider Google dans la console Firebase, puis tu appelles `signInWithPopup(auth, googleProvider)`. Firebase gère l'OAuth, récupère le profil, et te renvoie un objet `user` avec `uid`, `displayName`, `email`, `photoURL`. Zéro backend à écrire.",
      },
      {
        title: "Inscription par email avec vérification",
        description: "Tu crées le compte avec `createUserWithEmailAndPassword()`, puis tu envoies un email de vérification avec `sendEmailVerification()`. Dans tes Security Rules, tu vérifies `request.auth.token.email_verified == true` pour restreindre l'accès aux utilisateurs vérifiés.",
      },
      {
        title: "Authentification anonyme puis conversion",
        description: "Un visiteur utilise ton app sans s'inscrire grâce à `signInAnonymously()`. Il obtient un `uid` temporaire, peut sauvegarder des données. Quand il décide de créer un compte, tu lies son compte anonyme à un email avec `linkWithCredential()` — ses données sont conservées.",
      },
    ],
  },
  {
    name: "Phone Verification",
    docUrl: "https://firebase.google.com/docs/auth/web/phone-auth?hl=fr",
    summary: "Phone Verification permet de vérifier l'identité d'un utilisateur par son numéro de téléphone via un code SMS (OTP). C'est un mode d'authentification à part entière ou un facteur supplémentaire pour la double authentification (MFA).",
    useCase: "Indispensable pour les apps qui ciblent des marchés où l'email n'est pas courant, ou pour ajouter une couche de sécurité supplémentaire. Aussi très utile pour la vérification d'identité (KYC) et les apps de livraison/transport.",
    projectStage: "Lors de l'implémentation de l'authentification, si ton app nécessite la vérification par téléphone. Ou plus tard, pour ajouter la MFA sur des comptes existants.",
    examples: [
      {
        title: "Connexion par SMS",
        description: "Tu affiches un champ de numéro de téléphone, tu appelles `signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)`. Firebase envoie un SMS avec un code à 6 chiffres. L'utilisateur saisit le code, tu le confirmes avec `confirmationResult.confirm(code)`. Compte créé.",
      },
      {
        title: "Double authentification (MFA)",
        description: "L'utilisateur est déjà connecté par email. Tu ajoutes un second facteur téléphone avec `multiFactor(user).enroll()`. Aux prochaines connexions, après l'email/mot de passe, Firebase exigera le code SMS. Cela protège le compte même si le mot de passe est compromis.",
      },
      {
        title: "Vérification du numéro pour une app de livraison",
        description: "Avant de permettre une commande, tu vérifies que le numéro de téléphone du client est réel. Tu utilises le flow de vérification par SMS. Une fois le numéro confirmé, tu le stockes dans Firestore avec un flag `phoneVerified: true` pour les livraisons futures.",
      },
    ],
  },
];

// --- SERVICES D'IA ---

export const ai: CategoryContent[] = [
  {
    name: "AI Logic",
    docUrl: "https://firebase.google.com/docs/ai-logic?hl=fr",
    summary: "Firebase AI Logic permet d'intégrer les modèles Gemini de Google directement dans ton app via le SDK Firebase. Tu peux faire de la génération de texte, de l'analyse d'images, du chat conversationnel, et du traitement de données structurées — le tout sécurisé par App Check.",
    useCase: "Tu utilises AI Logic quand tu veux ajouter de l'intelligence artificielle à ton app sans gérer d'infrastructure ML. Le SDK gère l'authentification, le rate limiting, et la sécurité. Idéal pour des fonctionnalités comme l'aide à la rédaction, la classification de contenu, ou l'analyse d'images.",
    projectStage: "En phase de développement de fonctionnalités, une fois que le socle de l'app (auth, base de données) est en place. C'est une fonctionnalité avancée qui enrichit l'expérience utilisateur.",
    examples: [
      {
        title: "Assistant de rédaction intégré",
        description: "Tu crées un bouton « Améliorer mon texte » dans un éditeur. Au clic, tu envoies le texte au modèle Gemini via `generateContent()` avec un prompt système qui demande de corriger la grammaire et d'améliorer le style. La réponse remplace le texte original.",
      },
      {
        title: "Classification automatique de photos",
        description: "Quand un utilisateur uploade une photo, tu l'envoies à Gemini Vision avec un prompt qui demande de catégoriser l'image (paysage, portrait, nourriture, etc.). Tu stockes les tags dans Firestore pour permettre la recherche et le tri par catégorie.",
      },
      {
        title: "Chatbot de support client",
        description: "Tu utilises `startChat()` pour créer une session conversationnelle avec un historique. Le prompt système contient le contexte de ton entreprise et les FAQ. L'utilisateur pose des questions, le modèle répond en s'appuyant sur le contexte. Tu stockes l'historique dans Firestore.",
      },
    ],
  },
  {
    name: "Genkit",
    docUrl: "https://firebase.google.com/docs/genkit?hl=fr",
    summary: "Genkit est un framework open source pour construire des applications d'IA côté serveur. Il fournit des abstractions pour les flux IA (prompts, chaînes, agents), la gestion de contexte, l'évaluation, et l'observabilité. Il fonctionne avec Gemini mais aussi d'autres modèles.",
    useCase: "Genkit est pour les cas complexes où AI Logic ne suffit pas : chaînes de prompts, RAG (Retrieval-Augmented Generation), agents autonomes, pipelines de traitement. C'est le choix quand tu as besoin de logique métier autour de l'IA.",
    projectStage: "En développement avancé, quand tu construis des fonctionnalités IA complexes qui nécessitent un pipeline côté serveur (Cloud Functions).",
    examples: [
      {
        title: "Recherche augmentée (RAG) sur ta documentation",
        description: "Tu indexes ta documentation dans un vector store avec Genkit. Quand un utilisateur pose une question, Genkit recherche les passages pertinents, les injecte dans le prompt, et génère une réponse sourcée. Tu déploies le tout dans une Cloud Function.",
      },
      {
        title: "Pipeline de modération de contenu",
        description: "Tu crées un flow Genkit qui enchaîne : 1) analyse du texte par Gemini pour détecter les contenus inappropriés, 2) si douteux, deuxième analyse plus fine, 3) décision automatique (approuver/rejeter/modération humaine). Chaque étape est loguée et mesurée.",
      },
      {
        title: "Agent de réservation intelligent",
        description: "Tu construis un agent Genkit avec des outils (fonctions) que le modèle peut appeler : `checkAvailability()`, `createBooking()`, `sendConfirmation()`. L'agent dialogue avec l'utilisateur, comprend sa demande, et exécute les actions nécessaires de façon autonome.",
      },
    ],
  },
  {
    label: "Obsolète",
    items: [
      {
        name: "Machine Learning",
        docUrl: "https://firebase.google.com/docs/ml?hl=fr",
        summary: "Firebase Machine Learning était le service d'IA original de Firebase. Il permettait d'utiliser des modèles de ML embarqués (reconnaissance de texte, détection de visages, etc.) et de déployer des modèles TensorFlow Lite personnalisés. Remplacé par AI Logic et Genkit.",
        useCase: "Ce service n'est plus recommandé pour les nouveaux projets. Si tu as besoin d'IA, utilise AI Logic (côté client) ou Genkit (côté serveur). ML Kit reste disponible en tant que SDK mobile autonome pour le ML embarqué (OCR, barcode, etc.).",
        projectStage: "N/A — service obsolète. Migrate vers AI Logic ou Genkit pour les nouveaux développements.",
        examples: [
          {
            title: "Migration vers AI Logic",
            description: "Si tu utilisais Firebase ML pour de la classification d'images, remplace par un appel à Gemini Vision via AI Logic. Le modèle cloud est plus puissant et ne nécessite pas de télécharger un modèle sur l'appareil.",
          },
          {
            title: "ML Kit pour le ML embarqué",
            description: "Pour le scan de codes-barres, l'OCR, ou la détection de visages en local (sans réseau), ML Kit reste disponible comme SDK indépendant. Il n'est plus intégré à Firebase mais fonctionne parfaitement dans les apps mobiles.",
          },
          {
            title: "Modèles TensorFlow Lite personnalisés",
            description: "Si tu déployais des modèles TFLite via Firebase, tu peux maintenant les héberger dans Cloud Storage et les télécharger directement. Pour des cas plus avancés, utilise Vertex AI avec Genkit.",
          },
        ],
      },
    ],
  },
];

// --- HÉBERGEMENT ET SANS SERVEUR ---

export const hosting: CategoryContent[] = [
  {
    name: "App Hosting",
    docUrl: "https://firebase.google.com/docs/app-hosting?hl=fr",
    summary: "App Hosting est la solution de déploiement pour les apps full-stack (Next.js, Angular). Contrairement à Hosting classique (fichiers statiques), App Hosting gère le rendu côté serveur (SSR), les API routes, et le déploiement automatique depuis GitHub.",
    useCase: "Choisis App Hosting si ton app utilise Next.js avec du SSR, des Server Components, ou des API routes. Il gère automatiquement le build, le scaling, et le CDN. C'est la solution Firebase native pour les frameworks modernes.",
    projectStage: "Au moment du déploiement, quand tu passes du développement local à la production. C'est la dernière étape du cycle de développement.",
    examples: [
      {
        title: "Déployer une app Next.js avec SSR",
        description: "Tu connectes ton repo GitHub à App Hosting. À chaque push sur `main`, Firebase build automatiquement ton app Next.js, gère les routes SSR et statiques séparément, et déploie sur le CDN mondial. Zéro configuration serveur.",
      },
      {
        title: "Preview des pull requests",
        description: "App Hosting crée automatiquement un environnement de preview pour chaque PR sur GitHub. Ton équipe peut tester les changements sur une URL temporaire avant de merger. L'environnement est détruit après le merge.",
      },
      {
        title: "App Angular avec rendu côté serveur",
        description: "Tu déploies une app Angular Universal. App Hosting détecte automatiquement le framework, configure le SSR, et sert les pages avec un premier rendu côté serveur pour le SEO, puis hydrate côté client pour l'interactivité.",
      },
    ],
  },
  {
    name: "Hosting",
    docUrl: "https://firebase.google.com/docs/hosting?hl=fr",
    summary: "Firebase Hosting est le service d'hébergement web pour les sites statiques et les Single Page Applications (SPA). Il sert tes fichiers depuis un CDN mondial avec HTTPS automatique, support du domaine personnalisé, et déploiement en une commande.",
    useCase: "Hosting est parfait pour les sites statiques, les SPA (React, Vue), les landing pages, et les apps exportées en statique (`output: 'export'`). Simple, rapide, gratuit pour les petits projets.",
    projectStage: "Au déploiement initial et tout au long de la vie du projet. Chaque `firebase deploy` publie une nouvelle version instantanément, avec possibilité de rollback.",
    examples: [
      {
        title: "Déployer un site statique Next.js",
        description: "Tu configures `output: 'export'` dans `next.config.ts`, tu build avec `npm run build`, et tu déploies le dossier `out/` avec `firebase deploy --only hosting`. Le site est disponible en quelques secondes sur le CDN mondial avec HTTPS.",
      },
      {
        title: "Domaine personnalisé avec SSL",
        description: "Dans la console Firebase, tu ajoutes ton domaine (`monapp.com`). Firebase te donne les enregistrements DNS à configurer. Une fois la propagation faite, un certificat SSL est provisionné automatiquement. Ton site est accessible en HTTPS sur ton domaine.",
      },
      {
        title: "Channels de preview pour le staging",
        description: "Tu crées un channel de preview avec `firebase hosting:channel:deploy staging`. Cela génère une URL temporaire (`ton-projet--staging-xxx.web.app`) pour tester avant de mettre en production. Idéal pour montrer une version à un client ou une équipe QA.",
      },
    ],
  },
  {
    name: "Functions",
    docUrl: "https://firebase.google.com/docs/functions?hl=fr",
    summary: "Cloud Functions te permet d'exécuter du code backend (Node.js, Python) sans gérer de serveur. Les fonctions se déclenchent automatiquement en réponse à des événements Firebase (écriture Firestore, upload Storage, requête HTTP) ou selon un planning (cron).",
    useCase: "Functions est le couteau suisse du backend Firebase : envoi d'emails, traitement d'images, webhooks, API REST, logique métier sensible qu'on ne veut pas exposer côté client, tâches planifiées.",
    projectStage: "En développement, dès que tu as besoin de logique côté serveur. Souvent introduit quand l'app grandit et que certaines opérations ne peuvent plus être faites côté client (sécurité, performances).",
    examples: [
      {
        title: "Envoi d'email de bienvenue à l'inscription",
        description: "Tu crées une fonction déclenchée par `auth.user().onCreate()`. Quand un nouvel utilisateur s'inscrit, la fonction récupère son email et envoie un email de bienvenue via SendGrid ou Nodemailer. Tout est automatique, aucun code côté client nécessaire.",
      },
      {
        title: "Génération de miniatures à l'upload",
        description: "Tu écoutes `storage.object().onFinalize()`. Quand une image est uploadée, la fonction la télécharge, génère une miniature avec Sharp, l'uploade dans un sous-dossier `thumbnails/`, et met à jour le document Firestore avec l'URL de la miniature.",
      },
      {
        title: "API REST sécurisée",
        description: "Tu crées une fonction HTTP (`onRequest`) qui expose une API REST. Tu vérifies le token Firebase Auth dans le header `Authorization`, puis tu exécutes la logique métier (calculs complexes, appels à des API externes). Les endpoints sont accessibles via `https://us-central1-ton-projet.cloudfunctions.net/api`.",
      },
    ],
  },
  {
    name: "Extensions",
    docUrl: "https://firebase.google.com/docs/extensions?hl=fr",
    summary: "Les Extensions Firebase sont des modules préconstruits qui ajoutent des fonctionnalités à ton projet en quelques clics. Chaque extension déploie automatiquement des Cloud Functions, des règles, et des configurations. Il en existe pour l'envoi d'emails, le resize d'images, la recherche full-text, les paiements Stripe, etc.",
    useCase: "Les Extensions te font gagner des heures de développement sur des problématiques classiques. Au lieu de coder une Cloud Function de resize d'images, tu installes l'extension « Resize Images » et c'est configuré en 5 minutes.",
    projectStage: "À tout moment du développement. Les Extensions sont souvent découvertes en cherchant une solution à un problème commun (« comment envoyer des emails depuis Firebase ? »).",
    examples: [
      {
        title: "Resize automatique des images uploadées",
        description: "Tu installes l'extension « Resize Images ». Tu configures les tailles souhaitées (200x200, 800x800) et le dossier source. Chaque image uploadée dans Storage est automatiquement redimensionnée. Zéro Cloud Function à écrire.",
      },
      {
        title: "Paiements avec Stripe",
        description: "L'extension « Run Payments with Stripe » crée les Cloud Functions nécessaires pour gérer les abonnements et les paiements. Elle synchronise les clients Stripe avec Firebase Auth et stocke les abonnements dans Firestore. Tu n'as qu'à construire l'UI.",
      },
      {
        title: "Envoi d'emails transactionnels",
        description: "L'extension « Trigger Email from Firestore » surveille une collection `mail`. Pour envoyer un email, tu crées un document avec `to`, `subject`, `html`. L'extension l'envoie via le service SMTP configuré (SendGrid, Mailgun) et met à jour le statut de livraison.",
      },
    ],
  },
];

// --- DEVOPS ET ENGAGEMENT ---

export const devops: CategoryContent[] = [
  {
    label: "Tests",
    items: [
      {
        name: "App Distribution",
        docUrl: "https://firebase.google.com/docs/app-distribution?hl=fr",
        summary: "App Distribution permet de distribuer des versions de test de ton app mobile (iOS et Android) à des testeurs internes, sans passer par les stores. Les testeurs reçoivent un lien pour installer la dernière version directement sur leur appareil.",
        useCase: "Indispensable pour les équipes qui développent des apps mobiles. Au lieu d'envoyer des APK/IPA par email, tu distribues proprement via Firebase avec des groupes de testeurs, des notes de version, et un suivi d'installation.",
        projectStage: "Dès les premières versions testables de l'app mobile, et tout au long du développement. Chaque nouvelle build peut être distribuée automatiquement via le CI/CD.",
        examples: [
          {
            title: "Distribution automatique depuis le CI",
            description: "Tu configures GitHub Actions pour builder ton app à chaque push sur `develop`. Le workflow utilise `firebase appdistribution:distribute app.apk --groups beta-testers`. Les testeurs du groupe reçoivent une notification pour installer la nouvelle version.",
          },
          {
            title: "Groupes de testeurs par rôle",
            description: "Tu crées des groupes : `internal` (équipe dev), `qa` (testeurs QA), `stakeholders` (clients/managers). Chaque groupe reçoit les builds appropriés. Les développeurs testent les builds de debug, les stakeholders reçoivent les builds de release.",
          },
          {
            title: "Notes de version et feedback",
            description: "À chaque distribution, tu ajoutes des notes décrivant les changements. Les testeurs peuvent signaler des bugs directement depuis l'app grâce au SDK intégré. Tu centralises le feedback dans la console Firebase.",
          },
        ],
      },
      {
        name: "Test Lab",
        docUrl: "https://firebase.google.com/docs/test-lab?hl=fr",
        summary: "Test Lab donne accès à un parc d'appareils réels (physiques et virtuels) hébergés dans les data centers de Google. Tu peux exécuter tes tests automatisés (Espresso, XCTest) ou des tests exploratoires (Robo) sur des dizaines de combinaisons appareil/OS.",
        useCase: "Test Lab résout le problème « ça marche sur mon téléphone mais pas sur celui du client ». Tu testes sur des Samsung, Pixel, iPhone, avec différentes versions d'OS, sans posséder tous ces appareils.",
        projectStage: "En phase de test et de QA, avant chaque release. Idéalement intégré dans le pipeline CI/CD pour des tests automatiques à chaque merge.",
        examples: [
          {
            title: "Test Robo automatique",
            description: "Tu uploades ton APK dans Test Lab sans écrire aucun test. Le robot Robo explore ton app automatiquement : il clique sur les boutons, remplit les formulaires, navigue entre les écrans. Il détecte les crashs et génère un rapport avec des screenshots de chaque étape.",
          },
          {
            title: "Tests d'instrumentation sur 20 appareils",
            description: "Tu lances tes tests Espresso (Android) ou XCTest (iOS) sur une matrice d'appareils et de versions d'OS. Test Lab exécute les tests en parallèle et te fournit les résultats par appareil : captures d'écran, logs, vidéos des sessions.",
          },
          {
            title: "Tests de performance par appareil",
            description: "Tu mesures les temps de chargement et la fluidité de ton app sur des appareils d'entrée de gamme vs haut de gamme. Test Lab fournit des métriques de performance (temps de rendu, utilisation mémoire) qui t'aident à optimiser pour les appareils moins puissants.",
          },
        ],
      },
    ],
  },
  {
    label: "Flags de fonctionnalité",
    items: [
      {
        name: "A/B Testing",
        docUrl: "https://firebase.google.com/docs/ab-testing?hl=fr",
        summary: "A/B Testing permet de tester deux variantes d'une fonctionnalité sur des groupes d'utilisateurs différents et de mesurer l'impact sur des métriques clés (rétention, revenus, engagement). Il s'intègre avec Remote Config et Analytics pour des expériences statistiquement significatives.",
        useCase: "Tu utilises A/B Testing pour prendre des décisions basées sur les données plutôt que sur l'intuition. Quel texte de bouton convertit le mieux ? Quel onboarding retient le plus d'utilisateurs ? A/B Testing te donne la réponse.",
        projectStage: "En production, quand tu as suffisamment d'utilisateurs pour obtenir des résultats statistiquement significatifs. C'est un outil d'optimisation continue.",
        examples: [
          {
            title: "Tester deux variantes d'onboarding",
            description: "Tu crées une expérience avec deux variantes : onboarding en 3 étapes vs 5 étapes. Firebase assigne aléatoirement 50% des nouveaux utilisateurs à chaque groupe. Après 2 semaines, tu mesures la rétention à J7. La variante gagnante est déployée à 100%.",
          },
          {
            title: "Optimiser le texte d'un CTA",
            description: "Tu testes « Essai gratuit » vs « Commencer maintenant » vs « Démarrer » sur un bouton d'inscription. A/B Testing mesure le taux de conversion de chaque variante et t'indique le gagnant avec un intervalle de confiance statistique.",
          },
          {
            title: "Tester un nouveau design de page",
            description: "Tu utilises Remote Config pour servir deux layouts différents. A/B Testing distribue les utilisateurs entre les deux versions et mesure l'impact sur le temps passé, le taux de scroll, et le nombre d'actions effectuées.",
          },
        ],
      },
      {
        name: "Remote Config",
        docUrl: "https://firebase.google.com/docs/remote-config?hl=fr",
        summary: "Remote Config te permet de modifier le comportement et l'apparence de ton app sans publier de mise à jour. Tu définis des paramètres clé-valeur dans la console Firebase, et ton app les récupère au démarrage. Tu peux cibler des segments d'utilisateurs spécifiques.",
        useCase: "Parfait pour les feature flags, la personnalisation par segment, les promotions temporaires, et le kill switch (désactiver une fonctionnalité buggée en urgence sans redéployer).",
        projectStage: "En production. Remote Config prend toute sa valeur quand l'app est déployée et que tu veux itérer rapidement sans forcer les utilisateurs à mettre à jour.",
        examples: [
          {
            title: "Feature flag pour une nouvelle fonctionnalité",
            description: "Tu crées un paramètre `enable_new_chat` (booléen, défaut `false`). Dans ton code, tu conditionnes l'affichage du nouveau chat à ce flag. Tu actives d'abord pour 10% des utilisateurs, puis 50%, puis 100%. Si un bug apparaît, tu désactives instantanément.",
          },
          {
            title: "Bannière promotionnelle ciblée",
            description: "Tu définis un paramètre `promo_banner_text` avec des conditions : les utilisateurs en France voient « Soldes d'été -30% », ceux en Belgique voient une autre offre. Tu changes le texte depuis la console sans toucher au code.",
          },
          {
            title: "Thème saisonnier de l'app",
            description: "Tu paramètres les couleurs de l'app (`primary_color`, `accent_color`, `hero_image`) dans Remote Config. À Noël, tu passes en thème rouge et or. Pour Halloween, orange et noir. L'app change d'apparence instantanément pour tous les utilisateurs.",
          },
        ],
      },
    ],
  },
  {
    label: "Observabilité",
    items: [
      {
        name: "Crashlytics",
        docUrl: "https://firebase.google.com/docs/crashlytics?hl=fr",
        summary: "Crashlytics capture et regroupe les crashs de ton app en temps réel. Chaque crash est analysé avec la stack trace complète, les informations de l'appareil, et les actions de l'utilisateur qui ont précédé le crash. Les crashs similaires sont regroupés automatiquement.",
        useCase: "Crashlytics est l'outil indispensable pour la stabilité de ton app en production. Il te prévient en temps réel quand un crash affecte beaucoup d'utilisateurs et te donne toutes les informations pour le reproduire et le corriger.",
        projectStage: "En production, dès la première version publique. Crashlytics doit être intégré avant le lancement pour capturer les premiers crashs.",
        examples: [
          {
            title: "Alertes sur les crashs critiques",
            description: "Tu configures des alertes Slack/email quand un crash touche plus de 1% des utilisateurs. Crashlytics regroupe les crashs identiques et les classe par impact. Tu vois immédiatement quel crash corriger en priorité.",
          },
          {
            title: "Diagnostic avec les breadcrumbs",
            description: "Tu ajoutes des logs personnalisés (`Crashlytics.log('Utilisateur a cliqué sur Payer')`) aux points clés de ton app. Quand un crash survient, tu vois la séquence d'actions qui y a mené : navigation, clics, appels réseau.",
          },
          {
            title: "Suivi de la stabilité par version",
            description: "Crashlytics affiche le pourcentage d'utilisateurs sans crash par version. Tu suis l'évolution : la v2.1 a 99.5% de stabilité, la v2.2 descend à 98%. Tu identifies immédiatement la régression et tu la corriges avant qu'elle ne touche plus de monde.",
          },
        ],
      },
      {
        name: "Performance",
        docUrl: "https://firebase.google.com/docs/perf-mon?hl=fr",
        summary: "Performance Monitoring mesure automatiquement les métriques de performance de ton app : temps de démarrage, durée des requêtes HTTP, temps de rendu des écrans. Tu peux aussi créer des traces personnalisées pour mesurer tes propres opérations.",
        useCase: "Performance Monitoring te permet de détecter les lenteurs avant que les utilisateurs ne se plaignent. Tu identifies les écrans lents, les requêtes réseau problématiques, et les régressions de performance entre versions.",
        projectStage: "En production, activé en même temps que Crashlytics. Les données de performance n'ont de sens qu'avec du vrai trafic utilisateur.",
        examples: [
          {
            title: "Mesurer le temps de chargement d'un écran",
            description: "Performance Monitoring capture automatiquement le temps de rendu de chaque écran. Tu vois que l'écran « Catalogue » prend 3.2s en moyenne sur les appareils d'entrée de gamme. Tu optimises les images et les requêtes pour descendre sous la seconde.",
          },
          {
            title: "Trace personnalisée sur un calcul complexe",
            description: "Tu crées une trace `generateReport` autour de la génération d'un rapport PDF. Tu mesures la durée et tu ajoutes des attributs (`reportType`, `dataSize`). Dans la console, tu vois que les rapports de plus de 1000 lignes prennent 8s — tu optimises.",
          },
          {
            title: "Monitoring des requêtes réseau",
            description: "Performance Monitoring trace automatiquement toutes les requêtes HTTP. Tu détectes qu'une API externe met 2s à répondre pour 5% des utilisateurs. Tu ajoutes du cache côté client et un fallback pour améliorer l'expérience sur les réseaux lents.",
          },
        ],
      },
      {
        name: "Release Monitoring",
        docUrl: "https://firebase.google.com/docs/perf-mon?hl=fr",
        summary: "Release Monitoring combine les données de Crashlytics et Performance Monitoring pour te donner une vue d'ensemble de la santé de chaque version de ton app. Tu compares la stabilité et les performances entre versions pour valider ou rollback une release.",
        useCase: "C'est ton tableau de bord de confiance post-déploiement. Après chaque mise à jour, tu vérifies que la nouvelle version ne dégrade pas l'expérience par rapport à la précédente.",
        projectStage: "En production, à chaque nouvelle release. Release Monitoring est consulté dans les heures et jours suivant un déploiement.",
        examples: [
          {
            title: "Validation d'une nouvelle version",
            description: "Après le déploiement de la v3.0, tu surveilles le dashboard Release Monitoring. Le taux de crash est stable, le temps de démarrage a baissé de 200ms. La release est validée. Tu la déploies progressivement à 100% des utilisateurs.",
          },
          {
            title: "Détection d'une régression",
            description: "La v3.1 montre un pic de crashs sur Samsung Galaxy A. Release Monitoring te montre que le problème n'existait pas en v3.0. Tu identifies le commit responsable, tu corriges, et tu publies un hotfix v3.1.1.",
          },
          {
            title: "Comparaison de performance entre versions",
            description: "Tu compares le temps de chargement de l'écran principal entre v3.0 et v3.1. La nouvelle version est 15% plus rapide grâce à l'optimisation du lazy loading. Tu documentes l'amélioration pour le changelog.",
          },
        ],
      },
    ],
  },
  {
    label: "Engagement",
    items: [
      {
        name: "Messaging",
        docUrl: "https://firebase.google.com/docs/cloud-messaging?hl=fr",
        summary: "Cloud Messaging (FCM) permet d'envoyer des notifications push aux utilisateurs sur mobile et web. Tu peux cibler tous les utilisateurs, un segment spécifique, ou un appareil individuel. Les messages peuvent contenir des données pour déclencher des actions dans l'app.",
        useCase: "Les notifications push sont le canal le plus direct pour re-engager tes utilisateurs. Tu les utilises pour les alertes importantes, les mises à jour, les promotions, et les interactions sociales (« X a commenté votre post »).",
        projectStage: "En développement avancé ou en production, quand tu as besoin de communiquer proactivement avec tes utilisateurs.",
        examples: [
          {
            title: "Notification de nouveau message",
            description: "Quand un utilisateur reçoit un message dans ton app de chat, une Cloud Function envoie une notification push via FCM avec le nom de l'expéditeur et un aperçu du message. L'utilisateur clique sur la notif et arrive directement dans la conversation.",
          },
          {
            title: "Campagne marketing ciblée",
            description: "Depuis la console Firebase, tu crées une campagne « Soldes d'été » ciblant les utilisateurs qui n'ont pas ouvert l'app depuis 7 jours et qui sont en France. Tu planifies l'envoi pour 10h du matin. Firebase gère la segmentation et la livraison.",
          },
          {
            title: "Notifications silencieuses pour la synchronisation",
            description: "Tu envoies des data messages (sans notification visible) pour dire à l'app de synchroniser ses données en arrière-plan. Par exemple, quand un admin met à jour le catalogue produits, tous les appareils reçoivent un signal pour rafraîchir le cache.",
          },
        ],
      },
    ],
  },
  {
    label: "Obsolète",
    items: [
      {
        name: "Dynamic Links",
        docUrl: "https://firebase.google.com/docs/dynamic-links?hl=fr",
        summary: "Dynamic Links étaient des liens intelligents qui fonctionnaient sur toutes les plateformes : si l'app est installée, le lien ouvre l'app directement au bon contenu ; sinon, il redirige vers le store pour l'installer, puis ouvre le contenu après installation. Service déprécié en août 2025.",
        useCase: "Ce service n'est plus disponible pour les nouveaux projets. Pour les liens profonds, utilise les alternatives recommandées par Google : App Links (Android), Universal Links (iOS), ou des solutions tierces comme Branch.io.",
        projectStage: "N/A — service obsolète. Migrate les liens existants vers une solution alternative.",
        examples: [
          {
            title: "Migration vers App Links / Universal Links",
            description: "Remplace tes Dynamic Links par des liens standards avec la configuration App Links (Android) et Universal Links (iOS). Ces technologies natives offrent les mêmes fonctionnalités de deep linking sans dépendance à un service tiers.",
          },
          {
            title: "Alternative avec Branch.io",
            description: "Branch.io est la solution tierce la plus populaire pour remplacer Dynamic Links. Elle offre le même comportement cross-platform avec des analytics avancés sur l'attribution et le parcours utilisateur.",
          },
          {
            title: "Liens de partage avec des query params",
            description: "Pour les cas simples, tu peux utiliser des URLs classiques avec des query params (`monapp.com/produit?id=123`). Ton app web affiche le contenu, et les App/Universal Links redirigent vers l'app mobile si installée.",
          },
        ],
      },
    ],
  },
];

// --- ANALYTICS ---

export const analytics: CategoryContent[] = [
  {
    name: "Dashboard",
    docUrl: "https://firebase.google.com/docs/analytics?hl=fr",
    summary: "Le Dashboard Analytics est la vue d'ensemble de ton app : utilisateurs actifs, sessions, revenus, rétention, et les événements clés. C'est le point d'entrée pour comprendre comment tes utilisateurs utilisent ton app au quotidien.",
    useCase: "Tu consultes le Dashboard chaque jour pour prendre le pouls de ton app. Il répond aux questions fondamentales : combien d'utilisateurs actifs ? D'où viennent-ils ? Combien reviennent le lendemain ?",
    projectStage: "Dès le lancement en production. Analytics se configure une fois et collecte les données automatiquement. Plus tu l'actives tôt, plus tu as d'historique pour comparer.",
    examples: [
      {
        title: "Suivi des utilisateurs actifs quotidiens",
        description: "Le Dashboard affiche la courbe des DAU (Daily Active Users). Tu vois que tu as un pic le lundi et un creux le week-end. Tu adaptes tes campagnes de notifications pour capitaliser sur les jours forts.",
      },
      {
        title: "Analyse de la rétention",
        description: "La cohorte de rétention montre que 40% des utilisateurs reviennent à J1, mais seulement 15% à J7. Tu identifies que l'onboarding ne convertit pas assez. Tu lances un A/B test sur les premières étapes.",
      },
      {
        title: "Revenus et monétisation",
        description: "Si tu as intégré AdMob ou des achats in-app, le Dashboard affiche les revenus par utilisateur (ARPU). Tu compares les revenus entre les pays et tu adaptes ta stratégie de monétisation.",
      },
    ],
  },
  {
    name: "Realtime Analytics",
    docUrl: "https://firebase.google.com/docs/analytics?hl=fr",
    summary: "Realtime Analytics affiche les données de ton app en temps réel : utilisateurs actuellement actifs, événements déclenchés dans les 30 dernières minutes, et la distribution géographique instantanée.",
    useCase: "Tu utilises le temps réel pour surveiller un lancement, une campagne marketing, ou un événement en direct. C'est aussi utile pour débugger l'intégration Analytics — tu vois immédiatement si tes événements remontent.",
    projectStage: "En production, pour le monitoring en direct. Aussi très utile en développement pour vérifier que le tracking est correctement implémenté.",
    examples: [
      {
        title: "Monitoring d'un lancement produit",
        description: "Tu lances une nouvelle fonctionnalité et tu surveilles en temps réel combien d'utilisateurs l'utilisent. Tu vois 50 utilisateurs actifs qui déclenchent l'événement `feature_opened` dans les 5 premières minutes. Le lancement se passe bien.",
      },
      {
        title: "Suivi d'une campagne push",
        description: "Tu envoies une notification push à 10 000 utilisateurs. En temps réel, tu vois le pic d'ouvertures de l'app et les événements de conversion. Tu mesures l'efficacité de la campagne en direct.",
      },
      {
        title: "Debug d'un événement personnalisé",
        description: "Tu viens d'ajouter un événement `add_to_cart`. Tu ouvres l'app sur ton téléphone, tu ajoutes un produit au panier, et tu vérifies dans Realtime que l'événement apparaît bien avec les bons paramètres.",
      },
    ],
  },
  {
    name: "Events",
    docUrl: "https://firebase.google.com/docs/analytics/events?hl=fr",
    summary: "Les Events sont les actions que tes utilisateurs effectuent dans ton app. Firebase collecte automatiquement certains événements (first_open, session_start, screen_view), et tu peux créer tes propres événements personnalisés pour tracker ce qui compte pour toi.",
    useCase: "Les événements sont la base de toute analyse. Chaque interaction importante doit être un événement : clic sur un bouton, validation d'un formulaire, achat, partage de contenu. Sans événements, tu es aveugle sur l'usage de ton app.",
    projectStage: "Dès l'intégration d'Analytics. Tu définis ton plan de tracking (quels événements, quels paramètres) en même temps que tu développes chaque fonctionnalité.",
    examples: [
      {
        title: "Tracker les étapes d'un funnel d'achat",
        description: "Tu crées les événements `view_product`, `add_to_cart`, `begin_checkout`, `purchase` avec les paramètres associés (product_id, value, currency). Tu visualises le funnel dans la console pour voir où les utilisateurs abandonnent.",
      },
      {
        title: "Événements de contenu",
        description: "Tu logues `article_read` avec les paramètres `article_id`, `category`, `read_time_seconds`. Tu découvres que les articles de la catégorie « Tutoriels » sont lus 3x plus longtemps que les « Actualités ». Tu ajustes ta stratégie éditoriale.",
      },
      {
        title: "Événements d'erreur utilisateur",
        description: "Tu logues `form_validation_error` avec le champ en erreur et le message. Tu découvres que 30% des utilisateurs se trompent sur le format du numéro de téléphone. Tu améliores le champ avec un masque de saisie.",
      },
    ],
  },
  {
    name: "Events Config",
    docUrl: "https://firebase.google.com/docs/analytics/events?hl=fr",
    summary: "Events Config permet de configurer et gérer tes événements depuis la console Firebase : marquer des événements comme conversions, modifier les paramètres collectés, créer des événements dérivés (à partir d'événements existants avec des conditions).",
    useCase: "Tu utilises Events Config pour organiser et enrichir ton tracking sans modifier le code de l'app. Tu peux créer un événement de conversion à partir d'un événement existant filtré par une condition.",
    projectStage: "En production, quand tu affines ton tracking. Events Config te permet d'itérer sur ta stratégie de mesure sans redéployer l'app.",
    examples: [
      {
        title: "Marquer un événement comme conversion",
        description: "Tu marques l'événement `purchase` comme conversion. Firebase Analytics commence à attribuer les conversions aux campagnes marketing. Tu vois quel canal (push, email, organique) génère le plus de ventes.",
      },
      {
        title: "Créer un événement dérivé",
        description: "Tu veux tracker les achats de plus de 50 euros séparément. Tu crées un événement dérivé `high_value_purchase` à partir de `purchase` avec la condition `value > 50`. Zéro code à modifier dans l'app.",
      },
      {
        title: "Gérer les paramètres personnalisés",
        description: "Tu enregistres les paramètres `article_category` et `author_name` pour qu'ils apparaissent dans les rapports. Par défaut, Firebase n'affiche que les paramètres enregistrés dans la config. Tu peux en enregistrer jusqu'à 50.",
      },
    ],
  },
  {
    name: "Network Settings",
    docUrl: "https://firebase.google.com/docs/analytics?hl=fr",
    summary: "Network Settings te permet de configurer le partage de données Analytics avec d'autres services Google (Google Ads, BigQuery, AdMob) et de contrôler la rétention des données utilisateur.",
    useCase: "Tu configures Network Settings pour connecter Analytics à tes campagnes publicitaires (Google Ads), exporter les données brutes vers BigQuery pour des analyses avancées, ou respecter les exigences RGPD sur la rétention.",
    projectStage: "Lors de la configuration initiale d'Analytics, puis quand tu intègres de nouveaux canaux marketing ou que tu dois te conformer à des réglementations sur les données.",
    examples: [
      {
        title: "Export vers BigQuery",
        description: "Tu actives l'export BigQuery dans Network Settings. Chaque jour, toutes les données brutes d'événements sont exportées dans un dataset BigQuery. Tu peux ensuite écrire des requêtes SQL pour des analyses que la console Firebase ne permet pas.",
      },
      {
        title: "Liaison avec Google Ads",
        description: "Tu lies ton projet Firebase à ton compte Google Ads. Les audiences Firebase deviennent disponibles pour le ciblage publicitaire. Tu peux créer des campagnes ciblant les utilisateurs qui ont abandonné leur panier.",
      },
      {
        title: "Configuration de la rétention RGPD",
        description: "Tu configures la rétention des données utilisateur à 2 mois (au lieu de 14 par défaut) pour respecter le principe de minimisation du RGPD. Les données agrégées restent disponibles, mais les données individuelles sont supprimées.",
      },
    ],
  },
  {
    name: "Audiences",
    docUrl: "https://firebase.google.com/docs/analytics/audiences?hl=fr",
    summary: "Les Audiences sont des segments d'utilisateurs définis par des conditions (comportement, démographie, propriétés). Une fois créées, elles se remplissent automatiquement et peuvent être utilisées pour le ciblage dans Remote Config, A/B Testing, FCM, et Google Ads.",
    useCase: "Les Audiences transforment tes données Analytics en actions. Au lieu de cibler « tous les utilisateurs », tu cibles « les utilisateurs actifs qui n'ont pas acheté depuis 30 jours » pour une campagne de réactivation.",
    projectStage: "En production, quand tu as accumulé suffisamment de données pour créer des segments significatifs. Les Audiences se combinent avec tous les autres services Firebase.",
    examples: [
      {
        title: "Utilisateurs à risque de churn",
        description: "Tu crées une audience « Utilisateurs à risque » : actifs la semaine dernière mais pas cette semaine. Tu envoies une notification push personnalisée à ce segment avec un contenu incitatif pour les faire revenir.",
      },
      {
        title: "Acheteurs premium",
        description: "Tu définis une audience « Premium » : utilisateurs qui ont fait plus de 3 achats ET dont la valeur totale dépasse 100 euros. Tu leur offres un accès anticipé aux nouvelles fonctionnalités via Remote Config.",
      },
      {
        title: "Segment géographique pour A/B Testing",
        description: "Tu crées une audience « Utilisateurs francophones » (France, Belgique, Suisse, Canada francophone). Tu l'utilises dans un A/B Test pour tester une traduction améliorée uniquement sur ce segment.",
      },
    ],
  },
  {
    name: "Custom Definitions",
    docUrl: "https://firebase.google.com/docs/analytics?hl=fr",
    summary: "Les Custom Definitions permettent d'enregistrer des propriétés utilisateur personnalisées et des paramètres d'événements personnalisés pour qu'ils apparaissent dans les rapports Analytics. Sans enregistrement, les paramètres sont collectés mais pas analysables dans la console.",
    useCase: "Tu utilises les Custom Definitions dès que tu veux filtrer ou segmenter tes rapports par des critères métier propres à ton app (type d'abonnement, rôle utilisateur, version du contenu, etc.).",
    projectStage: "En même temps que l'implémentation du tracking. Chaque paramètre personnalisé que tu logues doit être enregistré comme Custom Definition pour être exploitable.",
    examples: [
      {
        title: "Propriété utilisateur : type d'abonnement",
        description: "Tu enregistres la user property `subscription_type` (free, premium, enterprise). Dans les rapports, tu peux comparer le comportement de chaque segment : les premium consultent 3x plus de contenu et ont une rétention 2x meilleure.",
      },
      {
        title: "Paramètre d'événement : catégorie de contenu",
        description: "Tu enregistres le paramètre `content_category` sur l'événement `view_content`. Tu peux maintenant voir la répartition des vues par catégorie et identifier quels types de contenu engagent le plus.",
      },
      {
        title: "Dimension personnalisée pour le scoring",
        description: "Tu crées une user property `engagement_score` (low, medium, high) calculée côté serveur. Tu l'utilises pour comparer les métriques entre les utilisateurs très engagés et les utilisateurs passifs.",
      },
    ],
  },
  {
    name: "Latest Release",
    docUrl: "https://firebase.google.com/docs/analytics?hl=fr",
    summary: "Latest Release affiche les métriques clés de la dernière version publiée de ton app : adoption (% d'utilisateurs sur la nouvelle version), stabilité (taux de crash), et comparaison avec la version précédente.",
    useCase: "Après chaque mise à jour, tu vérifies que la nouvelle version est adoptée correctement et qu'elle ne dégrade pas l'expérience. C'est ton radar post-déploiement.",
    projectStage: "En production, après chaque release. Tu surveilles l'adoption et la stabilité pendant les premiers jours suivant la publication.",
    examples: [
      {
        title: "Suivi de l'adoption d'une mise à jour",
        description: "Tu publies la v4.0. Latest Release montre que 30% des utilisateurs ont migré en 24h, 60% en 48h, 90% en une semaine. Si l'adoption est lente, tu peux forcer la mise à jour via Remote Config ou une bannière in-app.",
      },
      {
        title: "Comparaison de stabilité entre versions",
        description: "La v4.0 a un taux de crash de 0.8% contre 0.3% pour la v3.9. Latest Release met en évidence la régression. Tu investigues avec Crashlytics et tu publies un hotfix v4.0.1.",
      },
      {
        title: "Métriques clés de la release",
        description: "Tu vois en un coup d'œil : 85% d'adoption, 99.2% de sessions sans crash, temps de démarrage moyen de 1.2s (-15% vs version précédente). Tous les voyants sont au vert, la release est un succès.",
      },
    ],
  },
  {
    name: "DebugView",
    docUrl: "https://firebase.google.com/docs/analytics/debugview?hl=fr",
    summary: "DebugView affiche les événements Analytics en temps réel depuis un appareil de développement. Contrairement au dashboard standard (données agrégées avec un délai), DebugView montre chaque événement individuel avec tous ses paramètres, dans l'ordre chronologique.",
    useCase: "DebugView est ton outil de développement pour valider le tracking Analytics. Tu vois exactement quels événements sont envoyés, avec quels paramètres, et dans quel ordre. Indispensable avant de mettre en production.",
    projectStage: "En développement et en QA, à chaque fois que tu ajoutes ou modifies un événement Analytics. Tu valides que tout est correct avant de merger.",
    examples: [
      {
        title: "Valider un nouveau funnel de conversion",
        description: "Tu viens d'implémenter les événements `begin_checkout`, `add_payment_info`, `purchase`. Tu actives le mode debug sur ton appareil, tu effectues un achat test, et tu vérifies dans DebugView que les 3 événements arrivent dans l'ordre avec les bons paramètres.",
      },
      {
        title: "Diagnostiquer un événement manquant",
        description: "Un événement `share_content` n'apparaît pas dans les rapports. Tu actives DebugView, tu déclenches l'action de partage, et tu constates que l'événement n'est pas envoyé. Tu trouves un bug dans la condition qui déclenche le log — le paramètre `content_type` était null.",
      },
      {
        title: "Vérifier les propriétés utilisateur",
        description: "Tu mets à jour la user property `subscription_type` après un achat. Dans DebugView, tu vérifies que la propriété passe bien de `free` à `premium` au bon moment. Tu confirmes que les événements suivants sont bien taggés avec le nouveau type.",
      },
    ],
  },
];
