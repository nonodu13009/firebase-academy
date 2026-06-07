"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = "all" | "build" | "run" | "ia";

export default function ReferencePage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "Tous", count: products.length },
    { value: "build", label: "Build", count: products.filter((p) => p.category === "build").length },
    { value: "run", label: "Run", count: products.filter((p) => p.category === "run").length },
    { value: "ia", label: "IA", count: products.filter((p) => p.category === "ia").length },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Reference</h1>
        <p className="text-neutral-400">
          Les {products.length} produits Firebase documentes. Fiches techniques
          detaillees.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant="ghost"
            size="sm"
            onClick={() => setFilter(f.value)}
            className={cn(
              "gap-1",
              filter === f.value
                ? "bg-orange-400/10 text-orange-400"
                : "text-neutral-400"
            )}
          >
            {f.label}
            <span className="text-xs text-neutral-500">({f.count})</span>
          </Button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((product) => (
          <Card
            key={product.slug}
            className="p-5 bg-neutral-900 border-neutral-800 hover:border-orange-400/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  {product.description}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={product.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
              >
                <ExternalLink className="w-3 h-3" />
                Doc officielle
              </a>
              {product.formationLevel !== undefined && (
                <a
                  href={`/formation/niveau-${product.formationLevel}`}
                  className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
                >
                  <ArrowRight className="w-3 h-3" />
                  Niveau {product.formationLevel}
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
