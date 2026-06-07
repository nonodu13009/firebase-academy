export interface Product {
  slug: string;
  name: string;
  category: "build" | "run" | "ia";
  description: string;
  docUrl: string;
  formationLevel?: number;
}

export const products: Product[] = [
  // Build
  {
    slug: "authentication",
    name: "Authentication",
    category: "build",
    description: "Plateforme d'identite securisee",
    docUrl: "https://firebase.google.com/docs/auth?hl=fr",
    formationLevel: 2,
  },
  {
    slug: "firestore",
    name: "Cloud Firestore",
    category: "build",
    description: "Base de donnees NoSQL cloud evolutive",
    docUrl: "https://firebase.google.com/docs/firestore?hl=fr",
    formationLevel: 1,
  },
  {
    slug: "realtime-database",
    name: "Realtime Database",
    category: "build",
    description: "Base de donnees NoSQL temps reel",
    docUrl: "https://firebase.google.com/docs/database?hl=fr",
  },
  {
    slug: "cloud-storage",
    name: "Cloud Storage",
    category: "build",
    description: "Stockage de fichiers",
    docUrl: "https://firebase.google.com/docs/storage?hl=fr",
    formationLevel: 4,
  },
  {
    slug: "cloud-functions",
    name: "Cloud Functions",
    category: "build",
    description: "Code backend serverless",
    docUrl: "https://firebase.google.com/docs/functions?hl=fr",
    formationLevel: 4,
  },
  {
    slug: "hosting",
    name: "Firebase Hosting",
    category: "build",
    description: "Hebergement web statique et dynamique",
    docUrl: "https://firebase.google.com/docs/hosting?hl=fr",
    formationLevel: 5,
  },
  {
    slug: "app-hosting",
    name: "App Hosting",
    category: "build",
    description: "Hebergement d'apps full-stack",
    docUrl: "https://firebase.google.com/docs/app-hosting?hl=fr",
  },
  {
    slug: "app-check",
    name: "App Check",
    category: "build",
    description: "Protection contre les abus",
    docUrl: "https://firebase.google.com/docs/app-check?hl=fr",
    formationLevel: 6,
  },
  {
    slug: "security-rules",
    name: "Security Rules",
    category: "build",
    description: "Regles de securite des donnees",
    docUrl: "https://firebase.google.com/docs/rules?hl=fr",
    formationLevel: 3,
  },
  {
    slug: "extensions",
    name: "Extensions",
    category: "build",
    description: "Extensions Firebase preconstruites",
    docUrl: "https://firebase.google.com/docs/extensions?hl=fr",
  },
  {
    slug: "emulator-suite",
    name: "Emulator Suite",
    category: "build",
    description: "Suite d'emulateurs locaux",
    docUrl: "https://firebase.google.com/docs/emulator-suite?hl=fr",
    formationLevel: 0,
  },
  {
    slug: "sql-connect",
    name: "SQL Connect",
    category: "build",
    description: "Base de donnees relationnelle PostgreSQL",
    docUrl: "https://firebase.google.com/docs/sql-connect?hl=fr",
  },
  // Run
  {
    slug: "analytics",
    name: "Google Analytics",
    category: "run",
    description: "Mesure et insights utilisateur",
    docUrl: "https://firebase.google.com/docs/analytics?hl=fr",
    formationLevel: 6,
  },
  {
    slug: "crashlytics",
    name: "Crashlytics",
    category: "run",
    description: "Rapport de plantages en temps reel",
    docUrl: "https://firebase.google.com/docs/crashlytics?hl=fr",
  },
  {
    slug: "performance-monitoring",
    name: "Performance Monitoring",
    category: "run",
    description: "Surveillance des performances",
    docUrl: "https://firebase.google.com/docs/perf-mon?hl=fr",
    formationLevel: 6,
  },
  {
    slug: "remote-config",
    name: "Remote Config",
    category: "run",
    description: "Configuration a distance",
    docUrl: "https://firebase.google.com/docs/remote-config?hl=fr",
    formationLevel: 6,
  },
  {
    slug: "cloud-messaging",
    name: "Cloud Messaging",
    category: "run",
    description: "Notifications push",
    docUrl: "https://firebase.google.com/docs/cloud-messaging?hl=fr",
  },
  {
    slug: "in-app-messaging",
    name: "In-App Messaging",
    category: "run",
    description: "Messages integres a l'application",
    docUrl: "https://firebase.google.com/docs/in-app-messaging?hl=fr",
  },
  {
    slug: "ab-testing",
    name: "A/B Testing",
    category: "run",
    description: "Tests A/B",
    docUrl: "https://firebase.google.com/docs/ab-testing?hl=fr",
  },
  {
    slug: "app-distribution",
    name: "App Distribution",
    category: "run",
    description: "Distribution de versions de test",
    docUrl: "https://firebase.google.com/docs/app-distribution?hl=fr",
  },
  {
    slug: "test-lab",
    name: "Test Lab",
    category: "run",
    description: "Tests sur appareils cloud",
    docUrl: "https://firebase.google.com/docs/test-lab?hl=fr",
  },
  {
    slug: "admob",
    name: "Google AdMob",
    category: "run",
    description: "Monetisation publicitaire",
    docUrl: "https://firebase.google.com/docs/admob?hl=fr",
  },
  // IA
  {
    slug: "ai-logic",
    name: "Firebase AI Logic",
    category: "ia",
    description: "Integration des modeles Gemini",
    docUrl: "https://firebase.google.com/docs/ai-logic?hl=fr",
    formationLevel: 6,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: "build" | "run" | "ia"): Product[] {
  return products.filter((p) => p.category === category);
}
