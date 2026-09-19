import "server-only";

import fs from "node:fs";
import path from "node:path";

export type GuideSummary = {
  number: number;
  slug: string;
  title: string;
  tool: string;
  duration: string;
  excerpt: string;
  category: string;
  source: string;
  hasVisual: boolean;
  coverVariant: number;
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

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function stripMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFile(filename: string): Guide {
  const raw = fs.readFileSync(path.join(guidesDirectory, filename), "utf8");
  const frontMatterMatch = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  const frontMatter = frontMatterMatch?.[1] ?? "";
  const markdown = raw.slice(frontMatterMatch?.[0].length ?? 0).trim();
  const number = Number(filename.match(/^guide-(\d+)/)?.[1] ?? 0);
  const slug = filename.replace(/^guide-\d+-/, "").replace(/\.md$/, "");
  const title = markdown.match(/^#\s+(.+)$/m)?.[1].trim() ?? slug.replaceAll("-", " ");
  const meta = markdown.match(/^\*([^*]+?)\s*·\s*([^*]+?)\*$/m);
  const tool = meta?.[1].trim() ?? "Multi-outils";
  const duration = meta?.[2].trim() ?? "Guide pratique";
  const source = frontMatter.match(/^Source\s*:\s*(.+)$/mi)?.[1].trim() ?? "";
  const hasVisual = /\[IMAGE[^\]]*\]/i.test(markdown);
  const searchable = normalize(`${title} ${slug} ${markdown.slice(0, 2500)}`);
  const category = categories.find(({ terms }) => terms.some((term) => searchable.includes(term)))?.label ?? "Pratique IA";
  const paragraphs = markdown
    .split(/\r?\n\s*\r?\n/)
    .filter((block) => !/\[IMAGE[^\]]*\]/i.test(block))
    .map(stripMarkdown)
    .filter((line) => (
      line.length > 85
      && !line.startsWith("-")
      && !line.startsWith("Ce que tu vas trouver")
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
    source,
    hasVisual,
    coverVariant: ((number - 1) % 8) + 1,
    markdown,
  };
}

export function getAllGuides(): Guide[] {
  return fs
    .readdirSync(guidesDirectory)
    .filter((filename) => /^guide-\d+-.+\.md$/.test(filename))
    .map(parseFile)
    .sort((a, b) => a.number - b.number);
}

export function getGuideSummaries(): GuideSummary[] {
  return getAllGuides().map((guide) => ({
    number: guide.number,
    slug: guide.slug,
    title: guide.title,
    tool: guide.tool,
    duration: guide.duration,
    excerpt: guide.excerpt,
    category: guide.category,
    source: guide.source,
    hasVisual: guide.hasVisual,
    coverVariant: guide.coverVariant,
  }));
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getAllGuides().find((guide) => guide.slug === slug);
}

export function getGuideCategories(guides = getGuideSummaries()) {
  return Array.from(new Set(guides.map((guide) => guide.category))).sort((a, b) => a.localeCompare(b, "fr"));
}
