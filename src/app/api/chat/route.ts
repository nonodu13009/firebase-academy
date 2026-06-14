import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// --- Chargement de la documentation au démarrage ---

const DOCS_DIR = path.join(process.cwd(), "docs");
const FORMATION_DIR = path.join(DOCS_DIR, "formation");

// Mapping page → fichiers de doc pertinents
const PAGE_TO_DOCS: Record<string, string[]> = {
  "/formation/niveau-0": ["formation/niveau-0-decouverte.md", "emulator-suite.md"],
  "/formation/niveau-1": ["formation/niveau-1-donnees.md", "firestore.md"],
  "/formation/niveau-2": ["formation/niveau-2-utilisateurs.md", "authentication.md"],
  "/formation/niveau-3": ["formation/niveau-3-securite.md", "security-rules.md"],
  "/formation/niveau-4": ["formation/niveau-4-backend.md", "cloud-storage.md", "cloud-functions.md"],
  "/formation/niveau-5": ["formation/niveau-5-deploiement.md", "hosting.md", "app-hosting.md"],
  "/formation/niveau-6": ["formation/niveau-6-pro.md", "analytics.md", "remote-config.md", "ai-logic.md", "performance-monitoring.md", "app-check.md"],
  "/glossaire": ["formation/glossaire.md"],
  "/exemples": ["formation/exemples-concrets.md"],
};

// Mapping mots-clés → fichiers de doc
const KEYWORD_TO_DOCS: Record<string, string[]> = {
  firestore: ["firestore.md", "formation/niveau-1-donnees.md"],
  "base de données": ["firestore.md", "realtime-database.md", "sql-connect.md"],
  authentification: ["authentication.md", "formation/niveau-2-utilisateurs.md"],
  authentication: ["authentication.md", "formation/niveau-2-utilisateurs.md"],
  auth: ["authentication.md", "formation/niveau-2-utilisateurs.md"],
  connexion: ["authentication.md", "formation/niveau-2-utilisateurs.md"],
  "security rules": ["security-rules.md", "formation/niveau-3-securite.md"],
  règles: ["security-rules.md", "formation/niveau-3-securite.md"],
  sécurité: ["security-rules.md", "app-check.md", "formation/niveau-3-securite.md"],
  storage: ["cloud-storage.md", "formation/niveau-4-backend.md"],
  fichier: ["cloud-storage.md", "formation/niveau-4-backend.md"],
  upload: ["cloud-storage.md", "formation/niveau-4-backend.md"],
  functions: ["cloud-functions.md", "formation/niveau-4-backend.md"],
  "cloud functions": ["cloud-functions.md", "formation/niveau-4-backend.md"],
  hosting: ["hosting.md", "app-hosting.md", "formation/niveau-5-deploiement.md"],
  déploiement: ["hosting.md", "formation/niveau-5-deploiement.md"],
  deploy: ["hosting.md", "formation/niveau-5-deploiement.md"],
  analytics: ["analytics.md", "formation/niveau-6-pro.md"],
  "remote config": ["remote-config.md", "formation/niveau-6-pro.md"],
  messaging: ["cloud-messaging.md"],
  notification: ["cloud-messaging.md", "in-app-messaging.md"],
  push: ["cloud-messaging.md"],
  crashlytics: ["crashlytics.md"],
  crash: ["crashlytics.md"],
  performance: ["performance-monitoring.md"],
  "app check": ["app-check.md"],
  "a/b testing": ["ab-testing.md"],
  "ab testing": ["ab-testing.md"],
  extensions: ["extensions.md"],
  émulateur: ["emulator-suite.md", "formation/niveau-0-decouverte.md"],
  emulator: ["emulator-suite.md", "formation/niveau-0-decouverte.md"],
  "realtime database": ["realtime-database.md"],
  "temps réel": ["firestore.md", "realtime-database.md"],
  admob: ["admob.md"],
  "app distribution": ["app-distribution.md"],
  "test lab": ["test-lab.md"],
  "in-app messaging": ["in-app-messaging.md"],
  gemini: ["ai-logic.md", "formation/niveau-6-pro.md"],
  "ai logic": ["ai-logic.md", "formation/niveau-6-pro.md"],
  ia: ["ai-logic.md", "formation/niveau-6-pro.md"],
  sql: ["sql-connect.md"],
  postgresql: ["sql-connect.md"],
};

// Cache des fichiers chargés
const docCache = new Map<string, string>();

function loadDoc(relativePath: string): string {
  if (docCache.has(relativePath)) {
    return docCache.get(relativePath)!;
  }
  try {
    const fullPath = path.join(DOCS_DIR, relativePath);
    const content = fs.readFileSync(fullPath, "utf-8");
    docCache.set(relativePath, content);
    return content;
  } catch {
    return "";
  }
}

function getRelevantDocs(currentPage: string, userMessage: string): string {
  const docFiles = new Set<string>();

  // 1) Docs liées à la page courante
  for (const [pagePath, files] of Object.entries(PAGE_TO_DOCS)) {
    if (currentPage.startsWith(pagePath)) {
      files.forEach((f) => docFiles.add(f));
      break;
    }
  }

  // 2) Docs liées aux mots-clés du message
  const messageLower = userMessage.toLowerCase();
  for (const [keyword, files] of Object.entries(KEYWORD_TO_DOCS)) {
    if (messageLower.includes(keyword)) {
      files.forEach((f) => docFiles.add(f));
    }
  }

  // Limiter à 5 fichiers max pour rester dans un budget token raisonnable
  const selectedFiles = Array.from(docFiles).slice(0, 5);

  if (selectedFiles.length === 0) return "";

  const sections = selectedFiles
    .map((file) => {
      const content = loadDoc(file);
      if (!content) return "";
      return `--- Documentation : ${file} ---\n${content}`;
    })
    .filter(Boolean);

  return sections.join("\n\n");
}

// --- System prompt ---

const SYSTEM_PROMPT = `Tu es l'assistant pédagogique de Firebase Academy, un site de formation Firebase en français.

Ton rôle :
- Répondre aux questions sur Firebase de manière claire, pédagogique et concise
- T'appuyer EN PRIORITÉ sur la documentation officielle Firebase fournie en contexte
- Expliquer les concepts comme à un développeur junior
- Donner des exemples concrets quand c'est utile
- Citer les éléments de la documentation quand tu y fais référence
- Guider l'apprenant dans sa progression

Contexte du site — Firebase Academy enseigne Firebase à travers la construction d'une app (NoteFlow) en 7 niveaux :
- Niveau 0 : Création du projet Firebase, CLI, émulateurs
- Niveau 1 : Firestore CRUD, synchronisation temps réel
- Niveau 2 : Authentication (Google, email/mot de passe)
- Niveau 3 : Security Rules pour protéger les données
- Niveau 4 : Cloud Storage (upload fichiers) et Cloud Functions
- Niveau 5 : Déploiement sur Firebase Hosting, CI/CD, domaine personnalisé
- Niveau 6 : Analytics, Remote Config, AI Logic (Gemini), Performance Monitoring, App Check

Stack technique du projet NoteFlow : Next.js, TypeScript, Tailwind CSS, Firebase.

Règles :
- Réponds toujours en français
- Sois concis (pas plus de 3-4 paragraphes sauf si on te demande plus)
- Utilise du markdown pour structurer (gras, listes, code inline)
- Quand la documentation est fournie, base tes réponses dessus plutôt que sur tes connaissances générales
- Si la question dépasse Firebase, dis-le gentiment et redirige
- Ne donne jamais de clés API ou de secrets`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages, currentPage } = (await request.json()) as {
      messages: ChatMessage[];
      currentPage?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages requis" }, { status: 400 });
    }

    // Récupère le dernier message utilisateur pour la recherche de docs
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();
    const relevantDocs = getRelevantDocs(
      currentPage || "/",
      lastUserMessage?.content || ""
    );

    let systemPrompt = SYSTEM_PROMPT;

    if (currentPage) {
      systemPrompt += `\n\nL'utilisateur est actuellement sur la page : ${currentPage}. Adapte tes réponses en conséquence si pertinent.`;
    }

    if (relevantDocs) {
      systemPrompt += `\n\n=== DOCUMENTATION OFFICIELLE FIREBASE (source prioritaire) ===\n\n${relevantDocs}`;
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ response: text });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Erreur interne du serveur";
    return Response.json({ error: message }, { status: 500 });
  }
}
