# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

**Firebase Academy** — a French-language interactive training site that teaches Firebase from zero to mastery by building a real app (NoteFlow: a collaborative notes app). Deployed on Firebase Hosting with a GitHub repo.

## Repository Structure

```
docs/                           # Firebase reference documentation (24 product files in French)
docs/formation/                 # Training curriculum (7 levels + resources)
  ├── PLAN-DU-SITE.md          # COMPLETE SITE SPECIFICATION — read this first
  ├── 0_INDEX.md               # Training overview and index
  ├── niveau-0-decouverte.md   # Level 0: Firebase project setup, CLI, emulators
  ├── niveau-1-donnees.md      # Level 1: Firestore CRUD, real-time sync
  ├── niveau-2-utilisateurs.md # Level 2: Authentication (Google, email)
  ├── niveau-3-securite.md     # Level 3: Security Rules
  ├── niveau-4-backend.md      # Level 4: Cloud Storage, Cloud Functions
  ├── niveau-5-deploiement.md  # Level 5: Hosting, CI/CD, custom domain
  ├── niveau-6-pro.md          # Level 6: Analytics, Remote Config, AI Logic
  ├── glossaire.md             # ~80 technical terms explained simply + web search links
  └── exemples-concrets.md     # Each Firebase product illustrated with real-world examples
src/                            # Next.js App Router source code
  ├── app/                     # Pages (formation, glossaire, exemples, reference)
  ├── components/              # UI components (layout, glossary, formation)
  ├── data/                    # Data files (glossary.ts, levels.ts, products.ts)
  ├── hooks/                   # Custom hooks (useProgress.ts)
  └── lib/                     # Utilities (utils.ts)
```

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** + **Shadcn UI** (base-ui, NOT radix-ui) + **Lucide Icons**
- **next-themes** for dark/light mode
- **Firebase Hosting** (deployment)

## Important: Shadcn UI uses base-ui

This project's Shadcn UI components use `@base-ui/react` (NOT `@radix-ui`). Key API differences:
- No `asChild` prop — use `render={<Element />}` instead
- `TooltipProvider` uses `delay` not `delayDuration`
- Always check `src/components/ui/*.tsx` before using component APIs

## Commands

```bash
npm run dev              # Local dev server
npm run build            # Production build
npm run lint             # ESLint
firebase deploy          # Deploy to Firebase Hosting
```

## Key Design Decisions

- **Glossary tooltips** are the site's signature feature: every technical term is wrapped in `<GlossaryTerm>` with hover tooltip (300ms delay), definition, and Google search link.
- **Progression** tracked in `localStorage` (no backend auth).
- **All content is in French.** UI labels, documentation, code comments.
- Content files in `docs/` are the source of truth.

## Content Conventions

- Every `.md` file starts with an H1 title and includes a `## Table des Matieres`
- Markdown follows markdownlint rules (MD022, MD032, MD009, MD060)
- No accented characters in filenames
