---
Guide original : "CODES : 105 commandes pour analyser une entreprise avec l'IA"
Source : saadiakaram.ai/guides/codes-105-commandes-analyse-actions-ia
Statut : reformulé (texte) - aucune image ni tableau HTML détecté. Guide très volumineux (105 prompts complets sur la page source, environ 250 000 caractères une fois développés) : les 5 commandes phares sont reformulées intégralement, les 100 autres sont présentées sous forme de répertoire structuré (nom, famille, objet) suivant un modèle de prompt unique reformulé une seule fois plutôt que répété 100 fois - voir note méthodologique en fin de fichier. Un fichier texte téléchargeable regroupant les 105 prompts complets existe sur la page source et n'a pas été récupéré - voir ressources-visuelles.md.
---

# Le répertoire des 105 questions à poser à l'IA pour analyser une entreprise

*Multi-outils · 30 min de lecture*

## Sommaire

- Introduction
- 01. Un code, une mission : commence par les pièces
- 02. Les cinq commandes phares
- 03. Le répertoire des 100 commandes complémentaires
- 04. Relier les commandes : construire un dossier
- 05. Teste ton regard : refuse le raccourci
- 06. Garder les références et les limites

## Introduction

L'objectif de ce répertoire : dépasser la question « que penses-tu de cette action ? » pour examiner une entreprise avec des questions précises et vérifiables. Il contient cinq raccourcis phares, puis cent commandes complémentaires pour lire les sources, comprendre les comptes, et remettre chaque conclusion à l'épreuve. Prévois environ 30 minutes pour t'approprier la méthode et faire un premier parcours ; consulte ensuite les autres commandes selon tes besoins.

Précision importante : les noms commençant par une barre oblique (/price, /fundamentals…) sont ici des noms de consignes propres à ce guide, pas des commandes natives d'un produit. Taper /price seul dans Claude ou ChatGPT ne déclenche aucune fonction spéciale ni donnée en direct - il faut copier le prompt complet, remplacer ses champs, et joindre les pièces demandées. Certains plugins tiers possèdent leurs propres commandes, parfois avec un nom identique (le dépôt officiel Anthropic propose notamment un /earnings dans un plugin financier) ; leur comportement dépend alors de leur installation propre. Ce répertoire reste utilisable comme texte pur et n'exige aucun plugin.

Ces prompts servent à préparer une recherche et à en vérifier les pièces - ils ne recommandent en aucun cas un achat adapté à ta situation personnelle. Une entreprise solide peut rester mal valorisée, un modèle peut se tromper, et un cours peut évoluer autrement que prévu. Le risque de perte reste réel dans tous les cas.

---

## 01 - Un code, une mission : commence par les pièces

**1. Identifie l'entreprise.** Nom légal, ticker, place, devise et catégorie de titres - un même nom commercial peut recouvrir plusieurs instruments financiers distincts.

**2. Rassemble les sources.** Rapports, annexes et communications officielles, avec leurs dates. Si une donnée vient d'un fournisseur tiers, note ses conditions et son horodatage - une recherche web ne remplace jamais un flux de marché en temps réel.

**3. Copie une consigne entière.** Complète les champs, joins les documents, lance la mission. Si l'outil ne peut pas ouvrir une pièce, fournis un extrait sourcé ou accepte une réponse partielle plutôt qu'une réponse inventée.

**4. Refais le contrôle indiqué.** Ouvre la source, recalcule, vérifie la période couverte. Une seconde réponse générée par une IA ne constitue jamais, à elle seule, un contrôle indépendant.

Tu peux ensuite convenir, dans la même conversation, qu'un nom abrégé renvoie au bloc déjà fourni. Si le contexte a changé, ou si l'outil ne le reconnaît plus, recolle le bloc complet - un simple « mémorise ces codes » ne garantit aucune mémoire permanente entre les sessions.

---

## 02 - Les cinq commandes phares

**/price - Comparer prix et valeur.** *À préparer :* le cours avec sa source, son heure et sa devise ; les comptes récents ; les hypothèses de valorisation retenues. *Mission :* sépare le cours observé de la valeur estimée. Construis une fourchette conditionnelle avec une méthode expliquée, trois scénarios et les hypothèses décisives. Ne compare au cours que s'il est horodaté. Si des données manquent, rends une liste de besoins plutôt qu'un verdict tranché « bon marché » ou « cher ». *Contrôle à refaire :* reprends la valorisation et vérifie qu'un changement d'hypothèse modifie effectivement la conclusion - aucun écart ne constitue en soi un signal d'achat.

**/fundamentals - Examiner la solidité économique.** Analyse l'activité, le résultat, la trésorerie, le financement et l'évolution du capital de l'entreprise, à partir des documents fournis et de sources primaires datées.

**/bull - Construire le scénario favorable.** Identifie les mécanismes qui pourraient jouer en faveur de l'entreprise, et les faits précis qui pourraient les invalider - un scénario favorable sans contre-preuve identifiée reste incomplet.

**/bear - Construire le scénario défavorable.** Identifie les risques réels, leur transmission concrète aux comptes, et les preuves qui pourraient les contredire.

**/earnings - Lire une publication trimestrielle.** Replace le trimestre dans son contexte : périodes comparables, mesures ajustées, et questions à poser pour la suite.

**Le modèle de prompt commun aux 105 commandes :** chacune des 105 consignes de ce répertoire suit exactement la même structure, reformulée ici une seule fois pour éviter la répétition :

> [Nom de la commande] · [objet de la commande]. Ce raccourci est une convention de ce guide, pas une fonction native ni un accès à des données en direct - exécute les instructions complètes ci-dessous.
>
> Entreprise, ticker, place et catégorie de titres : [à remplir]. Date d'analyse et horizon : [à remplir]. Question précise : [à remplir].
> Pièces nécessaires : [liste spécifique à la commande - voir répertoire ci-dessous].
> Documents, URLs et données que je fournis : [joindre ou coller avec dates et unités].
>
> Mission : [objectif spécifique à la commande - voir répertoire ci-dessous].
>
> Règles de travail : utilise uniquement les pièces effectivement lues et, si disponible, une recherche web sur des sources primaires. Indique tout accès manquant. N'invente aucun chiffre, cours ou citation. Termine par le contrôle à refaire toi-même avant de tirer une conclusion.

Pour utiliser n'importe laquelle des 105 commandes du répertoire ci-dessous, reprends ce modèle en remplaçant le nom de la commande, son objet, ses pièces nécessaires et sa mission par les éléments correspondants listés dans le tableau.

---

## 03 - Le répertoire des 100 commandes complémentaires

Les cent commandes suivantes sont organisées en dix familles de dix commandes chacune. Pour chacune, applique le modèle de prompt ci-dessus en remplaçant le nom et l'objet par ceux indiqués.

**Sources et données** - /identity (confirmer le titre analysé) · /source-map (cartographier les sources) · /filing-diff (comparer deux dépôts) · /period-check (aligner les périodes) · /unit-check (contrôler les unités) · /restatement (lire un retraitement) · /gaap-bridge (comprendre les ajustements comptables) · /citation-audit (vérifier les citations) · /freshness (dater la connaissance mobilisée) · /missing-data (lister les données bloquantes).

**Activité et concurrence** - /business-map (décrire le moteur de revenus) · /segment-mix (analyser le mix d'activités) · /pricing-power (examiner le pouvoir de prix) · /customer-concentration (repérer la dépendance client) · /supplier-risk (examiner la chaîne d'approvisionnement) · /moat-evidence (chercher les preuves d'un avantage concurrentiel) · /peer-selection (choisir des comparables pertinents) · /market-size (auditer une taille de marché annoncée) · /unit-economics (examiner l'économie d'une unité vendue) · /geographic-exposure (cartographier l'exposition géographique).

**Revenus et rentabilité** - /revenue-bridge (expliquer la croissance du chiffre d'affaires) · /organic-growth (isoler la croissance organique) · /gross-margin (comprendre la marge brute) · /operating-leverage (observer les coûts fixes) · /expense-quality (lire les dépenses opérationnelles) · /profit-bridge (rapprocher résultat d'exploitation et bénéfice) · /tax-rate (examiner le taux d'impôt effectif) · /eps-bridge (expliquer le bénéfice par action) · /seasonality (repérer la saisonnalité de l'activité) · /guidance-quality (relire les prévisions de la direction).

**Trésorerie** - /cash-conversion (relier bénéfice et trésorerie générée) · /working-capital (comprendre le besoin en fonds de roulement) · /receivables (examiner les créances clients) · /inventory (lire les stocks) · /payables (lire le financement fournisseurs) · /capex (comprendre les investissements) · /free-cash-flow (reconstituer le cash disponible) · /cash-restrictions (distinguer cash affiché et cash réellement disponible) · /cash-runway (construire un horizon de liquidité) · /cash-flow-audit (réconcilier le tableau de flux de trésorerie).

**Bilan et dette** - /balance-check (vérifier l'équilibre du bilan) · /debt-map (cartographier les emprunts) · /maturity-wall (observer les échéances de dette) · /interest-coverage (mesurer la couverture des intérêts) · /rate-exposure (examiner la sensibilité aux taux) · /covenants (lire les clauses financières restrictives) · /lease-obligations (examiner les engagements locatifs) · /goodwill (lire le goodwill au bilan) · /pension-gap (examiner les engagements de retraite) · /contingencies (lire les engagements éventuels et litiges).

**Capital et gouvernance** - /share-count (suivre le nombre de titres en circulation) · /stock-comp (examiner la rémunération en actions) · /buybacks (évaluer les rachats d'actions réalisés) · /dividend-cover (examiner la couverture de la distribution) · /capital-allocation (relire l'usage global du capital) · /acquisition-review (relire une acquisition passée) · /roic (calculer un rendement du capital investi) · /incentives (lire les objectifs de rémunération des dirigeants) · /voting-control (comprendre la structure de contrôle) · /related-parties (lire les transactions avec parties liées).

**Valorisation** - /enterprise-bridge (passer de la valeur d'entreprise à la valeur des actions) · /pe-context (interpréter le multiple de bénéfice) · /ev-ebitda (comparer valeur d'entreprise et EBITDA) · /sales-multiple (relire un multiple de chiffre d'affaires) · /dcf-inputs (auditer les hypothèses d'un DCF) · /terminal-weight (mesurer le poids de la valeur terminale) · /wacc-sensitivity (tester le coût moyen pondéré du capital) · /reverse-dcf (lire les attentes implicites dans le cours actuel) · /sum-parts (décomposer une valorisation par segment) · /valuation-range (comparer plusieurs méthodes de valorisation).

**Risques et scénarios** - /risk-register (construire un registre de risques) · /demand-shock (tester une baisse de demande) · /margin-stress (tester une pression sur les marges) · /fx-stress (tester une exposition au risque de change) · /refinancing-stress (tester un refinancement difficile) · /dilution-stress (tester une émission de capital dilutive) · /regulatory-path (suivre un risque réglementaire) · /disruption-test (examiner une rupture concurrentielle possible) · /scenario-coherence (vérifier la cohérence de trois scénarios) · /break-even (identifier un seuil de rentabilité économique).

**Événements et suivi** - /catalyst-calendar (préparer un calendrier d'événements officiels) · /earnings-preview (préparer la prochaine publication trimestrielle) · /q-and-a (lire les questions-réponses d'une conférence) · /guidance-change (comparer deux prévisions successives de la direction) · /thesis-update (mettre à jour une thèse d'investissement) · /event-timeline (reconstruire une chronologie d'événements) · /news-triage (trier les nouvelles par pertinence réelle) · /management-change (lire un changement de direction) · /product-milestone (examiner un jalon produit annoncé) · /watchlist-brief (préparer une veille manuelle régulière).

**Synthèse et contrôle** - /one-page (résumer un dossier complet en une page) · /facts-vs-assumptions (séparer les faits vérifiés des hypothèses) · /disconfirm (chercher activement les preuves contraires à une thèse) · /question-list (préparer la liste des questions encore ouvertes) · /model-audit (auditer un modèle financier reçu) · /ratio-audit (vérifier une série de ratios calculés) · /hindsight-check (retirer le biais rétrospectif d'une analyse) · /research-journal (tenir un journal de recherche daté) · /explain-simply (expliquer une conclusion sans perdre les nuances) · /handoff-review (préparer une revue humaine avant décision finale).

---

## 04 - Relier les commandes : construire un dossier

Ces commandes se combinent en parcours selon l'objectif poursuivi :

**Découvrir une entreprise (les sources avant l'opinion) :** /identity → /source-map → /business-map → /fundamentals → /question-list. Résultat attendu : une description économique de l'entreprise et les questions encore ouvertes. Si l'identité du titre ou les périodes couvertes restent ambiguës, corrige ce point avant d'analyser la solidité financière.

**Relire un trimestre (les variations avant le verdict) :** /period-check → /earnings → /cash-conversion → /guidance-change → /thesis-update. Résultat attendu : une note datée qui explique précisément ce qui a changé. Si une ancienne prévision de la direction manque, marque cette comparaison comme incomplète.

**Examiner une valorisation (les hypothèses avant le prix cible) :** /peer-selection → /dcf-inputs → /price → /reverse-dcf → /model-audit. Résultat attendu : une fourchette conditionnelle et ses sensibilités. Un simple ticker ou des comptes incomplets ne suffisent pas à terminer ce parcours.

Ces enchaînements restent des suggestions de travail, sans automatisation active entre les étapes. Garde les sources et les corrections d'une étape à l'autre. Si une commande reprend un résultat erroné d'une commande précédente, corrige l'erreur en amont puis refais les conclusions qui en dépendent.

---

## 05 - Teste ton regard : refuse le raccourci

Exemple fictif à évaluer : « Le cours est 50 €, le BPA est 2 €. Le P/E est 25. Donc l'action est bon marché. »

Quel point suffit à lui seul à refuser cette conclusion telle qu'elle est écrite ? Ni un calcul faux (50÷2 donne bien 25), ni l'idée qu'une action à 50 € serait automatiquement chère : la bonne réponse est qu'un multiple isolé, sans comparaison à des pairs pertinents ni contexte de croissance et de risque, ne prouve absolument pas qu'un prix est attractif.

Pour un premier essai réel, choisis /period-check ou /citation-audit sur un dossier public court : le résultat est plus facile à vérifier qu'un jugement global sur une action entière. Garde la sortie obtenue, ta propre correction, et le passage source - tu verras alors précisément si l'outil t'a réellement aidé.

---

## 06 - Garder les références et les limites

Ces consignes constituent un répertoire pédagogique original ; elles ne sont validées ni par la SEC, ni par Anthropic, ni par OpenAI. Les sources citées dans le guide original expliquent les documents et concepts mentionnés, sans endosser ces prompts pour autant : SEC - Lire un rapport 10-K ; SEC - Comprendre les états financiers ; Aswath Damodaran (NYU) - sur la valeur terminale d'un DCF ; Anthropic - Plugins financiers officiels (pour distinguer une commande réellement installée d'une simple convention textuelle de ce guide).

---

## À retenir

**Une question précise se vérifie. Une question vague ne se vérifie jamais.**

Commence par une seule commande dont tu peux contrôler toi-même le résultat, plutôt que de viser d'emblée un jugement global sur une action. Élargis ensuite ton dossier progressivement, à partir des preuves que tu retrouves réellement - jamais à partir de la seule confiance affichée par la réponse de l'IA.

---

### Note méthodologique sur ce fichier

La page source contient 105 prompts intégralement rédigés, avec pour chacun ses champs, ses pièces nécessaires et son texte de mission complet - soit environ 250 000 caractères une fois tous développés. Reproduire l'intégralité des 105 prompts mot pour mot représenterait, à lui seul, un fichier plus volumineux que l'ensemble des 26 autres guides de ce lot réunis. Le choix fait ici a été de reformuler intégralement les 5 commandes phares et le modèle de prompt commun aux 105 (qui ne varie, d'une commande à l'autre, que par son nom, son objet, ses pièces nécessaires et sa mission spécifique), puis de lister les 100 commandes complémentaires avec leur nom exact et leur objet reformulé, classées par famille comme sur la page source. Pour reconstituer le prompt complet d'une commande précise parmi les 100, applique le modèle reformulé en section 02 en y insérant le nom et l'objet de la commande souhaitée. Le fichier texte téléchargeable proposé sur la page source (« Télécharger les 105 commandes ») contient les 105 prompts intégraux tels que rédigés par l'autrice originale ; il n'a pas été récupéré ici (voir ressources-visuelles.md).
