"use client";

import { useParams } from "next/navigation";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

export default function NiveauContent({ contentHtml }: { contentHtml: string | null }) {
  const params = useParams();
  const slug = params.niveau as string;
  const { getStatus, markInProgress, markCompleted } = useProgress();

  const level = levels.find((l) => l.slug === slug);
  const currentIndex = levels.findIndex((l) => l.slug === slug);
  const prevLevel = currentIndex > 0 ? levels[currentIndex - 1] : null;
  const nextLevel =
    currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;

  const status = getStatus(slug);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (level) {
      markInProgress(slug);
    }
  }, [slug, level, markInProgress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!contentRef.current) return;
      const pres = contentRef.current.querySelectorAll("pre");
      pres.forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return;
        pre.style.position = "relative";
        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.textContent = "Copier";
        pre.appendChild(btn);
        btn.addEventListener("click", async () => {
          const code = pre.querySelector("code");
          const text = (code || pre).textContent || "";
          try {
            await navigator.clipboard.writeText(text);
            btn.textContent = "Copié !";
            btn.classList.add("copied");
            setTimeout(() => {
              btn.textContent = "Copier";
              btn.classList.remove("copied");
            }, 2000);
          } catch {
            btn.textContent = "Erreur";
          }
        });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [contentHtml]);

  if (!level) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Niveau introuvable</h1>
        <Button render={<a href="/formation" />} nativeButton={false} variant="outline">Retour à la formation</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground flex items-center gap-2">
        <a href="/" className="hover:text-foreground">
          Accueil
        </a>
        <span>/</span>
        <a href="/formation" className="hover:text-foreground">
          Formation
        </a>
        <span>/</span>
        <span className="text-foreground">
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
            <p className="text-muted-foreground">{level.subtitle}</p>
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

      <Separator className="bg-border" />

      {/* Contenu du cours */}
      {contentHtml ? (
        <div
          ref={contentRef}
          className="prose dark:prose-invert max-w-none
            prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-orange-400 dark:prose-h3:text-orange-300
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-orange-400 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-lg
            prose-li:text-muted-foreground prose-li:marker:text-orange-400
            prose-ol:text-muted-foreground
            prose-blockquote:border-orange-400/50 prose-blockquote:text-muted-foreground prose-blockquote:bg-card/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4
            prose-table:border-collapse
            prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-border
            prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-border prose-td:text-muted-foreground
            prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : (
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">{level.description}</p>
        </div>
      )}

      <Separator className="bg-border" />

      {/* Marquer comme terminé */}
      {status !== "completed" ? (
        <div className="text-center">
          <Button
            onClick={() => markCompleted(slug)}
            className="bg-green-600 hover:bg-green-700 text-white gap-2 text-base px-6 py-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            Marquer comme terminé
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-3 py-4">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-6 py-3 text-base font-semibold animate-[fadeIn_0.3s_ease-in]">
            <CheckCircle2 className="w-5 h-5" />
            Niveau terminé !
          </div>
          {nextLevel && (
            <p className="text-sm text-muted-foreground">
              Prochaine étape →{" "}
              <a href={`/formation/${nextLevel.slug}`} className="text-orange-400 hover:text-orange-300 font-medium">
                Niveau {nextLevel.id} — {nextLevel.title}
              </a>
            </p>
          )}
        </div>
      )}

      {/* Navigation précédent/suivant */}
      <div className="flex justify-between pt-4">
        {prevLevel ? (
          <Button render={<a href={`/formation/${prevLevel.slug}`} />} nativeButton={false} variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
            <ArrowLeft className="w-4 h-4" />
            Niveau {prevLevel.id} — {prevLevel.title}
          </Button>
        ) : (
          <div />
        )}
        {nextLevel ? (
          <Button render={<a href={`/formation/${nextLevel.slug}`} />} nativeButton={false} variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
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
