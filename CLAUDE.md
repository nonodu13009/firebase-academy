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
  ├── app/                     # Pages (formation, glossaire, exemples, reference, connexion)
  ├── components/              # UI components (layout, glossary, formation)
  ├── contexts/                # AuthContext (Firebase Auth state + logout redirect)
  ├── data/                    # Data files (glossary.ts, levels.ts, products.ts)
  ├── hooks/                   # Custom hooks (useProgress.ts — localStorage with useRef pattern)
  └── lib/                     # Utilities (utils.ts, firebase.ts, auth.ts)
```

## Stack

- **Next.js 16** (App Router, Turbopack, `output: "export"` for static site)
- **TypeScript**
- **Tailwind CSS v4** + `@tailwindcss/typography` (via `@plugin`) + **Shadcn UI** (base-ui, NOT radix-ui) + **Lucide Icons**
- **next-themes** for dark/light mode
- **Firebase Hosting** (static files from `out/` directory)
- **Firebase Auth** (Google + email/password, client-side only)
- **Google Analytics** (measurementId in `.env.local`)

## Important: Shadcn UI uses base-ui

This project's Shadcn UI components use `@base-ui/react` (NOT `@radix-ui`). Key API differences:

- No `asChild` prop — use `render={<Element />}` instead
- `TooltipProvider` uses `delay` not `delayDuration`
- Always check `src/components/ui/*.tsx` before using component APIs

## Critical: Static Hosting Constraints

- **No `next/link`** — use native `<a>` tags everywhere. Next.js `<Link>` prefetches RSC payloads which Firebase static hosting cannot serve.
- **`trailingSlash: true`** in both `next.config.ts` and `firebase.json`
- **`output: "export"`** in `next.config.ts` — all pages must be statically renderable
- **`generateStaticParams`** required for dynamic routes (e.g., `[niveau]`)
- Server components can read files at build time (markdown parsing in `page.tsx`), but client components cannot

## Commands

```bash
npm run dev              # Local dev server
npm run build            # Production build (generates out/)
npm run lint             # ESLint
firebase deploy --only hosting   # Deploy to Firebase Hosting
```

## Key Architecture

### Markdown Content Pipeline

Level pages render markdown from `docs/formation/niveau-*.md` at build time:

1. `src/app/formation/[niveau]/page.tsx` (server) reads markdown, parses with `remark` + `remark-gfm` + `remark-html`, strips H1 and TOC
2. Passes HTML string as `contentHtml` prop to `NiveauContent.tsx` (client)
3. Rendered with `dangerouslySetInnerHTML` + Tailwind `prose dark:prose-invert` classes
4. Slug-to-file mapping: `niveau-0` → `niveau-0-decouverte.md`, etc.

### Progress Tracking

- `useProgress` hook stores level status in `localStorage` (key: `firebase-academy-progress`)
- Uses `useRef` pattern to avoid stale closures in `useCallback`
- Three states: `not-started`, `in-progress`, `completed`
- `ProgressTimeline` component (sidebar on desktop, floating button on mobile) visible on ALL pages, shows last validated level and currently viewed page

### Theme System

- All colors use semantic Tailwind tokens: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, etc.
- **Never use hardcoded `neutral-*` colors** — always use theme tokens so light/dark mode works correctly
- CSS variables defined in `globals.css` under `:root` (light) and `.dark` (dark)

### Auth Flow

- `AuthContext` wraps the app, provides `user`, `loading`, `logout`
- Logout redirects to homepage (`/`)
- Login page (`/connexion`) supports: Google, email/password, password reset, register
- Login redirects to `/formation`

## Content Conventions

- Every `.md` file starts with an H1 title and includes a `## Table des Matieres`
- Markdown follows markdownlint rules (MD022, MD032, MD009, MD060)
- No accented characters in filenames
- **All content is in French.** UI labels, documentation, code comments
- Glossary tooltips are the site's signature feature: technical terms wrapped in `<GlossaryTerm>` with hover tooltip (300ms delay)
