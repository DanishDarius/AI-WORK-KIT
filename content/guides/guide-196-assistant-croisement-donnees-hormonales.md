---
Guide original : L'assistant hormones
Source : https://www.saadiakaram.ai/guides/hormone-helper-skill
Position réelle dans la bibliothèque au moment du traitement : 195/293.
Statut : 0 image et 0 tableau trouvés dans le DOM (imgCount: 0, tables: 0). 2 sections FAQ collapsées détectées et dépliées, contenu capturé intégralement. Contenu de santé (cycle, sommeil, analyses sanguines) — traité strictement comme un outil organisationnel de préparation de rendez-vous médicaux, jamais comme un substitut de diagnostic. La limite explicite de l'original (ce skill n'est pas un médecin, toute hypothèse doit être validée en consultation) est conservée intégralement et mise en avant. La note sur la confidentialité des données provient telle quelle de la source d'origine, reformulée sans en changer le sens. Noms réels conservés (Claude, Flo, Oura, Apple Health, Google Fit).
---

# Un assistant pour croiser ses données hormonales et mieux préparer ses rendez-vous médicaux

*Multi-outils · 5 min de lecture*

Le cycle menstruel dans une application, le sommeil dans une autre, la variabilité de la fréquence cardiaque sur une montre connectée, les analyses sanguines dans un PDF de laboratoire, la peau observée à l'œil nu. Aucune de ces sources n'a accès aux autres — le lien entre elles échappe donc à tout le monde, y compris souvent au médecin traitant. Un outil bien construit peut, lui, faire apparaître ce lien.

## Pourquoi ces données ne communiquent pas entre elles

Chaque application de santé optimise son propre silo : l'une suit le cycle, l'autre le sommeil, une troisième agrège des chiffres sans contexte, le laboratoire renvoie des colonnes de résultats peu lisibles. Un pattern comme « ma variabilité cardiaque chute systématiquement trois jours avant les règles, et ma peau réagit juste après » n'apparaît qu'en croisant plusieurs sources à la fois.

## Le prompt d'assistant hormonal

> **Prompt — assistant hormonal**
>
> Tu es mon assistant santé hormonale. Mon rôle : croiser mes données pour faire ressortir des patterns que je ne vois pas seule.
>
> À chaque échange, je vais te coller :
> - Mon cycle (jour J, longueur moyenne, symptômes)
> - Mon sommeil (durée, profondeur, réveils)
> - Ma HRV et fréquence cardiaque au repos
> - Mes dernières analyses sanguines (ferritine, vitamine D, TSH, œstradiol, progestérone, testostérone, cortisol)
> - L'état de ma peau, mon humeur, mon énergie sur 10
>
> Ta tâche :
> 1. Repère les corrélations sur 2 à 3 cycles.
> 2. Identifie les valeurs sanguines qui me limitent.
> 3. Propose 3 hypothèses (pas de diagnostic) à creuser avec ma généraliste ou ma gynéco.
> 4. Donne-moi 3 actions concrètes (sommeil, nutrition, sport) à tester ce cycle.
>
> Sois précise, factuelle, et dis-moi clairement quand tu ne sais pas.

## Une limite médicale à respecter strictement

Cet outil ne remplace en rien un médecin. Il sert uniquement à préparer des rendez-vous, jamais à s'y substituer. Toute hypothèse évoquée doit être validée en consultation.

## Questions fréquentes

**Quelles applications exporter ?**

Apple Health ou Google Fit en CSV, Oura via export PDF, le laboratoire via son compte patient. Il reste possible de tout saisir manuellement au départ — c'est étonnamment rapide.

**Est-ce confidentiel ?**

Selon les conditions d'utilisation en vigueur, les échanges ne servent pas à l'entraînement du modèle sur un plan payant lorsque l'option correspondante est désactivée. Il convient de vérifier ses propres paramètres avant de coller des données médicales.

## À retenir

**Le vrai gain : arriver en consultation avec un dossier structuré.**

Un rendez-vous médical dure souvent très peu de temps. Se présenter avec un mémo de patterns observés sur plusieurs cycles change nettement la qualité de l'échange avec le professionnel de santé.
