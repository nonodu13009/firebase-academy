# Niveau 3 - La sécurité

## Table des Matières

- [Objectif](#objectif)
- [Les règles de sécurité en 2 minutes](#les-règles-de-sécurité-en-2-minutes)
- [Étape 1 - Comprendre le danger du mode test](#étape-1---comprendre-le-danger-du-mode-test)
- [Étape 2 - Écrire les règles Firestore](#étape-2---écrire-les-règles-firestore)
- [Étape 3 - Tester les règles](#étape-3---tester-les-règles)
- [Étape 4 - Règles avancées](#étape-4---règles-avancées)
- [Étape 5 - Déployer les règles](#étape-5---déployer-les-règles)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

À la fin de ce niveau, tu auras :

- Des règles de sécurité qui protègent les notes de chaque utilisateur
- La validation des données côté serveur
- La certitude que personne ne peut accéder aux données d'un autre

## Les règles de sécurité en 2 minutes

Au niveau 1, on a activé Firestore en **mode test**. Ça veut dire que n'importe qui peut lire et écrire n'importe quoi dans ta base. En production, c'est une catastrophe.

Les règles de sécurité, c'est un **vigile à l'entrée de chaque donnée**. Pour chaque requête, il vérifie :

1. **Qui demande ?** (authentifié ou non, quel utilisateur)
2. **Quoi ?** (lecture, écriture, suppression)
3. **Sur quelle donnée ?** (quel document, quelle collection)
4. **Les données sont-elles valides ?** (format, taille, champs obligatoires)

Les règles s'exécutent sur les serveurs Firebase, jamais dans le navigateur. Impossible à contourner.

## Étape 1 - Comprendre le danger du mode test

Voici ce que le mode test autorise :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // TOUT LE MONDE PEUT TOUT FAIRE
    }
  }
}
```

Le problème :

- N'importe qui peut lire toutes tes notes
- N'importe qui peut supprimer ta base entière
- N'importe qui peut écrire n'importe quoi

On va corriger ça.

## Étape 2 - Écrire les règles Firestore

Ouvre le fichier `firestore.rules` à la racine de ton projet :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Par défaut, tout est bloqué
    match /{document=**} {
      allow read, write: if false;
    }

    // Règles pour les notes
    match /notes/{noteId} {

      // Lire : seulement si c'est TA note
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      // Créer : seulement si tu es connecté et que tu mets TON userId
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid
                    && request.resource.data.titre is string
                    && request.resource.data.titre.size() > 0
                    && request.resource.data.titre.size() <= 200
                    && request.resource.data.contenu is string;

      // Modifier : seulement TA note, et tu ne peux pas changer le userId
      allow update: if request.auth != null
                    && resource.data.userId == request.auth.uid
                    && request.resource.data.userId == request.auth.uid;

      // Supprimer : seulement TA note
      allow delete: if request.auth != null
                    && resource.data.userId == request.auth.uid;
    }
  }
}
```

### Décryptage ligne par ligne

| Expression               | Signification                                              |
| ------------------------ | ---------------------------------------------------------- |
| `request.auth != null`   | L'utilisateur est connecté                                 |
| `request.auth.uid`       | L'ID de l'utilisateur connecté                             |
| `resource.data`          | Les données existantes du document (avant modification)    |
| `request.resource.data`  | Les nouvelles données envoyées (création ou modification)  |
| `is string`              | Vérifie que le champ est bien du texte                     |
| `.size() > 0`            | Le champ ne doit pas être vide                             |
| `.size() <= 200`         | Le titre fait max 200 caractères                           |

### Le principe clé

Chaque règle répond à une question simple : **"Est-ce que CET utilisateur a le droit de faire CETTE action sur CE document ?"**

## Étape 3 - Tester les règles

### Avec l'émulateur

L'émulateur Firebase charge automatiquement ton fichier `firestore.rules`. Chaque requête est évaluée contre ces règles.

1. Démarre l'émulateur : `firebase emulators:start`
2. Ouvre l'interface : `http://localhost:4000`
3. Essaie de lire/écrire des données
4. Les requêtes refusées apparaissent en rouge dans les logs

### Avec le playground de la console

1. Console Firebase > Firestore > **Règles**
2. Clique sur **Playground des règles**
3. Simule des requêtes avec différents utilisateurs
4. Vérifie que les accès sont correctement bloqués/autorisés

### Scénarii à tester

| Test                                          | Résultat attendu |
| --------------------------------------------- | ---------------- |
| Lire mes notes (connecté)                     | Autorisé         |
| Lire les notes d'un autre                     | Refusé           |
| Créer une note sans être connecté             | Refusé           |
| Créer une note avec le userId d'un autre      | Refusé           |
| Modifier ma note                              | Autorisé         |
| Modifier la note d'un autre                   | Refusé           |
| Supprimer ma note                             | Autorisé         |
| Créer une note avec un titre vide             | Refusé           |
| Créer une note avec un titre de 500 caractères | Refusé           |

## Étape 4 - Règles avancées

### Fonctions personnalisées

Pour éviter la répétition, crée des fonctions dans tes règles :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Fonction : l'utilisateur est-il connecté ?
    function estConnecte() {
      return request.auth != null;
    }

    // Fonction : est-ce le propriétaire du document ?
    function estProprietaire() {
      return estConnecte() && resource.data.userId == request.auth.uid;
    }

    // Fonction : le userId dans les nouvelles données correspond à l'utilisateur ?
    function userIdValide() {
      return request.resource.data.userId == request.auth.uid;
    }

    match /notes/{noteId} {
      allow read: if estProprietaire();
      allow create: if estConnecte() && userIdValide();
      allow update: if estProprietaire() && userIdValide();
      allow delete: if estProprietaire();
    }
  }
}
```

Plus lisible, plus maintenable.

### Préparer le partage de notes (niveau suivant)

On peut déjà prévoir une structure pour les notes partagées :

```
match /notes/{noteId} {
  // Le propriétaire OU quelqu'un dans la liste de partage
  allow read: if estConnecte()
              && (resource.data.userId == request.auth.uid
                  || request.auth.uid in resource.data.partageAvec);
}
```

On implémentera ça en détail plus tard.

## Étape 5 - Déployer les règles

```bash
firebase deploy --only firestore:rules
```

C'est tout. Les règles sont immédiatement actives en production.

> Déploie les règles AVANT de mettre l'app en production.
> En mode test, ta base est vulnérable.

## Ce que tu sais faire maintenant

- Écrire des règles de sécurité Firestore
- Protéger les données par utilisateur
- Valider le format des données côté serveur
- Tester les règles avec l'émulateur
- Déployer les règles en production

### Concepts clés à retenir

| Concept                 | Ce que ça fait                                      |
| ----------------------- | --------------------------------------------------- |
| `request.auth`          | Info sur l'utilisateur qui fait la requête           |
| `resource.data`         | Données existantes du document                      |
| `request.resource.data` | Nouvelles données envoyées                           |
| `allow read`            | Autorise `get` et `list`                             |
| `allow write`           | Autorise `create`, `update`, `delete`                |
| Fonctions               | Factorisent la logique pour la lisibilité            |

---

> Passe au [Niveau 4 - Les fichiers et le backend](niveau-4-backend.md) pour ajouter l'upload de fichiers et la logique serveur.
