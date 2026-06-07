"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Filter = "all" | "build" | "run" | "ia";

const exemples: Record<string, { brief: string; examples: string[] }> = {
  authentication: {
    brief:
      "Le systeme qui gere 'qui est connecte' dans ton app. Tu ne codes pas la gestion des mots de passe, Firebase le fait.",
    examples: [
      "Spotify : 'Se connecter avec Google', l'app ne voit jamais ton mot de passe",
      "Notion : connexion Google, Apple ou email, tu retrouves tout sur un nouveau telephone",
      "WhatsApp : verification par SMS a l'installation",
    ],
  },
  firestore: {
    brief:
      "Un endroit pour stocker les donnees structurees de ton app (textes, chiffres, listes). Synchronisation en temps reel.",
    examples: [
      "Google Keep : tes notes se synchronisent instantanement entre telephone et ordi",
      "Trello : quand un collegue deplace une carte, tu le vois en direct",
      "E-commerce : quand le stock passe a 0, le bouton Acheter disparait pour tous",
    ],
  },
  "cloud-storage": {
    brief:
      "Un disque dur dans le cloud pour stocker des fichiers : photos, videos, PDF.",
    examples: [
      "Instagram : la photo que tu postes est envoyee sur un stockage cloud, l'app recoit une URL",
      "Google Drive : les fichiers uploades sont stockes sur des serveurs distants",
      "Petites annonces : le vendeur uploade les photos de son meuble, les URLs vont dans la base",
    ],
  },
  "cloud-functions": {
    brief:
      "Du code qui tourne sur les serveurs Google, sans que tu geres de serveur.",
    examples: [
      "Email de bienvenue automatique quand un utilisateur s'inscrit",
      "Moderation de contenu : verifier les commentaires avant publication",
      "Redimensionnement d'image automatique apres upload",
    ],
  },
  hosting: {
    brief:
      "Le service qui met ton site en ligne sur un CDN mondial en une commande.",
    examples: [
      "Portfolio personnel : tu tapes firebase deploy, il est en ligne en 30 secondes",
      "Landing page : rapide, distribuee mondialement, HTTPS automatique",
      "SPA React/Next.js : hebergee et servie rapidement",
    ],
  },
  analytics: {
    brief:
      "Un systeme qui enregistre ce que font les utilisateurs pour comprendre comment ameliorer ton produit.",
    examples: [
      "Decouvrir que 80% des utilisateurs ne finissent pas l'inscription",
      "Mesurer combien de personnes utilisent le bouton Partager",
      "Savoir que 60% de tes utilisateurs viennent de France",
    ],
  },
  "remote-config": {
    brief:
      "Un tableau de bord pour changer le comportement de l'app SANS deployer une nouvelle version.",
    examples: [
      "Changer le bandeau 'Soldes -30%' instantanement pour tous les utilisateurs",
      "Activer une feature pour 5% des utilisateurs, puis monter a 100%",
      "Tester 10 vs 20 resultats par page sans toucher au code",
    ],
  },
  "cloud-messaging": {
    brief:
      "Le service qui envoie des notifications push sur le telephone ou dans le navigateur.",
    examples: [
      "Uber Eats : 'Votre commande est en chemin !'",
      "WhatsApp : notification quand tu recois un message",
      "Blog : 'Nouvel article publie' pour les abonnes",
    ],
  },
  "ai-logic": {
    brief:
      "Un acces direct aux modeles Gemini de Google depuis ton app, sans gerer de cles API cote client.",
    examples: [
      "Resume automatique d'un article de 3 pages en 3 phrases",
      "Analyse de photo : extraire le montant d'un ticket de caisse",
      "Chatbot integre qui repond aux questions des utilisateurs",
    ],
  },
  "app-check": {
    brief:
      "Un bouclier qui verifie que les requetes viennent de TON app, pas d'un script pirate.",
    examples: [
      "Bloquer un script qui aspire toutes les donnees de ta base",
      "Empecher un bot de faire des milliers de requetes pour exploser ta facture",
      "Rejeter les faux scores envoyes par un tricheur dans un jeu",
    ],
  },
};

export default function ExemplesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const productsWithExemples = filtered.filter((p) => exemples[p.slug]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Exemples concrets</h1>
        <p className="text-neutral-400">
          Chaque produit Firebase explique avec des exemples du monde reel.
        </p>
      </div>

      <div className="flex gap-2">
        {(["all", "build", "run", "ia"] as Filter[]).map((f) => (
          <Button
            key={f}
            variant="ghost"
            size="sm"
            onClick={() => setFilter(f)}
            className={cn(
              filter === f
                ? "bg-orange-400/10 text-orange-400"
                : "text-neutral-400"
            )}
          >
            {f === "all" ? "Tous" : f === "build" ? "Build" : f === "run" ? "Run" : "IA"}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {productsWithExemples.map((product) => {
          const data = exemples[product.slug];
          return (
            <Card
              key={product.slug}
              className="p-6 bg-neutral-900 border-neutral-800"
            >
              <h3 className="font-semibold text-lg text-orange-400">
                {product.name}
              </h3>
              <p className="text-sm text-neutral-300 mt-2">{data.brief}</p>
              <ul className="mt-4 space-y-2">
                {data.examples.map((ex, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-neutral-400"
                  >
                    <span className="text-orange-400 mt-0.5 shrink-0">
                      &bull;
                    </span>
                    {ex}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
