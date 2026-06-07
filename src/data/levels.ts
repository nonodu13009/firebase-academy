export interface Level {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  products: string[];
}

export const levels: Level[] = [
  {
    id: 0,
    slug: "niveau-0",
    title: "Decouverte",
    subtitle: "Ton premier projet Firebase",
    description:
      "Creer un projet Firebase, installer la CLI, connecter une app Next.js, lancer l'emulateur local.",
    products: ["Console", "CLI", "Emulateur"],
  },
  {
    id: 1,
    slug: "niveau-1",
    title: "Les donnees",
    subtitle: "CRUD de notes avec Firestore",
    description:
      "Creer, lire, modifier, supprimer des documents. Ecouter les changements en temps reel. Construire une interface CRUD.",
    products: ["Firestore"],
  },
  {
    id: 2,
    slug: "niveau-2",
    title: "Les utilisateurs",
    subtitle: "Inscription, connexion, profil",
    description:
      "Connexion Google et email. Proteger les pages. Lier les notes a un utilisateur.",
    products: ["Authentication"],
  },
  {
    id: 3,
    slug: "niveau-3",
    title: "La securite",
    subtitle: "Regles d'acces, qui peut faire quoi",
    description:
      "Ecrire des regles de securite Firestore. Valider les donnees cote serveur. Tester avec l'emulateur.",
    products: ["Security Rules"],
  },
  {
    id: 4,
    slug: "niveau-4",
    title: "Les fichiers et le backend",
    subtitle: "Upload d'images, logique serveur",
    description:
      "Uploader des fichiers, securiser le stockage, ecrire des Cloud Functions declenchees par des evenements.",
    products: ["Cloud Storage", "Cloud Functions"],
  },
  {
    id: 5,
    slug: "niveau-5",
    title: "En ligne",
    subtitle: "Deploiement, domaine, HTTPS",
    description:
      "Deployer sur Firebase Hosting, configurer un domaine, mettre en place les previews GitHub automatiques.",
    products: ["Hosting"],
  },
  {
    id: 6,
    slug: "niveau-6",
    title: "Niveau pro",
    subtitle: "Analytics, config a distance, IA",
    description:
      "Tracker l'utilisation avec Analytics, modifier l'app a distance avec Remote Config, integrer l'IA Gemini, surveiller les performances.",
    products: ["Analytics", "Remote Config", "AI Logic", "Performance", "App Check"],
  },
];
