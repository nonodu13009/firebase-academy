"use client";

import { getGlossaryEntry } from "@/data/glossary";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, BookOpen } from "lucide-react";

interface Props {
  term: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ term, children }: Props) {
  const entry = getGlossaryEntry(term);

  if (!entry) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        className="border-b border-dashed border-orange-400/60 text-orange-300 cursor-help hover:text-orange-200 transition-colors"
        render={<span />}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-xs bg-popover border-border p-4 space-y-3"
      >
        <div>
          <p className="font-semibold text-sm text-foreground">
            {entry.term}
            {entry.fullTerm && (
              <span className="font-normal text-muted-foreground ml-1">
                ({entry.fullTerm})
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{entry.definition}</p>
        </div>
        <div className="flex gap-3 pt-1">
          <a
            href={entry.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
          >
            <ExternalLink className="w-3 h-3" />
            Rechercher
          </a>
          {entry.referenceLink && (
            <a
              href={entry.referenceLink}
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
            >
              <BookOpen className="w-3 h-3" />
              Fiche reference
            </a>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
