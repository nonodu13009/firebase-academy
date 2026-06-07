# Glossaire Firebase - Tous les termes techniques expliques simplement

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
> **Mot** : explication simple, comme si on l'expliquait a un ami.
> Rechercher : lien vers une recherche web pour aller plus loin.

---

## A

**API (Application Programming Interface)**
Un guichet. Ton app envoie une demande au guichet ("donne-moi les notes de Jean-Michel"), le guichet repond avec les donnees. L'API definit les regles : quelles demandes sont possibles, dans quel format, quelles reponses attendre.
[Rechercher](https://www.google.com/search?q=API+c%27est+quoi+d%C3%A9butant)

**API Key (cle d'API)**
Un badge d'identification pour ton app. Pas un mot de passe : c'est public. Ca dit a Firebase "cette requete vient de l'app noteflow". La securite ne repose PAS sur cette cle mais sur les Security Rules.
[Rechercher](https://www.google.com/search?q=API+key+Firebase+explication)

**App Check**
Un videur numerique qui verifie que les requetes viennent bien de ton app et pas d'un robot ou d'un script pirate.
[Rechercher](https://www.google.com/search?q=Firebase+App+Check+explication)

**Array (tableau)**
Une liste ordonnee de valeurs. Exemple : `["courses", "travail", "perso"]`. Chaque element a une position (index) : le premier est a l'index 0.
[Rechercher](https://www.google.com/search?q=array+javascript+d%C3%A9butant)

**Async/Await**
Une facon d'ecrire du code qui attend une reponse. `await creerNote(...)` veut dire "attends que la note soit creee avant de continuer". Sans `await`, le code continuerait sans attendre et tu n'aurais pas le resultat.
[Rechercher](https://www.google.com/search?q=async+await+javascript+expliqu%C3%A9+simplement)

**Authentification**
Le processus de verifier l'identite d'un utilisateur. "Es-tu bien Jean-Michel ?" Se fait via un mot de passe, un compte Google, une empreinte digitale, etc.
[Rechercher](https://www.google.com/search?q=authentification+web+explication)

---

## B

**Backend**
Tout ce qui se passe cote serveur, invisible pour l'utilisateur. La base de donnees, la logique metier, la securite. Le contraire du frontend (ce que l'utilisateur voit).
[Rechercher](https://www.google.com/search?q=backend+frontend+diff%C3%A9rence+expliqu%C3%A9)

**Blob (Binary Large Object)**
Un paquet de donnees binaires. Concretement : un fichier (image, PDF, video) avant qu'il ait un nom ou un type. C'est la matiere brute.
[Rechercher](https://www.google.com/search?q=blob+javascript+explication)

**Bucket**
Un conteneur de fichiers dans Cloud Storage. Imagine un coffre-fort geant ou tu ranges tous tes fichiers. Chaque projet Firebase a un bucket par defaut.
[Rechercher](https://www.google.com/search?q=bucket+cloud+storage+c%27est+quoi)

**Build**
La compilation de ton code. Ton code source (TypeScript, JSX) est transforme en fichiers optimises que le navigateur peut lire. Si le build echoue, il y a une erreur dans ton code.
[Rechercher](https://www.google.com/search?q=build+next.js+explication)

---

## C

**Cache**
Une copie locale des donnees pour aller plus vite. Au lieu de demander les donnees au serveur a chaque fois, l'app garde une copie en memoire. Plus rapide, mais peut etre perime.
[Rechercher](https://www.google.com/search?q=cache+web+explication+simple)

**Callback**
Une fonction qu'on passe a une autre fonction, pour qu'elle soit appelee plus tard. Exemple : "quand les notes changent, appelle CETTE fonction". La fonction en question est le callback.
[Rechercher](https://www.google.com/search?q=callback+javascript+expliqu%C3%A9)

**CDN (Content Delivery Network)**
Un reseau de serveurs repartis dans le monde. Ton site est copie sur des serveurs a Paris, New York, Tokyo. Un visiteur japonais recoit le site depuis Tokyo (rapide), pas depuis la France (lent).
[Rechercher](https://www.google.com/search?q=CDN+c%27est+quoi+explication+simple)

**CI/CD (Continuous Integration / Continuous Deployment)**
L'automatisation du processus "tester + deployer". A chaque push de code, les tests se lancent automatiquement. Si tout passe, l'app est deployee automatiquement. Pas d'intervention humaine.
[Rechercher](https://www.google.com/search?q=CI+CD+explication+simple+d%C3%A9butant)

**CLI (Command Line Interface)**
Un outil qu'on utilise en tapant des commandes dans le terminal (le rectangle noir avec du texte). `firebase deploy` est une commande CLI. L'alternative est une interface graphique (GUI) avec des boutons.
[Rechercher](https://www.google.com/search?q=CLI+c%27est+quoi+d%C3%A9butant)

**Cloud**
Des serveurs distants geres par quelqu'un d'autre (Google, Amazon, Microsoft). Au lieu d'avoir ton propre serveur dans ton bureau, tu utilises ceux de Google. Ils gerent la maintenance, la securite, la disponibilite.
[Rechercher](https://www.google.com/search?q=cloud+computing+explication+simple)

**Collection**
Dans Firestore, un dossier qui contient des documents. La collection "notes" contient tous les documents de type note. Comme un dossier dans un classeur.
[Rechercher](https://www.google.com/search?q=Firestore+collection+document+explication)

**Composant (Component)**
Un morceau d'interface reutilisable en React. Un bouton, une carte de note, un formulaire. Tu le codes une fois et tu le reutilises partout.
[Rechercher](https://www.google.com/search?q=composant+React+explication+d%C3%A9butant)

**Console Firebase**
Le site web ou tu geres ton projet Firebase. Tu y vois tes donnees, tes utilisateurs, tes logs, tes parametres. C'est le tableau de bord.
[Rechercher](https://www.google.com/search?q=console+Firebase+comment+utiliser)

**CORS (Cross-Origin Resource Sharing)**
Une securite du navigateur qui empeche un site d'acceder aux donnees d'un autre site. Parfois ca bloque tes requetes en dev. Se resout en configurant les headers cote serveur.
[Rechercher](https://www.google.com/search?q=CORS+explication+simple+d%C3%A9butant)

**CRUD**
Les 4 operations de base sur des donnees : Create (creer), Read (lire), Update (modifier), Delete (supprimer). "Un CRUD de notes" = tu peux creer, lire, modifier et supprimer des notes.
[Rechercher](https://www.google.com/search?q=CRUD+c%27est+quoi)

**Custom Claims**
Des etiquettes que tu colles sur un utilisateur cote serveur. Exemple : `admin: true`. L'app et les Security Rules peuvent verifier ces etiquettes pour donner des acces speciaux.
[Rechercher](https://www.google.com/search?q=Firebase+custom+claims+explication)

---

## D

**Declencheur (Trigger)**
Un evenement qui lance automatiquement une Cloud Function. "Quand un document est cree" est un declencheur. "Quand un fichier est uploade" en est un autre.
[Rechercher](https://www.google.com/search?q=trigger+cloud+function+Firebase)

**Deployer (Deploy)**
Mettre ton app en ligne. Passer de "ca marche sur mon ordi" a "ca marche pour tout le monde sur internet".
[Rechercher](https://www.google.com/search?q=d%C3%A9ployer+application+web+signification)

**Document**
Dans Firestore, une fiche de donnees. Un document a un ID unique et contient des champs (comme les lignes d'un formulaire). La note "Courses" avec son titre et son contenu est un document.
[Rechercher](https://www.google.com/search?q=Firestore+document+explication)

**DNS (Domain Name System)**
L'annuaire d'internet. Quand tu tapes "noteflow.app", le DNS traduit ca en adresse IP (un numero) pour trouver le bon serveur. Quand tu configures un domaine personnalise, tu modifies le DNS.
[Rechercher](https://www.google.com/search?q=DNS+explication+simple)

---

## E

**Emulateur**
Une copie locale d'un service. L'emulateur Firebase reproduit Firestore, Auth, Storage etc. sur ton ordinateur. Tu peux tout tester sans toucher aux donnees reelles.
[Rechercher](https://www.google.com/search?q=Firebase+emulator+suite+explication)

**Endpoint**
L'adresse precise d'un service. `https://api.exemple.com/notes` est un endpoint. C'est le "numero de telephone" que ton app appelle pour obtenir des donnees.
[Rechercher](https://www.google.com/search?q=endpoint+API+c%27est+quoi)

**Environnement**
Le contexte ou ton code tourne. "Environnement de dev" = ton ordi. "Environnement de prod" = les serveurs en ligne. Les variables d'environnement changent selon le contexte (URL de la base, cles, etc.).
[Rechercher](https://www.google.com/search?q=environnement+d%C3%A9veloppement+production+explication)

**Eventarc**
Le systeme de Google Cloud qui achemine les evenements vers les Cloud Functions. Quand un document Firestore est cree, Eventarc detecte l'evenement et declenche la bonne fonction.
[Rechercher](https://www.google.com/search?q=Eventarc+Google+Cloud+explication)

**Export statique**
Transformer ton app Next.js en un ensemble de fichiers HTML/CSS/JS classiques, sans besoin de serveur. Le site est "fige" : tout se passe dans le navigateur.
[Rechercher](https://www.google.com/search?q=next.js+static+export+explication)

---

## F

**Feature Flag**
Un interrupteur ON/OFF pour une fonctionnalite. Tu deploies le code d'une nouvelle fonctionnalite, mais tu la gardes desactivee. Quand tu es pret, tu l'actives via Remote Config. Si ca casse, tu la desactives instantanement.
[Rechercher](https://www.google.com/search?q=feature+flag+c%27est+quoi+explication)

**Fetch**
Aller chercher des donnees. "Fetch les notes" = aller recuperer la liste des notes depuis le serveur.
[Rechercher](https://www.google.com/search?q=fetch+API+javascript+d%C3%A9butant)

**Firestore**
La base de donnees NoSQL de Firebase. Stocke des donnees sous forme de documents dans des collections. Se synchronise en temps reel.
[Rechercher](https://www.google.com/search?q=Cloud+Firestore+c%27est+quoi)

**Frontend**
Tout ce que l'utilisateur voit et touche. Les boutons, les pages, les animations, les formulaires. Le code qui tourne dans le navigateur.
[Rechercher](https://www.google.com/search?q=frontend+c%27est+quoi+d%C3%A9butant)

---

## G

**GraphQL**
Un langage pour interroger une base de donnees. Au lieu de demander "donne-moi TOUT sur l'utilisateur", tu demandes "donne-moi juste le nom et l'email". Tu recois exactement ce que tu demandes, pas plus.
[Rechercher](https://www.google.com/search?q=GraphQL+c%27est+quoi+explication+simple)

**gRPC**
Un protocole de communication entre services, plus rapide que REST/HTTP classique. Utilise par Firebase en interne. Tu n'as generalement pas besoin de t'en occuper.
[Rechercher](https://www.google.com/search?q=gRPC+c%27est+quoi+simple)

---

## H

**Hook (React)**
Une fonction speciale de React qui commence par `use`. `useState` gere un etat, `useEffect` execute du code au bon moment. Les hooks permettent d'ajouter de la logique a un composant.
[Rechercher](https://www.google.com/search?q=hooks+React+explication+d%C3%A9butant)

**HTTPS**
La version securisee de HTTP. Les donnees sont chiffrees entre le navigateur et le serveur. Le petit cadenas dans la barre d'adresse. Firebase Hosting fournit le HTTPS automatiquement.
[Rechercher](https://www.google.com/search?q=HTTPS+c%27est+quoi+explication)

---

## I

**IAM (Identity and Access Management)**
Le systeme de permissions de Google Cloud. Qui a le droit de faire quoi sur ton projet. Plus granulaire que les Security Rules (c'est pour les admins et les services, pas pour les utilisateurs finaux).
[Rechercher](https://www.google.com/search?q=IAM+Google+Cloud+explication)

**ID (identifiant)**
Un code unique qui identifie un element. Chaque utilisateur a un `uid`, chaque document Firestore a un `id`. Deux elements ne peuvent pas avoir le meme ID.
[Rechercher](https://www.google.com/search?q=identifiant+unique+base+de+donn%C3%A9es)

**Index**
Un raccourci pour accelerer les recherches dans la base de donnees. Sans index, Firestore lit TOUS les documents pour trouver ceux qui correspondent. Avec un index, il va directement aux bons documents.
[Rechercher](https://www.google.com/search?q=index+base+de+donn%C3%A9es+explication+simple)

---

## J

**JSON (JavaScript Object Notation)**
Un format de donnees universel. Ca ressemble a ca : `{"nom": "Jean-Michel", "age": 35}`. C'est le format qu'utilisent les APIs, les bases de donnees, les fichiers de config. Lisible par les humains ET les machines.
[Rechercher](https://www.google.com/search?q=JSON+c%27est+quoi+explication+simple)

**JWT (JSON Web Token)**
Un jeton d'identite numerique. Quand tu te connectes, Firebase te donne un JWT. Ce jeton contient ton identite (uid, email) de facon chiffree. Ton app l'envoie avec chaque requete pour prouver qui tu es.
[Rechercher](https://www.google.com/search?q=JWT+token+explication+simple)

---

## K

**Key-Value (cle-valeur)**
La structure la plus simple pour stocker des donnees. Une cle (le nom) et une valeur (le contenu). Exemple : `titre: "Courses"`. La cle est "titre", la valeur est "Courses".
[Rechercher](https://www.google.com/search?q=key+value+pair+explication)

---

## L

**Latence**
Le temps d'attente entre une demande et la reponse. "La latence de cette requete est de 200ms" = il faut 200 millisecondes pour obtenir la reponse. Plus c'est bas, mieux c'est.
[Rechercher](https://www.google.com/search?q=latence+r%C3%A9seau+explication)

**Listener (ecouteur)**
Un bout de code qui attend un evenement. `onSnapshot` est un listener : il ecoute les changements dans Firestore et reagit a chaque modification. Il reste actif jusqu'a ce que tu l'arretes.
[Rechercher](https://www.google.com/search?q=listener+event+javascript+explication)

---

## M

**Machine Learning (ML)**
L'art de faire apprendre un programme a partir de donnees, sans lui donner de regles explicites. Au lieu de coder "si l'utilisateur a 25 ans, montre la version A", le ML decouvre tout seul quelle version marche le mieux pour quel profil.
[Rechercher](https://www.google.com/search?q=machine+learning+explication+simple+d%C3%A9butant)

**Map**
Un objet imbrique dans un document Firestore. C'est un champ qui contient d'autres champs. Exemple : `adresse: { rue: "10 rue du Port", ville: "Marseille" }`.
[Rechercher](https://www.google.com/search?q=map+object+Firestore+explication)

**Middleware**
Du code qui s'execute ENTRE la requete de l'utilisateur et la reponse du serveur. Exemple : un middleware d'authentification verifie le token avant de laisser passer la requete.
[Rechercher](https://www.google.com/search?q=middleware+web+explication+simple)

**Migration**
Deplacer des donnees ou du code d'un systeme a un autre. Ou mettre a jour la structure de ta base de donnees (ajouter un champ, changer un format). Souvent delicat car il faut eviter de perdre des donnees.
[Rechercher](https://www.google.com/search?q=migration+base+de+donn%C3%A9es+explication)

**Mutation**
En GraphQL/SQL Connect, une operation qui modifie des donnees (creer, modifier, supprimer). L'equivalent de `addDoc` ou `updateDoc` en Firestore.
[Rechercher](https://www.google.com/search?q=mutation+GraphQL+explication)

---

## N

**NoSQL**
Un type de base de donnees qui n'utilise PAS le langage SQL. Les donnees sont stockees en documents, en cle-valeur ou en graphes, pas en tables avec des colonnes. Firestore et Realtime Database sont NoSQL.
[Rechercher](https://www.google.com/search?q=NoSQL+vs+SQL+explication+simple)

**Node.js**
Un environnement qui permet d'executer du JavaScript en dehors du navigateur. Les Cloud Functions Firebase tournent sur Node.js. C'est aussi ce qui fait tourner le serveur Next.js.
[Rechercher](https://www.google.com/search?q=Node.js+c%27est+quoi+d%C3%A9butant)

---

## O

**OAuth 2.0**
Le protocole standard pour la connexion via un tiers (Google, Facebook, GitHub). Quand tu cliques "Se connecter avec Google", c'est OAuth 2.0 qui gere le flux. Ton app ne voit jamais le mot de passe Google.
[Rechercher](https://www.google.com/search?q=OAuth+2.0+explication+simple)

**Onboarding**
Le parcours d'accueil d'un nouvel utilisateur. Les ecrans de tutoriel, la configuration initiale, le premier contenu cree. L'objectif : que l'utilisateur comprenne ton app en 30 secondes.
[Rechercher](https://www.google.com/search?q=onboarding+application+explication)

---

## P

**Payload**
Le contenu utile d'un message ou d'une requete. Quand tu envoies une notification push, le payload c'est le titre, le texte et les donnees jointes. Le "colis" dans la livraison.
[Rechercher](https://www.google.com/search?q=payload+API+explication)

**Persistance**
Le fait que les donnees survivent apres la fermeture de l'app. Quand tes notes sont encore la en rouvrant l'app, c'est grace a la persistance (dans Firestore ou dans le cache local).
[Rechercher](https://www.google.com/search?q=persistance+donn%C3%A9es+explication)

**Plan Blaze**
Le plan payant de Firebase (pay-as-you-go). Tu paies ce que tu consommes. Necessaire pour les Cloud Functions, et debloque les limites du plan Spark (gratuit).
[Rechercher](https://www.google.com/search?q=Firebase+plan+Blaze+tarifs)

**Plan Spark**
Le plan gratuit de Firebase. Genereux pour le dev et les petits projets, mais avec des limites (pas de Cloud Functions, quotas sur les operations).
[Rechercher](https://www.google.com/search?q=Firebase+plan+Spark+gratuit+limites)

**Promise**
Un objet JavaScript qui represente une valeur future. "Je te promets de te donner les notes... quand elles seront chargees." `await` attend que la promesse soit tenue.
[Rechercher](https://www.google.com/search?q=promise+javascript+explication+simple)

**Push notification**
Un message qui apparait sur le telephone meme quand l'app est fermee. Le petit bandeau en haut de l'ecran avec un son. Envoye par Cloud Messaging (FCM).
[Rechercher](https://www.google.com/search?q=push+notification+c%27est+quoi)

---

## Q

**Query (requete)**
Une demande de donnees. "Donne-moi toutes les notes creees apres le 1er juin, triees par date" est une query. En Firestore, tu construis les queries avec `query()`, `where()`, `orderBy()`.
[Rechercher](https://www.google.com/search?q=query+base+de+donn%C3%A9es+explication)

**Quota**
La limite d'utilisation d'un service. "50 000 lectures par jour" est un quota. Si tu le depasses, le service s'arrete ou tu es facture en plus (selon ton plan).
[Rechercher](https://www.google.com/search?q=quota+Firebase+explication)

---

## R

**Realtime (temps reel)**
Les donnees se mettent a jour instantanement sans rafraichir la page. Quand quelqu'un cree une note, elle apparait chez toi dans la seconde. C'est `onSnapshot` dans Firestore.
[Rechercher](https://www.google.com/search?q=temps+r%C3%A9el+Firebase+explication)

**Ref (reference)**
Un pointeur vers un emplacement dans Firestore ou Storage. `doc(db, "notes", "abc123")` est une reference vers le document "abc123" dans la collection "notes". Ca ne contient pas les donnees, juste l'adresse.
[Rechercher](https://www.google.com/search?q=reference+Firestore+explication)

**REST API**
Un style d'API base sur HTTP. Tu envoies des requetes GET (lire), POST (creer), PUT (modifier), DELETE (supprimer) a des URLs precises. C'est le standard du web.
[Rechercher](https://www.google.com/search?q=REST+API+explication+simple+d%C3%A9butant)

**Rollback**
Revenir a une version precedente. Ton nouveau deploiement a casse quelque chose ? Tu fais un rollback pour remettre l'ancienne version en ligne en un clic.
[Rechercher](https://www.google.com/search?q=rollback+d%C3%A9ploiement+explication)

---

## S

**Scaling (mise a l'echelle)**
La capacite a gerer plus d'utilisateurs sans que l'app ralentisse. "Ca scale bien" = ca marche aussi bien pour 10 utilisateurs que pour 10 millions. Firebase gere le scaling automatiquement.
[Rechercher](https://www.google.com/search?q=scaling+application+web+explication)

**SDK (Software Development Kit)**
Une boite a outils pour developper. Le SDK Firebase contient toutes les fonctions dont tu as besoin : `addDoc`, `getAuth`, `uploadBytes`, etc. Tu l'installes avec `npm install firebase`.
[Rechercher](https://www.google.com/search?q=SDK+c%27est+quoi+explication)

**Serverless**
Un modele ou tu n'as pas de serveur a gerer. Tu ecris du code, tu le deploies, et Google s'occupe du serveur, du scaling, de la maintenance. Cloud Functions est serverless.
[Rechercher](https://www.google.com/search?q=serverless+explication+simple)

**Snapshot**
Une photo instantanee des donnees a un moment precis. Quand tu lis des donnees Firestore, tu recois un snapshot. C'est une copie figee : les donnees peuvent changer apres, mais ton snapshot reste le meme.
[Rechercher](https://www.google.com/search?q=snapshot+Firestore+explication)

**SPA (Single Page Application)**
Une app web qui ne charge qu'UNE seule page HTML. La navigation se fait en JavaScript sans recharger la page. React et Next.js (en mode client) sont des SPA.
[Rechercher](https://www.google.com/search?q=SPA+single+page+application+explication)

**SQL (Structured Query Language)**
Le langage standard pour interroger des bases de donnees relationnelles (avec des tables et des colonnes). `SELECT * FROM notes WHERE userId = 'abc'` est du SQL. Firestore n'utilise PAS SQL, mais SQL Connect si.
[Rechercher](https://www.google.com/search?q=SQL+c%27est+quoi+explication+d%C3%A9butant)

**SSR (Server-Side Rendering)**
Les pages sont generees sur le serveur AVANT d'etre envoyees au navigateur. Avantage : le contenu est deja la quand la page arrive (bon pour le SEO). Inconvenient : necessite un serveur (App Hosting).
[Rechercher](https://www.google.com/search?q=SSR+server+side+rendering+explication+simple)

**SSL (Secure Sockets Layer)**
Le chiffrement entre le navigateur et le serveur. C'est ce qui met le "S" dans HTTPS et le cadenas dans la barre d'adresse. Firebase le configure automatiquement.
[Rechercher](https://www.google.com/search?q=SSL+certificat+explication+simple)

**State (etat)**
La valeur actuelle d'une variable dans un composant React. `useState("Bonjour")` cree un etat avec la valeur "Bonjour". Quand l'etat change, le composant se re-affiche automatiquement.
[Rechercher](https://www.google.com/search?q=state+React+explication+d%C3%A9butant)

---

## T

**Timestamp**
Un nombre qui represente un moment precis dans le temps. `serverTimestamp()` demande au serveur Firebase de mettre la date et l'heure exactes (plus fiable que l'horloge du navigateur).
[Rechercher](https://www.google.com/search?q=timestamp+explication+simple)

**Token**
Un jeton numerique. Comme un bracelet de festival : il prouve que tu as le droit d'etre la. Firebase donne un token a chaque utilisateur connecte. Le token expire et se renouvelle automatiquement.
[Rechercher](https://www.google.com/search?q=token+authentification+explication)

**TypeScript**
JavaScript avec des types. Au lieu de `let nom = "Jean"` (JavaScript), tu ecris `let nom: string = "Jean"` (TypeScript). L'avantage : les erreurs sont detectees AVANT l'execution, pas pendant.
[Rechercher](https://www.google.com/search?q=TypeScript+c%27est+quoi+d%C3%A9butant)

---

## U

**UID (User ID)**
L'identifiant unique d'un utilisateur dans Firebase. Un code comme `xK9mN2pQ7rT`. Chaque utilisateur a un UID different. C'est ce qui lie les notes a leur proprietaire.
[Rechercher](https://www.google.com/search?q=UID+Firebase+explication)

**Unsubscribe (se desabonner)**
Arreter d'ecouter un evenement. Quand tu quittes la page des notes, tu appelles `unsubscribe()` pour arreter l'ecoute en temps reel. Sinon, le listener continue en arriere-plan et gaspille des ressources.
[Rechercher](https://www.google.com/search?q=unsubscribe+listener+Firebase)

**Upload**
Envoyer un fichier depuis ton appareil vers un serveur distant. "Uploader une photo" = envoyer la photo de ton telephone vers Cloud Storage.
[Rechercher](https://www.google.com/search?q=upload+fichier+explication)

---

## V

**Variable d'environnement**
Une valeur de configuration qui change selon l'environnement (dev, prod). Stockee dans un fichier `.env`, pas dans le code. Exemple : l'URL de ta base de donnees est differente en dev et en prod.
[Rechercher](https://www.google.com/search?q=variable+environnement+.env+explication)

**Vectoriel (embedding vectoriel)**
Une facon de representer du texte ou des images sous forme de nombres. Le mot "chat" devient `[0.2, 0.8, 0.1, ...]`. Deux mots proches en sens (chat/chaton) ont des vecteurs proches. Utilise pour la recherche semantique.
[Rechercher](https://www.google.com/search?q=embedding+vectoriel+explication+simple)

---

## W

**Webhook**
Un appel automatique d'un service vers un autre quand quelque chose se passe. "Quand un paiement Stripe est confirme, appelle cette URL." C'est un declencheur externe.
[Rechercher](https://www.google.com/search?q=webhook+c%27est+quoi+explication+simple)

**WebSocket**
Un canal de communication permanent entre le navigateur et le serveur. Au lieu d'envoyer une requete a chaque fois, la connexion reste ouverte et les donnees circulent dans les deux sens. C'est ce qui permet le temps reel dans Firebase.
[Rechercher](https://www.google.com/search?q=WebSocket+explication+simple)
