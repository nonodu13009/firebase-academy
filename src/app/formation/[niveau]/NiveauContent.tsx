"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
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
        <Button render={<Link href="/formation" />} variant="outline">Retour a la formation</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 flex items-center gap-2">
        <Link href="/" className="hover:text-white">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/formation" className="hover:text-white">
          Formation
        </Link>
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
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Marquer comme termine
          </Button>
        </div>
      ) : (
        <p className="text-center text-green-400 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Niveau termine
        </p>
      )}

      {/* Navigation precedent/suivant */}
      <div className="flex justify-between pt-4">
        {prevLevel ? (
          <Button render={<Link href={`/formation/${prevLevel.slug}`} />} variant="ghost" className="text-neutral-400 hover:text-white gap-2">
            <ArrowLeft className="w-4 h-4" />
            Niveau {prevLevel.id} — {prevLevel.title}
          </Button>
        ) : (
          <div />
        )}
        {nextLevel ? (
          <Button render={<Link href={`/formation/${nextLevel.slug}`} />} variant="ghost" className="text-neutral-400 hover:text-white gap-2">
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
