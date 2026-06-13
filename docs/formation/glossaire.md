# Glossaire Firebase - Tous les termes techniques expliqués simplement

## Table des Matières

- [A](#a)
- [B](#b)
- [C](#c)
- [D](#d)
- [E](#e)
- [F](#f)
- [G](#g)
- [H](#h)
- [I](#i)
- [J](#j)
- [K](#k)
- [L](#l)
- [M](#m)
- [N](#n)
- [O](#o)
- [P](#p)
- [Q](#q)
- [R](#r)
- [S](#s)
- [T](#t)
- [U](#u)
- [V](#v)
- [W](#w)

Chaque terme suit le format :
> **Mot** : explication simple, comme si on l'expliquait à un ami.
> Rechercher : lien vers une recherche web pour aller plus loin.

---

## A

**API (Application Programming Interface)**
Un guichet. Ton app envoie une demande au guichet ("donne-moi les notes de Jean-Michel"), le guichet répond avec les données. L'API définit les règles : quelles demandes sont possibles, dans quel format, quelles réponses attendre.
[Rechercher](https://www.google.com/search?q=API+c%27est+quoi+d%C3%A9butant)

**API Key (clé d'API)**
Un badge d'identification pour ton app. Pas un mot de passe : c'est public. Ça dit à Firebase "cette requête vient de l'app noteflow". La sécurité ne repose PAS sur cette clé mais sur les Security Rules.
[Rechercher](https://www.google.com/search?q=API+key+Firebase+explication)

**App Check**
Un videur numérique qui vérifie que les requêtes viennent bien de ton app et pas d'un robot ou d'un script pirate.
[Rechercher](https://www.google.com/search?q=Firebase+App+Check+explication)

**Array (tableau)**
Une liste ordonnée de valeurs. Exemple : `["courses", "travail", "perso"]`. Chaque élément a une position (index) : le premier est à l'index 0.
[Rechercher](https://www.google.com/search?q=array+javascript+d%C3%A9butant)

**Async/Await**
Une façon d'écrire du code qui attend une réponse. `await creerNote(...)` veut dire "attends que la note soit créée avant de continuer". Sans `await`, le code continuerait sans attendre et tu n'aurais pas le résultat.
[Rechercher](https://www.google.com/search?q=async+await+javascript+expliqu%C3%A9+simplement)

**Authentification**
Le processus de vérifier l'identité d'un utilisateur. "Es-tu bien Jean-Michel ?" Se fait via un mot de passe, un compte Google, une empreinte digitale, etc.
[Rechercher](https://www.google.com/search?q=authentification+web+explication)

---

## B

**Backend**
Tout ce qui se passe côté serveur, invisible pour l'utilisateur. La base de données, la logique métier, la sécurité. Le contraire du frontend (ce que l'utilisateur voit).
[Rechercher](https://www.google.com/search?q=backend+frontend+diff%C3%A9rence+expliqu%C3%A9)

**Blob (Binary Large Object)**
Un paquet de données binaires. Concrètement : un fichier (image, PDF, vidéo) avant qu'il ait un nom ou un type. C'est la matière brute.
[Rechercher](https://www.google.com/search?q=blob+javascript+explication)

**Bucket**
Un conteneur de fichiers dans Cloud Storage. Imagine un coffre-fort géant où tu ranges tous tes fichiers. Chaque projet Firebase a un bucket par défaut.
[Rechercher](https://www.google.com/search?q=bucket+cloud+storage+c%27est+quoi)

**Build**
La compilation de ton code. Ton code source (TypeScript, JSX) est transformé en fichiers optimisés que le navigateur peut lire. Si le build échoue, il y a une erreur dans ton code.
[Rechercher](https://www.google.com/search?q=build+next.js+explication)

---

## C

**Cache**
Une copie locale des données pour aller plus vite. Au lieu de demander les données au serveur à chaque fois, l'app garde une copie en mémoire. Plus rapide, mais peut être périmé.
[Rechercher](https://www.google.com/search?q=cache+web+explication+simple)

**Callback**
Une fonction qu'on passe à une autre fonction, pour qu'elle soit appelée plus tard. Exemple : "quand les notes changent, appelle CETTE fonction". La fonction en question est le callback.
[Rechercher](https://www.google.com/search?q=callback+javascript+expliqu%C3%A9)

**CDN (Content Delivery Network)**
Un réseau de serveurs répartis dans le monde. Ton site est copié sur des serveurs à Paris, New York, Tokyo. Un visiteur japonais reçoit le site depuis Tokyo (rapide), pas depuis la France (lent).
[Rechercher](https://www.google.com/search?q=CDN+c%27est+quoi+explication+simple)

**CI/CD (Continuous Integration / Continuous Deployment)**
L'automatisation du processus "tester + déployer". À chaque push de code, les tests se lancent automatiquement. Si tout passe, l'app est déployée automatiquement. Pas d'intervention humaine.
[Rechercher](https://www.google.com/search?q=CI+CD+explication+simple+d%C3%A9butant)

**CLI (Command Line Interface)**
Un outil qu'on utilise en tapant des commandes dans le terminal (le rectangle noir avec du texte). `firebase deploy` est une commande CLI. L'alternative est une interface graphique (GUI) avec des boutons.
[Rechercher](https://www.google.com/search?q=CLI+c%27est+quoi+d%C3%A9butant)

**Cloud**
Des serveurs distants gérés par quelqu'un d'autre (Google, Amazon, Microsoft). Au lieu d'avoir ton propre serveur dans ton bureau, tu utilises ceux de Google. Ils gèrent la maintenance, la sécurité, la disponibilité.
[Rechercher](https://www.google.com/search?q=cloud+computing+explication+simple)

**Collection**
Dans Firestore, un dossier qui contient des documents. La collection "notes" contient tous les documents de type note. Comme un dossier dans un classeur.
[Rechercher](https://www.google.com/search?q=Firestore+collection+document+explication)

**Composant (Component)**
Un morceau d'interface réutilisable en React. Un bouton, une carte de note, un formulaire. Tu le codes une fois et tu le réutilises partout.
[Rechercher](https://www.google.com/search?q=composant+React+explication+d%C3%A9butant)

**Console Firebase**
Le site web où tu gères ton projet Firebase. Tu y vois tes données, tes utilisateurs, tes logs, tes paramètres. C'est le tableau de bord.
[Rechercher](https://www.google.com/search?q=console+Firebase+comment+utiliser)

**CORS (Cross-Origin Resource Sharing)**
Une sécurité du navigateur qui empêche un site d'accéder aux données d'un autre site. Parfois ça bloque tes requêtes en dev. Se résout en configurant les headers côté serveur.
[Rechercher](https://www.google.com/search?q=CORS+explication+simple+d%C3%A9butant)

**CRUD**
Les 4 opérations de base sur des données : Create (créer), Read (lire), Update (modifier), Delete (supprimer). "Un CRUD de notes" = tu peux créer, lire, modifier et supprimer des notes.
[Rechercher](https://www.google.com/search?q=CRUD+c%27est+quoi)

**Custom Claims**
Des étiquettes que tu colles sur un utilisateur côté serveur. Exemple : `admin: true`. L'app et les Security Rules peuvent vérifier ces étiquettes pour donner des accès spéciaux.
[Rechercher](https://www.google.com/search?q=Firebase+custom+claims+explication)

---

## D

**Déclencheur (Trigger)**
Un événement qui lance automatiquement une Cloud Function. "Quand un document est créé" est un déclencheur. "Quand un fichier est uploadé" en est un autre.
[Rechercher](https://www.google.com/search?q=trigger+cloud+function+Firebase)

**Déployer (Deploy)**
Mettre ton app en ligne. Passer de "ça marche sur mon ordi" à "ça marche pour tout le monde sur internet".
[Rechercher](https://www.google.com/search?q=d%C3%A9ployer+application+web+signification)

**Document**
Dans Firestore, une fiche de données. Un document a un ID unique et contient des champs (comme les lignes d'un formulaire). La note "Courses" avec son titre et son contenu est un document.
[Rechercher](https://www.google.com/search?q=Firestore+document+explication)

**DNS (Domain Name System)**
L'annuaire d'internet. Quand tu tapes "noteflow.app", le DNS traduit ça en adresse IP (un numéro) pour trouver le bon serveur. Quand tu configures un domaine personnalisé, tu modifies le DNS.
[Rechercher](https://www.google.com/search?q=DNS+explication+simple)

---

## E

**Émulateur**
Une copie locale d'un service. L'émulateur Firebase reproduit Firestore, Auth, Storage etc. sur ton ordinateur. Tu peux tout tester sans toucher aux données réelles.
[Rechercher](https://www.google.com/search?q=Firebase+emulator+suite+explication)

**Endpoint**
L'adresse précise d'un service. `https://api.exemple.com/notes` est un endpoint. C'est le "numéro de téléphone" que ton app appelle pour obtenir des données.
[Rechercher](https://www.google.com/search?q=endpoint+API+c%27est+quoi)

**Environnement**
Le contexte où ton code tourne. "Environnement de dev" = ton ordi. "Environnement de prod" = les serveurs en ligne. Les variables d'environnement changent selon le contexte (URL de la base, clés, etc.).
[Rechercher](https://www.google.com/search?q=environnement+d%C3%A9veloppement+production+explication)

**Eventarc**
Le système de Google Cloud qui achemine les événements vers les Cloud Functions. Quand un document Firestore est créé, Eventarc détecte l'événement et déclenche la bonne fonction.
[Rechercher](https://www.google.com/search?q=Eventarc+Google+Cloud+explication)

**Export statique**
Transformer ton app Next.js en un ensemble de fichiers HTML/CSS/JS classiques, sans besoin de serveur. Le site est "figé" : tout se passe dans le navigateur.
[Rechercher](https://www.google.com/search?q=next.js+static+export+explication)

---

## F

**Feature Flag**
Un interrupteur ON/OFF pour une fonctionnalité. Tu déploies le code d'une nouvelle fonctionnalité, mais tu la gardes désactivée. Quand tu es prêt, tu l'actives via Remote Config. Si ça casse, tu la désactives instantanément.
[Rechercher](https://www.google.com/search?q=feature+flag+c%27est+quoi+explication)

**Fetch**
Aller chercher des données. "Fetch les notes" = aller récupérer la liste des notes depuis le serveur.
[Rechercher](https://www.google.com/search?q=fetch+API+javascript+d%C3%A9butant)

**Firestore**
La base de données NoSQL de Firebase. Stocke des données sous forme de documents dans des collections. Se synchronise en temps réel.
[Rechercher](https://www.google.com/search?q=Cloud+Firestore+c%27est+quoi)

**Frontend**
Tout ce que l'utilisateur voit et touche. Les boutons, les pages, les animations, les formulaires. Le code qui tourne dans le navigateur.
[Rechercher](https://www.google.com/search?q=frontend+c%27est+quoi+d%C3%A9butant)

---

## G

**GraphQL**
Un langage pour interroger une base de données. Au lieu de demander "donne-moi TOUT sur l'utilisateur", tu demandes "donne-moi juste le nom et l'email". Tu reçois exactement ce que tu demandes, pas plus.
[Rechercher](https://www.google.com/search?q=GraphQL+c%27est+quoi+explication+simple)

**gRPC**
Un protocole de communication entre services, plus rapide que REST/HTTP classique. Utilisé par Firebase en interne. Tu n'as généralement pas besoin de t'en occuper.
[Rechercher](https://www.google.com/search?q=gRPC+c%27est+quoi+simple)

---

## H

**Hook (React)**
Une fonction spéciale de React qui commence par `use`. `useState` gère un état, `useEffect` exécute du code au bon moment. Les hooks permettent d'ajouter de la logique à un composant.
[Rechercher](https://www.google.com/search?q=hooks+React+explication+d%C3%A9butant)

**HTTPS**
La version sécurisée de HTTP. Les données sont chiffrées entre le navigateur et le serveur. Le petit cadenas dans la barre d'adresse. Firebase Hosting fournit le HTTPS automatiquement.
[Rechercher](https://www.google.com/search?q=HTTPS+c%27est+quoi+explication)

---

## I

**IAM (Identity and Access Management)**
Le système de permissions de Google Cloud. Qui a le droit de faire quoi sur ton projet. Plus granulaire que les Security Rules (c'est pour les admins et les services, pas pour les utilisateurs finaux).
[Rechercher](https://www.google.com/search?q=IAM+Google+Cloud+explication)

**ID (identifiant)**
Un code unique qui identifie un élément. Chaque utilisateur a un `uid`, chaque document Firestore a un `id`. Deux éléments ne peuvent pas avoir le même ID.
[Rechercher](https://www.google.com/search?q=identifiant+unique+base+de+donn%C3%A9es)

**Index**
Un raccourci pour accélérer les recherches dans la base de données. Sans index, Firestore lit TOUS les documents pour trouver ceux qui correspondent. Avec un index, il va directement aux bons documents.
[Rechercher](https://www.google.com/search?q=index+base+de+donn%C3%A9es+explication+simple)

---

## J

**JSON (JavaScript Object Notation)**
Un format de données universel. Ça ressemble à ça : `{"nom": "Jean-Michel", "age": 35}`. C'est le format qu'utilisent les APIs, les bases de données, les fichiers de config. Lisible par les humains ET les machines.
[Rechercher](https://www.google.com/search?q=JSON+c%27est+quoi+explication+simple)

**JWT (JSON Web Token)**
Un jeton d'identité numérique. Quand tu te connectes, Firebase te donne un JWT. Ce jeton contient ton identité (uid, email) de façon chiffrée. Ton app l'envoie avec chaque requête pour prouver qui tu es.
[Rechercher](https://www.google.com/search?q=JWT+token+explication+simple)

---

## K

**Key-Value (clé-valeur)**
La structure la plus simple pour stocker des données. Une clé (le nom) et une valeur (le contenu). Exemple : `titre: "Courses"`. La clé est "titre", la valeur est "Courses".
[Rechercher](https://www.google.com/search?q=key+value+pair+explication)

---

## L

**Latence**
Le temps d'attente entre une demande et la réponse. "La latence de cette requête est de 200ms" = il faut 200 millisecondes pour obtenir la réponse. Plus c'est bas, mieux c'est.
[Rechercher](https://www.google.com/search?q=latence+r%C3%A9seau+explication)

**Listener (écouteur)**
Un bout de code qui attend un événement. `onSnapshot` est un listener : il écoute les changements dans Firestore et réagit à chaque modification. Il reste actif jusqu'à ce que tu l'arrêtes.
[Rechercher](https://www.google.com/search?q=listener+event+javascript+explication)

---

## M

**Machine Learning (ML)**
L'art de faire apprendre un programme à partir de données, sans lui donner de règles explicites. Au lieu de coder "si l'utilisateur a 25 ans, montre la version A", le ML découvre tout seul quelle version marche le mieux pour quel profil.
[Rechercher](https://www.google.com/search?q=machine+learning+explication+simple+d%C3%A9butant)

**Map**
Un objet imbriqué dans un document Firestore. C'est un champ qui contient d'autres champs. Exemple : `adresse: { rue: "10 rue du Port", ville: "Marseille" }`.
[Rechercher](https://www.google.com/search?q=map+object+Firestore+explication)

**Middleware**
Du code qui s'exécute ENTRE la requête de l'utilisateur et la réponse du serveur. Exemple : un middleware d'authentification vérifie le token avant de laisser passer la requête.
[Rechercher](https://www.google.com/search?q=middleware+web+explication+simple)

**Migration**
Déplacer des données ou du code d'un système à un autre. Ou mettre à jour la structure de ta base de données (ajouter un champ, changer un format). Souvent délicat car il faut éviter de perdre des données.
[Rechercher](https://www.google.com/search?q=migration+base+de+donn%C3%A9es+explication)

**Mutation**
En GraphQL/SQL Connect, une opération qui modifie des données (créer, modifier, supprimer). L'équivalent de `addDoc` ou `updateDoc` en Firestore.
[Rechercher](https://www.google.com/search?q=mutation+GraphQL+explication)

---

## N

**NoSQL**
Un type de base de données qui n'utilise PAS le langage SQL. Les données sont stockées en documents, en clé-valeur ou en graphes, pas en tables avec des colonnes. Firestore et Realtime Database sont NoSQL.
[Rechercher](https://www.google.com/search?q=NoSQL+vs+SQL+explication+simple)

**Node.js**
Un environnement qui permet d'exécuter du JavaScript en dehors du navigateur. Les Cloud Functions Firebase tournent sur Node.js. C'est aussi ce qui fait tourner le serveur Next.js.
[Rechercher](https://www.google.com/search?q=Node.js+c%27est+quoi+d%C3%A9butant)

---

## O

**OAuth 2.0**
Le protocole standard pour la connexion via un tiers (Google, Facebook, GitHub). Quand tu cliques "Se connecter avec Google", c'est OAuth 2.0 qui gère le flux. Ton app ne voit jamais le mot de passe Google.
[Rechercher](https://www.google.com/search?q=OAuth+2.0+explication+simple)

**Onboarding**
Le parcours d'accueil d'un nouvel utilisateur. Les écrans de tutoriel, la configuration initiale, le premier contenu créé. L'objectif : que l'utilisateur comprenne ton app en 30 secondes.
[Rechercher](https://www.google.com/search?q=onboarding+application+explication)

---

## P

**Payload**
Le contenu utile d'un message ou d'une requête. Quand tu envoies une notification push, le payload c'est le titre, le texte et les données jointes. Le "colis" dans la livraison.
[Rechercher](https://www.google.com/search?q=payload+API+explication)

**Persistance**
Le fait que les données survivent après la fermeture de l'app. Quand tes notes sont encore là en rouvrant l'app, c'est grâce à la persistance (dans Firestore ou dans le cache local).
[Rechercher](https://www.google.com/search?q=persistance+donn%C3%A9es+explication)

**Plan Blaze**
Le plan payant de Firebase (pay-as-you-go). Tu paies ce que tu consommes. Nécessaire pour les Cloud Functions, et débloque les limites du plan Spark (gratuit).
[Rechercher](https://www.google.com/search?q=Firebase+plan+Blaze+tarifs)

**Plan Spark**
Le plan gratuit de Firebase. Généreux pour le dev et les petits projets, mais avec des limites (pas de Cloud Functions, quotas sur les opérations).
[Rechercher](https://www.google.com/search?q=Firebase+plan+Spark+gratuit+limites)

**Promise**
Un objet JavaScript qui représente une valeur future. "Je te promets de te donner les notes... quand elles seront chargées." `await` attend que la promesse soit tenue.
[Rechercher](https://www.google.com/search?q=promise+javascript+explication+simple)

**Push notification**
Un message qui apparaît sur le téléphone même quand l'app est fermée. Le petit bandeau en haut de l'écran avec un son. Envoyé par Cloud Messaging (FCM).
[Rechercher](https://www.google.com/search?q=push+notification+c%27est+quoi)

---

## Q

**Query (requête)**
Une demande de données. "Donne-moi toutes les notes créées après le 1er juin, triées par date" est une query. En Firestore, tu construis les queries avec `query()`, `where()`, `orderBy()`.
[Rechercher](https://www.google.com/search?q=query+base+de+donn%C3%A9es+explication)

**Quota**
La limite d'utilisation d'un service. "50 000 lectures par jour" est un quota. Si tu le dépasses, le service s'arrête ou tu es facturé en plus (selon ton plan).
[Rechercher](https://www.google.com/search?q=quota+Firebase+explication)

---

## R

**Realtime (temps réel)**
Les données se mettent à jour instantanément sans rafraîchir la page. Quand quelqu'un crée une note, elle apparaît chez toi dans la seconde. C'est `onSnapshot` dans Firestore.
[Rechercher](https://www.google.com/search?q=temps+r%C3%A9el+Firebase+explication)

**Ref (référence)**
Un pointeur vers un emplacement dans Firestore ou Storage. `doc(db, "notes", "abc123")` est une référence vers le document "abc123" dans la collection "notes". Ça ne contient pas les données, juste l'adresse.
[Rechercher](https://www.google.com/search?q=reference+Firestore+explication)

**REST API**
Un style d'API basé sur HTTP. Tu envoies des requêtes GET (lire), POST (créer), PUT (modifier), DELETE (supprimer) à des URLs précises. C'est le standard du web.
[Rechercher](https://www.google.com/search?q=REST+API+explication+simple+d%C3%A9butant)

**Rollback**
Revenir à une version précédente. Ton nouveau déploiement a cassé quelque chose ? Tu fais un rollback pour remettre l'ancienne version en ligne en un clic.
[Rechercher](https://www.google.com/search?q=rollback+d%C3%A9ploiement+explication)

---

## S

**Scaling (mise à l'échelle)**
La capacité à gérer plus d'utilisateurs sans que l'app ralentisse. "Ça scale bien" = ça marche aussi bien pour 10 utilisateurs que pour 10 millions. Firebase gère le scaling automatiquement.
[Rechercher](https://www.google.com/search?q=scaling+application+web+explication)

**SDK (Software Development Kit)**
Une boîte à outils pour développer. Le SDK Firebase contient toutes les fonctions dont tu as besoin : `addDoc`, `getAuth`, `uploadBytes`, etc. Tu l'installes avec `npm install firebase`.
[Rechercher](https://www.google.com/search?q=SDK+c%27est+quoi+explication)

**Serverless**
Un modèle où tu n'as pas de serveur à gérer. Tu écris du code, tu le déploies, et Google s'occupe du serveur, du scaling, de la maintenance. Cloud Functions est serverless.
[Rechercher](https://www.google.com/search?q=serverless+explication+simple)

**Snapshot**
Une photo instantanée des données à un moment précis. Quand tu lis des données Firestore, tu reçois un snapshot. C'est une copie figée : les données peuvent changer après, mais ton snapshot reste le même.
[Rechercher](https://www.google.com/search?q=snapshot+Firestore+explication)

**SPA (Single Page Application)**
Une app web qui ne charge qu'UNE seule page HTML. La navigation se fait en JavaScript sans recharger la page. React et Next.js (en mode client) sont des SPA.
[Rechercher](https://www.google.com/search?q=SPA+single+page+application+explication)

**SQL (Structured Query Language)**
Le langage standard pour interroger des bases de données relationnelles (avec des tables et des colonnes). `SELECT * FROM notes WHERE userId = 'abc'` est du SQL. Firestore n'utilise PAS SQL, mais SQL Connect si.
[Rechercher](https://www.google.com/search?q=SQL+c%27est+quoi+explication+d%C3%A9butant)

**SSR (Server-Side Rendering)**
Les pages sont générées sur le serveur AVANT d'être envoyées au navigateur. Avantage : le contenu est déjà là quand la page arrive (bon pour le SEO). Inconvénient : nécessite un serveur (App Hosting).
[Rechercher](https://www.google.com/search?q=SSR+server+side+rendering+explication+simple)

**SSL (Secure Sockets Layer)**
Le chiffrement entre le navigateur et le serveur. C'est ce qui met le "S" dans HTTPS et le cadenas dans la barre d'adresse. Firebase le configure automatiquement.
[Rechercher](https://www.google.com/search?q=SSL+certificat+explication+simple)

**State (état)**
La valeur actuelle d'une variable dans un composant React. `useState("Bonjour")` crée un état avec la valeur "Bonjour". Quand l'état change, le composant se ré-affiche automatiquement.
[Rechercher](https://www.google.com/search?q=state+React+explication+d%C3%A9butant)

---

## T

**Timestamp**
Un nombre qui représente un moment précis dans le temps. `serverTimestamp()` demande au serveur Firebase de mettre la date et l'heure exactes (plus fiable que l'horloge du navigateur).
[Rechercher](https://www.google.com/search?q=timestamp+explication+simple)

**Token**
Un jeton numérique. Comme un bracelet de festival : il prouve que tu as le droit d'être là. Firebase donne un token à chaque utilisateur connecté. Le token expire et se renouvelle automatiquement.
[Rechercher](https://www.google.com/search?q=token+authentification+explication)

**TypeScript**
JavaScript avec des types. Au lieu de `let nom = "Jean"` (JavaScript), tu écris `let nom: string = "Jean"` (TypeScript). L'avantage : les erreurs sont détectées AVANT l'exécution, pas pendant.
[Rechercher](https://www.google.com/search?q=TypeScript+c%27est+quoi+d%C3%A9butant)

---

## U

**UID (User ID)**
L'identifiant unique d'un utilisateur dans Firebase. Un code comme `xK9mN2pQ7rT`. Chaque utilisateur a un UID différent. C'est ce qui lie les notes à leur propriétaire.
[Rechercher](https://www.google.com/search?q=UID+Firebase+explication)

**Unsubscribe (se désabonner)**
Arrêter d'écouter un événement. Quand tu quittes la page des notes, tu appelles `unsubscribe()` pour arrêter l'écoute en temps réel. Sinon, le listener continue en arrière-plan et gaspille des ressources.
[Rechercher](https://www.google.com/search?q=unsubscribe+listener+Firebase)

**Upload**
Envoyer un fichier depuis ton appareil vers un serveur distant. "Uploader une photo" = envoyer la photo de ton téléphone vers Cloud Storage.
[Rechercher](https://www.google.com/search?q=upload+fichier+explication)

---

## V

**Variable d'environnement**
Une valeur de configuration qui change selon l'environnement (dev, prod). Stockée dans un fichier `.env`, pas dans le code. Exemple : l'URL de ta base de données est différente en dev et en prod.
[Rechercher](https://www.google.com/search?q=variable+environnement+.env+explication)

**Vectoriel (embedding vectoriel)**
Une façon de représenter du texte ou des images sous forme de nombres. Le mot "chat" devient `[0.2, 0.8, 0.1, ...]`. Deux mots proches en sens (chat/chaton) ont des vecteurs proches. Utilisé pour la recherche sémantique.
[Rechercher](https://www.google.com/search?q=embedding+vectoriel+explication+simple)

---

## W

**Webhook**
Un appel automatique d'un service vers un autre quand quelque chose se passe. "Quand un paiement Stripe est confirmé, appelle cette URL." C'est un déclencheur externe.
[Rechercher](https://www.google.com/search?q=webhook+c%27est+quoi+explication+simple)

**WebSocket**
Un canal de communication permanent entre le navigateur et le serveur. Au lieu d'envoyer une requête à chaque fois, la connexion reste ouverte et les données circulent dans les deux sens. C'est ce qui permet le temps réel dans Firebase.
[Rechercher](https://www.google.com/search?q=WebSocket+explication+simple)
