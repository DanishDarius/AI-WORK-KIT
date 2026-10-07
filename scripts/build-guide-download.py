"""Fabrique le PDF à télécharger d'un guide, ou de tous les guides.

Usage : python scripts/build-guide-download.py 11 203
        python scripts/build-guide-download.py --tous

Besoin de : pip install reportlab fonttools brotli

Les polices sont celles du site (src/fonts) : Nunito pour les titres et les
étiquettes, Varela Round pour le texte. Les deux petites polices de secours
(signes et code) sont dans scripts/polices. Aucune police de l'ordinateur
n'est utilisée : le PDF est le même sur toutes les machines.
Le pied de page reprend le slogan écrit dans src/lib/marque.ts.
"""

from __future__ import annotations

import argparse
import html
import io
import math
import re
from pathlib import Path

from fontTools.ttLib import TTFont as PoliceSource
from fontTools.varLib import instancer

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
SECOURS = ROOT / "scripts" / "polices"
MARQUE = ROOT / "src" / "lib" / "marque.ts"
PDFS = ROOT / "private" / "guides" / "pdf"

INK = colors.HexColor("#162421")
MUTED = colors.HexColor("#52615b")
GREEN = colors.HexColor("#126e57")
LINE = colors.HexColor("#d9e4dc")
CREAM = colors.HexColor("#f8f5ee")


def lire_slogan() -> str:
    """Le slogan, lu là où il est écrit : une seule source (règle Q7)."""
    source = MARQUE.read_text(encoding="utf-8")
    parties = re.search(r"SLOGAN_PARTIES\s*=\s*\[([^\]]+)\]", source)
    if not parties:
        raise ValueError(f"Slogan introuvable dans {MARQUE}")
    morceaux = re.findall(r'"([^"]+)"', parties[1])
    if len(morceaux) < 2:
        raise ValueError(f"Slogan incomplet dans {MARQUE}")
    return " ".join(morceaux)


def _nommer(police: PoliceSource, nom: str) -> None:
    for ligne in police["name"].names:
        if ligne.nameID in (1, 4, 16):
            ligne.string = nom
        elif ligne.nameID == 6:
            ligne.string = nom.replace(" ", "")
        elif ligne.nameID in (2, 17):
            ligne.string = "Regular"


def _octets(police: PoliceSource) -> io.BytesIO:
    police.flavor = None
    tampon = io.BytesIO()
    police.save(tampon)
    tampon.seek(0)
    return tampon


def _nunito(graisse: int) -> io.BytesIO:
    # Le fichier du site est variable : on en tire une graisse fixe.
    police = PoliceSource(str(FONTS / "Nunito-latin-variable.woff2"), recalcTimestamp=False)
    fixe = instancer.instantiateVariableFont(police, {"wght": graisse})
    fixe.recalcTimestamp = False  # sinon la date du jour entre dans le PDF
    _nommer(fixe, f"AIW Nunito {graisse}")
    return _octets(fixe)


def _varela(penche: bool) -> io.BytesIO:
    police = PoliceSource(str(FONTS / "VarelaRound-latin-400.woff2"), recalcTimestamp=False)
    if penche:
        # Varela Round n'a pas d'italique : on penche le dessin, comme le fait
        # un navigateur sur le site.
        pente = math.tan(math.radians(11))
        formes = police["glyf"]
        for nom in police.getGlyphOrder():
            forme = formes[nom]
            if forme.isComposite():
                for partie in forme.components:
                    partie.x = round(partie.x + partie.y * pente)
            elif forme.numberOfContours > 0:
                points = forme.coordinates
                for k in range(len(points)):
                    x, y = points[k]
                    points[k] = (round(x + y * pente), y)
        for nom in police.getGlyphOrder():
            formes[nom].recalcBounds(formes)
            avance, _ = police["hmtx"][nom]
            police["hmtx"][nom] = (avance, getattr(formes[nom], "xMin", 0))
    _nommer(police, "AIW Varela Penche" if penche else "AIW Varela")
    return _octets(police)


COUVERT: set[int] = set()   # caractères dessinés par Nunito et Varela Round
SIGNES: set[int] = set()    # caractères de la police de signes
MONO: set[int] = set()      # caractères de la police du code


def register_fonts() -> None:
    if COUVERT:
        return
    pdfmetrics.registerFont(TTFont("Titre", _nunito(900)))
    pdfmetrics.registerFont(TTFont("Etiquette", _nunito(800)))
    pdfmetrics.registerFont(TTFont("Texte", _varela(False)))
    pdfmetrics.registerFont(TTFont("TextePenche", _varela(True)))
    pdfmetrics.registerFont(TTFont("Signes", str(SECOURS / "guides-symboles.ttf")))
    pdfmetrics.registerFont(TTFont("Mono", str(SECOURS / "guides-mono.ttf")))
    # Le gras du texte est en Nunito 800, comme la classe « strong » du site.
    pdfmetrics.registerFontFamily("Texte", normal="Texte", bold="Etiquette", italic="TextePenche", boldItalic="Etiquette")
    pdfmetrics.registerFontFamily("Titre", normal="Titre", bold="Titre", italic="Titre", boldItalic="Titre")
    pdfmetrics.registerFontFamily("Etiquette", normal="Etiquette", bold="Etiquette", italic="Etiquette", boldItalic="Etiquette")
    nunito = set(PoliceSource(str(FONTS / "Nunito-latin-variable.woff2")).getBestCmap())
    varela = set(PoliceSource(str(FONTS / "VarelaRound-latin-400.woff2")).getBestCmap())
    COUVERT.update(nunito & varela)
    SIGNES.update(PoliceSource(str(SECOURS / "guides-symboles.ttf")).getBestCmap())
    MONO.update(PoliceSource(str(SECOURS / "guides-mono.ttf")).getBestCmap())


# Les émojis n'ont pas de dessin dans une police de PDF : on met le signe le
# plus proche. Le texte du guide, lui, ne change pas.
REMPLACE = {"✅": "✔", "❌": "✘", "🔄": "↻", "📈": "↗", "\ufe0f": ""}
PASTILLE = {"🔴": "#c0392b", "🟡": "#d4a017"}


def signes(value: str) -> str:
    """Chaque caractère absent de Nunito et de Varela passe par la police de signes."""
    sortie: list[str] = []
    for car in value:
        if ord(car) in COUVERT:
            sortie.append(car)
            continue
        if car in PASTILLE:
            sortie.append(f"<font name='Signes' color='{PASTILLE[car]}'>●</font>")
            continue
        car = REMPLACE.get(car, car)
        if not car:
            continue
        if ord(car) not in SIGNES:
            raise ValueError(f"Caractère sans police : {car!r} (U+{ord(car):04X})")
        sortie.append(f"<font name='Signes'>{car}</font>")
    return "".join(sortie)


def _code(match: re.Match[str]) -> str:
    absents = [c for c in html.unescape(match[1]) if ord(c) not in MONO]
    if absents:
        raise ValueError(f"Caractère de code sans police : {absents!r}")
    return f"<font name='Mono'>{match[1]}</font>"


def clean_inline(value: str) -> str:
    value = html.escape(value)
    value = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1 (\2)", value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", value)
    value = re.sub(r"`([^`]+)`", _code, value)
    return signes(value)


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
        "kicker": ParagraphStyle("Kicker", fontName="Etiquette", fontSize=8.5, leading=11, textColor=GREEN, spaceAfter=16),
        "title": ParagraphStyle("Title", **base, fontName="Titre", fontSize=26, leading=30, spaceAfter=14),
        "meta": ParagraphStyle("Meta", fontName="Etiquette", fontSize=9.5, leading=13, textColor=GREEN, spaceAfter=25),
        "h2": ParagraphStyle("H2", **base, fontName="Titre", fontSize=17, leading=21, spaceBefore=23, spaceAfter=9, keepWithNext=True),
        "h3": ParagraphStyle("H3", **base, fontName="Titre", fontSize=12.5, leading=16, spaceBefore=15, spaceAfter=6, keepWithNext=True),
        "body": ParagraphStyle("Body", **base, fontName="Texte", fontSize=10.3, leading=15.4, spaceAfter=9),
        "bullet": ParagraphStyle("Bullet", **base, fontName="Texte", fontSize=10.1, leading=14.8, leftIndent=17, firstLineIndent=-11, spaceAfter=4),
        "prompt": ParagraphStyle("Prompt", **base, fontName="Texte", fontSize=9.7, leading=14,
                                 leftIndent=12, rightIndent=12, borderPadding=6,
                                 backColor=CREAM, spaceAfter=4),
        "code": ParagraphStyle("Code", **base, fontName="Mono", fontSize=8.4, leading=12.2,
                               leftIndent=12, rightIndent=12, borderPadding=6, backColor=CREAM, spaceAfter=0),
        "promptLabel": ParagraphStyle("PromptLabel", fontName="Etiquette", fontSize=7.5, leading=10, textColor=GREEN, spaceAfter=9),
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
        if line.startswith("```"):
            # Bloc de code : chaque ligne telle quelle, dans la police du code.
            i += 1
            bloc: list[str] = []
            while i < len(lines) and not lines[i].strip().startswith("```"):
                bloc.append(lines[i].rstrip())
                i += 1
            i += 1
            story.append(Spacer(1, 4))
            for rang_ligne, ligne in enumerate(bloc):
                absents = [c for c in ligne if ord(c) not in MONO]
                if absents:
                    raise ValueError(f"Caractère de code sans police : {absents!r}")
                retrait = len(ligne) - len(ligne.lstrip(" "))
                texte = "&nbsp;" * retrait + html.escape(ligne.lstrip(" ")) if ligne.strip() else "&nbsp;"
                # Le fond déborde en haut de la première ligne et en bas de la dernière seulement :
                # entre deux lignes, il recouvrirait le texte.
                marges = (6 if rang_ligne == 0 else 0, 6, 6 if rang_ligne == len(bloc) - 1 else 0, 6)
                story.append(Paragraph(texte, ParagraphStyle(f"Code{rang_ligne}", parent=style["code"], borderPadding=marges)))
            story.append(Spacer(1, 12))
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
                case = match[1].startswith("[ ]")
                rang = re.match(r"^(\d+)[.)]\s", lines[i].strip())
                # Une liste numérotée garde ses numéros : le texte y renvoie souvent.
                prefix = "<font name='Signes'>□</font>" if case else (f"{rang[1]}." if rang else "•")
                item_text = match[1][4:] if case else match[1]
                story.append(Paragraph(f"{prefix}  {clean_inline(item_text)}", style["bullet"]))
                i += 1
            story.append(Spacer(1, 7))
            continue
        paragraph = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"^(?:#{2,3}\s|---$|>|[-*]\s|\d+[.)]\s|\[IMAGE|```)", lines[i].strip()):
            paragraph.append(lines[i].strip())
            i += 1
        story.append(Paragraph(clean_inline(" ".join(paragraph)), style["body"]))
    return story


def draw_page(canvas, doc, number: int, slogan: str) -> None:
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(CREAM)
    canvas.rect(0, height - 68, width, 68, fill=1, stroke=0)
    canvas.setFillColor(GREEN)
    canvas.setFont("Etiquette", 8.5)
    canvas.drawString(54, height - 39, "AI WORK KIT  /  GUIDE " + f"{number:03d}")
    canvas.setStrokeColor(LINE)
    canvas.line(54, height - 68, width - 54, height - 68)
    canvas.line(54, 48, width - 54, 48)
    canvas.setFont("Etiquette", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(54, 32, slogan)
    canvas.drawRightString(width - 54, 32, f"{doc.page:02d}")
    canvas.restoreState()


def build_pdf(number: int, title: str, meta: str, raw: str, path: Path) -> None:
    register_fonts()
    slogan = lire_slogan()
    sty = styles()
    # invariant : refaire un PDF sans changer son texte redonne le même fichier.
    doc = SimpleDocTemplate(
        str(path), pagesize=A4, rightMargin=54, leftMargin=54,
        topMargin=92, bottomMargin=68, title=title, author="AI WORK KIT", invariant=1,
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
    doc.build(
        story,
        onFirstPage=lambda c, d: draw_page(c, d, number, slogan),
        onLaterPages=lambda c, d: draw_page(c, d, number, slogan),
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("numbers", type=int, nargs="*", help="numéros des guides à refaire")
    parser.add_argument("--tous", action="store_true", help="refaire tous les guides")
    args = parser.parse_args()
    numbers = args.numbers
    if args.tous:
        numbers = sorted(int(re.match(r"guide-(\d+)-", p.name)[1]) for p in GUIDES.glob("guide-*.md"))
    if not numbers:
        parser.error("donnez un numéro de guide, ou --tous")
    PDFS.mkdir(parents=True, exist_ok=True)
    for number in numbers:
        slug, title, meta, raw = read_guide(number)
        pdf = PDFS / f"guide-{number:03d}-{slug}.pdf"
        build_pdf(number, title, meta, raw, pdf)
        print(f"PDF={pdf}")


if __name__ == "__main__":
    main()
