# Cloud Storage for Firebase

## Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Opérations principales](#opérations-principales)
- [Sécurité](#sécurité)
- [Plateformes supportées](#plateformes-supportées)
- [Intégrations](#intégrations)
- [Parcours de démarrage](#parcours-de-démarrage)
- [Liens utiles](#liens-utiles)

## Vue d'ensemble

Cloud Storage for Firebase est un service de stockage d'objets puissant, simple et économique conçu pour les développeurs d'applications. Il permet de stocker et servir du contenu généré par les utilisateurs comme des photos, des vidéos et d'autres fichiers.

Cloud Storage est construit sur l'infrastructure Google Cloud Storage, offrant une haute disponibilité et une redondance mondiale.

## Fonctionnalités clés

- **Robustesse** : les uploads et downloads reprennent automatiquement en cas d'interruption réseau
- **Sécurité** : règles de sécurité déclaratives intégrées avec Firebase Authentication
- **Scalabilité** : stockage à l'échelle de l'exaoctet sur l'infrastructure Google
- **Intégration Google Cloud** : accès aux mêmes fichiers via les APIs Google Cloud Storage

## Opérations principales

### Créer une référence

Les références pointent vers un fichier dans le stockage :

```javascript
import { getStorage, ref } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'images/photo.jpg');
```

### Importer des fichiers (Upload)

Importez des fichiers depuis un Blob, File, tableau d'octets ou chaîne base64 :

```javascript
import { uploadBytes } from "firebase/storage";

const file = // ... File ou Blob
uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Fichier importé !');
});
```

### Télécharger des fichiers (Download)

Obtenez une URL de téléchargement pour accéder aux fichiers :

```javascript
import { getDownloadURL } from "firebase/storage";

getDownloadURL(ref(storage, 'images/photo.jpg'))
  .then((url) => {
    // Utiliser l'URL
  });
```

### Métadonnées de fichiers

Gérez les métadonnées (type MIME, taille, dates, métadonnées personnalisées) de vos fichiers.

### Supprimer des fichiers

Supprimez les fichiers par leur référence.

### Répertorier les fichiers

Listez les fichiers et préfixes dans un répertoire de stockage.

### Gestion des erreurs

Gérez les erreurs courantes : fichier introuvable, non autorisé, quota dépassé, etc.

## Sécurité

### Règles de sécurité Storage

Les règles de sécurité Cloud Storage contrôlent l'accès aux fichiers :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### Bonnes pratiques

- Authentifier les utilisateurs avant les uploads
- Valider le type et la taille des fichiers dans les règles
- Utiliser des chemins basés sur l'UID utilisateur

## Plateformes supportées

- iOS+ (Swift, Objective-C)
- Android (Kotlin, Java)
- Web (JavaScript)
- Flutter (Dart)
- C++
- Unity
- Admin SDK

## Intégrations

- **Cloud Functions** : déclencher du code sur les uploads/suppressions de fichiers
- **Google Cloud Storage** : accès aux mêmes buckets via les APIs Google Cloud
- **Firebase Extensions** : redimensionnement d'images automatique, etc.

## Parcours de démarrage

1. **Créer un bucket** Cloud Storage dans la console Firebase
2. **Configurer les règles** de sécurité
3. **Installer le SDK** Cloud Storage pour votre plateforme
4. **Initialiser** le service dans votre app
5. **Créer des références** vers les fichiers
6. **Importer/télécharger** des fichiers

## Liens utiles

- [Documentation officielle](https://firebase.google.com/docs/storage?hl=fr)
- [Guide Web](https://firebase.google.com/docs/storage/web/start?hl=fr)
- [Guide Android](https://firebase.google.com/docs/storage/android/start?hl=fr)
- [Guide iOS](https://firebase.google.com/docs/storage/ios/start?hl=fr)
- [Règles de sécurité](https://firebase.google.com/docs/storage/security?hl=fr)
