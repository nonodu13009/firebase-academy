export interface GlossaryEntry {
  term: string;
  fullTerm?: string;
  definition: string;
  searchUrl: string;
  referenceLink?: string;
  formationLevel?: string;
}

export const glossary: Record<string, GlossaryEntry> = {
  API: {
    term: "API",
    fullTerm: "Application Programming Interface",
    definition:
      "Un guichet. Ton app envoie une demande au guichet, le guichet repond avec les donnees. L'API definit les regles : quelles demandes sont possibles, dans quel format.",
    searchUrl: "https://www.google.com/search?q=API+c%27est+quoi+d%C3%A9butant",
  },
  "API Key": {
    term: "API Key",
    fullTerm: "Cle d'API",
    definition:
      "Un badge d'identification pour ton app. Pas un mot de passe : c'est public. Ca dit a Firebase 'cette requete vient de l'app noteflow'.",
    searchUrl: "https://www.google.com/search?q=API+key+Firebase+explication",
  },
  "App Check": {
    term: "App Check",
    definition:
      "Un videur numerique qui verifie que les requetes viennent bien de ton app et pas d'un robot ou d'un script pirate.",
    searchUrl: "https://www.google.com/search?q=Firebase+App+Check+explication",
    referenceLink: "/reference/app-check",
    formationLevel: "/formation/niveau-6",
  },
  Array: {
    term: "Array",
    fullTerm: "Tableau",
    definition:
      'Une liste ordonnee de valeurs. Exemple : ["courses", "travail", "perso"]. Chaque element a une position (index) : le premier est a l\'index 0.',
    searchUrl: "https://www.google.com/search?q=array+javascript+d%C3%A9butant",
  },
  "Async/Await": {
    term: "Async/Await",
    definition:
      "Une facon d'ecrire du code qui attend une reponse. 'await creerNote(...)' veut dire 'attends que la note soit creee avant de continuer'.",
    searchUrl:
      "https://www.google.com/search?q=async+await+javascript+expliqu%C3%A9+simplement",
  },
  Authentification: {
    term: "Authentification",
    definition:
      "Le processus de verifier l'identite d'un utilisateur. 'Es-tu bien Jean-Michel ?' Se fait via un mot de passe, un compte Google, etc.",
    searchUrl: "https://www.google.com/search?q=authentification+web+explication",
    referenceLink: "/reference/authentication",
    formationLevel: "/formation/niveau-2",
  },
  Backend: {
    term: "Backend",
    definition:
      "Tout ce qui se passe cote serveur, invisible pour l'utilisateur. La base de donnees, la logique metier, la securite. Le contraire du frontend.",
    searchUrl:
      "https://www.google.com/search?q=backend+frontend+diff%C3%A9rence+expliqu%C3%A9",
  },
  Blob: {
    term: "Blob",
    fullTerm: "Binary Large Object",
    definition:
      "Un paquet de donnees binaires. Concretement : un fichier (image, PDF, video) avant qu'il ait un nom ou un type.",
    searchUrl: "https://www.google.com/search?q=blob+javascript+explication",
  },
  Bucket: {
    term: "Bucket",
    definition:
      "Un conteneur de fichiers dans Cloud Storage. Imagine un coffre-fort geant ou tu ranges tous tes fichiers.",
    searchUrl: "https://www.google.com/search?q=bucket+cloud+storage+c%27est+quoi",
    referenceLink: "/reference/cloud-storage",
  },
  Build: {
    term: "Build",
    definition:
      "La compilation de ton code. Ton code source (TypeScript, JSX) est transforme en fichiers optimises que le navigateur peut lire.",
    searchUrl: "https://www.google.com/search?q=build+next.js+explication",
  },
  Cache: {
    term: "Cache",
    definition:
      "Une copie locale des donnees pour aller plus vite. Au lieu de demander les donnees au serveur a chaque fois, l'app garde une copie en memoire.",
    searchUrl: "https://www.google.com/search?q=cache+web+explication+simple",
  },
  Callback: {
    term: "Callback",
    definition:
      "Une fonction qu'on passe a une autre fonction, pour qu'elle soit appelee plus tard. 'Quand les notes changent, appelle CETTE fonction.'",
    searchUrl: "https://www.google.com/search?q=callback+javascript+expliqu%C3%A9",
  },
  CDN: {
    term: "CDN",
    fullTerm: "Content Delivery Network",
    definition:
      "Un reseau de serveurs repartis dans le monde. Ton site est copie sur des serveurs a Paris, New York, Tokyo. Un visiteur japonais recoit le site depuis Tokyo, pas la France.",
    searchUrl: "https://www.google.com/search?q=CDN+c%27est+quoi+explication+simple",
  },
  "CI/CD": {
    term: "CI/CD",
    fullTerm: "Continuous Integration / Continuous Deployment",
    definition:
      "L'automatisation du processus 'tester + deployer'. A chaque push de code, les tests se lancent et l'app est deployee automatiquement.",
    searchUrl:
      "https://www.google.com/search?q=CI+CD+explication+simple+d%C3%A9butant",
  },
  CLI: {
    term: "CLI",
    fullTerm: "Command Line Interface",
    definition:
      "Un outil qu'on utilise en tapant des commandes dans le terminal. 'firebase deploy' est une commande CLI.",
    searchUrl: "https://www.google.com/search?q=CLI+c%27est+quoi+d%C3%A9butant",
  },
  Cloud: {
    term: "Cloud",
    definition:
      "Des serveurs distants geres par quelqu'un d'autre (Google, Amazon). Au lieu d'avoir ton propre serveur, tu utilises les leurs.",
    searchUrl: "https://www.google.com/search?q=cloud+computing+explication+simple",
  },
  Collection: {
    term: "Collection",
    definition:
      "Dans Firestore, un dossier qui contient des documents. La collection 'notes' contient tous les documents de type note.",
    searchUrl:
      "https://www.google.com/search?q=Firestore+collection+document+explication",
    referenceLink: "/reference/firestore",
    formationLevel: "/formation/niveau-1",
  },
  CRUD: {
    term: "CRUD",
    definition:
      "Les 4 operations de base sur des donnees : Create (creer), Read (lire), Update (modifier), Delete (supprimer).",
    searchUrl: "https://www.google.com/search?q=CRUD+c%27est+quoi",
  },
  "Custom Claims": {
    term: "Custom Claims",
    definition:
      "Des etiquettes que tu colles sur un utilisateur cote serveur. Exemple : admin: true. Les Security Rules peuvent verifier ces etiquettes.",
    searchUrl: "https://www.google.com/search?q=Firebase+custom+claims+explication",
  },
  Document: {
    term: "Document",
    definition:
      "Dans Firestore, une fiche de donnees avec un ID unique et des champs. La note 'Courses' avec son titre et son contenu est un document.",
    searchUrl: "https://www.google.com/search?q=Firestore+document+explication",
    referenceLink: "/reference/firestore",
    formationLevel: "/formation/niveau-1",
  },
  DNS: {
    term: "DNS",
    fullTerm: "Domain Name System",
    definition:
      "L'annuaire d'internet. Quand tu tapes 'noteflow.app', le DNS traduit ca en adresse IP pour trouver le bon serveur.",
    searchUrl: "https://www.google.com/search?q=DNS+explication+simple",
  },
  Emulateur: {
    term: "Emulateur",
    definition:
      "Une copie locale d'un service. L'emulateur Firebase reproduit Firestore, Auth, Storage sur ton ordinateur pour tester sans toucher aux vraies donnees.",
    searchUrl: "https://www.google.com/search?q=Firebase+emulator+suite+explication",
    referenceLink: "/reference/emulator-suite",
    formationLevel: "/formation/niveau-0",
  },
  Endpoint: {
    term: "Endpoint",
    definition:
      "L'adresse precise d'un service. C'est le 'numero de telephone' que ton app appelle pour obtenir des donnees.",
    searchUrl: "https://www.google.com/search?q=endpoint+API+c%27est+quoi",
  },
  "Feature Flag": {
    term: "Feature Flag",
    definition:
      "Un interrupteur ON/OFF pour une fonctionnalite. Tu deploies le code mais tu gardes la feature desactivee. Quand tu es pret, tu l'actives.",
    searchUrl: "https://www.google.com/search?q=feature+flag+c%27est+quoi+explication",
  },
  Fetch: {
    term: "Fetch",
    definition:
      "Aller chercher des donnees. 'Fetch les notes' = aller recuperer la liste des notes depuis le serveur.",
    searchUrl: "https://www.google.com/search?q=fetch+API+javascript+d%C3%A9butant",
  },
  Firestore: {
    term: "Firestore",
    fullTerm: "Cloud Firestore",
    definition:
      "La base de donnees NoSQL de Firebase. Stocke des donnees sous forme de documents dans des collections. Se synchronise en temps reel.",
    searchUrl: "https://www.google.com/search?q=Cloud+Firestore+c%27est+quoi",
    referenceLink: "/reference/firestore",
    formationLevel: "/formation/niveau-1",
  },
  Frontend: {
    term: "Frontend",
    definition:
      "Tout ce que l'utilisateur voit et touche. Les boutons, les pages, les animations. Le code qui tourne dans le navigateur.",
    searchUrl: "https://www.google.com/search?q=frontend+c%27est+quoi+d%C3%A9butant",
  },
  GraphQL: {
    term: "GraphQL",
    definition:
      "Un langage pour interroger une base de donnees. Tu demandes exactement ce que tu veux, pas plus.",
    searchUrl:
      "https://www.google.com/search?q=GraphQL+c%27est+quoi+explication+simple",
  },
  Hook: {
    term: "Hook",
    fullTerm: "React Hook",
    definition:
      "Une fonction speciale de React qui commence par 'use'. useState gere un etat, useEffect execute du code au bon moment.",
    searchUrl:
      "https://www.google.com/search?q=hooks+React+explication+d%C3%A9butant",
  },
  HTTPS: {
    term: "HTTPS",
    definition:
      "La version securisee de HTTP. Les donnees sont chiffrees entre le navigateur et le serveur. Le petit cadenas dans la barre d'adresse.",
    searchUrl: "https://www.google.com/search?q=HTTPS+c%27est+quoi+explication",
  },
  Index: {
    term: "Index",
    definition:
      "Un raccourci pour accelerer les recherches dans la base de donnees. Sans index, Firestore lit TOUS les documents pour trouver ceux qui correspondent.",
    searchUrl:
      "https://www.google.com/search?q=index+base+de+donn%C3%A9es+explication+simple",
  },
  JSON: {
    term: "JSON",
    fullTerm: "JavaScript Object Notation",
    definition:
      'Un format de donnees universel. Ca ressemble a ca : {"nom": "Jean-Michel", "age": 35}. Lisible par les humains ET les machines.',
    searchUrl: "https://www.google.com/search?q=JSON+c%27est+quoi+explication+simple",
  },
  JWT: {
    term: "JWT",
    fullTerm: "JSON Web Token",
    definition:
      "Un jeton d'identite numerique. Quand tu te connectes, Firebase te donne un JWT qui prouve qui tu es a chaque requete.",
    searchUrl: "https://www.google.com/search?q=JWT+token+explication+simple",
  },
  Latence: {
    term: "Latence",
    definition:
      "Le temps d'attente entre une demande et la reponse. Plus c'est bas, mieux c'est.",
    searchUrl: "https://www.google.com/search?q=latence+r%C3%A9seau+explication",
  },
  Listener: {
    term: "Listener",
    fullTerm: "Ecouteur",
    definition:
      "Un bout de code qui attend un evenement. onSnapshot est un listener : il ecoute les changements dans Firestore et reagit a chaque modification.",
    searchUrl:
      "https://www.google.com/search?q=listener+event+javascript+explication",
  },
  "Machine Learning": {
    term: "Machine Learning",
    fullTerm: "Apprentissage automatique",
    definition:
      "L'art de faire apprendre un programme a partir de donnees, sans lui donner de regles explicites. Le ML decouvre tout seul ce qui marche le mieux.",
    searchUrl:
      "https://www.google.com/search?q=machine+learning+explication+simple+d%C3%A9butant",
  },
  NoSQL: {
    term: "NoSQL",
    definition:
      "Un type de base de donnees qui n'utilise PAS le langage SQL. Les donnees sont stockees en documents, pas en tables avec des colonnes.",
    searchUrl: "https://www.google.com/search?q=NoSQL+vs+SQL+explication+simple",
  },
  "Node.js": {
    term: "Node.js",
    definition:
      "Un environnement qui permet d'executer du JavaScript en dehors du navigateur. Les Cloud Functions Firebase tournent sur Node.js.",
    searchUrl: "https://www.google.com/search?q=Node.js+c%27est+quoi+d%C3%A9butant",
  },
  "OAuth 2.0": {
    term: "OAuth 2.0",
    definition:
      "Le protocole standard pour la connexion via un tiers (Google, Facebook). Ton app ne voit jamais le mot de passe Google.",
    searchUrl: "https://www.google.com/search?q=OAuth+2.0+explication+simple",
  },
  Payload: {
    term: "Payload",
    definition:
      "Le contenu utile d'un message ou d'une requete. Le 'colis' dans la livraison.",
    searchUrl: "https://www.google.com/search?q=payload+API+explication",
  },
  Promise: {
    term: "Promise",
    definition:
      "Un objet JavaScript qui represente une valeur future. 'Je te promets de te donner les notes... quand elles seront chargees.' await attend la promesse.",
    searchUrl:
      "https://www.google.com/search?q=promise+javascript+explication+simple",
  },
  Query: {
    term: "Query",
    fullTerm: "Requete",
    definition:
      "Une demande de donnees. 'Donne-moi toutes les notes creees apres le 1er juin, triees par date' est une query.",
    searchUrl:
      "https://www.google.com/search?q=query+base+de+donn%C3%A9es+explication",
  },
  SDK: {
    term: "SDK",
    fullTerm: "Software Development Kit",
    definition:
      "Une boite a outils pour developper. Le SDK Firebase contient toutes les fonctions dont tu as besoin : addDoc, getAuth, uploadBytes, etc.",
    searchUrl: "https://www.google.com/search?q=SDK+c%27est+quoi+explication",
  },
  Serverless: {
    term: "Serverless",
    definition:
      "Un modele ou tu n'as pas de serveur a gerer. Tu ecris du code, tu le deploies, et Google s'occupe du reste. Cloud Functions est serverless.",
    searchUrl: "https://www.google.com/search?q=serverless+explication+simple",
  },
  Snapshot: {
    term: "Snapshot",
    definition:
      "Une photo instantanee des donnees a un moment precis. Quand tu lis des donnees Firestore, tu recois un snapshot : une copie figee.",
    searchUrl: "https://www.google.com/search?q=snapshot+Firestore+explication",
  },
  SSR: {
    term: "SSR",
    fullTerm: "Server-Side Rendering",
    definition:
      "Les pages sont generees sur le serveur AVANT d'etre envoyees au navigateur. Bon pour le SEO.",
    searchUrl:
      "https://www.google.com/search?q=SSR+server+side+rendering+explication+simple",
  },
  SSL: {
    term: "SSL",
    fullTerm: "Secure Sockets Layer",
    definition:
      "Le chiffrement entre le navigateur et le serveur. C'est ce qui met le cadenas dans la barre d'adresse. Firebase le configure automatiquement.",
    searchUrl: "https://www.google.com/search?q=SSL+certificat+explication+simple",
  },
  Token: {
    term: "Token",
    definition:
      "Un jeton numerique. Comme un bracelet de festival : il prouve que tu as le droit d'etre la. Firebase en donne un a chaque utilisateur connecte.",
    searchUrl: "https://www.google.com/search?q=token+authentification+explication",
  },
  TypeScript: {
    term: "TypeScript",
    definition:
      "JavaScript avec des types. Les erreurs sont detectees AVANT l'execution, pas pendant. Utilise dans toute la formation.",
    searchUrl:
      "https://www.google.com/search?q=TypeScript+c%27est+quoi+d%C3%A9butant",
  },
  UID: {
    term: "UID",
    fullTerm: "User ID",
    definition:
      "L'identifiant unique d'un utilisateur dans Firebase. Un code comme xK9mN2pQ7rT. C'est ce qui lie les notes a leur proprietaire.",
    searchUrl: "https://www.google.com/search?q=UID+Firebase+explication",
  },
  Webhook: {
    term: "Webhook",
    definition:
      "Un appel automatique d'un service vers un autre quand quelque chose se passe. C'est un declencheur externe.",
    searchUrl:
      "https://www.google.com/search?q=webhook+c%27est+quoi+explication+simple",
  },
  WebSocket: {
    term: "WebSocket",
    definition:
      "Un canal de communication permanent entre le navigateur et le serveur. Les donnees circulent dans les deux sens en continu. C'est ce qui permet le temps reel.",
    searchUrl: "https://www.google.com/search?q=WebSocket+explication+simple",
  },
};

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return (
    glossary[term] ||
    Object.values(glossary).find(
      (e) => e.term.toLowerCase() === term.toLowerCase()
    )
  );
}

export function getAllTerms(): GlossaryEntry[] {
  return Object.values(glossary).sort((a, b) =>
    a.term.localeCompare(b.term, "fr")
  );
}
