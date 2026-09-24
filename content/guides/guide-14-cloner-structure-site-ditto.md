---
Guide original : "Vole le site qui t'inspire : clone-le en code propre avec Ditto + Claude"
Source : saadiakaram.ai/guides/cloner-un-site-en-code-avec-ditto
Statut : reformulé (texte) : aucun visuel/tableau HTML détecté sur cette page
---

# Reproduire la structure d'un site qui vous inspire, en code propre, avec Ditto et Claude

*Claude · 8 min de lecture*

## Sommaire

- Introduction
- 1. C'est quoi Ditto, en une minute
- 2. Deux chemins possibles. Choisissez le vôtre.
- 3. Faites tourner la copie sur votre machine
- 4. Maintenant, c'est dans VOTRE code. Rendez-le vôtre.
- 5. La règle à ne jamais franchir
- Votre checklist en 6 lignes
- Le fichier complet
- Pour aller plus loin

## Introduction

Vous repérez un site dont le design vous inspire vraiment. Plutôt que de le décrire pendant trois semaines à un développeur, vous le pointez du doigt, Claude le capture, et vous récupérez une vraie app Next.js que vous pouvez ouvrir dans votre éditeur de code le soir même. Voici comment procéder, étape par étape, avec les commandes à copier et les prompts prêts à l'emploi.

**Ce que vous obtenez à la fin :** une reproduction fidèle de la structure du site qui vous inspire, transformée en projet Next.js propre et componentisé, fonctionnel sur votre machine, que vous repersonnalisez intégralement avec votre propre marque, prêt à être déployé.

---

## 01. C'est quoi Ditto, en une minute

Ditto est un outil open source de clonage de sites, développé par ion.design. Vous lui fournissez une URL publique, il vous restitue une copie fidèle sous forme de code Next.js ou Vite propre, en quelques minutes seulement.

**Ce qui le rend fiable :** il ne devine rien. Une instance Chromium headless charge la page, enregistre le DOM réellement affiché, les styles calculés, les boîtes de mise en page, les polices, les ressources graphiques et les états d'interaction, fige cette capture, puis la transforme en code. Comme il ne repose pas sur l'inférence d'un modèle de langage, le résultat produit reste stable et reproductible.

**Les faits essentiels à connaître :**
- Licence MIT, entièrement open source, gratuit, auto-hébergeable.
- Sortie au choix : Next.js (App Router) ou Vite, Tailwind v4 ou CSS classique, TypeScript, site une page ou multipage.
- Deux modes d'utilisation : le serveur MCP connecté à Claude, ou la CLI que vous hébergez vous-même sans clé API.

---

## 02. Deux chemins possibles. Choisissez le vôtre.

### Chemin A : connecté à Claude via MCP

Vous indiquez simplement à Claude quel site cloner, et il s'en charge. Le serveur MCP hébergé se trouve à l'adresse https://api.ditto.site/mcp et nécessite une clé DITTO_API_KEY.

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

### Chemin B : la CLI, sans clé, directement sur votre machine

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
- `--framework=next` / `--framework=vite` : Next.js App Router ou Vite React (par défaut : next).
- `--styling=tailwind` / `--styling=css` : Tailwind ou CSS pur (par défaut : tailwind).
- `--mode=single` / `--mode=multi` : une page ou multipage (par défaut : single).
- `--serve` : clone, installe et lance directement le serveur de développement.
- `--open` : ouvre automatiquement le navigateur après `--serve`.

**Le raccourci « je veux le voir tourner immédiatement » :**
```
npm run clone -- https://LE-SITE-QUI-M-INSPIRE.com/ --out=./mon-site --serve --open
```

---

## 03. Faites tourner la copie sur votre machine

Depuis le dossier généré :
```
cd mon-site
npm install
npm run dev
```

Ouvrez ensuite http://localhost:3000. Le site qui vous inspirait tourne désormais chez vous, sous forme de code que vous possédez réellement.

---

## 04. Maintenant, c'est dans VOTRE code. Rendez-le vôtre.

C'est ici que Claude reprend la main. Le projet généré est du Next.js componentisé avec des design tokens : vous pouvez modifier le texte, la marque, les couleurs directement par la conversation.

**Prompt 1 (cartographier avant de toucher à quoi que ce soit) :**
> Voici un projet Next.js dans ./mon-site généré par Ditto. Parcours l'arborescence et dresse-moi la carte : où sont les composants de sections (hero, features, pricing, footer), où vivent les design tokens (couleurs, polices, espacements), et où se trouve le contenu texte que je vais devoir remplacer. Ne modifie rien pour l'instant.

**Prompt 2 (poser votre propre marque) :**
> Remplace la palette et la typographie par la mienne :
> - couleur primaire : #____ secondaire : #____
> - police titres : ____ police texte : ____
> Mets à jour les design tokens Tailwind, pas les valeurs en dur dans chaque composant. Montre-moi le fichier de tokens modifié.

**Prompt 3 (remplacer chaque mot et chaque image) :**
> Remplace TOUT le contenu par le mien, section par section. Voici mon texte : [collez votre hero, vos bénéfices, vos prix, votre CTA]. Remplace aussi le logo et les images par des placeholders nommés que je fournirai. Ne laisse aucun texte, logo ou visuel de la source d'origine dans le rendu final.

**Prompt 4 (déployer) :**
> Prépare ce projet pour un déploiement sur Vercel : vérifie le build avec npm run build, corrige les erreurs, puis donne-moi les étapes exactes pour le mettre en ligne.

---

## 05. La règle à ne jamais franchir

S'inspirer d'une structure et d'une mise en page pour créer quelque chose de nouveau : oui. Republier le site de quelqu'un d'autre en ne changeant que les mots : non. La frontière est claire : vous pouvez vous approprier des idées, jamais des actifs qui ne vous appartiennent pas.

**Ce que le droit protège, et que vous devez impérativement remplacer avant toute publication :**
- **Logos et marques** : jamais ceux de la source d'origine.
- **Textes, images, contenu écrit** : entièrement les vôtres.
- **Branding et messages** : votre propre voix, vos propres appels à l'action.

Une mise en page et des fonctionnalités génériques (grilles, formulaires, sections tarifaires) ne sont généralement pas protégeables en tant que telles. Le produit final doit être suffisamment distinct de l'original, pas simplement la même page avec le texte échangé. Le bon usage de cet outil : cloner un site sur lequel vous avez un droit légitime (le vôtre, celui d'un client, un template open source, une démo), ou vous en servir comme simple référence de structure que vous rhabillez intégralement.

---

## Votre checklist en 6 lignes

1. Connectez Ditto à Claude (`claude mcp add`) ou installez la CLI (`git clone` + `npm ci` + Playwright).
2. Pointez l'URL du site qui vous inspire, framework Next.js, styling Tailwind.
3. Décompressez, `npm install`, `npm run dev`, observez-le tourner en local.
4. Faites cartographier le projet par Claude avant de toucher à quoi que ce soit.
5. Remplacez tokens, texte, logo, images : rien de la source d'origine ne doit subsister.
6. `npm run build`, puis déployez sur Vercel.

---

## Le fichier complet

*[Emplacement réservé à votre propre mécanisme d'accès au guide complet : lead magnet, formulaire, ou lien selon votre plateforme.]*

---

## Pour aller plus loin

Pour construire votre app écran par écran, direction le guide Vibe coding 101. Pour la mettre en ligne une fois prête, direction le guide sur la stack de lancement (Claude, Supabase, Vercel, Stripe, GitHub Actions).

---

## À retenir

**Vous pouvez vous approprier des idées, jamais des actifs qui ne vous appartiennent pas.**

Ditto capture ce que le navigateur affiche et vous le restitue en Next.js propre, connecté à Claude via MCP ou en CLI sans clé. Vous ouvrez le code, vous vous l'appropriez entièrement : tokens, texte, logo, images. Rien de la source d'origine ne doit rester. C'est une base de départ à rhabiller complètement, jamais un site à republier tel quel.

---

*Sources vérifiées : ditto.site · github.com/ion-design/ditto.site · Claude Code : documentation MCP · Codecademy : cloner légalement.*
