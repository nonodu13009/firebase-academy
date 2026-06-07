import { levels } from "@/data/levels";
import NiveauContent from "./NiveauContent";
import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const slugToFile: Record<string, string> = {
  "niveau-0": "niveau-0-decouverte.md",
  "niveau-1": "niveau-1-donnees.md",
  "niveau-2": "niveau-2-utilisateurs.md",
  "niveau-3": "niveau-3-securite.md",
  "niveau-4": "niveau-4-backend.md",
  "niveau-5": "niveau-5-deploiement.md",
  "niveau-6": "niveau-6-pro.md",
};

export function generateStaticParams() {
  return levels.map((level) => ({ niveau: level.slug }));
}

async function getMarkdownContent(slug: string): Promise<string | null> {
  const filename = slugToFile[slug];
  if (!filename) return null;

  const filePath = path.join(process.cwd(), "docs", "formation", filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  // Remove the H1 title (already shown in the UI)
  const withoutH1 = raw.replace(/^# .+\n/, "");
  // Remove the table of contents section
  const withoutToc = withoutH1.replace(
    /## Table des Mati[eè]res\n\n(- \[.*\]\(.*\)\n)+\n?/,
    ""
  );

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(withoutToc);

  return String(result);
}

export default async function NiveauPage({
  params,
}: {
  params: Promise<{ niveau: string }>;
}) {
  const { niveau } = await params;
  const contentHtml = await getMarkdownContent(niveau);
  return <NiveauContent contentHtml={contentHtml} />;
}
