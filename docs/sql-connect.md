# Firebase SQL Connect (Data Connect)

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Schémas et requêtes](#schémas-et-requêtes)
- [SDK et plateformes](#sdk-et-plateformes)
- [Développement et tests](#développement-et-tests)
- [Solutions avancées](#solutions-avancées)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Firebase SQL Connect (anciennement Data Connect) est un service de base de données relationnelle PostgreSQL entièrement géré. Il permet de créer et faire évoluer des applications avec une base de données SQL, tout en bénéficiant de l'écosystème Firebase.

SQL Connect utilise GraphQL comme langage de schéma et de requêtes, avec PostgreSQL comme moteur de base de données sous-jacent.

## Fonctionnalités clés

- **PostgreSQL géré** : base de données relationnelle complète, sans gestion d'infrastructure
- **Schémas GraphQL** : définition du modèle de données via GraphQL
- **Requêtes et mutations** : opérations CRUD typées et sécurisées
- **Autorisation intégrée** : contrôle d'accès déclaratif via directives GraphQL
- **SQL natif** : accès direct au SQL quand nécessaire
- **Temps réel** : abonnements en temps réel aux modifications
- **Génération de SDK** : SDK typés générés automatiquement pour chaque plateforme

## Schémas et requêtes

### Définition du schéma

Les schémas sont définis en GraphQL et mappés automatiquement sur des tables PostgreSQL :

```graphql
type User @table {
  id: UUID! @default(expr: "uuidV4()")
  name: String!
  email: String!
  createdAt: DateTime! @default(expr: "request.time")
}

type Post @table {
  id: UUID! @default(expr: "uuidV4()")
  title: String!
  content: String!
  author: User!
}
```

### Requêtes

```graphql
query ListPosts @auth(level: PUBLIC) {
  posts {
    id
    title
    content
    author {
      name
    }
  }
}
```

### Mutations

```graphql
mutation CreatePost($title: String!, $content: String!)
  @auth(level: USER) {
  post_insert(data: {
    title: $title,
    content: $content,
    authorId_expr: "auth.uid"
  })
}
```

### Autorisation

Contrôle d'accès via la directive `@auth` :

| Niveau | Description |
| ------ | ----------- |
| `PUBLIC` | Accessible sans authentification |
| `USER` | Utilisateur authentifié requis |
| `USER_ANON` | Utilisateur authentifié (y compris anonyme) |
| `NO_ACCESS` | Accès serveur uniquement |

## SDK et plateformes

### Génération automatique de SDK

SQL Connect génère des SDK typés pour chaque plateforme :

- **Web** (JavaScript/TypeScript)
- **Android** (Kotlin)
- **iOS** (Swift)
- **Flutter** (Dart)

### SDK Admin

Accès serveur via le SDK Admin Firebase (Node.js, Python, Go, Java).

## Développement et tests

- **Émulateur SQL Connect** : développement et tests locaux
- **Génération de données de test** : outils pour peupler la base
- **Opérations groupées** : import/export en masse
- **CI/CD** : intégration avec les pipelines d'intégration continue

## Solutions avancées

- **Assistance IA** : aide à la conception des schémas, requêtes et mutations
- **Cloud Functions** : extension avec du code serverless
- **Résolveurs personnalisés** : logique métier côté serveur
- **Recherche vectorielle** : recherche par similarité via embeddings
- **Recherche en texte intégral** : recherche full-text dans les données

## Parcours de démarrage

1. **Créer un projet** Firebase avec SQL Connect activé
2. **Définir** le schéma GraphQL
3. **Écrire** les requêtes et mutations
4. **Configurer** les règles d'autorisation
5. **Générer** les SDK pour vos plateformes
6. **Intégrer** dans votre application
7. **Déployer** en production

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/sql-connect?hl=fr)
- [Démarrage rapide Android](https://firebase.google.com/docs/sql-connect/quickstart-android?hl=fr)
- [Démarrage rapide React](https://firebase.google.com/docs/sql-connect/quickstart-react?hl=fr)
- [Référence GraphQL](https://firebase.google.com/docs/sql-connect/graphql-reference?hl=fr)
