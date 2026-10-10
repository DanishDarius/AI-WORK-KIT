"""Fabrique les polices du PDF des attestations (private/attestation/).

Usage : python scripts/build-attestation-polices.py

Besoin de : pip install fonttools brotli

Les polices sont celles du site (src/fonts) : Nunito pour les titres, Varela
Round pour le texte. Le fichier Nunito du site est variable : le PDF a besoin
de graisses fixes, tirées ici. La route /api/attestations/[slug]/pdf lit ces
fichiers ; refaire ce script redonne exactement les mêmes.
"""

from __future__ import annotations

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "src" / "fonts"
SORTIE = ROOT / "private" / "attestation"


def nommer(police: TTFont, nom: str) -> None:
    for entree in police["name"].names:
        if entree.nameID in (1, 3, 4, 6, 16):
            entree.string = nom if entree.nameID != 6 else nom.replace(" ", "-")


def main() -> None:
    SORTIE.mkdir(parents=True, exist_ok=True)
    for graisse in (800, 900):
        police = TTFont(str(SOURCES / "Nunito-latin-variable.woff2"), recalcTimestamp=False)
        fixe = instancer.instantiateVariableFont(police, {"wght": graisse})
        fixe.recalcTimestamp = False
        fixe.flavor = None
        nommer(fixe, f"AIW Nunito {graisse}")
        fixe.save(str(SORTIE / f"nunito-{graisse}.ttf"))
    varela = TTFont(str(SOURCES / "VarelaRound-latin-400.woff2"), recalcTimestamp=False)
    varela.flavor = None
    nommer(varela, "AIW Varela")
    varela.save(str(SORTIE / "varela-round-400.ttf"))
    for licence in ("OFL-Nunito.txt", "OFL-VarelaRound.txt"):
        (SORTIE / licence).write_bytes((SOURCES / licence).read_bytes())


if __name__ == "__main__":
    main()
