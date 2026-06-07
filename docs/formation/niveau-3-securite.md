# Niveau 3 - La securite

## Table des Matières

- [Objectif](#objectif)
- [Les regles de securite en 2 minutes](#les-regles-de-securite-en-2-minutes)
- [Etape 1 - Comprendre le danger du mode test](#etape-1---comprendre-le-danger-du-mode-test)
- [Etape 2 - Ecrire les regles Firestore](#etape-2---ecrire-les-regles-firestore)
- [Etape 3 - Tester les regles](#etape-3---tester-les-regles)
- [Etape 4 - Regles avancees](#etape-4---regles-avancees)
- [Etape 5 - Deployer les regles](#etape-5---deployer-les-regles)
- [Ce que tu sais faire maintenant](#ce-que-tu-sais-faire-maintenant)

## Objectif

A la fin de ce niveau, tu auras :

- Des regles de securite qui protegent les notes de chaque utilisateur
- La validation des donnees cote serveur
- La certitude que personne ne peut acceder aux donnees d'un autre

## Les regles de securite en 2 minutes

Au niveau 1, on a active Firestore en **mode test**. Ca veut dire que n'importe qui peut lire et ecrire n'importe quoi dans ta base. En production, c'est une catastrophe.

Les regles de securite, c'est un **vigile a l'entree de chaque donnee**. Pour chaque requete, il verifie :

1. **Qui demande ?** (authentifie ou non, quel utilisateur)
2. **Quoi ?** (lecture, ecriture, suppression)
3. **Sur quelle donnee ?** (quel document, quelle collection)
4. **Les donnees sont-elles valides ?** (format, taille, champs obligatoires)

Les regles s'executent sur les serveurs Firebase, jamais dans le navigateur. Impossible a contourner.

## Etape 1 - Comprendre le danger du mode test

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

Le probleme :

- N'importe qui peut lire toutes tes notes
- N'importe qui peut supprimer ta base entiere
- N'importe qui peut ecrire n'importe quoi

On va corriger ca.

## Etape 2 - Ecrire les regles Firestore

Ouvre le fichier `firestore.rules` a la racine de ton projet :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Par defaut, tout est bloque
    match /{document=**} {
      allow read, write: if false;
    }

    // Regles pour les notes
    match /notes/{noteId} {

      // Lire : seulement si c'est TA note
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;

      // Creer : seulement si tu es connecte et que tu mets TON userId
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

### Decryptage ligne par ligne

| Expression | Signification |
| ---------- | ------------- |
| `request.auth != null` | L'utilisateur est connecte |
| `request.auth.uid` | L'ID de l'utilisateur connecte |
| `resource.data` | Les donnees existantes du document (avant modification) |
| `request.resource.data` | Les nouvelles donnees envoyees (creation ou modification) |
| `is string` | Verifie que le champ est bien du texte |
| `.size() > 0` | Le champ ne doit pas etre vide |
| `.size() <= 200` | Le titre fait max 200 caracteres |

### Le principe cle

Chaque regle repond a une question simple : **"Est-ce que CET utilisateur a le droit de faire CETTE action sur CE document ?"**

## Etape 3 - Tester les regles

### Avec l'emulateur

L'emulateur Firebase charge automatiquement ton fichier `firestore.rules`. Chaque requete est evaluee contre ces regles.

1. Demarre l'emulateur : `firebase emulators:start`
2. Ouvre l'interface : `http://localhost:4000`
3. Essaie de lire/ecrire des donnees
4. Les requetes refusees apparaissent en rouge dans les logs

### Avec le playground de la console

1. Console Firebase > Firestore > **Regles**
2. Clique sur **Playground des regles**
3. Simule des requetes avec differents utilisateurs
4. Verifie que les acces sont correctement bloques/autorises

### Scenarii a tester

| Test | Resultat attendu |
| ---- | ----------------- |
| Lire mes notes (connecte) | Autorise |
| Lire les notes d'un autre | Refuse |
| Creer une note sans etre connecte | Refuse |
| Creer une note avec le userId d'un autre | Refuse |
| Modifier ma note | Autorise |
| Modifier la note d'un autre | Refuse |
| Supprimer ma note | Autorise |
| Creer une note avec un titre vide | Refuse |
| Creer une note avec un titre de 500 caracteres | Refuse |

## Etape 4 - Regles avancees

### Fonctions personnalisees

Pour eviter la repetition, cree des fonctions dans tes regles :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Fonction : l'utilisateur est-il connecte ?
    function estConnecte() {
      return request.auth != null;
    }

    // Fonction : est-ce le proprietaire du document ?
    function estProprietaire() {
      return estConnecte() && resource.data.userId == request.auth.uid;
    }

    // Fonction : le userId dans les nouvelles donnees correspond a l'utilisateur ?
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

### Preparer le partage de notes (niveau suivant)

On peut deja prevoir une structure pour les notes partagees :

```
match /notes/{noteId} {
  // Le proprietaire OU quelqu'un dans la liste de partage
  allow read: if estConnecte()
              && (resource.data.userId == request.auth.uid
                  || request.auth.uid in resource.data.partageAvec);
}
```

On implementera ca en detail plus tard.

## Etape 5 - Deployer les regles

```bash
firebase deploy --only firestore:rules
```

C'est tout. Les regles sont immediatement actives en production.

> Deploie les regles AVANT de mettre l'app en production.
> En mode test, ta base est vulnerable.

## Ce que tu sais faire maintenant

- Ecrire des regles de securite Firestore
- Proteger les donnees par utilisateur
- Valider le format des donnees cote serveur
- Tester les regles avec l'emulateur
- Deployer les regles en production

### Concepts cles a retenir

| Concept | Ce que ca fait |
| ------- | -------------- |
| `request.auth` | Info sur l'utilisateur qui fait la requete |
| `resource.data` | Donnees existantes du document |
| `request.resource.data` | Nouvelles donnees envoyees |
| `allow read` | Autorise `get` et `list` |
| `allow write` | Autorise `create`, `update`, `delete` |
| Fonctions | Factorisent la logique pour la lisibilite |

---

> Passe au [Niveau 4 - Les fichiers et le backend](niveau-4-backend.md) pour ajouter l'upload de fichiers et la logique serveur.
