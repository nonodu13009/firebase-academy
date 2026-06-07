"use client";

import { levels } from "@/data/levels";

interface Props {
  completedCount: number;
}

export function ProgressBar({ completedCount }: Props) {
  const total = levels.length;
  const pct = Math.round((completedCount / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progression</span>
        <span className="text-foreground">
          {completedCount}/{total} niveaux ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
