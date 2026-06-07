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
        <p className="text-xs text-muted-foreground">
          Derniere mise a jour de la documentation : 7 juin 2026
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Apprends Firebase en
          <br />
          <span className="text-orange-400">construisant une vraie app</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          De zero a la production, niveau par niveau. En francais, sans jargon.
          <br />
          Chaque mot technique est explique.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button render={<a href="/connexion" />} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
            Commencer la formation
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button render={<a href="/glossaire" />} size="lg" variant="outline" className="border-border text-muted-foreground hover:text-foreground">
            Voir le glossaire
          </Button>
        </div>
      </section>

      {/* Ce que tu vas construire */}
      <section className="py-16 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            Tu vas construire NoteFlow
          </h2>
          <p className="text-muted-foreground">
            Une app de prise de notes collaborative, de A a Z.
          </p>
        </div>
        <Card className="p-8 bg-card border-border">
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
              <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
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
          <Card className="p-6 bg-card border-border space-y-3">
            <BookOpen className="w-8 h-8 text-orange-400" />
            <h3 className="font-semibold">Formation progressive</h3>
            <p className="text-sm text-muted-foreground">
              7 niveaux, un projet fil rouge. Chaque niveau ajoute une brique a
              la meme app.
            </p>
          </Card>
          <Card className="p-6 bg-card border-border space-y-3">
            <MessageCircleQuestion className="w-8 h-8 text-blue-400" />
            <h3 className="font-semibold">Aucun mot incompris</h3>
            <p className="text-sm text-muted-foreground">
              Chaque terme technique est souligne. Au survol, tu as
              l&apos;explication. Au clic, tu approfondis.
            </p>
          </Card>
          <Card className="p-6 bg-card border-border space-y-3">
            <Lightbulb className="w-8 h-8 text-green-400" />
            <h3 className="font-semibold">Exemples du monde reel</h3>
            <p className="text-sm text-muted-foreground">
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
            <a
              key={level.id}
              href={`/formation/${level.slug}`}
              className="block"
            >
              <Card className="p-5 bg-card border-border hover:border-orange-400/50 transition-all flex items-center gap-6 group">
                <span className="text-2xl font-bold text-muted-foreground group-hover:text-orange-400 transition-colors w-8 text-center">
                  {level.id}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{level.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {level.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 transition-colors shrink-0" />
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Pret a commencer ?</h2>
        <p className="text-muted-foreground">
          Aucun prerequis Firebase. Juste les bases de JavaScript et React.
        </p>
        <Button render={<a href="/connexion" />} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          Niveau 0 — Decouverte
          <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      {/* Createur */}
      <section className="pb-16 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Cree par <span className="text-foreground font-medium">Jean-Michel</span>
        </p>
        <a
          href="https://wa.me/33608183338"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-green-500 hover:text-green-400 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contacter sur WhatsApp
        </a>
      </section>
    </div>
  );
}
