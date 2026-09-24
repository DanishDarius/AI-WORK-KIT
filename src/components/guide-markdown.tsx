import Image from "next/image";
import type { ReactNode } from "react";
import { CopyPromptButton } from "./guide-actions";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; lines: string[] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "visual"; text: string }
  | { type: "rule" };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/^#\s+.+$/m, "").replace(/^\*[^*]+·[^*]+\*$/m, "").split(/\r?\n/);
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }
    if (/^---+$/.test(line)) { blocks.push({ type: "rule" }); index += 1; continue; }
    if (/^\[IMAGE[^\]]*\]$/i.test(line) || /^`\[IMAGE[^\]]*\]`$/i.test(line)) {
      blocks.push({ type: "visual", text: line.replace(/^`|`$/g, "") }); index += 1; continue;
    }
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) { blocks.push({ type: "heading", level: heading[1].length, text: heading[2] }); index += 1; continue; }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (index < lines.length && (lines[index].trim().startsWith(">") || !lines[index].trim())) {
        const value = lines[index].trim();
        if (value.startsWith(">")) quote.push(value.replace(/^>\s?/, ""));
        else if (quote.length && quote[quote.length - 1] !== "") quote.push("");
        index += 1;
      }
      blocks.push({ type: "quote", lines: quote }); continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const items: string[] = [];
      const isOrdered = Boolean(ordered);
      const matcher = isOrdered ? /^\d+[.)]\s+(.+)$/ : /^[-*]\s+(.+)$/;
      while (index < lines.length) {
        const match = lines[index].trim().match(matcher);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      blocks.push({ type: "list", ordered: isOrdered, items }); continue;
    }
    if (line.startsWith("|") && line.endsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|") && lines[index].trim().endsWith("|")) {
        const cells = lines[index].trim().slice(1, -1).split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      blocks.push({ type: "table", rows }); continue;
    }
    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || /^(#{2,4})\s+/.test(next) || /^[-*]\s+/.test(next) || /^\d+[.)]\s+/.test(next) || next.startsWith(">") || next.startsWith("|") || /^---+$/.test(next) || /^`?\[IMAGE/i.test(next)) break;
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

function inline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    return part;
  });
}

export function GuideMarkdown({ markdown, guideNumber }: { markdown: string; guideNumber: number }) {
  const blocks = parseBlocks(markdown);
  const numberedBlocks = blocks.map((block, index) => ({
    block,
    index,
    partNumber: blocks.slice(0, index + 1).filter((candidate) => (
      candidate.type === "heading"
      && candidate.level === 2
      && !/^Introduction$/i.test(candidate.text)
      && !/^(Sommaire|Ce que (tu vas|vous allez) trouver)/i.test(candidate.text)
    )).length,
  }));

  return (
    <div className="aw-guide-prose">
      {numberedBlocks.map(({ block, index, partNumber }) => {
        if (block.type === "heading") {
          const id = `section-${index}`;
          if (block.level === 2) return <h2 key={index} id={id}>{partNumber > 0 && <span>Partie {String(partNumber).padStart(2, "0")}</span>}{inline(block.text)}</h2>;
          if (block.level === 3) return <h3 key={index} id={id}>{inline(block.text)}</h3>;
          return <h4 key={index}>{inline(block.text)}</h4>;
        }
        if (block.type === "paragraph") return <p key={index}>{inline(block.text)}</p>;
        if (block.type === "rule") return <hr key={index} />;
        if (block.type === "visual") {
          if (guideNumber !== 35) return null;
          return (
            <figure className="aw-guide-visual" key={index}>
              <Image
                src="/guides/visuals/guide-35-planche-reference.png"
                alt="Planche photographique d’une professionnelle fictive présentée de face, de profil et de dos."
                width={1536}
                height={1024}
                sizes="(max-width: 720px) calc(100vw - 32px), 760px"
              />
              <figcaption>Exemple original AI WORK KIT : trois vues cohérentes pour contrôler l’identité d’un avatar.</figcaption>
            </figure>
          );
        }
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return <Tag key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</Tag>;
        }
        if (block.type === "table") return (
          <div className="aw-guide-table-wrap" key={index}><table><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex}>{inline(cell)}</th> : <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>
        );
        if (block.type === "quote") {
          const promptText = block.lines.join("\n").trim();
          return <aside className="aw-guide-prompt" key={index}><div><span>Le prompt à copier</span><CopyPromptButton text={promptText} /></div>{block.lines.map((line, lineIndex) => line ? <p key={lineIndex}>{inline(line)}</p> : <br key={lineIndex} />)}</aside>;
        }
        return null;
      })}
    </div>
  );
}
