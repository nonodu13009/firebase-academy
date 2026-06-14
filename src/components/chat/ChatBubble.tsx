"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PAGE_SUGGESTIONS: Record<string, string> = {
  "/formation/niveau-0": "Explique-moi comment installer Firebase CLI",
  "/formation/niveau-1": "Comment fonctionne Firestore ?",
  "/formation/niveau-2": "Comment ajouter la connexion Google ?",
  "/formation/niveau-3": "Comment écrire des règles de sécurité ?",
  "/formation/niveau-4": "Comment uploader des fichiers avec Storage ?",
  "/formation/niveau-5": "Comment déployer mon app sur Firebase Hosting ?",
  "/formation/niveau-6": "Comment intégrer Gemini avec AI Logic ?",
  "/formation": "Par où commencer la formation Firebase ?",
  "/glossaire": "Explique-moi un terme technique Firebase",
  "/exemples": "Donne-moi un exemple concret d'utilisation de Firebase",
  "/reference": "Quelle est la différence entre Firestore et Realtime Database ?",
  "/produits": "Quel produit Firebase choisir pour mon projet ?",
  "/commandes": "Quelles sont les commandes Firebase essentielles ?",
  "/": "Par où commencer avec Firebase ?",
};

function getSuggestion(pathname: string): string {
  for (const [path, suggestion] of Object.entries(PAGE_SUGGESTIONS)) {
    if (pathname.startsWith(path) && path !== "/") return suggestion;
  }
  return PAGE_SUGGESTIONS["/"];
}

function formatMessage(content: string) {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-sm font-mono">$1</code>')
    .replace(/\n/g, "<br />");
}

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const suggestion = getSuggestion(pathname);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          currentPage: pathname,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: `Désolé, une erreur est survenue : ${data.error}` },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Désolé, je n'ai pas pu me connecter au serveur." },
      ]);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[360px] max-h-[520px] flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-semibold">Assistant Firebase</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[300px] max-h-[380px]">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Salut ! Je suis ton assistant Firebase Academy. Pose-moi une question ou essaie la suggestion ci-dessous.
                </p>
                <button
                  onClick={() => sendMessage(suggestion)}
                  className="w-full text-left text-sm px-3 py-2 rounded-lg border border-orange-400/30 bg-orange-400/5 text-orange-400 hover:bg-orange-400/10 transition-colors"
                >
                  {suggestion}
                </button>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] text-sm rounded-2xl px-3 py-2",
                  msg.role === "user"
                    ? "ml-auto bg-orange-500 text-white rounded-br-md"
                    : "mr-auto bg-muted rounded-bl-md"
                )}
              >
                {msg.role === "assistant" ? (
                  <span
                    className="leading-relaxed [&_code]:text-orange-400"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                ) : (
                  <span className="leading-relaxed">{msg.content}</span>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Réflexion en cours...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-3 py-2 border-t border-border flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pose ta question..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="text-orange-400 hover:text-orange-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105",
          isOpen
            ? "bg-muted text-muted-foreground"
            : "bg-orange-500 text-white hover:bg-orange-600"
        )}
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </>
  );
}
