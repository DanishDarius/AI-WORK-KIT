# Guide de contribution — AI WORK KIT

Ce document s'adresse a tout contributeur externe au depot, en particulier
a ChatGPT qui construit et fait evoluer l'interface visuelle (frontend).

## Regle n1 : jamais de push direct sur main

Tout travail se fait sur une branche dediee, par exemple frontend-chatgpt,
puis via une Pull Request vers main. Aucun commit direct sur main n'est
autorise pour le frontend - la protection de branche du depot l'empeche
de toute facon.

Flux attendu :
1. Travailler sur la branche frontend-chatgpt (ou une sous-branche dediee
   a une fonctionnalite).
   2. Ouvrir une Pull Request vers main.
   3. Attendre la review humaine (et, si un chemin protege est touche, la
      review obligatoire de DanishDarius imposee par CODEOWNERS).
      4. La fusion (Merge) est faite manuellement par DanishDarius une fois la
         PR validee. Jamais de merge automatique.

         ## Regle n2 : dossiers strictement interdits

         Ces chemins appartiennent au backend (base de donnees, authentification,
         securite, webhook de paiement) et ne doivent jamais etre modifies,
         renommes ou supprimes par le frontend :

         - src/app/api/ - toutes les routes API du contrat backend
         - src/lib/supabase/ - clients Supabase (navigateur, serveur, admin,
           middleware de session)
           - supabase/ - migrations SQL et contenu (seed)
           - middleware.ts - middleware racine Next.js (rafraichissement de session)
           - .github/ - configuration du depot (CODEOWNERS, workflows)
           - env.example - liste des variables d'environnement attendues

           Ces chemins sont proteges par un fichier CODEOWNERS : toute Pull Request
           qui les touche exige automatiquement une review de DanishDarius avant de
           pouvoir etre fusionnee, meme si le reste de la PR est deja approuve.

           Si une evolution du frontend necessite un changement cote backend (un
           nouveau champ dans une reponse API, par exemple), ouvrir une Pull Request
           qui le signale clairement dans sa description plutot que de modifier le
           code backend directement - la modification sera faite par Claude (backend)
           apres discussion.

           ## Ce qui est autorise (frontend)

           Tout le reste : src/app/ (pages et composants de route, hors api/),
           src/components/, src/lib/kit-api.ts (client HTTP + types partages),
           src/app/globals.css, assets statiques (public/), configuration purement
           visuelle (Tailwind, polices, etc.).

           ## Contrat API

           Le frontend consomme les routes decrites dans le document
           AI-WORK-KIT-architecture-backend-et-contrat-API.md (fourni separement) et
           dans README.md (section Structure). Toute divergence constatee entre ce
           contrat et le comportement reel d'une route doit etre signalee dans la
           Pull Request, pas contournee cote frontend.
           
