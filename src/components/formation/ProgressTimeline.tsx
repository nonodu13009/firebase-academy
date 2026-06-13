"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, Circle, Loader2, ListChecks, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function ProgressTimeline() {
  const { user, loading } = useAuth();
  const { getStatus, completedCount } = useProgress();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const total = levels.length;
  const pct = Math.round((completedCount / total) * 100);

  // Hide timeline when not logged in
  if (loading || !user) return null;

  // Find the last completed level index
  let lastCompletedIndex = -1;
  levels.forEach((level, i) => {
    if (getStatus(level.slug) === "completed") {
      lastCompletedIndex = i;
    }
  });

  const timelineContent = (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Progression</h3>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{total} ({pct}%)
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Legende */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Validé</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" /> En cours</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" /> À faire</span>
      </div>

      {/* Levels */}
      <div className="space-y-0">
        {levels.map((level, i) => {
          const status = getStatus(level.slug);
          const isViewing = pathname === `/formation/${level.slug}` || pathname === `/formation/${level.slug}/`;
          const isLastCompleted = i === lastCompletedIndex;
          const isLast = i === levels.length - 1;

          // Icon and colors based on status
          let StatusIcon = Circle;
          let iconColor = "text-muted-foreground/60";
          let bgColor = "bg-muted";
          let lineColor = "bg-muted";

          if (status === "completed") {
            StatusIcon = CheckCircle2;
            iconColor = "text-green-400";
            bgColor = "bg-green-400/20";
            lineColor = "bg-green-400/30";
          } else if (status === "in-progress") {
            StatusIcon = Loader2;
            iconColor = "text-orange-400";
            bgColor = "bg-orange-400/20";
          }

          return (
            <div key={level.slug} className="flex gap-3">
              {/* Vertical line + icon */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all",
                    bgColor,
                    isViewing && "ring-2 ring-orange-400 ring-offset-1 ring-offset-background",
                    isLastCompleted && status === "completed" && !isViewing && "ring-2 ring-green-400 ring-offset-1 ring-offset-background"
                  )}
                >
                  <StatusIcon className={cn("w-4 h-4", iconColor)} />
                </div>
                {!isLast && (
                  <div className={cn("w-0.5 flex-1 min-h-6", lineColor)} />
                )}
              </div>

              {/* Content */}
              <a
                href={`/formation/${level.slug}`}
                onClick={() => setOpen(false)}
                className={cn("flex-1 pb-4 group", isLast && "pb-0")}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-sm font-medium leading-tight transition-colors group-hover:text-orange-400",
                      isViewing
                        ? "text-orange-400"
                        : isLastCompleted && status === "completed"
                          ? "text-green-400"
                          : "text-foreground"
                    )}
                  >
                    {level.id}. {level.title}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                  {level.subtitle}
                </p>
                {/* Labels */}
                <div className="flex gap-2 mt-1">
                  {isViewing && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-orange-400 bg-orange-400/10 rounded px-1.5 py-0.5">
                      <Eye className="w-3 h-3" />
                      Consultation
                    </span>
                  )}
                  {isLastCompleted && status === "completed" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-400 bg-green-400/10 rounded px-1.5 py-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Dernier validé
                    </span>
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: sidebar fixe a droite */}
      <aside className="hidden lg:block fixed right-0 top-14 w-64 h-[calc(100vh-3.5rem)] border-l border-border bg-background/95 backdrop-blur-sm p-5 overflow-y-auto z-40">
        {timelineContent}
      </aside>

      {/* Mobile/Tablet: bouton flottant */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors",
          open ? "bg-muted text-foreground" : "bg-orange-500 text-white"
        )}
        aria-label="Voir la progression"
      >
        {open ? <X className="w-5 h-5" /> : <ListChecks className="w-5 h-5" />}
        {!open && completedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {completedCount}
          </span>
        )}
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="lg:hidden fixed bottom-20 right-5 z-50 w-72 max-h-[70vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl p-5">
            {timelineContent}
          </div>
        </>
      )}
    </>
  );
}
