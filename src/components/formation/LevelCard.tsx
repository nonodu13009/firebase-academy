"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Level } from "@/data/levels";
import type { LevelStatus } from "@/hooks/useProgress";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  level: Level;
  status: LevelStatus;
}

const statusConfig = {
  "not-started": { icon: Circle, label: "A faire", color: "text-neutral-500" },
  "in-progress": { icon: Loader2, label: "En cours", color: "text-orange-400" },
  completed: { icon: CheckCircle2, label: "Termine", color: "text-green-400" },
};

export function LevelCard({ level, status }: Props) {
  const { icon: StatusIcon, label, color } = statusConfig[status];

  return (
    <a href={`/formation/${level.slug}`}>
      <Card
        className={cn(
          "p-6 bg-neutral-900 border-neutral-800 hover:border-orange-400/50 transition-all hover:shadow-lg hover:shadow-orange-400/5 cursor-pointer group",
          status === "completed" && "border-green-400/20"
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl font-bold text-neutral-600 group-hover:text-orange-400 transition-colors">
            {level.id}
          </span>
          <div className={cn("flex items-center gap-1 text-xs", color)}>
            <StatusIcon className="w-4 h-4" />
            {label}
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-1">{level.title}</h3>
        <p className="text-sm text-neutral-400 mb-4">{level.subtitle}</p>

        <div className="flex flex-wrap gap-1.5">
          {level.products.map((product) => (
            <Badge
              key={product}
              variant="secondary"
              className="bg-neutral-800 text-neutral-300 text-xs"
            >
              {product}
            </Badge>
          ))}
        </div>
      </Card>
    </a>
  );
}
