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
    title: "Découverte",
    subtitle: "Ton premier projet Firebase",
    description:
      "Créer un projet Firebase, installer la CLI, connecter une app Next.js, lancer l'émulateur local.",
    products: ["Console", "CLI", "Émulateur"],
  },
  {
    id: 1,
    slug: "niveau-1",
    title: "Les données",
    subtitle: "CRUD de notes avec Firestore",
    description:
      "Créer, lire, modifier, supprimer des documents. Écouter les changements en temps réel. Construire une interface CRUD.",
    products: ["Firestore"],
  },
  {
    id: 2,
    slug: "niveau-2",
    title: "Les utilisateurs",
    subtitle: "Inscription, connexion, profil",
    description:
      "Connexion Google et email. Protéger les pages. Lier les notes à un utilisateur.",
    products: ["Authentication"],
  },
  {
    id: 3,
    slug: "niveau-3",
    title: "La sécurité",
    subtitle: "Règles d'accès, qui peut faire quoi",
    description:
      "Écrire des règles de sécurité Firestore. Valider les données côté serveur. Tester avec l'émulateur.",
    products: ["Security Rules"],
  },
  {
    id: 4,
    slug: "niveau-4",
    title: "Les fichiers et le backend",
    subtitle: "Upload d'images, logique serveur",
    description:
      "Uploader des fichiers, sécuriser le stockage, écrire des Cloud Functions déclenchées par des événements.",
    products: ["Cloud Storage", "Cloud Functions"],
  },
  {
    id: 5,
    slug: "niveau-5",
    title: "En ligne",
    subtitle: "Déploiement, domaine, HTTPS",
    description:
      "Déployer sur Firebase Hosting, configurer un domaine, mettre en place les previews GitHub automatiques.",
    products: ["Hosting"],
  },
  {
    id: 6,
    slug: "niveau-6",
    title: "Niveau pro",
    subtitle: "Analytics, config à distance, IA",
    description:
      "Tracker l'utilisation avec Analytics, modifier l'app à distance avec Remote Config, intégrer l'IA Gemini, surveiller les performances.",
    products: ["Analytics", "Remote Config", "AI Logic", "Performance", "App Check"],
  },
];
