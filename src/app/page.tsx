import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { levels } from "@/data/levels";
import {
  Flame,
  BookOpen,
  MessageCircleQuestion,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Hero */}
      <section className="py-20 md:py-32 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-400/10 text-orange-400 text-sm mb-4">
          <Flame className="w-4 h-4" />
          Formation gratuite et open source
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Apprends Firebase en
          <br />
          <span className="text-orange-400">construisant une vraie app</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          De zero a la production, niveau par niveau. En francais, sans jargon.
          <br />
          Chaque mot technique est explique.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/connexion">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
              Commencer la formation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/glossaire">
            <Button size="lg" variant="outline" className="border-neutral-700 text-neutral-300 hover:text-white">
              Voir le glossaire
            </Button>
          </Link>
        </div>
      </section>

      {/* Ce que tu vas construire */}
      <section className="py-16 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            Tu vas construire NoteFlow
          </h2>
          <p className="text-neutral-400">
            Une app de prise de notes collaborative, de A a Z.
          </p>
        </div>
        <Card className="p-8 bg-neutral-900 border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {[
              "Inscription et connexion",
              "CRUD de notes en temps reel",
              "Upload de fichiers",
              "Regles de securite",
              "Cloud Functions",
              "Deploiement en production",
              "Analytics et monitoring",
              "Configuration a distance",
              "IA integree (Gemini)",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-neutral-300">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-6">
            Stack : Next.js 14+ / TypeScript / Tailwind CSS / Firebase
          </p>
        </Card>
      </section>

      {/* Les 3 piliers */}
      <section className="py-16 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          3 piliers pour apprendre sans friction
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-neutral-900 border-neutral-800 space-y-3">
            <BookOpen className="w-8 h-8 text-orange-400" />
            <h3 className="font-semibold">Formation progressive</h3>
            <p className="text-sm text-neutral-400">
              7 niveaux, un projet fil rouge. Chaque niveau ajoute une brique a
              la meme app.
            </p>
          </Card>
          <Card className="p-6 bg-neutral-900 border-neutral-800 space-y-3">
            <MessageCircleQuestion className="w-8 h-8 text-blue-400" />
            <h3 className="font-semibold">Aucun mot incompris</h3>
            <p className="text-sm text-neutral-400">
              Chaque terme technique est souligne. Au survol, tu as
              l&apos;explication. Au clic, tu approfondis.
            </p>
          </Card>
          <Card className="p-6 bg-neutral-900 border-neutral-800 space-y-3">
            <Lightbulb className="w-8 h-8 text-green-400" />
            <h3 className="font-semibold">Exemples du monde reel</h3>
            <p className="text-sm text-neutral-400">
              Chaque fonctionnalite Firebase est illustree avec des exemples
              concrets (Netflix, Uber, Spotify...).
            </p>
          </Card>
        </div>
      </section>

      {/* Les 7 niveaux */}
      <section className="py-16 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Les 7 niveaux
        </h2>
        <div className="space-y-4">
          {levels.map((level) => (
            <Link
              key={level.id}
              href={`/formation/${level.slug}`}
              className="block"
            >
              <Card className="p-5 bg-neutral-900 border-neutral-800 hover:border-orange-400/50 transition-all flex items-center gap-6 group">
                <span className="text-2xl font-bold text-neutral-600 group-hover:text-orange-400 transition-colors w-8 text-center">
                  {level.id}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{level.title}</h3>
                  <p className="text-sm text-neutral-400 truncate">
                    {level.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-orange-400 transition-colors shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Pret a commencer ?</h2>
        <p className="text-neutral-400">
          Aucun prerequis Firebase. Juste les bases de JavaScript et React.
        </p>
        <Link href="/connexion">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            Niveau 0 — Decouverte
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
