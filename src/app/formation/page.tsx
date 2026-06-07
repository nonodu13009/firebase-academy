"use client";

import { levels } from "@/data/levels";
import { LevelCard } from "@/components/formation/LevelCard";
import { ProgressBar } from "@/components/formation/ProgressBar";
import { useProgress } from "@/hooks/useProgress";

export default function FormationPage() {
  const { getStatus, completedCount } = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Formation Firebase</h1>
        <p className="text-muted-foreground">
          7 niveaux pour maitriser Firebase en construisant NoteFlow, une app de
          notes collaborative.
        </p>
      </div>

      <ProgressBar completedCount={completedCount} />

      <div className="grid md:grid-cols-2 gap-4">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            status={getStatus(level.slug)}
          />
        ))}
      </div>
    </div>
  );
}
