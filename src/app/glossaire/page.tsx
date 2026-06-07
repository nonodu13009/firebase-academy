"use client";

import { useState } from "react";
import { getAllTerms } from "@/data/glossary";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ExternalLink, BookOpen } from "lucide-react";

export default function GlossairePage() {
  const [search, setSearch] = useState("");
  const allTerms = getAllTerms();

  const filtered = search
    ? allTerms.filter(
        (e) =>
          e.term.toLowerCase().includes(search.toLowerCase()) ||
          e.definition.toLowerCase().includes(search.toLowerCase())
      )
    : allTerms;

  const letters = [...new Set(filtered.map((e) => e.term[0].toUpperCase()))].sort();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">Glossaire</h1>
        <p className="text-neutral-400">
          {allTerms.length} termes techniques expliques simplement, avec des
          liens pour approfondir.
        </p>
      </div>

      <Input
        type="search"
        placeholder="Chercher un terme... (ex: API, SDK, NoSQL)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-neutral-900 border-neutral-700"
      />

      {/* Navigation alphabetique */}
      <div className="flex flex-wrap gap-1">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 rounded flex items-center justify-center text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Liste des termes */}
      <div className="space-y-6">
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <h2 className="text-lg font-bold text-orange-400 mb-3">{letter}</h2>
            <div className="space-y-3">
              {filtered
                .filter((e) => e.term[0].toUpperCase() === letter)
                .map((entry) => (
                  <Card
                    key={entry.term}
                    className="p-4 bg-neutral-900 border-neutral-800"
                  >
                    <h3 className="font-semibold">
                      {entry.term}
                      {entry.fullTerm && (
                        <span className="font-normal text-neutral-500 ml-2">
                          ({entry.fullTerm})
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1">
                      {entry.definition}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <a
                        href={entry.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Rechercher sur le web
                      </a>
                      {entry.referenceLink && (
                        <a
                          href={entry.referenceLink}
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                        >
                          <BookOpen className="w-3 h-3" />
                          Fiche reference
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
