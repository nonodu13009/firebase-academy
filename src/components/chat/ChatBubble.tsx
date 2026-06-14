"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  Send,
  Flame,
  Copy,
  Check,
  Trash2,
  ChevronDown,
  RotateCcw,
  User,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

const PAGE_SUGGESTIONS: Record<string, string[]> = {
  "/formation/niveau-0": [
    "Comment installer Firebase CLI ?",
    "Comment lancer les émulateurs ?",
    "C'est quoi un projet Firebase ?",
  ],
  "/formation/niveau-1": [
    "Comment fonctionne Firestore ?",
    "Comment faire un CRUD Firestore ?",
    "C'est quoi la synchro temps réel ?",
  ],
  "/formation/niveau-2": [
    "Comment ajouter la connexion Google ?",
    "Comment gérer les utilisateurs ?",
    "Email et mot de passe, comment ça marche ?",
  ],
  "/formation/niveau-3": [
    "Comment écrire des security rules ?",
    "Comment protéger mes données ?",
    "C'est quoi request.auth ?",
  ],
  "/formation/niveau-4": [
    "Comment uploader des fichiers ?",
    "C'est quoi Cloud Functions ?",
    "Comment déclencher une function ?",
  ],
  "/formation/niveau-5": [
    "Comment déployer sur Firebase ?",
    "Comment configurer un domaine ?",
    "C'est quoi le CI/CD Firebase ?",
  ],
  "/formation/niveau-6": [
    "Comment intégrer Gemini ?",
    "C'est quoi Remote Config ?",
    "Comment suivre les performances ?",
  ],
  "/formation": [
    "Par où commencer la formation ?",
    "Combien de niveaux dans la formation ?",
    "C'est quoi NoteFlow ?",
  ],
  "/glossaire": [
    "Explique-moi un terme technique",
    "C'est quoi une API ?",
    "Différence entre SDK et API ?",
  ],
  "/exemples": [
    "Donne un exemple avec Firestore",
    "Comment Netflix utilise Firebase ?",
    "Un cas d'usage pour Storage ?",
  ],
  "/reference": [
    "Différence Firestore vs Realtime DB ?",
    "Combien de produits Firebase ?",
    "Quel produit pour mon projet ?",
  ],
  "/produits": [
    "Quel produit Firebase choisir ?",
    "C'est quoi App Check ?",
    "Différence Hosting vs App Hosting ?",
  ],
  "/commandes": [
    "Commandes Firebase essentielles ?",
    "Comment déployer en une commande ?",
    "C'est quoi firebase init ?",
  ],
  "/": [
    "Par où commencer avec Firebase ?",
    "C'est quoi Firebase ?",
    "Pourquoi choisir Firebase ?",
  ],
};

function getSuggestions(pathname: string): string[] {
  for (const [path, suggestions] of Object.entries(PAGE_SUGGESTIONS)) {
    if (pathname.startsWith(path) && path !== "/") return suggestions;
  }
  return PAGE_SUGGESTIONS["/"];
}

function formatMessage(content: string): string {
  let html = content;

  // Code blocks (```...```)
  html = html.replace(
    /```(\w*)\n?([\s\S]*?)```/g,
    '<pre class="chat-code-block"><code>$2</code></pre>'
  );

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="chat-inline-code">$1</code>'
  );

  // Unordered lists (- item)
  html = html.replace(
    /(?:^|\n)((?:- .+(?:\n|$))+)/g,
    (_, list: string) => {
      const items = list
        .split("\n")
        .filter((l: string) => l.startsWith("- "))
        .map((l: string) => `<li>${l.slice(2)}</li>`)
        .join("");
      return `<ul class="chat-list">${items}</ul>`;
    }
  );

  // Ordered lists (1. item)
  html = html.replace(
    /(?:^|\n)((?:\d+\. .+(?:\n|$))+)/g,
    (_, list: string) => {
      const items = list
        .split("\n")
        .filter((l: string) => /^\d+\. /.test(l))
        .map((l: string) => `<li>${l.replace(/^\d+\. /, "")}</li>`)
        .join("");
      return `<ol class="chat-list-ordered">${items}</ol>`;
    }
  );

  // Headers (### → h4, ## → h3)
  html = html.replace(/^### (.+)$/gm, '<h4 class="chat-h4">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 class="chat-h3">$1</h3>');

  // Line breaks (but not inside pre blocks)
  html = html.replace(/\n/g, "<br />");
  // Clean up extra <br> around block elements
  html = html.replace(/<br \/>\s*(<(?:ul|ol|pre|h[34]))/g, "$1");
  html = html.replace(/(<\/(?:ul|ol|pre|h[34])>)\s*<br \/>/g, "$1");

  return html;
}

function CopyMessageButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"
      title="Copier la réponse"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-400" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 animate-chat-fade-in">
      <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
        <Flame className="w-3.5 h-3.5 text-orange-400" />
      </div>
      <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-chat-dot-1" />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-chat-dot-2" />
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-chat-dot-3" />
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({
  suggestions,
  onSend,
}: {
  suggestions: string[];
  onSend: (text: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-6 animate-chat-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
        <Flame className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-base font-semibold mb-1">Assistant Firebase</h3>
      <p className="text-xs text-muted-foreground text-center mb-5 max-w-[240px]">
        Je suis là pour t&apos;aider dans ta formation Firebase Academy.
      </p>
      <div className="w-full space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-1">
          Suggestions
        </p>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSend(s)}
            className="w-full text-left text-sm px-3.5 py-2.5 rounded-xl border border-border hover:border-orange-400/40 bg-card hover:bg-orange-400/5 text-foreground hover:text-orange-400 transition-all duration-200 group"
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-muted-foreground group-hover:text-orange-400 transition-colors shrink-0" />
              {s}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

  const suggestions = getSuggestions(pathname);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Scroll detection for "scroll to bottom" button
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 80);
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          currentPage: pathname,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: `Désolé, une erreur est survenue : ${data.error}`,
            error: true,
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.response },
        ]);
        if (!isOpen) setHasNewMessage(true);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Désolé, je n'ai pas pu me connecter au serveur.",
          error: true,
        },
      ]);
    }

    setLoading(false);
  };

  const retryLastMessage = () => {
    const lastUserMsg = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUserMsg) return;
    // Remove the error message
    setMessages((prev) => prev.slice(0, -1));
    sendMessage(lastUserMsg.content);
  };

  const clearConversation = () => {
    setMessages([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat window */}
      <div
        className={cn(
          "fixed z-50 flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden transition-all duration-300 ease-out origin-bottom-right",
          // Mobile: always full screen
          "bottom-0 right-0 w-full h-[100dvh]",
          // Desktop compact
          !expanded && "sm:bottom-20 sm:right-4 sm:w-[380px] sm:h-auto sm:max-h-[560px] sm:rounded-2xl",
          // Desktop expanded
          expanded && "sm:bottom-4 sm:right-4 sm:w-[720px] sm:h-[calc(100dvh-2rem)] sm:rounded-2xl",
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
            : "scale-95 opacity-0 pointer-events-none translate-y-2"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-card" />
            </div>
            <div>
              <span className="text-sm font-semibold leading-none">
                Assistant Firebase
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Toujours disponible
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted"
                title="Nouvelle conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted"
              title={expanded ? "Réduire" : "Agrandir"}
            >
              {expanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className={cn(
            "flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-[320px] scroll-smooth",
            !expanded && "sm:max-h-[400px]"
          )}
        >
          {messages.length === 0 ? (
            <WelcomeScreen suggestions={suggestions} onSend={sendMessage} />
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2.5 animate-chat-fade-in",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  {msg.role === "assistant" ? (
                    <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={cn(
                      "group max-w-[80%] relative",
                      msg.role === "user" ? "text-right" : "text-left"
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm rounded-2xl px-3.5 py-2.5 inline-block text-left",
                        msg.role === "user"
                          ? "bg-orange-500 text-white rounded-tr-md"
                          : msg.error
                            ? "bg-red-500/10 border border-red-500/20 text-foreground rounded-tl-md"
                            : "bg-muted rounded-tl-md"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <span
                          className="leading-relaxed chat-message-content"
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(msg.content),
                          }}
                        />
                      ) : (
                        <span className="leading-relaxed">{msg.content}</span>
                      )}
                    </div>

                    {/* Actions under assistant messages */}
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1 mt-1">
                        <CopyMessageButton text={msg.content} />
                        {msg.error && i === messages.length - 1 && (
                          <button
                            onClick={retryLastMessage}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted flex items-center gap-1 text-xs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Réessayer</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && <TypingIndicator />}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-card border border-border shadow-lg rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-all animate-chat-fade-in"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="px-3 py-2.5 border-t border-border flex items-end gap-2 bg-card/50"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Pose ta question..."
            disabled={loading}
            rows={1}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 resize-none max-h-[120px] py-1.5 leading-relaxed"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={cn(
              "p-2 rounded-xl transition-all duration-200 shrink-0 mb-0.5",
              input.trim() && !loading
                ? "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                : "text-muted-foreground/30 cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 z-50 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group",
          isOpen
            ? "bg-muted text-muted-foreground hover:bg-muted/80 scale-90 sm:scale-100"
            : "bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:shadow-orange-500/25 hover:shadow-xl hover:scale-105"
        )}
      >
        <MessageCircle
          className={cn(
            "w-6 h-6 transition-all duration-300",
            isOpen ? "rotate-90 opacity-0 scale-0 absolute" : "rotate-0 opacity-100 scale-100"
          )}
        />
        <X
          className={cn(
            "w-5 h-5 transition-all duration-300",
            isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-0 absolute"
          )}
        />

        {/* Notification badge */}
        {hasNewMessage && !isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
        )}
      </button>
    </>
  );
}
