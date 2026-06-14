"use client";

import { useState } from "react";
import {
  ExternalLink,
  Database,
  Shield,
  Cpu,
  BarChart3,
  Server,
  Megaphone,
  ChevronRight,
  ChevronDown,
  Wrench,
  Lightbulb,
  Route,
} from "lucide-react";
import {
  type ProductDetail,
  type CategoryContent,
  isSubcategory,
  isDetailed,
  databases,
  security,
  ai,
  hosting,
  devops,
  analytics,
} from "@/data/produits-details";

interface CategoryDef {
  id: string;
  label: string;
  icon: typeof Database;
  color: string;
  content: CategoryContent[];
}

const categories: CategoryDef[] = [
  { id: "databases", label: "Bases de données et stockage", icon: Database, color: "text-blue-400", content: databases },
  { id: "security", label: "Sécurité", icon: Shield, color: "text-red-400", content: security },
  { id: "ai", label: "Services d'IA", icon: Cpu, color: "text-purple-400", content: ai },
  { id: "hosting", label: "Hébergement et sans serveur", icon: Server, color: "text-cyan-400", content: hosting },
  { id: "devops", label: "DevOps et engagement", icon: Megaphone, color: "text-orange-400", content: devops },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "text-green-400", content: analytics },
];

function ProductCard({ product }: { product: ProductDetail }) {
  const [expanded, setExpanded] = useState(false);
  const detailed = isDetailed(product);

  if (!detailed) {
    return (
      <a
        href={product.docUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
      >
        <span className="text-sm group-hover:text-foreground transition-colors">
          {product.name}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </a>
    );
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="text-sm font-medium">{product.name}</span>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={product.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Documentation officielle"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-5 border-t border-border/30">
          {/* Résumé */}
          <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
            {product.summary}
          </p>

          {/* À quoi ça sert */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                À quoi ça sert
              </h4>
            </div>
            <p className="text-sm leading-relaxed pl-6">
              {product.useCase}
            </p>
          </div>

          {/* Étape du projet */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-blue-400 shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                À quelle étape du projet
              </h4>
            </div>
            <p className="text-sm leading-relaxed pl-6">
              {product.projectStage}
            </p>
          </div>

          {/* 3 exemples */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-orange-400 shrink-0" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Exemples d'usage
              </h4>
            </div>
            <div className="space-y-3 pl-6">
              {product.examples.map((example, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-medium">{example.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {example.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProduitsPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  const totalItems = categories.reduce((acc, cat) => {
    return acc + cat.content.reduce((sub, item) => {
      return sub + (isSubcategory(item) ? item.items.length : 1);
    }, 0);
  }, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Produits Firebase</h1>
        <p className="text-muted-foreground">
          {totalItems} produits et fonctionnalités organisés en {categories.length} catégories.
          Clique sur un produit pour découvrir à quoi il sert et comment l'utiliser.
        </p>
      </div>

      <div className="divide-y divide-border">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isOpen = openCategory === cat.id;

          return (
            <div key={cat.id}>
              <button
                onClick={() => toggle(cat.id)}
                className="w-full flex items-center gap-4 py-5 px-2 text-left hover:bg-muted/50 transition-colors rounded-lg"
              >
                <Icon className={`w-5 h-5 ${cat.color} shrink-0`} />
                <span className="flex-1 font-semibold">{cat.label}</span>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="pb-4 pl-11 space-y-2">
                  {cat.content.map((item, i) =>
                    isSubcategory(item) ? (
                      <div key={i} className="mt-4 first:mt-0 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 pb-1">
                          {item.label}
                        </p>
                        {item.items.map((product) => (
                          <ProductCard key={product.name} product={product} />
                        ))}
                      </div>
                    ) : (
                      <ProductCard key={item.name} product={item} />
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
