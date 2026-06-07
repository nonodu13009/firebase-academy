"use client";

import { useParams } from "next/navigation";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function NiveauContent() {
  const params = useParams();
  const slug = params.niveau as string;
  const { getStatus, markInProgress, markCompleted } = useProgress();

  const level = levels.find((l) => l.slug === slug);
  const currentIndex = levels.findIndex((l) => l.slug === slug);
  const prevLevel = currentIndex > 0 ? levels[currentIndex - 1] : null;
  const nextLevel =
    currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;

  const status = getStatus(slug);

  useEffect(() => {
    if (level) {
      markInProgress(slug);
    }
  }, [slug, level, markInProgress]);

  if (!level) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Niveau introuvable</h1>
        <Button render={<a href="/formation" />} variant="outline">Retour a la formation</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 flex items-center gap-2">
        <a href="/" className="hover:text-white">
          Accueil
        </a>
        <span>/</span>
        <a href="/formation" className="hover:text-white">
          Formation
        </a>
        <span>/</span>
        <span className="text-neutral-300">
          Niveau {level.id} — {level.title}
        </span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-5xl font-bold text-orange-400">
            {level.id}
          </span>
          <div>
            <h1 className="text-3xl font-bold">{level.title}</h1>
            <p className="text-neutral-400">{level.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {level.products.map((product) => (
            <Badge
              key={product}
              className="bg-orange-400/10 text-orange-400 border-orange-400/20"
            >
              {product}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Contenu placeholder */}
      <div className="prose prose-invert max-w-none space-y-6">
        <p className="text-neutral-300 leading-relaxed">{level.description}</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-center text-neutral-400">
          <p className="text-lg mb-2">Contenu du niveau a venir</p>
          <p className="text-sm">
            Le contenu detaille est disponible dans{" "}
            <code className="bg-neutral-800 px-2 py-0.5 rounded text-orange-400">
              docs/formation/{slug}.md
            </code>
          </p>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Marquer comme termine */}
      {status !== "completed" ? (
        <div className="text-center">
          <Button
            onClick={() => markCompleted(slug)}
            className="bg-green-600 hover:bg-green-700 text-white gap-2 text-base px-6 py-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            Marquer comme termine
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-3 py-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-6 py-3 text-base font-semibold animate-[fadeIn_0.3s_ease-in]">
            <CheckCircle2 className="w-5 h-5" />
            Niveau termine !
          </div>
          {nextLevel && (
            <p className="text-sm text-neutral-400">
              Prochaine etape →{" "}
              <a href={`/formation/${nextLevel.slug}`} className="text-orange-400 hover:text-orange-300 font-medium">
                Niveau {nextLevel.id} — {nextLevel.title}
              </a>
            </p>
          )}
        </div>
      )}

      {/* Navigation precedent/suivant */}
      <div className="flex justify-between pt-4">
        {prevLevel ? (
          <Button render={<a href={`/formation/${prevLevel.slug}`} />} variant="ghost" className="text-neutral-400 hover:text-white gap-2">
            <ArrowLeft className="w-4 h-4" />
            Niveau {prevLevel.id} — {prevLevel.title}
          </Button>
        ) : (
          <div />
        )}
        {nextLevel ? (
          <Button render={<a href={`/formation/${nextLevel.slug}`} />} variant="ghost" className="text-neutral-400 hover:text-white gap-2">
            Niveau {nextLevel.id} — {nextLevel.title}
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
