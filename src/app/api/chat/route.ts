import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Tu es l'assistant pédagogique de Firebase Academy, un site de formation Firebase en français.

Ton rôle :
- Répondre aux questions sur Firebase de manière claire, pédagogique et concise
- Expliquer les concepts comme à un développeur junior
- Donner des exemples concrets quand c'est utile
- Guider l'apprenant dans sa progression

Contexte du site — Firebase Academy enseigne Firebase à travers la construction d'une app (NoteFlow) en 7 niveaux :
- Niveau 0 : Création du projet Firebase, CLI, émulateurs
- Niveau 1 : Firestore CRUD, synchronisation temps réel
- Niveau 2 : Authentication (Google, email/mot de passe)
- Niveau 3 : Security Rules pour protéger les données
- Niveau 4 : Cloud Storage (upload fichiers) et Cloud Functions
- Niveau 5 : Déploiement sur Firebase Hosting, CI/CD, domaine personnalisé
- Niveau 6 : Analytics, Remote Config, AI Logic (Gemini), Performance Monitoring, App Check

Le site contient aussi :
- Un glossaire de ~80 termes techniques expliqués simplement
- Des exemples concrets pour chaque produit Firebase (Netflix, Uber, Spotify...)
- Une référence des 23 produits Firebase organisés en 6 catégories
- Un catalogue détaillé des produits avec cas d'usage et exemples
- Les 21 commandes terminal utilisées dans la formation

Stack technique du projet NoteFlow : Next.js, TypeScript, Tailwind CSS, Firebase.

Règles :
- Réponds toujours en français
- Sois concis (pas plus de 3-4 paragraphes sauf si on te demande plus)
- Utilise du markdown pour structurer (gras, listes, code inline)
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

    let systemPrompt = SYSTEM_PROMPT;
    if (currentPage) {
      systemPrompt += `\n\nL'utilisateur est actuellement sur la page : ${currentPage}. Adapte tes réponses en conséquence si pertinent.`;
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
