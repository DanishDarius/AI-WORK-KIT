"""Check that each guide has exactly one readable downloadable PDF."""

from __future__ import annotations

import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
GUIDES = ROOT / "content" / "guides"
PDFS = ROOT / "private" / "guides" / "pdf"


def main() -> None:
    errors: list[str] = []
    expected: set[str] = set()
    for source in sorted(GUIDES.glob("guide-*.md")):
        match = re.fullmatch(r"guide-(\d+)-(.+)\.md", source.name)
        if not match:
            errors.append(f"Nom source invalide : {source.name}")
            continue
        name = f"guide-{int(match[1]):03d}-{match[2]}.pdf"
        expected.add(name)
        pdf_path = PDFS / name
        if not pdf_path.is_file():
            errors.append(f"PDF absent : {name}")
            continue
        try:
            pdf = PdfReader(pdf_path)
            if not pdf.pages or len((pdf.pages[0].extract_text() or "").strip()) < 120:
                errors.append(f"PDF vide ou illisible : {name}")
            if any(
                "Emplacement réservé" in (page.extract_text() or "")
                or "Section à adapter" in (page.extract_text() or "")
                for page in pdf.pages
            ):
                errors.append(f"Mention éditoriale dans le PDF : {name}")
        except Exception as exc:
            errors.append(f"PDF corrompu : {name} ({exc})")

    actual = {pdf.name for pdf in PDFS.glob("*.pdf")}
    errors.extend(f"PDF sans guide : {name}" for name in sorted(actual - expected))
    print(f"Guides : {len(expected)} | PDF : {len(actual)} | Erreurs : {len(errors)}")
    for error in errors[:50]:
        print(error)
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
