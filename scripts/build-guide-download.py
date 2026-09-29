"""Build a single downloadable PDF for one guide."""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Image as RLImage, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
GUIDES = ROOT / "content" / "guides"
FONTS = ROOT / "src" / "fonts"
PDFS = ROOT / "private" / "guides" / "pdf"

INK = colors.HexColor("#162421")
MUTED = colors.HexColor("#52615b")
GREEN = colors.HexColor("#126e57")
LINE = colors.HexColor("#d9e4dc")
CREAM = colors.HexColor("#f8f5ee")


def register_fonts() -> None:
    for name, filename in (
        ("Outfit", "Outfit-variable.ttf"),
        ("Bricolage", "BricolageGrotesque-variable.ttf"),
        ("DMMono", "DMMono-Regular.ttf"),
    ):
        pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))
    # The variable Outfit file defaults to a very thin instance in ReportLab.
    # Use a readable embedded body face while retaining the approved display/mono pairing.
    pdfmetrics.registerFont(TTFont("Calibri", r"C:\Windows\Fonts\calibri.ttf"))
    pdfmetrics.registerFont(TTFont("CalibriBold", r"C:\Windows\Fonts\calibrib.ttf"))
    pdfmetrics.registerFont(TTFont("CalibriItalic", r"C:\Windows\Fonts\calibrii.ttf"))
    pdfmetrics.registerFontFamily("Calibri", normal="Calibri", bold="CalibriBold", italic="CalibriItalic")


def clean_inline(value: str) -> str:
    value = html.escape(value)
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", value)
    value = re.sub(r"`([^`]+)`", r"<font name='DMMono'>\1</font>", value)
    return value


def read_guide(number: int) -> tuple[str, str, str, str]:
    files = [p for p in GUIDES.glob("guide-*.md") if re.match(rf"^guide-0*{number}-", p.name)]
    if len(files) != 1:
        raise ValueError(f"Expected exactly one file for guide {number}, found {len(files)}")
    raw = files[0].read_text(encoding="utf-8-sig")
    raw = re.sub(r"\A---\s*\n.*?\n---\s*\n", "", raw, flags=re.S)
    lines = raw.splitlines()
    title_line = next(line for line in lines if line.startswith("# "))
    title = title_line[2:].strip()
    meta = next((line.strip("* ") for line in lines if re.match(r"^\*[^*]+·[^*]+\*$", line)), "Guide pratique")
    slug = re.sub(r"^guide-\d+-", "", files[0].stem)
    return slug, title, meta, raw


def styles() -> dict[str, ParagraphStyle]:
    base = dict(textColor=INK, alignment=TA_LEFT, allowWidows=0, allowOrphans=0)
    return {
        "kicker": ParagraphStyle("Kicker", fontName="DMMono", fontSize=8, leading=11, textColor=GREEN, spaceAfter=16),
        "title": ParagraphStyle("Title", **base, fontName="Bricolage", fontSize=27, leading=30, spaceAfter=14),
        "meta": ParagraphStyle("Meta", fontName="DMMono", fontSize=9, leading=13, textColor=GREEN, spaceAfter=25),
        "h2": ParagraphStyle("H2", **base, fontName="Bricolage", fontSize=17, leading=21, spaceBefore=23, spaceAfter=9, keepWithNext=True),
        "h3": ParagraphStyle("H3", **base, fontName="Bricolage", fontSize=12, leading=16, spaceBefore=15, spaceAfter=6, keepWithNext=True),
        "body": ParagraphStyle("Body", **base, fontName="Calibri", fontSize=10.7, leading=15.4, spaceAfter=9),
        "bullet": ParagraphStyle("Bullet", **base, fontName="Calibri", fontSize=10.5, leading=14.8, leftIndent=17, firstLineIndent=-11, spaceAfter=4),
        "prompt": ParagraphStyle("Prompt", **base, fontName="Calibri", fontSize=10, leading=14,
                                 leftIndent=12, rightIndent=12, borderPadding=6,
                                 backColor=CREAM, spaceAfter=4),
        "promptLabel": ParagraphStyle("PromptLabel", fontName="DMMono", fontSize=7, leading=10, textColor=GREEN, spaceAfter=9),
    }


def parse_body(raw: str, style: dict[str, ParagraphStyle], number: int) -> list:
    # The source files include a few editorial lead-magnet placeholders.
    # They belong to the web draft, not to the downloadable finished guide.
    raw = re.sub(
        r"(?ms)^---\s*\n\s*##\s+(?:\d+\.\s+)?(?:Le fichier complet|Pour aller plus loin)\s*\n\s*\*?\[(?:Emplacement réservé|Section à adapter)[^\n]*\]\*?\s*\n",
        "",
        raw,
    )
    lines = raw.splitlines()
    title_index = next(i for i, line in enumerate(lines) if line.startswith("# "))
    lines = lines[title_index + 1 :]
    while lines and not lines[0].strip():
        lines = lines[1:]
    if lines and re.match(r"^\*[^*]+·[^*]+\*$", lines[0]):
        lines = lines[1:]

    story: list = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        if re.fullmatch(r"\[IMAGE[^\]]*\]", line, re.I):
            if number == 35:
                photo = ROOT / "public" / "guides" / "interior" / "guide-035-character-sheet.png"
                if not photo.is_file():
                    raise FileNotFoundError(f"Missing original character sheet: {photo}")
                story.extend([
                    Spacer(1, 8),
                    RLImage(str(photo), width=A4[0] - 108, height=(A4[0] - 108) * 2 / 3),
                    Spacer(1, 7),
                    Paragraph("Une personne fictive, trois angles cohérents : face, profil et dos.", style["meta"]),
                ])
                i += 1
                continue
            visual = re.search(r"logo\s+([^):]+)", line, re.I)
            label = visual[1].strip() if visual else "Illustration du guide"
            panel = Table([[
                Paragraph("ORGANISME", style["promptLabel"]),
                Paragraph(clean_inline(label), style["h3"]),
            ]], colWidths=[105, A4[0] - 213], hAlign="LEFT")
            panel.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), CREAM),
                ("LINEBEFORE", (0, 0), (0, -1), 3, GREEN),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]))
            story.extend([Spacer(1, 6), panel, Spacer(1, 9)])
            i += 1
            continue
        if line.startswith("|"):
            rows: list[list[str]] = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [cell.strip() for cell in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
                    rows.append(cells)
                i += 1
            if rows:
                headers = rows[0]
                for row in rows[1:]:
                    parts = [f"<b>{clean_inline(key)}:</b> {clean_inline(value)}" for key, value in zip(headers, row)]
                    story.append(Paragraph("  ·  ".join(parts), style["body"]))
                story.append(Spacer(1, 8))
            continue
        heading = re.match(r"^(#{2,3})\s+(.+)", line)
        if heading:
            story.append(Paragraph(clean_inline(heading[2]), style["h2" if len(heading[1]) == 2 else "h3"]))
            i += 1
            continue
        if line == "---":
            story.extend([Spacer(1, 8), HRFlowable(width="100%", thickness=0.7, color=LINE), Spacer(1, 5)])
            i += 1
            continue
        if line.startswith(">"):
            quoted: list[str] = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                quoted.append(lines[i].strip()[1:].strip())
                i += 1
            # Paragraphs remain splittable across pages, unlike one tall table cell.
            story.extend([Spacer(1, 4), Paragraph("PROMPT À COPIER", style["promptLabel"])])
            story.extend(Paragraph(clean_inline(q) if q else "&nbsp;", style["prompt"]) for q in quoted)
            story.append(Spacer(1, 12))
            continue
        item = re.match(r"^(?:[-*]|\d+[.)])\s+(.+)", line)
        if item:
            while i < len(lines):
                match = re.match(r"^(?:[-*]|\d+[.)])\s+(.+)", lines[i].strip())
                if not match:
                    break
                prefix = "□" if match[1].startswith("[ ]") else "•"
                item_text = match[1][4:] if prefix == "□" else match[1]
                story.append(Paragraph(f"{prefix}  {clean_inline(item_text)}", style["bullet"]))
                i += 1
            story.append(Spacer(1, 7))
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"^(?:#{2,3}\s|---$|>|[-*]\s|\d+[.)]\s|\[IMAGE)", lines[i].strip()):
            paragraph.append(lines[i].strip())
            i += 1
        story.append(Paragraph(clean_inline(" ".join(paragraph)), style["body"]))
    return story


def draw_page(canvas, doc, number: int) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(CREAM)
    canvas.rect(0, height - 68, width, 68, fill=1, stroke=0)
    canvas.setFillColor(GREEN)
    canvas.setFont("DMMono", 8)
    canvas.drawString(54, height - 39, "AI WORK KIT  /  GUIDE " + f"{number:03d}")
    canvas.setStrokeColor(LINE)
    canvas.line(54, height - 68, width - 54, height - 68)
    canvas.line(54, 48, width - 54, 48)
    canvas.setFont("DMMono", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(54, 32, "L'IA appliquée à votre travail")
    canvas.drawRightString(width - 54, 32, f"{doc.page:02d}")
    canvas.restoreState()


def build_pdf(number: int, title: str, meta: str, raw: str, path: Path) -> None:
    register_fonts()
    sty = styles()
    doc = SimpleDocTemplate(
        str(path), pagesize=A4, rightMargin=54, leftMargin=54,
        topMargin=92, bottomMargin=68, title=title, author="AI WORK KIT",
    )
    story = [
        Paragraph(f"GUIDE {number:03d}  /  À LIRE ET À UTILISER", sty["kicker"]),
        Paragraph(clean_inline(title), sty["title"]),
        Paragraph(clean_inline(meta.upper()), sty["meta"]),
        HRFlowable(width="100%", thickness=1.2, color=GREEN),
        Spacer(1, 10),
    ]
    story.extend(parse_body(raw, sty, number))
    while story and isinstance(story[-1], Spacer):
        story.pop()
    doc.build(story, onFirstPage=lambda c, d: draw_page(c, d, number), onLaterPages=lambda c, d: draw_page(c, d, number))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("number", type=int)
    args = parser.parse_args()
    slug, title, meta, raw = read_guide(args.number)
    PDFS.mkdir(parents=True, exist_ok=True)
    pdf = PDFS / f"guide-{args.number:03d}-{slug}.pdf"
    build_pdf(args.number, title, meta, raw, pdf)
    print(f"PDF={pdf}")


if __name__ == "__main__":
    main()
