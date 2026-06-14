"use client";

import { useState } from "react";
import {
  Terminal,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  BookOpen,
  Lightbulb,
  MapPin,
} from "lucide-react";
import { commandGroups } from "@/data/commandes";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors"
      title="Copier la commande"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

function CommandCard({
  command,
}: {
  command: { command: string; summary: string; explanation: string; context: string };
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); } }}
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <Terminal className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <code className="text-sm font-mono text-green-400 break-all">
            {command.command}
          </code>
          <p className="text-xs text-muted-foreground mt-1">{command.summary}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <CopyButton text={command.command} />
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border/30">
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ce que ça fait
              </h4>
            </div>
            <p className="text-sm leading-relaxed pl-6">{command.explanation}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quand l'utiliser
              </h4>
            </div>
            <p className="text-sm leading-relaxed pl-6">{command.context}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommandesPage() {
  const [openLevel, setOpenLevel] = useState<number | null>(null);

  const toggle = (level: number) => {
    setOpenLevel((prev) => (prev === level ? null : level));
  };

  const totalCommands = commandGroups.reduce(
    (acc, group) => acc + group.commands.length,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Commandes terminal</h1>
        <p className="text-muted-foreground">
          {totalCommands} commandes utilisées dans la formation, classées par
          niveau dans l'ordre chronologique. Clique sur une commande pour
          comprendre ce qu'elle fait et quand l'utiliser.
        </p>
      </div>

      {/* Astuce */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-muted/30 border border-border/50">
        <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Astuce :</span> toutes
          les commandes s'exécutent depuis la racine du projet, sauf indication
          contraire. Tu peux copier chaque commande en cliquant sur l'icône de copie.
        </p>
      </div>

      <div className="divide-y divide-border">
        {commandGroups.map((group) => {
          const isOpen = openLevel === group.level;

          return (
            <div key={group.level}>
              <button
                onClick={() => toggle(group.level)}
                className="w-full flex items-center gap-4 py-5 px-2 text-left hover:bg-muted/50 transition-colors rounded-lg"
              >
                <span className="w-8 h-8 rounded-lg bg-orange-400/10 text-orange-400 flex items-center justify-center text-sm font-bold shrink-0">
                  {group.level}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold">{group.title}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({group.commands.length} commande{group.commands.length > 1 ? "s" : ""})
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="pb-4 pl-2 md:pl-12 space-y-3">
                  <p className="text-sm text-muted-foreground px-2 pb-2">
                    {group.description}
                  </p>
                  {group.commands.map((cmd) => (
                    <CommandCard key={cmd.command} command={cmd} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
