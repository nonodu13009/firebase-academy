"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, Circle, Loader2, ListChecks, X } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  "not-started": { icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
  "in-progress": { icon: Loader2, color: "text-orange-400", bg: "bg-orange-400/20" },
  completed: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/20" },
};

export function ProgressTimeline() {
  const { getStatus, completedCount } = useProgress();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const total = levels.length;
  const pct = Math.round((completedCount / total) * 100);

  const timeline = (
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

      {/* Levels */}
      <div className="space-y-0">
        {levels.map((level, i) => {
          const status = getStatus(level.slug);
          const { icon: StatusIcon, color, bg } = statusConfig[status];
          const isActive = pathname === `/formation/${level.slug}` || pathname === `/formation/${level.slug}/`;
          const isLast = i === levels.length - 1;

          return (
            <div key={level.slug} className="flex gap-3">
              {/* Vertical line + icon */}
              <div className="flex flex-col items-center">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0", bg, isActive && "ring-2 ring-orange-400")}>
                  <StatusIcon className={cn("w-4 h-4", color)} />
                </div>
                {!isLast && (
                  <div className={cn("w-0.5 flex-1 min-h-6", status === "completed" ? "bg-green-400/30" : "bg-muted")} />
                )}
              </div>

              {/* Content */}
              <a
                href={`/formation/${level.slug}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex-1 pb-4 group",
                  isLast && "pb-0"
                )}
              >
                <p className={cn(
                  "text-sm font-medium leading-tight transition-colors group-hover:text-orange-400",
                  isActive ? "text-orange-400" : "text-foreground"
                )}>
                  {level.id}. {level.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                  {level.subtitle}
                </p>
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
        {timeline}
      </aside>

      {/* Mobile: bouton flottant + overlay */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors",
          open
            ? "bg-muted text-foreground"
            : "bg-orange-500 text-white"
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
            {timeline}
          </div>
        </>
      )}
    </>
  );
}
