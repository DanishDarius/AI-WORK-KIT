import "server-only";

import fs from "node:fs";
import path from "node:path";
import { sansAccents } from "@/lib/normaliser";
import { guideInclus } from "@/lib/offre";

export type GuideSummary = {
  number: number;
  slug: string;
  title: string;
  tool: string;
  duration: string;
  excerpt: string;
  category: string;
  hasVisual: boolean;
  coverVariant: number;
  // Inclus dans l'accès AIW (lisible sans abonnement Bibliothèque).
  inclus: boolean;
};

export type Guide = GuideSummary & {
  markdown: string;
};

const guidesDirectory = path.join(process.cwd(), "content", "guides");

const categories: Array<{ label: string; terms: string[] }> = [
  { label: "Démarrer", terms: ["demarrer", "debut", "premier", "fondation", "comprendre", "reglage"] },
  { label: "Productivité", terms: ["productiv", "workflow", "automatis", "temps", "reunion", "email", "notion"] },
  { label: "Création", terms: ["contenu", "design", "ecriture", "storytelling", "video", "image", "avatar"] },
  { label: "Carrière", terms: ["carriere", "emploi", "cv", "recrut", "competence", "formation", "certification"] },
  { label: "Business", terms: ["business", "vente", "startup", "produit", "marche", "finance", "trading", "publicit"] },
  { label: "Agents IA", terms: ["agent", "assistant", "skill", "plugin", "mcp", "cowork"] },
];

function stripMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function removeEditorialPlaceholders(markdown: string) {
  // These draft-only sections are excluded from the downloadable PDF too.
  // Keep the authored guide files intact while matching the published reading page.
  return markdown.replace(
    /^---[ \t]*\r?\n[ \t]*\r?\n##[ \t]+(?:\d+\.[ \t]+)?(?:Le fichier complet|Pour aller plus loin)[ \t]*\r?\n[ \t]*\r?\n\*\[(?:Emplacement réservé|Section à adapter)[^\r\n]*\]\*[ \t]*\r?\n/gm,
    "",
  );
}

function parseFile(filename: string): Guide {
  const raw = fs.readFileSync(path.join(guidesDirectory, filename), "utf8");
  const frontMatterMatch = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  const markdown = removeEditorialPlaceholders(raw.slice(frontMatterMatch?.[0].length ?? 0)).trim();
  const number = Number(filename.match(/^guide-(\d+)/)?.[1] ?? 0);
  const slug = filename.replace(/^guide-\d+-/, "").replace(/\.md$/, "");
  const title = markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug.replaceAll("-", " ");
  const meta = markdown.match(/^\*([^*]+?)\s*·\s*([^*]+?)\*$/m);
  const tool = meta?.[1].trim() ?? "Multi-outils";
  const duration = meta?.[2].trim() ?? "Guide pratique";
  const hasVisual = /\[IMAGE[^\]]*\]/i.test(markdown);
  const searchable = sansAccents(`${title} ${slug} ${markdown.slice(0, 2500)}`);
  const category = categories.find(({ terms }) => terms.some((term) => searchable.includes(term)))?.label ?? "Pratique IA";
  const paragraphs = markdown
    .split(/\r?\n\s*\r?\n/)
    .filter((block) => !/\[IMAGE[^\]]*\]/i.test(block))
    .map(stripMarkdown)
    .filter((line) => (
      line.length > 85
      && !line.startsWith("-")
      && !/^Ce que (tu vas|vous allez) trouver/.test(line)
      && !line.startsWith("Sommaire")
    ));
  const excerptSource = paragraphs[0] ?? "Un guide concret pour intégrer l’intelligence artificielle dans votre quotidien professionnel.";
  const excerpt = excerptSource.length > 180 ? `${excerptSource.slice(0, 177).trimEnd()}…` : excerptSource;

  return {
    number,
    slug,
    title,
    tool,
    duration,
    excerpt,
    category,
    hasVisual,
    coverVariant: ((number - 1) % 8) + 1,
    inclus: guideInclus(number),
    markdown,
  };
}

// Les fichiers ne changent pas entre deux déploiements : lus une seule fois
// par instance serveur.
let cache: Guide[] | null = null;

export function getAllGuides(): Guide[] {
  if (!cache) {
    cache = fs
      .readdirSync(guidesDirectory)
      .filter((filename) => /^guide-\d+-.+\.md$/.test(filename))
      .map(parseFile)
      .sort((a, b) => a.number - b.number);
  }
  return cache;
}

// Sans abonnement, un guide réservé ne montre que son titre (plan : « titres
// seulement »). Son texte, son résumé compris, ne quitte pas le serveur.
export function guideLisible(guide: Pick<GuideSummary, "inclus">, abonne: boolean) {
  return guide.inclus || abonne;
}

export function getGuideSummaries(abonne: boolean): GuideSummary[] {
  return getAllGuides().map((guide) => ({
    number: guide.number,
    slug: guide.slug,
    title: guide.title,
    tool: guide.tool,
    duration: guide.duration,
    excerpt: guideLisible(guide, abonne) ? guide.excerpt : "",
    category: guide.category,
    hasVisual: guide.hasVisual,
    coverVariant: guide.coverVariant,
    inclus: guide.inclus,
  }));
}
