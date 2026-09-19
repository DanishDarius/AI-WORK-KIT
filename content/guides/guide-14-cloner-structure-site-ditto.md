---
Guide original : "Vole le site qui t'inspire : clone-le en code propre avec Ditto + Claude"
Source : saadiakaram.ai/guides/cloner-un-site-en-code-avec-ditto
Statut : reformulé (texte) — aucun visuel/tableau HTML détecté sur cette page
---

# Reproduire la structure d'un site qui t'inspire, en code propre, avec Ditto et Claude

*Claude · 8 min de lecture*

## Sommaire

- Introduction
- 1. C'est quoi Ditto, en une minute
- 2. Deux chemins possibles. Choisis le tien.
- 3. Fais tourner la copie sur ta machine
- 4. Maintenant, c'est dans TON code. Rends-le tien.
- 5. La règle à ne jamais franchir
- Ta checklist en 6 lignes
- Le fichier complet
- Pour aller plus loin

## Introduction

Tu repères un site dont le design t'inspire vraiment. Plutôt que de le décrire pendant trois semaines à un développeur, tu le pointes du doigt, Claude le capture, et tu récupères une vraie app Next.js que tu peux ouvrir dans ton éditeur de code le soir même. Voici comment procéder, étape par étape, avec les commandes à copier et les prompts prêts à l'emploi.

**Ce que tu obtiens à la fin :** une reproduction fidèle de la structure du site qui t'inspire, transformée en projet Next.js propre et componentisé, fonctionnel sur ta machine, que tu repersonnalises intégralement avec ta propre marque, prêt à être déployé.

---

## 01 — C'est quoi Ditto, en une minute

Ditto est un outil open source de clonage de sites, développé par ion.design. Tu lui fournis une URL publique, il te restitue une copie fidèle sous forme de code Next.js ou Vite propre, en quelques minutes seulement.

**Ce qui le rend fiable :** il ne devine rien. Une instance Chromium headless charge la page, enregistre le DOM réellement affiché, les styles calculés, les boîtes de mise en page, les polices, les ressources graphiques et les états d'interaction, fige cette capture, puis la transforme en code. Comme il ne repose pas sur l'inférence d'un modèle de langage, le résultat produit reste stable et reproductible.

**Les faits essentiels à connaître :**
- Licence MIT, entièrement open source, gratuit, auto-hébergeable.
- Sortie au choix : Next.js (App Router) ou Vite, Tailwind v4 ou CSS classique, TypeScript, site une page ou multipage.
- Deux modes d'utilisation : le serveur MCP connecté à Claude, ou la CLI que tu héberges toi-même sans clé API.

---

## 02 — Deux chemins possibles. Choisis le tien.

### Chemin A — connecté à Claude via MCP

Tu indiques simplement à Claude quel site cloner, et il s'en charge. Le serveur MCP hébergé se trouve à l'adresse https://api.ditto.site/mcp et nécessite une clé DITTO_API_KEY.

**Dans Claude Code (terminal), une seule commande suffit pour l'ajouter :**
```
claude mcp add --transport http ditto https://api.ditto.site/mcp \
--header "Authorization: Bearer ${DITTO_API_KEY}"
```

**Dans un fichier de configuration MCP (Claude Desktop, Cursor), le bloc équivalent :**
```
{
"mcpServers": {
"ditto": {
"url": "https://api.ditto.site/mcp",
"headers": {
"Authorization": "Bearer ${DITTO_API_KEY}"
}
}
}
}
```

**Prompt à coller dans Claude une fois Ditto connecté :**
> Utilise Ditto pour cloner https://LE-SITE-QUI-M-INSPIRE.com
> Options : framework Next.js, styling Tailwind, mode single page.
> Récupère le projet, décompresse-le dans ./mon-site, puis fais npm install et lance npm run dev pour qu'il tourne en local.

### Chemin B — la CLI, sans clé, directement sur ta machine

Aucun compte requis, aucune clé, tout fonctionne en local.

**Installer la CLI Ditto :**
```
git clone https://github.com/ion-design/ditto.site.git
cd ditto.site
npm ci
npx playwright install chromium
```

**Cloner un site :**
```
npm run clone -- https://LE-SITE-QUI-M-INSPIRE.com/ --out=./mon-site
```

**Les options utiles :**
- `--framework=next` / `--framework=vite` — Next.js App Router ou Vite React (par défaut : next).
- `--styling=tailwind` / `--styling=css` — Tailwind ou CSS pur (par défaut : tailwind).
- `--mode=single` / `--mode=multi` — une page ou multipage (par défaut : single).
- `--serve` — clone, installe et lance directement le serveur de développement.
- `--open` — ouvre automatiquement le navigateur après `--serve`.

**Le raccourci « je veux le voir tourner immédiatement » :**
```
npm run clone -- https://LE-SITE-QUI-M-INSPIRE.com/ --out=./mon-site --serve --open
```

---

## 03 — Fais tourner la copie sur ta machine

Depuis le dossier généré :
```
cd mon-site
npm install
npm run dev
```

Ouvre ensuite http://localhost:3000. Le site qui t'inspirait tourne désormais chez toi, sous forme de code que tu possèdes réellement.

---

## 04 — Maintenant, c'est dans TON code. Rends-le tien.

C'est ici que Claude reprend la main. Le projet généré est du Next.js componentisé avec des design tokens : tu peux modifier le texte, la marque, les couleurs directement par la conversation.

**Prompt 1 — cartographier avant de toucher à quoi que ce soit :**
> Voici un projet Next.js dans ./mon-site généré par Ditto. Parcours l'arborescence et dresse-moi la carte : où sont les composants de sections (hero, features, pricing, footer), où vivent les design tokens (couleurs, polices, espacements), et où se trouve le contenu texte que je vais devoir remplacer. Ne modifie rien pour l'instant.

**Prompt 2 — poser ta propre marque :**
> Remplace la palette et la typographie par la mienne :
> - couleur primaire : #____ secondaire : #____
> - police titres : ____ police texte : ____
> Mets à jour les design tokens Tailwind, pas les valeurs en dur dans chaque composant. Montre-moi le fichier de tokens modifié.

**Prompt 3 — remplacer chaque mot et chaque image :**
> Remplace TOUT le contenu par le mien, section par section. Voici mon texte : [colle ton hero, tes bénéfices, tes prix, ton CTA]. Remplace aussi le logo et les images par des placeholders nommés que je fournirai. Ne laisse aucun texte, logo ou visuel de la source d'origine dans le rendu final.

**Prompt 4 — déployer :**
> Prépare ce projet pour un déploiement sur Vercel : vérifie le build avec npm run build, corrige les erreurs, puis donne-moi les étapes exactes pour le mettre en ligne.

---

## 05 — La règle à ne jamais franchir

S'inspirer d'une structure et d'une mise en page pour créer quelque chose de nouveau : oui. Republier le site de quelqu'un d'autre en ne changeant que les mots : non. La frontière est claire : tu peux t'approprier des idées, jamais des actifs qui ne t'appartiennent pas.

**Ce que le droit protège, et que tu dois impérativement remplacer avant toute publication :**
- **Logos et marques** — jamais ceux de la source d'origine.
- **Textes, images, contenu écrit** — entièrement les tiens.
- **Branding et messages** — ta propre voix, tes propres appels à l'action.

Une mise en page et des fonctionnalités génériques (grilles, formulaires, sections tarifaires) ne sont généralement pas protégeables en tant que telles. Le produit final doit être suffisamment distinct de l'original — pas simplement la même page avec le texte échangé. Le bon usage de cet outil : cloner un site sur lequel tu as un droit légitime (le tien, celui d'un client, un template open source, une démo), ou t'en servir comme simple référence de structure que tu rhabilles intégralement.

---

## Ta checklist en 6 lignes

1. Connecte Ditto à Claude (`claude mcp add`) ou installe la CLI (`git clone` + `npm ci` + Playwright).
2. Pointe l'URL du site qui t'inspire, framework Next.js, styling Tailwind.
3. Décompresse, `npm install`, `npm run dev`, observe-le tourner en local.
4. Fais cartographier le projet par Claude avant de toucher à quoi que ce soit.
5. Remplace tokens, texte, logo, images : rien de la source d'origine ne doit subsister.
6. `npm run build`, puis déploie sur Vercel.

---

## Le fichier complet

*[Emplacement réservé à ton propre mécanisme d'accès au guide complet — lead magnet, formulaire, ou lien selon ta plateforme.]*

---

## Pour aller plus loin

Pour construire ton app écran par écran, direction le guide Vibe coding 101. Pour la mettre en ligne une fois prête, direction le guide sur la stack de lancement (Claude, Supabase, Vercel, Stripe, GitHub Actions).

---

## À retenir

**Tu peux t'approprier des idées, jamais des actifs qui ne t'appartiennent pas.**

Ditto capture ce que le navigateur affiche et te le restitue en Next.js propre, connecté à Claude via MCP ou en CLI sans clé. Tu ouvres le code, tu te l'appropries entièrement : tokens, texte, logo, images — rien de la source d'origine ne doit rester. C'est une base de départ à rhabiller complètement, jamais un site à republier tel quel.

---

*Sources vérifiées : ditto.site · github.com/ion-design/ditto.site · Claude Code — documentation MCP · Codecademy — cloner légalement.*
