-- 0042 : le fil Nouveau, du 05/10/2026 au 29/10/2026 (plan produit, chantier 5)
--
-- Contenu :
--   - 4 tâches de la semaine (F57 à F60), une par lundi ;
--   - le pack « Préparer ses ventes de fin d'année » et ses 5 tâches (F61 à F65) ;
--   - 12 actualités des IA, trois par jeudi (ChatGPT, Claude, Gemini),
--     rédigées à partir des annonces officielles relues le 05/10/2026 ;
--   - leurs lignes dans publications, avec leur date de parution.
--
-- Fichier fabriqué par aiw-fil-generateur.py à partir de sa source : les
-- textes n'y sont pas réécrits à la main (règle Q7). Pour changer un texte ou
-- une date, corriger la source et refabriquer le fichier.
--
-- Chaque tâche est une tâche du fil (taches.du_fil) : elle n'entre dans aucun
-- parcours de métier, et un compte connecté ne la lit pas directement (les
-- politiques restrictives de la migration 0040). Elle a son résultat, ses
-- étapes, un cas pratique, son modèle à remplir et la note de chaque IA.
--
-- Tout est réservé aux abonnés (reserve_abonnes = vrai) : un client sans
-- abonnement voit le titre seul. Rien ne se voit avant la date de parution.
--
-- Droits : aucune table créée, aucun droit modifié. Le site en ligne ne lit
-- pas le fil et ne voit pas ces tâches (règle B3). Aucune donnée supprimée.
-- Migration rejouable : une ligne déjà présente est remise à l'identique.
-- La migration 0040 doit être passée avant.

begin;

-- Garde : ces codes ne doivent pas déjà désigner une tâche d'un métier.
do $garde$
begin
  if exists (
    select 1 from taches t
    where t.code in ($t$F57$t$, $t$F58$t$, $t$F59$t$, $t$F60$t$, $t$F61$t$, $t$F62$t$, $t$F63$t$, $t$F64$t$, $t$F65$t$)
      and (not t.du_fil or exists (select 1 from metiers_taches mt where mt.tache_id = t.id))
  ) then
    raise exception 'Un de ces codes désigne déjà une tâche d''un métier : rien n''est modifié';
  end if;
end
$garde$;

-- 1. Les tâches du fil, leur résultat et leurs étapes
insert into taches (code, titre, limite_connue, du_fil) select $t$F57$t$, $t$Répondre en public à un avis négatif$t$, false, true
  where not exists (select 1 from taches where code = $t$F57$t$);
update taches set titre = $t$Répondre en public à un avis négatif$t$, resultat = $t$Deux réponses publiques à un avis négatif, une courte et une plus complète, et un message privé pour régler le problème. Un avis négatif est le commentaire public d'un client mécontent : sous une publication, sur votre page Facebook ou sur votre fiche Google.$t$, etapes = $j$["Recopier l'avis tel qu'il est écrit, et noter ce qui s'est vraiment passé.", "Remplir le modèle et copier la consigne dans son IA.", "Relire : aucune excuse pour une faute que vous n'avez pas commise, aucune promesse que vous ne tiendrez pas.", "Publier la réponse courte sous l'avis, puis envoyer le message privé.", "Noter le problème dans votre suivi, pour qu'il ne revienne pas."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F57$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F58$t$, $t$Préparer son entretien annuel d'évaluation$t$, false, true
  where not exists (select 1 from taches where code = $t$F58$t$);
update taches set titre = $t$Préparer son entretien annuel d'évaluation$t$, resultat = $t$Une page à apporter à l'entretien : vos résultats de l'année appuyés sur des faits, vos difficultés dites sans vous plaindre, et deux ou trois demandes claires. L'entretien annuel est le rendez-vous où votre responsable fait avec vous le bilan de l'année.$t$, etapes = $j$["Noter ses missions, ses résultats, ses difficultés et ce que l'on veut demander.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque fait : ne gardez que ce que vous pouvez prouver.", "S'entraîner à voix haute avec les questions probables.", "Apporter la page à l'entretien."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F58$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F59$t$, $t$Reprendre contact avec un ancien client$t$, false, true
  where not exists (select 1 from taches where code = $t$F59$t$);
update taches set titre = $t$Reprendre contact avec un ancien client$t$, resultat = $t$Trois messages courts pour reprendre contact avec un client qui n'a plus commandé : un message de nouvelles, une proposition précise, puis une seule relance, une semaine plus tard.$t$, etapes = $j$["Choisir un ancien client, et noter ce que vous avez fait pour lui, et quand.", "Remplir le modèle et copier la consigne dans son IA.", "Relire : pas de fausse urgence, pas de remise que vous ne voulez pas donner.", "Envoyer le premier message et attendre la réponse.", "Noter la date dans votre suivi des clients, et relancer une seule fois."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F59$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F60$t$, $t$Transformer des messages vocaux en compte rendu écrit$t$, false, true
  where not exists (select 1 from taches where code = $t$F60$t$);
update taches set titre = $t$Transformer des messages vocaux en compte rendu écrit$t$, resultat = $t$Un compte rendu court à partir de messages vocaux : ce qui a été dit, ce qui est décidé, qui fait quoi et pour quand. Avec Gemini, vous pouvez joindre le fichier audio. Avec une autre IA, vous dictez ou vous écrivez ce que vous avez entendu.$t$, etapes = $j$["Réunir les messages vocaux et les écouter une fois.", "Avec Gemini : joindre le fichier audio. Avec une autre IA : dicter ou écrire les points entendus dans le champ prévu.", "Remplir le modèle et copier la consigne dans son IA.", "Comparer le compte rendu aux messages : les noms, les montants, les dates.", "Envoyer le compte rendu aux personnes concernées, pour confirmation."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = $t$Gemini$t$, du_fil = true
  where code = $t$F60$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F61$t$, $t$Prévoir son stock pour les fêtes$t$, false, true
  where not exists (select 1 from taches where code = $t$F61$t$);
update taches set titre = $t$Prévoir son stock pour les fêtes$t$, resultat = $t$La quantité à commander pour chaque article, à partir de vos ventes de l'an dernier et de ce qu'il vous reste, avec le coût de la commande et ce qu'il reste de votre budget.$t$, etapes = $j$["Relever, pour chaque article, les ventes de décembre dernier et le stock actuel.", "Remplir le modèle et copier la consigne dans son IA.", "Refaire l'addition : la commande ne doit pas dépasser votre budget.", "Passer la commande assez tôt, en comptant le délai du fournisseur."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F61$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F62$t$, $t$Fixer ses offres de fin d'année sans vendre à perte$t$, false, true
  where not exists (select 1 from taches where code = $t$F62$t$);
update taches set titre = $t$Fixer ses offres de fin d'année sans vendre à perte$t$, resultat = $t$Pour chaque idée d'offre, ce qu'elle vous rapporte vraiment par article, et si elle respecte la marge que vous voulez garder. La marge est ce qui vous reste une fois l'article et ses frais payés.$t$, etapes = $j$["Noter le prix de vente, le prix de revient et la marge minimale que vous voulez garder.", "Écrire vos idées d'offres, telles que vous les diriez à un client.", "Remplir le modèle et copier la consigne dans son IA.", "Refaire le calcul de l'offre retenue, puis l'annoncer."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F62$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F63$t$, $t$Planifier ses publications de décembre$t$, false, true
  where not exists (select 1 from taches where code = $t$F63$t$);
update taches set titre = $t$Planifier ses publications de décembre$t$, resultat = $t$Un calendrier de publications pour tout le mois de décembre : le jour, le sujet, le texte court et la photo à prendre, avec le rappel de vos dates limites de commande.$t$, etapes = $j$["Noter vos dates importantes : les fêtes, vos dates limites de commande, vos jours de fermeture.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque date sur un calendrier.", "Préparer les photos de la première semaine, puis publier au jour dit."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F63$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F64$t$, $t$Écrire ses messages de vœux aux clients$t$, false, true
  where not exists (select 1 from taches where code = $t$F64$t$);
update taches set titre = $t$Écrire ses messages de vœux aux clients$t$, resultat = $t$Un message de vœux par groupe de clients, court et personnel, prêt à envoyer sur WhatsApp. Un message de vœux remercie : il ne vend rien.$t$, etapes = $j$["Séparer vos clients en deux ou trois groupes : les fidèles, les occasionnels, les entreprises.", "Remplir le modèle et copier la consigne dans son IA.", "Ajouter le prénom de chaque client fidèle, à la main.", "Envoyer les messages un par un, ou par liste de diffusion, jamais dans un groupe."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F64$t$;

insert into taches (code, titre, limite_connue, du_fil) select $t$F65$t$, $t$Faire le bilan de ses ventes de l'année$t$, false, true
  where not exists (select 1 from taches where code = $t$F65$t$);
update taches set titre = $t$Faire le bilan de ses ventes de l'année$t$, resultat = $t$Le bilan de votre année en une page : le total des ventes, la moyenne par mois, le meilleur et le moins bon trimestre, ce qu'il reste après les charges, et trois décisions pour l'an prochain.$t$, etapes = $j$["Relever vos ventes par mois ou par trimestre, et le total de vos charges.", "Remplir le modèle et copier la consigne dans son IA.", "Refaire les additions avec votre cahier de caisse ou votre tableau.", "Retenir trois décisions pour l'an prochain, et les noter."]$j$::jsonb, precisions = null, gratuit_ok = true, mobile_ok = true, outil_gratuit_conseille = null, du_fil = true
  where code = $t$F65$t$;

-- 2. Le cas pratique de chaque tâche
insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F57$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Vendeuse de sacs et de chaussures à Lomé$t$, contexte = $t$Vous vendez seule des sacs et des chaussures à Lomé, depuis votre page Facebook et WhatsApp. Une cliente vient de laisser un commentaire négatif sous votre dernière publication, que vos autres clientes voient.$t$, donnees = $t$- Le commentaire : « Sac reçu avec la fermeture cassée. Trois messages sans réponse. Je déconseille. »
- Le sac, vendu 12 000 FCFA, a été livré jeudi par un zem (le taxi-moto).
- La cliente a écrit vendredi, samedi et dimanche. Vous étiez en voyage à Kpalimé et vous n'avez pas répondu.
- Vous avez le même sac en stock. Une livraison dans Lomé vous coûte 1 000 FCFA.$t$, travail_a_faire = $t$Rédigez la réponse publique et le message privé. Dites ce que vous reconnaissez, ce que vous proposez, et ce que l'échange vous coûte.$t$, prenom = $t$Afi$t$, lieu = $t$Lomé, Togo$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$La réponse reconnaît les deux faits vrais : la fermeture cassée et les trois messages restés sans réponse. Elle propose l'échange du sac et invite à poursuivre en privé. L'échange coûte 1 000 FCFA de livraison, en plus du sac repris.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F57$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F58$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Assistante administrative dans une société de transit à Abidjan$t$, contexte = $t$Vous êtes assistante administrative chez Transit Lagune, une société de 25 personnes à Treichville. Votre entretien annuel a lieu dans une semaine, et c'est la première fois que vous le préparez par écrit.$t$, donnees = $t$- En poste depuis 3 ans.
- Dossiers de 2024 et 2025 classés et numérisés.
- Suivi des factures fournisseurs repris en mars. Aucun retard de paiement signalé depuis juin.
- Deux logiciels différents pour les mêmes factures.
- Vous remplacez souvent la standardiste.
- Vos demandes : une formation Excel, une fiche de poste à jour, une revalorisation de salaire.$t$, travail_a_faire = $t$Préparez votre page d'entretien : le bilan, les difficultés avec une proposition, les demandes classées, et les questions probables de votre responsable.$t$, prenom = $t$Mariam$t$, lieu = $t$Abidjan, Côte d'Ivoire$t$, profil = $t$Structure, 25 personnes$t$, reponse_attendue = $t$Une page avec trois résultats appuyés sur des faits (la numérisation, la reprise des factures, aucun retard depuis juin), deux difficultés suivies chacune d'une proposition, et trois demandes classées. Aucun montant de salaire n'est avancé : le cas n'en donne pas.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F58$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F59$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Photographe indépendant à Ouagadougou$t$, contexte = $t$Vous êtes photographe indépendant à Ouagadougou. Une organisatrice de mariages vous a confié deux mariages en décembre 2025, puis plus rien. La saison des mariages revient et vous voulez reprendre contact sans la gêner.$t$, donnees = $t$- Dernier travail : les photos de deux mariages, en décembre 2025.
- Elle était contente et avait payé par Orange Money, sans retard.
- Votre proposition : un forfait photo pour les mariages de décembre, à réserver avant le 15 novembre.
- Vous ne voulez pas baisser votre prix.$t$, travail_a_faire = $t$Rédigez les trois messages. Le premier ne vend rien. Le deuxième fait la proposition. Le troisième relance une seule fois.$t$, prenom = $t$Issouf$t$, lieu = $t$Ouagadougou, Burkina Faso$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Trois messages courts pour WhatsApp. Le premier rappelle les deux mariages de décembre 2025 et prend des nouvelles. Le deuxième présente le forfait et la date du 15 novembre. Le troisième relance une fois, sans insister. Aucune remise n'est proposée.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F59$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F60$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Chef de chantier à Parakou$t$, contexte = $t$Vous êtes chef de chantier pour une petite entreprise de 8 personnes à Parakou. Le fournisseur, le chauffeur et vous avez échangé sept messages vocaux sur une livraison de ciment. Le propriétaire veut un écrit.$t$, donnees = $t$- 40 sacs de ciment, livrés jeudi matin.
- Le chauffeur demande que la voie soit dégagée avant 8 heures.
- 30 sacs payés à la livraison par MTN MoMo, les 10 autres lundi.
- Personne n'a dit qui dégage la voie.$t$, travail_a_faire = $t$Rédigez le compte rendu en 10 lignes pour le propriétaire : ce qui est décidé, qui fait quoi, pour quand, et ce qui reste à confirmer.$t$, prenom = $t$Gildas$t$, lieu = $t$Parakou, Bénin$t$, profil = $t$Structure, 8 personnes$t$, reponse_attendue = $t$Un compte rendu en 10 lignes : 40 sacs jeudi matin, la voie dégagée avant 8 heures, 30 sacs payés à la livraison et 10 lundi, soit 40 au total. Il signale un point à confirmer : qui dégage la voie.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F60$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F61$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Gérante d'une boutique de pagnes et d'accessoires à Bamako$t$, contexte = $t$Vous tenez avec deux vendeuses une boutique de pagnes et d'accessoires au Grand Marché de Bamako. L'an dernier, vous avez manqué de pagnes dès la mi-décembre. Cette année, vous préparez la commande en octobre.$t$, donnees = $t$- Pagnes wax : 60 vendus en décembre dernier, 8 en stock, achetés 7 000 FCFA pièce.
- Sacs à main : 25 vendus, 5 en stock, achetés 6 000 FCFA pièce.
- Foulards : 40 vendus, 30 en stock, achetés 1 500 FCFA pièce.
- Vous pensez vendre autant que l'an dernier.
- Budget de la commande : 600 000 FCFA. Le fournisseur livre en 10 jours.$t$, travail_a_faire = $t$Calculez la quantité à commander pour chaque article, le coût de la commande et ce qu'il reste du budget.$t$, prenom = $t$Fatoumata$t$, lieu = $t$Bamako, Mali$t$, profil = $t$Structure, 3 personnes$t$, reponse_attendue = $t$À commander : 52 pagnes (364 000 FCFA), 20 sacs (120 000 FCFA) et 10 foulards (15 000 FCFA), soit 499 000 FCFA. Le budget de 600 000 FCFA suffit : il reste 101 000 FCFA. La commande doit partir au moins 10 jours avant le début des ventes.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F61$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F62$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Vendeur de chaussures à Niamey$t$, contexte = $t$Vous vendez seul des chaussures au Grand Marché de Niamey et sur WhatsApp. Pour décembre, vous hésitez entre deux offres et vous ne voulez pas gagner moins de 3 000 FCFA par paire.$t$, donnees = $t$- Une paire est vendue 15 000 FCFA. Son prix de revient est de 10 000 FCFA.
- Offre A : 2 paires achetées, la 3e à moitié prix.
- Offre B : la livraison offerte dès 2 paires achetées. Une livraison vous coûte 1 000 FCFA.
- Marge minimale voulue : 3 000 FCFA par paire.$t$, travail_a_faire = $t$Calculez la marge par paire de chaque offre, et dites laquelle respecte votre marge minimale.$t$, prenom = $t$Moussa$t$, lieu = $t$Niamey, Niger$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Offre A : le client paie 37 500 FCFA pour trois paires qui vous coûtent 30 000 FCFA. La marge est de 7 500 FCFA, soit 2 500 FCFA par paire, sous les 3 000 FCFA voulus. Offre B : le client paie 30 000 FCFA pour deux paires qui vous coûtent 21 000 FCFA avec la livraison. La marge est de 9 000 FCFA, soit 4 500 FCFA par paire : elle respecte votre minimum.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F62$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F63$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Pâtissière à domicile à Dakar$t$, contexte = $t$Vous préparez seule des gâteaux sur commande, depuis votre cuisine aux Parcelles Assainies. En décembre, les commandes arrivent toutes en même temps, souvent trop tard. Vous voulez annoncer vos dates limites à l'avance.$t$, donnees = $t$- Gâteaux de fête et boîtes de petits fours, à commander 72 heures à l'avance.
- Paiement par Wave à la commande.
- Trois publications par semaine, en statut WhatsApp et sur Facebook.
- Vous ne livrez pas le 1er janvier.$t$, travail_a_faire = $t$Préparez le calendrier de décembre. Calculez et annoncez la date limite de commande pour Noël et pour le 31 décembre.$t$, prenom = $t$Aïssatou$t$, lieu = $t$Dakar, Sénégal$t$, profil = $t$Individuelle, 1 personne$t$, reponse_attendue = $t$Un calendrier du 1er au 31 décembre, à trois publications par semaine. Avec 72 heures de délai, la date limite est le 22 décembre pour Noël et le 28 décembre pour le 31. Chaque date limite est rappelée quelques jours avant, puis la veille.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F63$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F64$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Couturier à Cotonou$t$, contexte = $t$Vous dirigez l'atelier Fil du Sud, quatre personnes, à Fidjrossè. Chaque année, vous envoyez le même message de vœux à tout le monde. Cette année, vous voulez un message par groupe de clients.$t$, donnees = $t$- Trois groupes : les clientes fidèles, les clients d'une seule commande, les entreprises qui commandent des tenues.
- À dire : merci pour leur confiance, l'atelier a déménagé à Fidjrossè en juin, réouverture le 5 janvier.
- Signature : Romaric, atelier Fil du Sud.$t$, travail_a_faire = $t$Rédigez un message de vœux par groupe, et une version très courte pour un statut WhatsApp.$t$, prenom = $t$Romaric$t$, lieu = $t$Cotonou, Bénin$t$, profil = $t$Structure, 4 personnes$t$, reponse_attendue = $t$Trois messages de 3 à 4 lignes, un par groupe, et une version courte pour un statut. Chacun remercie, rappelle le déménagement à Fidjrossè et la réouverture du 5 janvier. Aucun ne contient d'offre ni de prix.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F64$t$);

insert into exercices (tache_id, numero, titre, contexte, travail_a_faire) select t.id, 1, '', '', '' from taches t
  where t.code = $t$F65$t$ and not exists (select 1 from exercices e where e.tache_id = t.id and e.numero = 1);
update exercices set titre = $t$Gérant d'une boutique de téléphones à Yaoundé$t$, contexte = $t$Vous tenez avec un apprenti une boutique de téléphones et d'accessoires au marché Mokolo. Vous notez vos ventes chaque jour, mais vous n'avez jamais regardé l'année entière.$t$, donnees = $t$- Ventes : 1 800 000 FCFA au 1er trimestre, 2 100 000 FCFA au 2e, 1 950 000 FCFA au 3e, 2 650 000 FCFA au 4e.
- Charges de l'année (achats, loyer, apprenti, électricité) : 6 900 000 FCFA.
- Ce qui a bien marché : les accessoires et les réparations rapides.
- Ce qui a moins bien marché : les téléphones neufs.$t$, travail_a_faire = $t$Calculez le total des ventes, la moyenne par mois, le meilleur trimestre et ce qu'il reste après les charges.$t$, prenom = $t$Brice$t$, lieu = $t$Yaoundé, Cameroun$t$, profil = $t$Structure, 2 personnes$t$, reponse_attendue = $t$Ventes de l'année : 8 500 000 FCFA, soit environ 708 000 FCFA par mois. Meilleur trimestre : le quatrième, avec 2 650 000 FCFA ; le moins bon : le premier, avec 1 800 000 FCFA, soit 850 000 FCFA d'écart. Après 6 900 000 FCFA de charges, il reste 1 600 000 FCFA.$t$
  where numero = 1 and tache_id in (select id from taches where code = $t$F65$t$);

-- 3. Le modèle à remplir, ses champs et la note de chaque IA
insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Répondre en public à un avis négatif$t$, $t$Rôle : Vous aidez un commerçant à répondre en public à un client mécontent, avec calme et honnêteté.

Contexte : Mon activité : {{activite}}. L'avis, publié {{canal}} : « {{avis}} ». Ce qui s'est vraiment passé : {{faits}}. Ce que je peux proposer : {{solution}}.

Travail demandé :
1. Une réponse publique courte, de 2 à 3 phrases : je remercie, je reconnais ce qui est vrai, je dis ce que je propose, j'invite à poursuivre en message privé.
2. Une réponse publique plus complète, de 5 phrases au plus, pour les autres clients qui lisent.
3. Un message privé à envoyer au client pour régler le problème.

Format : texte simple, sans astérisque, prêt à coller. Vouvoyez le client.

Règle : ne reconnaissez que ce qui est vrai dans mes faits. Ne promettez rien d'autre que ce que je propose. N'accusez pas le client et ne citez aucune information personnelle. S'il manque une information, posez-moi une question avant d'écrire.$t$, 1, $t$Relisez avant de publier : une réponse publique reste visible par tous vos clients.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F57$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$une boutique de sacs et de chaussures à Lomé$t$, true, 1),
    ($t$canal$t$, $t$Où l'avis est-il publié ?$t$, $t$choix$t$, $j$["sous une publication Facebook", "sur ma page Facebook", "sur ma fiche Google", "dans un groupe WhatsApp"]$j$::jsonb, $t$sous une publication Facebook$t$, true, 2),
    ($t$avis$t$, $t$Que dit l'avis, mot pour mot ?$t$, $t$long$t$, null::jsonb, $t$Sac reçu avec la fermeture cassée. Trois messages sans réponse. Je déconseille.$t$, true, 3),
    ($t$faits$t$, $t$Que s'est-il vraiment passé ?$t$, $t$long$t$, null::jsonb, $t$Le sac a été livré jeudi par un zem. La cliente a écrit vendredi, samedi et dimanche : j'étais en voyage et je n'ai pas répondu$t$, true, 4),
    ($t$solution$t$, $t$Que pouvez-vous proposer ?$t$, $t$texte$t$, null::jsonb, $t$l'échange du sac sous 48 heures, livraison à mes frais$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F57$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F57$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Préparer son entretien annuel d'évaluation$t$, $t$Rôle : Vous aidez un salarié à préparer son entretien annuel d'évaluation.

Contexte : Mon poste : {{poste}}. Mes résultats de l'année : {{resultats}}. Mes difficultés : {{difficultes}}. Ce que je veux demander : {{demandes}}. Ton souhaité : {{ton}}.

Travail demandé :
1. Mon bilan en 5 points au plus, chacun avec un fait précis.
2. Mes difficultés, en une phrase chacune, avec une proposition.
3. Mes demandes, de la plus importante à la moins importante, avec l'argument de chacune.
4. Cinq questions que mon responsable peut me poser, et une réponse courte pour chacune.

Format : une page, des phrases courtes, prête à lire à voix haute.

Règle : utilisez seulement mes faits. N'inventez aucun chiffre, aucun résultat, aucun montant de salaire. Si un résultat n'a pas de preuve, dites-le-moi.$t$, 1, $t$L'IA ne connaît ni votre entreprise ni sa grille de salaires : le montant d'une demande d'augmentation se décide avec vos propres repères.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F58$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$poste$t$, $t$Quel est votre poste ?$t$, $t$texte$t$, null::jsonb, $t$assistante administrative dans une société de transit à Abidjan, depuis 3 ans$t$, true, 1),
    ($t$resultats$t$, $t$Qu'avez-vous réussi cette année ?$t$, $t$long$t$, null::jsonb, $t$dossiers de 2024 et 2025 classés et numérisés ; suivi des factures fournisseurs repris en mars ; aucun retard de paiement signalé depuis juin$t$, true, 2),
    ($t$difficultes$t$, $t$Qu'est-ce qui vous a gênée ou gêné ?$t$, $t$long$t$, null::jsonb, $t$deux logiciels différents pour les mêmes factures ; je remplace souvent la standardiste$t$, true, 3),
    ($t$demandes$t$, $t$Que voulez-vous demander ?$t$, $t$long$t$, null::jsonb, $t$une formation Excel ; une fiche de poste à jour ; une revalorisation de salaire$t$, true, 4),
    ($t$ton$t$, $t$Quel ton voulez-vous ?$t$, $t$choix$t$, $j$["posé et factuel", "chaleureux", "très court"]$j$::jsonb, $t$posé et factuel$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F58$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F58$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Reprendre contact avec un ancien client$t$, $t$Rôle : Vous aidez un indépendant à reprendre contact avec un ancien client, sans le gêner.

Contexte : Mon métier : {{metier}}. Le client : {{client}}. Notre dernier travail ensemble : {{dernier_travail}}. Ce que je veux lui proposer : {{proposition}}. Je lui écris par {{canal}}.

Travail demandé :
1. Un premier message de 3 lignes au plus : je prends des nouvelles et je rappelle notre dernier travail. Il ne vend rien.
2. Un deuxième message, à envoyer s'il répond : ma proposition, en 4 lignes au plus, avec une date ou une suite simple.
3. Une relance de 2 lignes, à envoyer une semaine plus tard s'il n'a pas répondu. Une seule.

Format : texte simple, sans astérisque, prêt à coller. Commencez chaque message par « Bonjour ».

Règle : n'inventez aucune remise, aucune urgence, aucun souvenir que je n'ai pas donné. Si ma proposition n'est pas claire, posez-moi une question avant d'écrire.$t$, 1, null, 1, '2026-10-05' from taches t
  where t.code = $t$F59$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$metier$t$, $t$Quel est votre métier ?$t$, $t$texte$t$, null::jsonb, $t$photographe indépendant à Ouagadougou$t$, true, 1),
    ($t$client$t$, $t$Qui est ce client ?$t$, $t$texte$t$, null::jsonb, $t$une organisatrice de mariages$t$, true, 2),
    ($t$dernier_travail$t$, $t$Quel a été votre dernier travail ensemble ?$t$, $t$texte$t$, null::jsonb, $t$les photos de deux mariages, en décembre 2025$t$, true, 3),
    ($t$proposition$t$, $t$Que voulez-vous lui proposer ?$t$, $t$texte$t$, null::jsonb, $t$un forfait photo pour les mariages de décembre, à réserver avant le 15 novembre$t$, true, 4),
    ($t$canal$t$, $t$Par où lui écrivez-vous ?$t$, $t$choix$t$, $j$["WhatsApp", "e-mail", "un appel, puis un message"]$j$::jsonb, $t$WhatsApp$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F59$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F59$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Transformer des messages vocaux en compte rendu écrit$t$, $t$Rôle : Vous transformez des messages vocaux en un compte rendu écrit, clair et fidèle.

Contexte : Les messages parlent de : {{sujet}}. Les personnes : {{personnes}}. Ce que j'ai entendu : {{contenu}}. Le compte rendu est pour : {{destinataire}}. Longueur : {{longueur}}.

Travail demandé :
1. Ce qui est décidé, point par point.
2. Qui fait quoi, et pour quand.
3. Les montants et les quantités, tels qu'ils ont été dits.
4. Ce qui n'est pas tranché ou reste flou, sous le titre « À confirmer ».

Format : texte simple, sans astérisque, prêt à coller dans WhatsApp.

Règle : n'ajoutez rien qui n'a pas été dit. Si deux informations se contredisent, signalez-le au lieu de choisir. Si « Ce que j'ai entendu » est vide ou marqué non précisé, travaillez à partir du fichier audio joint.$t$, 1, $t$Vérifiez les noms, les montants et les dates en réécoutant les messages : l'IA peut mal comprendre un mot.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F60$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$sujet$t$, $t$De quoi parlent ces messages ?$t$, $t$texte$t$, null::jsonb, $t$la livraison de 40 sacs de ciment sur un chantier à Parakou$t$, true, 1),
    ($t$personnes$t$, $t$Qui parle ?$t$, $t$texte$t$, null::jsonb, $t$le chef de chantier, le fournisseur, le chauffeur$t$, true, 2),
    ($t$contenu$t$, $t$Qu'avez-vous entendu ? (vide si vous joignez l'audio à Gemini)$t$, $t$long$t$, null::jsonb, $t$Le fournisseur livre 40 sacs jeudi matin. Le chauffeur demande que la voie soit dégagée avant 8 heures. Le chef de chantier paie 30 sacs à la livraison par MTN MoMo et les 10 autres lundi$t$, false, 3),
    ($t$destinataire$t$, $t$Pour qui est le compte rendu ?$t$, $t$texte$t$, null::jsonb, $t$le propriétaire du chantier$t$, true, 4),
    ($t$longueur$t$, $t$Quelle longueur ?$t$, $t$choix$t$, $j$["5 lignes", "10 lignes", "une demi-page"]$j$::jsonb, $t$10 lignes$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F60$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Les pages d'OpenAI ne disent pas qu'un compte gratuit lit un fichier audio : dictez ou écrivez ce que vous avez entendu dans le champ prévu, puis collez la consigne.$t$),
    ($t$claude$t$, $t$Claude ne lit pas les fichiers audio : dictez ou écrivez ce que vous avez entendu dans le champ prévu, puis collez la consigne.$t$),
    ($t$gemini$t$, $t$Joignez le fichier audio avec le signe « + », laissez vide le champ « Qu'avez-vous entendu ? », puis collez la consigne. Sans abonnement, Gemini lit jusqu'à 10 minutes d'audio par demande.$t$),
    ($t$meta_ai$t$, $t$Dictez ou écrivez ce que vous avez entendu dans le champ prévu, puis collez la consigne.$t$),
    ($t$copilot$t$, $t$Dictez ou écrivez ce que vous avez entendu dans le champ prévu, puis collez la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F60$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Prévoir son stock pour les fêtes$t$, $t$Rôle : Vous aidez un commerçant à prévoir son stock pour les fêtes de fin d'année, et vous expliquez chaque calcul.

Contexte : Mes ventes de décembre dernier et mon stock actuel : {{ventes_stock}}. Cette année, je pense vendre : {{evolution}}. Mes prix d'achat : {{prix_achat}}. Mon budget pour la commande : {{budget}} FCFA. Délai du fournisseur : {{delai}}.

Travail demandé :
1. Pour chaque article : la quantité à commander (ventes prévues moins stock actuel) et son coût.
2. Le coût total de la commande, et ce qu'il reste du budget.
3. Si le budget ne suffit pas : ce que vous me conseillez de réduire, et pourquoi.
4. La date limite pour commander, selon le délai du fournisseur.

Format : un petit tableau, puis 3 phrases. Montrez chaque calcul.

Règle : utilisez seulement mes chiffres. N'inventez aucune vente ni aucun prix. S'il manque un chiffre, demandez-le.$t$, 1, $t$Une IA peut se tromper dans un calcul. Refaites l'addition avant de commander.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F61$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$ventes_stock$t$, $t$Vos ventes de décembre dernier et votre stock actuel, par article ?$t$, $t$long$t$, null::jsonb, $t$pagnes wax : 60 vendus, 8 en stock ; sacs à main : 25 vendus, 5 en stock ; foulards : 40 vendus, 30 en stock$t$, true, 1),
    ($t$evolution$t$, $t$Pensez-vous vendre plus, autant ou moins ?$t$, $t$choix$t$, $j$["autant que l'an dernier", "un peu plus", "un peu moins"]$j$::jsonb, $t$autant que l'an dernier$t$, true, 2),
    ($t$prix_achat$t$, $t$Vos prix d'achat, par article ?$t$, $t$long$t$, null::jsonb, $t$pagne 7 000 FCFA, sac 6 000 FCFA, foulard 1 500 FCFA$t$, true, 3),
    ($t$budget$t$, $t$Quel est votre budget pour la commande ?$t$, $t$nombre$t$, null::jsonb, $t$600 000$t$, true, 4),
    ($t$delai$t$, $t$En combien de temps le fournisseur livre-t-il ?$t$, $t$texte$t$, null::jsonb, $t$10 jours$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F61$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F61$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Fixer ses offres de fin d'année sans vendre à perte$t$, $t$Rôle : Vous aidez un commerçant à vérifier ses offres de fin d'année, et vous expliquez chaque calcul en mots simples.

Contexte : Article : {{article}}. Prix de vente : {{prix_vente}} FCFA. Prix de revient : {{prix_revient}} FCFA. Marge minimale que je veux garder par article : {{marge_minimale}} FCFA. Mes idées d'offres : {{offres}}.

Travail demandé :
1. Pour chaque offre : ce que le client paie, ce que cela me coûte, ma marge totale et ma marge par article.
2. Dire, pour chaque offre, si elle respecte ma marge minimale.
3. L'offre que vous me conseillez, en 2 phrases.

Format : un petit tableau, puis l'avis. Montrez chaque calcul.

Règle : utilisez seulement mes chiffres. Ne proposez aucun prix « du marché » que je ne vous ai pas donné. S'il manque un chiffre, demandez-le.$t$, 1, $t$Une IA peut se tromper dans un calcul. Vérifiez l'offre retenue avant de l'annoncer.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F62$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$article$t$, $t$Quel article ?$t$, $t$texte$t$, null::jsonb, $t$une paire de chaussures$t$, true, 1),
    ($t$prix_vente$t$, $t$À combien le vendez-vous ?$t$, $t$nombre$t$, null::jsonb, $t$15 000$t$, true, 2),
    ($t$prix_revient$t$, $t$Combien vous coûte-t-il, frais compris ?$t$, $t$nombre$t$, null::jsonb, $t$10 000$t$, true, 3),
    ($t$marge_minimale$t$, $t$Combien voulez-vous garder au minimum, par article ?$t$, $t$nombre$t$, null::jsonb, $t$3 000$t$, true, 4),
    ($t$offres$t$, $t$Quelles offres envisagez-vous ?$t$, $t$long$t$, null::jsonb, $t$offre A : 2 paires achetées, la 3e à moitié prix ; offre B : la livraison offerte (1 000 FCFA) dès 2 paires achetées$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F62$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F62$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Planifier ses publications de décembre$t$, $t$Rôle : Vous préparez le calendrier de publications d'un commerce pour le mois de décembre.

Contexte : Mon activité : {{activite}}. Ce que je veux mettre en avant : {{articles}}. Mes dates importantes : {{dates}}. Mon rythme : {{rythme}}. Mes canaux : {{canaux}}.

Travail demandé :
1. Un calendrier du 1er au 31 décembre : pour chaque publication, le jour, le sujet, un texte de 2 lignes et la photo à prendre.
2. Un rappel de chaque date limite, publié quelques jours avant, puis la veille.
3. Une publication de remerciement pour la fin du mois.

Format : une liste, semaine par semaine, prête à copier.

Règle : respectez mes dates, sans en ajouter. N'inventez aucune promotion, aucun prix, aucun stock. Une seule idée par publication.$t$, 1, $t$Vérifiez chaque date sur un calendrier avant de publier.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F63$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$une pâtisserie à la maison, à Dakar, sur commande$t$, true, 1),
    ($t$articles$t$, $t$Que voulez-vous mettre en avant ?$t$, $t$texte$t$, null::jsonb, $t$les gâteaux de fête et les boîtes de petits fours$t$, true, 2),
    ($t$dates$t$, $t$Quelles sont vos dates importantes ?$t$, $t$long$t$, null::jsonb, $t$commande 72 heures à l'avance ; dernier jour de commande pour Noël : le 22 décembre ; pour le 31 : le 28 décembre ; fermé le 1er janvier$t$, true, 3),
    ($t$rythme$t$, $t$Combien de publications par semaine ?$t$, $t$choix$t$, $j$["2 par semaine", "3 par semaine", "1 par jour"]$j$::jsonb, $t$3 par semaine$t$, true, 4),
    ($t$canaux$t$, $t$Où publiez-vous ?$t$, $t$texte$t$, null::jsonb, $t$statuts WhatsApp et Facebook$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F63$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F63$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Écrire ses messages de vœux aux clients$t$, $t$Rôle : Vous rédigez les messages de vœux d'un commerçant ou d'un artisan à ses clients.

Contexte : Mon activité : {{activite}}. Mes groupes de clients : {{groupes}}. Ce que je veux leur dire cette année : {{message}}. Je signe : {{signature}}. Ton : {{ton}}.

Travail demandé :
1. Un message de 3 à 4 lignes pour chaque groupe de clients.
2. Pour les clients fidèles, une phrase à compléter avec le prénom et un souvenir de l'année.
3. Une version très courte, pour un statut WhatsApp.

Format : texte simple, sans astérisque, prêt à coller. Vouvoyez les clients.

Règle : aucun prix, aucune promotion, aucune offre : un message de vœux ne vend pas. N'inventez aucun souvenir. Restez neutre sur la religion, sauf si je vous dis le contraire.$t$, 1, null, 1, '2026-10-05' from taches t
  where t.code = $t$F64$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$un atelier de couture à Cotonou$t$, true, 1),
    ($t$groupes$t$, $t$Quels groupes de clients ?$t$, $t$texte$t$, null::jsonb, $t$les clientes fidèles, les clients d'une seule commande, les entreprises qui commandent des tenues$t$, true, 2),
    ($t$message$t$, $t$Que voulez-vous leur dire cette année ?$t$, $t$long$t$, null::jsonb, $t$merci pour leur confiance ; l'atelier a déménagé à Fidjrossè en juin ; nous rouvrons le 5 janvier$t$, true, 3),
    ($t$signature$t$, $t$Comment signez-vous ?$t$, $t$texte$t$, null::jsonb, $t$Romaric, atelier Fil du Sud$t$, true, 4),
    ($t$ton$t$, $t$Quel ton voulez-vous ?$t$, $t$choix$t$, $j$["chaleureux", "sobre", "joyeux"]$j$::jsonb, $t$chaleureux$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F64$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F64$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Faire le bilan de ses ventes de l'année$t$, $t$Rôle : Vous aidez un commerçant à faire le bilan de ses ventes de l'année, et vous expliquez chaque calcul.

Contexte : Mon activité : {{activite}}. Mes ventes de l'année : {{ventes}}. Mes charges de l'année : {{charges}} FCFA. Ce qui a bien marché : {{reussites}}. Ce qui a moins bien marché : {{difficultes}}.

Travail demandé :
1. Le total des ventes et la moyenne par mois.
2. Le meilleur et le moins bon trimestre, avec l'écart entre les deux.
3. Ce qu'il reste après les charges.
4. Trois décisions simples pour l'an prochain, tirées de mes chiffres et de mes remarques.

Format : un petit tableau, puis une page au plus. Montrez chaque calcul.

Règle : utilisez seulement mes chiffres. N'inventez aucune vente, aucune charge, aucune comparaison avec d'autres boutiques. S'il manque un chiffre, demandez-le.$t$, 1, $t$Une IA peut se tromper dans un calcul. Ce bilan ne remplace pas les comptes tenus par votre comptable.$t$, 1, '2026-10-05' from taches t
  where t.code = $t$F65$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;
insert into champs_modele (modele_id, cle, libelle, type, options, exemple, requis, ordre) select mp.id, v.cle, v.libelle, v.type, v.options, v.exemple, v.requis, v.ordre
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$activite$t$, $t$Quelle est votre activité ?$t$, $t$texte$t$, null::jsonb, $t$une boutique de téléphones et d'accessoires à Yaoundé$t$, true, 1),
    ($t$ventes$t$, $t$Vos ventes de l'année, par mois ou par trimestre ?$t$, $t$long$t$, null::jsonb, $t$1er trimestre : 1 800 000 FCFA ; 2e trimestre : 2 100 000 FCFA ; 3e trimestre : 1 950 000 FCFA ; 4e trimestre : 2 650 000 FCFA$t$, true, 2),
    ($t$charges$t$, $t$Le total de vos charges de l'année ?$t$, $t$nombre$t$, null::jsonb, $t$6 900 000$t$, true, 3),
    ($t$reussites$t$, $t$Qu'est-ce qui a bien marché ?$t$, $t$texte$t$, null::jsonb, $t$les accessoires et les réparations rapides$t$, true, 4),
    ($t$difficultes$t$, $t$Qu'est-ce qui a moins bien marché ?$t$, $t$texte$t$, null::jsonb, $t$les téléphones neufs, trop chers pour mes clients$t$, true, 5)
  ) as v(cle, libelle, type, options, exemple, requis, ordre)
  where t.code = $t$F65$t$
  on conflict (modele_id, cle) do update set libelle = excluded.libelle, type = excluded.type, options = excluded.options, exemple = excluded.exemple, requis = excluded.requis, ordre = excluded.ordre;
insert into conseils_ia (modele_id, ia, conseil) select mp.id, v.ia, v.conseil
  from modeles_prompts mp join taches t on t.id = mp.tache_id,
  (values
    ($t$chatgpt$t$, $t$Ouvrez la conversation dans le projet de votre kit, pour que vos instructions s'appliquent. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$claude$t$, $t$Ouvrez la conversation dans le projet de votre kit. Sans kit installé, collez la consigne dans une nouvelle conversation.$t$),
    ($t$gemini$t$, $t$Ouvrez l'assistant de votre kit dans Gemini, s'il est créé. Sinon, collez la consigne dans une nouvelle conversation.$t$),
    ($t$meta_ai$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$),
    ($t$copilot$t$, $t$Collez d'abord le texte de configuration de votre kit, puis la consigne.$t$)
  ) as v(ia, conseil)
  where t.code = $t$F65$t$
  on conflict (modele_id, ia) do update set conseil = excluded.conseil;

-- 4. Le pack et ses tâches
insert into packs (slug, titre, description, pour_qui) values ($t$ventes-de-fin-d-annee$t$, $t$Préparer ses ventes de fin d'année$t$, $t$Cinq tâches pour arriver prêt en décembre : prévoir le stock, fixer les offres sans vendre à perte, planifier les publications, écrire les messages de vœux et faire le bilan de l'année.$t$, $t$Pour les commerçants et les vendeurs en ligne. À commencer dès octobre, pour commander à temps.$t$)
  on conflict (slug) do update set titre = excluded.titre, description = excluded.description, pour_qui = excluded.pour_qui;
insert into packs_taches (pack_id, tache_id, ordre) select pk.id, t.id, v.ordre
  from packs pk, taches t,
  (values
    ($t$F61$t$, 1),
    ($t$F62$t$, 2),
    ($t$F63$t$, 3),
    ($t$F64$t$, 4),
    ($t$F65$t$, 5)
  ) as v(code, ordre)
  where pk.slug = $t$ventes-de-fin-d-annee$t$ and t.code = v.code and t.du_fil
  on conflict (pack_id, tache_id) do update set ordre = excluded.ordre;

-- 5. Les actualités des IA
insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$gemini-skills-remplacent-les-gems$t$, $t$gemini$t$, $t$À savoir$t$,
  $t$Dans Gemini, les skills remplacent les Gems.$t$,
  '2026-09-30',
  $t$Google ajoute les « skills » à Gemini : des instructions que vous enregistrez une fois, et que Gemini relance quand votre demande s'y prête. Elles remplacent les Gems, qui disparaissent en novembre 2026 pour les comptes Google personnels. Google annonce que vos Gems seront convertis en skills automatiquement.$t$,
  $t$Si votre kit est installé dans Gemini sous forme de Gems, vous n'avez rien à refaire : ils seront convertis. Les étapes « Gemini » de votre kit AIW seront mises à jour à ce moment-là.$t$,
  $t$Rien pour l'instant : gardez vos Gems. Pour créer une nouvelle skill, demandez-le à Gemini dans une conversation.$t$,
  $j$["Une skill est un jeu d'instructions réutilisable. Gemini peut la lancer seul quand votre demande correspond.", "Fin des Gems : novembre 2026 pour les comptes personnels, mars 2027 pour les comptes Workspace d'entreprise, juin 2027 pour l'éducation.", "Les Gems existants sont convertis en skills au moment où les Gems disparaissent.", "Réservé pour l'instant aux 18 ans et plus."]$j$::jsonb,
  $t$Déploiement mondial progressif dans le chat Gemini, depuis le 30 septembre 2026. Google écrit « disponible pour toutes les formules Google AI » : l'annonce ne dit pas clairement si un compte sans abonnement y a droit.$t$,
  $j$[{"label": "Google : automatiser ses tâches avec les skills", "url": "https://blog.google/products-and-platforms/products/gemini/automate-tasks-with-skills/"}, {"label": "Notes de version de Gemini", "url": "https://gemini.google/release-notes/"}]$j$::jsonb,
  $j${"type": "image", "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Skills_thumbnail.width-1300.png", "alt": "Visuel officiel de Google pour les skills de Gemini.", "credit": "Image : Google"}$j$::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$claude-sonnet-5-5$t$, $t$claude$t$, $t$Nouveau modèle$t$,
  $t$Claude Sonnet 5.5 est disponible.$t$,
  '2026-09-28',
  $t$Anthropic lance Sonnet 5.5, le deuxième modèle de la famille Claude 5.5. Il est annoncé plus de 30 % plus rapide que Sonnet 5, et jusqu'à 30 % moins coûteux à faire tourner. Anthropic le présente comme le plus à l'aise sur les tâches courantes bien cadrées, les documents, les présentations et les tableaux.$t$,
  $t$Des réponses plus rapides sur vos tâches de tous les jours.$t$,
  $t$Rien à changer : vos consignes AIW fonctionnent telles quelles.$t$,
  $j$["Sonnet 5.5 complète Claude Opus 5.5, qui reste le modèle des travaux complexes.", "Point fort annoncé : les tâches courantes bien cadrées, et des documents, présentations et tableaux soignés.", "La page des tarifs de Claude indique que l'offre gratuite donne accès aux modèles Sonnet, dans la limite d'usage habituelle."]$j$::jsonb,
  $t$Depuis le 28 septembre 2026, sur toutes les plateformes. L'annonce ne cite aucune offre ; c'est la page des tarifs qui indique « Sonnet : oui » pour l'offre gratuite.$t$,
  $j$[{"label": "Anthropic : Claude Sonnet 5.5", "url": "https://www.anthropic.com/claude-sonnet-5-5"}, {"label": "Notes de version de Claude", "url": "https://support.claude.com/en/articles/12138966-release-notes"}, {"label": "Tarifs de Claude", "url": "https://claude.com/pricing"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$chatgpt-cartes-memoire$t$, $t$chatgpt$t$, $t$Nouvelle fonction$t$,
  $t$ChatGPT crée des cartes mémoire pour réviser.$t$,
  '2026-09-22',
  $t$Vous pouvez demander à ChatGPT des cartes mémoire sur un sujet, ou lui envoyer vos notes pour qu'il les transforme en cartes. Vous touchez une carte pour la retourner, vous cochez ce que vous savez, et vous revoyez le reste plus tard.$t$,
  $t$Utile pour apprendre le vocabulaire d'un métier, retenir une procédure ou préparer un concours, directement sur le téléphone.$t$,
  $t$Demandez : « Fais-moi des cartes mémoire sur… », ou envoyez vos notes. Vérifiez les cartes avec vos notes d'origine : OpenAI rappelle que ChatGPT peut se tromper.$t$,
  $j$["Une carte se retourne d'un toucher. Vous cochez si vous connaissez la réponse, ou vous la gardez pour plus tard.", "Les cartes peuvent être mélangées.", "Elles s'enregistrent automatiquement dans votre bibliothèque."]$j$::jsonb,
  $t$Sur mobile et sur le web, pour toutes les offres de ChatGPT, depuis le 22 septembre 2026.$t$,
  $j$[{"label": "Notes de version de ChatGPT", "url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}, {"label": "OpenAI : les cartes mémoire dans ChatGPT", "url": "https://help.openai.com/en/articles/20001533-flashcards-in-chatgpt"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$chatgpt-voix-et-plugins$t$, $t$chatgpt$t$, $t$Nouvelle fonction$t$,
  $t$Le mode vocal de ChatGPT utilise vos plugins.$t$,
  '2026-09-23',
  $t$Quand vous parlez à ChatGPT, il peut maintenant se servir des plugins et des applications connectées à votre compte, sur le web, sur iPhone et sur Android. Vous suivez ses réponses à l'écrit dans la conversation.$t$,
  $t$Vous pouvez demander à voix haute un travail qui passe par une application connectée, sans rien taper.$t$,
  $t$Ouvrez le mode vocal dans une conversation et faites votre demande. Avec une offre gratuite, seuls les plugins de votre offre sont utilisables, et l'usage de la voix est limité.$t$,
  $j$["Le mode vocal prend en charge les plugins sur le web, iOS et Android.", "Les comptes Free et Go utilisent la voix avec les plugins que leur offre prend en charge.", "Les autorisations déjà données aux applications connectées restent les mêmes."]$j$::jsonb,
  $t$Sur le web, iOS et Android, depuis le 23 septembre 2026. Offres Free et Go comprises, avec les plugins de leur offre.$t$,
  $j$[{"label": "Notes de version de ChatGPT", "url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$gemini-3-8-live$t$, $t$gemini$t$, $t$Nouveau modèle$t$,
  $t$Gemini Live passe à un nouveau modèle de conversation.$t$,
  '2026-09-15',
  $t$Google lance Gemini 3.8 Live et Gemini 3.8 Live Extended Thinking, ses modèles de conversation à voix haute. La version Extended Thinking arrive dans Gemini Live. Elle reconnaît 97 langues et passe de l'une à l'autre en cours de conversation.$t$,
  $t$Parler à Gemini devient plus naturel, y compris quand on mélange deux langues dans la même conversation.$t$,
  $t$Rien à installer : ouvrez Gemini Live dans l'application et parlez. L'annonce ne donne pas la liste des 97 langues : essayez dans la vôtre.$t$,
  $j$["Google les présente comme ses modèles de dialogue en direct les plus avancés.", "Le changement de langue est détecté automatiquement, parmi 97 langues.", "Dans Docs, Gmail et Keep, la fonction est réservée aux abonnés Google AI."]$j$::jsonb,
  $t$Dans Gemini Live depuis le 15 septembre 2026. L'annonce ne précise ni les limites d'un compte sans abonnement, ni les pays.$t$,
  $j$[{"label": "Google : Gemini 3.8 Live et 3.8 Live Extended Thinking", "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/"}]$j$::jsonb,
  $j${"type": "image", "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_3-8_live___keyword__blog-social.width-1300.png", "alt": "Visuel officiel de Google pour Gemini 3.8 Live.", "credit": "Image : Google"}$j$::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$claude-marketplace$t$, $t$claude$t$, $t$Nouvelle fonction$t$,
  $t$Anthropic ouvre le Claude Marketplace.$t$,
  '2026-09-23',
  $t$Le Claude Marketplace réunit au même endroit les plugins et les connecteurs de Claude, des agents et des produits d'autres sociétés, et des prestataires de services. Plus de 2 000 connecteurs et plugins y sont disponibles au lancement.$t$,
  $t$Un seul endroit pour trouver un connecteur, par exemple pour relier Claude à Google ou à Notion.$t$,
  $t$Rien d'obligatoire. Si une tâche vous demande un connecteur, c'est là qu'il se trouve.$t$,
  $j$["Plus de 2 000 connecteurs et plugins au lancement, dont ceux d'Atlassian, Google, Microsoft, Notion et Salesforce.", "On y trouve aussi des agents et des produits vendus par d'autres sociétés.", "L'annonce s'adresse d'abord aux équipes et aux entreprises."]$j$::jsonb,
  $t$En ligne depuis le 23 septembre 2026. L'annonce ne précise pas les offres concernées.$t$,
  $j$[{"label": "Anthropic : Claude Marketplace", "url": "https://claude.com/blog/claude-marketplace"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$chatgpt-privacy-center$t$, $t$chatgpt$t$, $t$Nouvelle fonction$t$,
  $t$ChatGPT réunit ses réglages de confidentialité au même endroit.$t$,
  '2026-09-21',
  $t$OpenAI ouvre un « Privacy Center » dans ChatGPT : un endroit unique pour comprendre vos options de confidentialité et retrouver les réglages qui les commandent. Il couvre la mémoire, la personnalisation, l'usage de vos données, les applications connectées et la sécurité du compte.$t$,
  $t$Vous voyez au même endroit ce que ChatGPT garde de vous, et comment le changer.$t$,
  $t$Sur Android : ouvrez Paramètres, puis Privacy center. Prenez deux minutes pour vérifier la mémoire et l'usage de vos conversations. S'il n'apparaît pas, il n'est pas encore arrivé sur votre compte.$t$,
  $j$["Sur le web : menu du compte, Help, puis Privacy center.", "Les réglages eux-mêmes restent dans les Paramètres de ChatGPT.", "Les options proposées dépendent de votre offre et de votre région."]$j$::jsonb,
  $t$Déploiement en cours pour les comptes Free, Go, Plus, Pro et Business, depuis le 21 septembre 2026. Les offres Enterprise, Edu et Healthcare ne sont pas concernées.$t$,
  $j$[{"label": "Notes de version de ChatGPT", "url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}, {"label": "OpenAI : le Privacy Center de ChatGPT", "url": "https://help.openai.com/articles/20001488"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$gemini-guided-vision$t$, $t$gemini$t$, $t$Nouvelle fonction$t$,
  $t$Gemini Live décrit ce que voit la caméra, pour les personnes aveugles ou malvoyantes.$t$,
  '2026-10-01',
  $t$Avec « Guided Vision », Gemini Live donne une aide visuelle en temps réel par la caméra du téléphone : lire de petits caractères, reconnaître un objet, décrire ce qui vous entoure. La fonction a été conçue avec des personnes aveugles et malvoyantes.$t$,
  $t$Une aide utile pour un proche, un collègue ou un client qui voit mal, sur un téléphone Android courant.$t$,
  $t$Dans l'application Gemini, ouvrez les paramètres de votre profil et activez « Use Guided Vision in Live ».$t$,
  $j$["Disponible sur les téléphones Android 9 et plus, là où Gemini Live est proposé.", "On peut aussi l'ouvrir par les réglages d'accessibilité d'Android, ou par le menu de TalkBack.", "Google prévient que la fonction peut se tromper : ce n'est ni un dispositif médical, ni une aide à la mobilité, et elle ne remplace pas la canne blanche."]$j$::jsonb,
  $t$Depuis le 1er octobre 2026, sur Android 9 et plus, dans les régions et les langues où Gemini Live existe. L'annonce ne parle ni de prix ni d'abonnement.$t$,
  $j$[{"label": "Google : Guided Vision dans Gemini Live", "url": "https://blog.google/innovation-and-ai/products/gemini-app/guided-vision-gemini-live/"}]$j$::jsonb,
  $j${"type": "image", "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GuidedVision_hero.width-1300.png", "alt": "Visuel officiel de Google pour Guided Vision.", "credit": "Image : Google"}$j$::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$claude-projets-repenses$t$, $t$claude$t$, $t$À savoir$t$,
  $t$Claude repense les projets : plusieurs travaux menés en parallèle.$t$,
  '2026-09-17',
  $t$Dans un projet nouvelle version, vous décrivez ce qu'il faut faire : Claude répartit le travail, mène plusieurs fils en parallèle, relit les résultats et assemble le tout. Vous pouvez suivre l'avancement depuis votre téléphone.$t$,
  $t$Rien ne change pour votre projet AIW : Anthropic précise que les projets existants continuent de fonctionner comme aujourd'hui.$t$,
  $t$Rien à faire. La nouveauté est en bêta, pour des abonnés payants seulement.$t$,
  $j$["En bêta pour une sélection d'abonnés Pro et Max qui utilisent les sessions cloud de Claude Code.", "L'accès doit s'élargir à d'autres abonnés de ces offres, puis au reste de Claude.", "L'offre gratuite n'est pas citée dans l'annonce."]$j$::jsonb,
  $t$Bêta ouverte le 17 septembre 2026 à une sélection d'abonnés Pro et Max. Une liste d'attente existe pour ces offres.$t$,
  $j$[{"label": "Anthropic : les projets repensés", "url": "https://claude.com/blog/projects-redesigned"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$chatgpt-images-2-5$t$, $t$chatgpt$t$, $t$Nouvelle fonction$t$,
  $t$ChatGPT Images 2.5 : des images plus nettes, des retouches plus précises.$t$,
  '2026-09-08',
  $t$OpenAI met à jour la création d'images de ChatGPT : des détails plus nets, une création plus rapide et une retouche qui ne change que ce que vous demandez. S'y ajoutent des modèles prêts à l'emploi, comme l'affiche, et le croquis : vous dessinez votre idée, ChatGPT en fait une image.$t$,
  $t$Pour une affiche, un visuel de publication ou une photo de produit à retoucher, le résultat demande moins d'essais.$t$,
  $t$Ouvrez Images, choisissez un modèle ou décrivez votre visuel. Pour une retouche, dites précisément ce qui doit changer, et rien d'autre.$t$,
  $j$["OpenAI annonce une création d'images jusqu'à 50 % plus rapide.", "Les modèles (Templates) se personnalisent : affiche, produit dérivé, et d'autres.", "Les limites de création d'images de chaque offre ne changent pas."]$j$::jsonb,
  $t$Depuis le 8 septembre 2026, pour toutes les offres, sur ordinateur, mobile et web. Avec une offre gratuite, la création d'images reste limitée.$t$,
  $j$[{"label": "OpenAI : ChatGPT Images 2.5", "url": "https://openai.com/index/introducing-chatgpt-images-2-5/"}, {"label": "Notes de version de ChatGPT", "url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"}]$j$::jsonb,
  $j${"type": "image", "src": "https://images.ctfassets.net/kftzwdyauwt9/6J668sj93QnQ8PWP7epUDv/3dbd2d2350053d96b03477d0fdb2e2c6/images2point5_16-9c.png?w=1600&h=900&fit=fill", "alt": "Visuel officiel d'OpenAI pour ChatGPT Images 2.5.", "credit": "Image : OpenAI"}$j$::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$gemini-notebook-outils-d-etude$t$, $t$gemini$t$, $t$Nouvelle fonction$t$,
  $t$Gemini Notebook ajoute des quiz et des synthèses pour apprendre.$t$,
  '2026-09-15',
  $t$Gemini Notebook, l'outil de Google pour travailler à partir de vos propres documents, reçoit de nouveaux outils d'étude : des synthèses interactives, de nouveaux formats de quiz et de courtes vidéos de résumé dans plus de 80 langues.$t$,
  $t$Vous pouvez transformer un cours, un rapport ou un manuel en quiz pour vérifier ce que vous avez retenu.$t$,
  $t$Ajoutez votre document dans Gemini Notebook, puis demandez un quiz ou une synthèse. Comme toujours, vérifiez avec le document d'origine.$t$,
  $j$["Nouveaux formats de quiz : réponse courte, choix multiples, texte à trous, annoncés pour tous les utilisateurs.", "Les synthèses interactives réunissent résumés, quiz et fiches.", "L'enregistreur audio ne fonctionne que si la langue de sortie est l'anglais.", "La conversation à voix haute avec ses documents est réservée, pour l'instant, à l'abonnement Google AI Ultra."]$j$::jsonb,
  $t$Annoncé le 15 septembre 2026. Les quiz et les synthèses arrivent pour tous les utilisateurs dans les semaines qui suivent ; d'autres fonctions sont limitées par la langue ou par l'abonnement.$t$,
  $j$[{"label": "Google : nouveaux outils d'étude dans Gemini Notebook", "url": "https://blog.google/innovation-and-ai/products/gemini-notebook/new-study-tools-september-2026/"}]$j$::jsonb,
  $j${"type": "image", "src": "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_Notebook_BTS.width-1300.png", "alt": "Visuel officiel de Google pour Gemini Notebook.", "credit": "Image : Google"}$j$::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

insert into mises_a_jour_ia (slug, ia, genre, titre, annonce_le, resume, impact, action, points, disponibilite, sources, media, revu_le)
values (
  $t$claude-petites-entreprises$t$, $t$claude$t$, $t$À savoir$t$,
  $t$Claude étoffe son offre pour les petites entreprises.$t$,
  '2026-09-15',
  $t$Anthropic ajoute des méthodes de travail toutes faites à « Claude for Small Business » : trouver des clients, répondre aux demandes, écrire une proposition. L'offre compte 43 méthodes et 27 nouvelles connexions, dont Shopify, TikTok, Stripe et Zoom.$t$,
  $t$Rien pour un compte gratuit : l'offre demande un abonnement payant à Claude, et fonctionne dans l'application d'ordinateur.$t$,
  $t$Rien à faire avec une offre gratuite. Votre kit AIW couvre les mêmes besoins avec une IA gratuite : prospecter, répondre, proposer.$t$,
  $j$["43 méthodes de travail au total, étendues à la recherche de clients et aux propositions.", "27 nouvelles connexions, dont Shopify, Salesforce, TikTok, Zoom, Stripe et Zapier.", "Des ateliers gratuits sont annoncés, mais dans dix villes des États-Unis seulement."]$j$::jsonb,
  $t$Depuis le 15 septembre 2026, sur toutes les offres payantes de Claude, dans l'application d'ordinateur Claude Cowork. Anthropic recommande l'offre Team à partir de deux personnes.$t$,
  $j$[{"label": "Anthropic : Claude for Small Business", "url": "https://claude.com/blog/claude-for-small-business-launches-new-workflows-integrations-and-training-programs"}]$j$::jsonb,
  null::jsonb,
  '2026-10-05'
)
on conflict (slug) do update set
  ia = excluded.ia, genre = excluded.genre, titre = excluded.titre, annonce_le = excluded.annonce_le,
  resume = excluded.resume, impact = excluded.impact, action = excluded.action, points = excluded.points,
  disponibilite = excluded.disponibilite, sources = excluded.sources, media = excluded.media, revu_le = excluded.revu_le;

-- 6. Les publications : ce qui paraît, et quand
-- La tâche de la semaine, chaque lundi.
insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
select 'tache', t.id::text, $t$Répondre en public à un avis négatif$t$, $t$Deux réponses publiques à un avis négatif, une courte et une plus complète, et un message privé pour régler le problème.$t$, '2026-10-05T05:00:00Z', true
  from taches t where t.code = $t$F57$t$ and t.du_fil
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
select 'tache', t.id::text, $t$Préparer son entretien annuel d'évaluation$t$, $t$Une page à apporter à l'entretien : vos résultats de l'année appuyés sur des faits, vos difficultés dites sans vous plaindre, et deux ou trois demandes claires.$t$, '2026-10-12T05:00:00Z', true
  from taches t where t.code = $t$F58$t$ and t.du_fil
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
select 'tache', t.id::text, $t$Reprendre contact avec un ancien client$t$, $t$Trois messages courts pour reprendre contact avec un client qui n'a plus commandé : un message de nouvelles, une proposition précise, puis une seule relance, une semaine plus tard.$t$, '2026-10-19T05:00:00Z', true
  from taches t where t.code = $t$F59$t$ and t.du_fil
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
select 'tache', t.id::text, $t$Transformer des messages vocaux en compte rendu écrit$t$, $t$Un compte rendu court à partir de messages vocaux : ce qui a été dit, ce qui est décidé, qui fait quoi et pour quand.$t$, '2026-10-26T05:00:00Z', true
  from taches t where t.code = $t$F60$t$ and t.du_fil
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

-- Le pack du mois.
insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('pack', $t$ventes-de-fin-d-annee$t$, $t$Préparer ses ventes de fin d'année$t$, $t$Cinq tâches pour arriver prêt en décembre : prévoir le stock, fixer les offres sans vendre à perte, planifier les publications, écrire les messages de vœux et faire le bilan de l'année.$t$, '2026-10-05T04:30:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

-- Les actualités des IA, trois par jeudi.
insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$gemini-skills-remplacent-les-gems$t$, $t$Dans Gemini, les skills remplacent les Gems.$t$, $t$Google ajoute les « skills » à Gemini : des instructions que vous enregistrez une fois, et que Gemini relance quand votre demande s'y prête. Elles remplacent les Gems, qui disparaissent en novembre 2026 pour les comptes Google personnels. Google annonce que vos Gems seront convertis en skills automatiquement.$t$, '2026-10-08T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$claude-sonnet-5-5$t$, $t$Claude Sonnet 5.5 est disponible.$t$, $t$Anthropic lance Sonnet 5.5, le deuxième modèle de la famille Claude 5.5. Il est annoncé plus de 30 % plus rapide que Sonnet 5, et jusqu'à 30 % moins coûteux à faire tourner. Anthropic le présente comme le plus à l'aise sur les tâches courantes bien cadrées, les documents, les présentations et les tableaux.$t$, '2026-10-08T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$chatgpt-cartes-memoire$t$, $t$ChatGPT crée des cartes mémoire pour réviser.$t$, $t$Vous pouvez demander à ChatGPT des cartes mémoire sur un sujet, ou lui envoyer vos notes pour qu'il les transforme en cartes. Vous touchez une carte pour la retourner, vous cochez ce que vous savez, et vous revoyez le reste plus tard.$t$, '2026-10-08T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$chatgpt-voix-et-plugins$t$, $t$Le mode vocal de ChatGPT utilise vos plugins.$t$, $t$Quand vous parlez à ChatGPT, il peut maintenant se servir des plugins et des applications connectées à votre compte, sur le web, sur iPhone et sur Android. Vous suivez ses réponses à l'écrit dans la conversation.$t$, '2026-10-15T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$gemini-3-8-live$t$, $t$Gemini Live passe à un nouveau modèle de conversation.$t$, $t$Google lance Gemini 3.8 Live et Gemini 3.8 Live Extended Thinking, ses modèles de conversation à voix haute. La version Extended Thinking arrive dans Gemini Live. Elle reconnaît 97 langues et passe de l'une à l'autre en cours de conversation.$t$, '2026-10-15T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$claude-marketplace$t$, $t$Anthropic ouvre le Claude Marketplace.$t$, $t$Le Claude Marketplace réunit au même endroit les plugins et les connecteurs de Claude, des agents et des produits d'autres sociétés, et des prestataires de services. Plus de 2 000 connecteurs et plugins y sont disponibles au lancement.$t$, '2026-10-15T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$chatgpt-privacy-center$t$, $t$ChatGPT réunit ses réglages de confidentialité au même endroit.$t$, $t$OpenAI ouvre un « Privacy Center » dans ChatGPT : un endroit unique pour comprendre vos options de confidentialité et retrouver les réglages qui les commandent. Il couvre la mémoire, la personnalisation, l'usage de vos données, les applications connectées et la sécurité du compte.$t$, '2026-10-22T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$gemini-guided-vision$t$, $t$Gemini Live décrit ce que voit la caméra, pour les personnes aveugles ou malvoyantes.$t$, $t$Avec « Guided Vision », Gemini Live donne une aide visuelle en temps réel par la caméra du téléphone : lire de petits caractères, reconnaître un objet, décrire ce qui vous entoure. La fonction a été conçue avec des personnes aveugles et malvoyantes.$t$, '2026-10-22T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$claude-projets-repenses$t$, $t$Claude repense les projets : plusieurs travaux menés en parallèle.$t$, $t$Dans un projet nouvelle version, vous décrivez ce qu'il faut faire : Claude répartit le travail, mène plusieurs fils en parallèle, relit les résultats et assemble le tout. Vous pouvez suivre l'avancement depuis votre téléphone.$t$, '2026-10-22T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$chatgpt-images-2-5$t$, $t$ChatGPT Images 2.5 : des images plus nettes, des retouches plus précises.$t$, $t$OpenAI met à jour la création d'images de ChatGPT : des détails plus nets, une création plus rapide et une retouche qui ne change que ce que vous demandez. S'y ajoutent des modèles prêts à l'emploi, comme l'affiche, et le croquis : vous dessinez votre idée, ChatGPT en fait une image.$t$, '2026-10-29T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$gemini-notebook-outils-d-etude$t$, $t$Gemini Notebook ajoute des quiz et des synthèses pour apprendre.$t$, $t$Gemini Notebook, l'outil de Google pour travailler à partir de vos propres documents, reçoit de nouveaux outils d'étude : des synthèses interactives, de nouveaux formats de quiz et de courtes vidéos de résumé dans plus de 80 langues.$t$, '2026-10-29T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

insert into publications (type, ref_id, titre, resume, publie_le, reserve_abonnes)
values ('mise_a_jour', $t$claude-petites-entreprises$t$, $t$Claude étoffe son offre pour les petites entreprises.$t$, $t$Anthropic ajoute des méthodes de travail toutes faites à « Claude for Small Business » : trouver des clients, répondre aux demandes, écrire une proposition. L'offre compte 43 méthodes et 27 nouvelles connexions, dont Shopify, TikTok, Stripe et Zoom.$t$, '2026-10-29T05:00:00Z', true)
on conflict (type, ref_id) do update set
  titre = excluded.titre, resume = excluded.resume, publie_le = excluded.publie_le, reserve_abonnes = excluded.reserve_abonnes;

-- Contrôle : tout ce qui est annoncé en tête de fichier est en base.
do $controle$
declare
  n integer;
begin
  -- Chaque tâche est du fil, hors de tout métier, avec son cas et son modèle.
  select count(*) into n from taches t where t.code in ($t$F57$t$, $t$F58$t$, $t$F59$t$, $t$F60$t$, $t$F61$t$, $t$F62$t$, $t$F63$t$, $t$F64$t$, $t$F65$t$)
    and t.du_fil and t.resultat is not null and t.etapes is not null
    and not exists (select 1 from metiers_taches mt where mt.tache_id = t.id)
    and (select count(*) from exercices e where e.tache_id = t.id and e.reponse_attendue is not null) = 1
    and exists (select 1 from modeles_prompts mp where mp.tache_id = t.id and mp.exemple_cas = 1);
  if n <> 9 then
    raise exception 'Tâches du fil complètes attendues : 9, trouvées : %', n;
  end if;
  select count(*) into n from taches t where t.code in ($t$F57$t$, $t$F58$t$, $t$F59$t$, $t$F60$t$, $t$F61$t$, $t$F62$t$, $t$F63$t$, $t$F64$t$, $t$F65$t$);
  if n <> 9 then
    raise exception 'Un code de tâche est en double : % lignes pour 9 codes', n;
  end if;
  select count(*) into n from champs_modele cm join modeles_prompts mp on mp.id = cm.modele_id join taches t on t.id = mp.tache_id
    where t.code in ($t$F57$t$, $t$F58$t$, $t$F59$t$, $t$F60$t$, $t$F61$t$, $t$F62$t$, $t$F63$t$, $t$F64$t$, $t$F65$t$);
  if n <> 45 then
    raise exception 'Champs des modèles attendus : 45, trouvés : %', n;
  end if;
  select count(*) into n from conseils_ia ci join modeles_prompts mp on mp.id = ci.modele_id join taches t on t.id = mp.tache_id
    where t.code in ($t$F57$t$, $t$F58$t$, $t$F59$t$, $t$F60$t$, $t$F61$t$, $t$F62$t$, $t$F63$t$, $t$F64$t$, $t$F65$t$);
  if n <> 45 then
    raise exception 'Notes par IA attendues : 45, trouvées : %', n;
  end if;
  select count(*) into n from packs_taches pt join packs pk on pk.id = pt.pack_id where pk.slug = $t$ventes-de-fin-d-annee$t$;
  if n <> 5 then
    raise exception 'Tâches du pack attendues : 5, trouvées : %', n;
  end if;
  select count(*) into n from mises_a_jour_ia where slug in ($t$gemini-skills-remplacent-les-gems$t$, $t$claude-sonnet-5-5$t$, $t$chatgpt-cartes-memoire$t$, $t$chatgpt-voix-et-plugins$t$, $t$gemini-3-8-live$t$, $t$claude-marketplace$t$, $t$chatgpt-privacy-center$t$, $t$gemini-guided-vision$t$, $t$claude-projets-repenses$t$, $t$chatgpt-images-2-5$t$, $t$gemini-notebook-outils-d-etude$t$, $t$claude-petites-entreprises$t$);
  if n <> 12 then
    raise exception 'Actualités attendues : 12, trouvées : %', n;
  end if;
  -- Chaque publication désigne quelque chose qui existe.
  select count(*) into n from publications pu join taches t on t.id::text = pu.ref_id
    where pu.type = 'tache' and pu.reserve_abonnes and t.code in ($t$F57$t$, $t$F58$t$, $t$F59$t$, $t$F60$t$);
  if n <> 4 then
    raise exception 'Tâches de la semaine publiées attendues : 4, trouvées : %', n;
  end if;
  select count(*) into n from publications pu join packs pk on pk.slug = pu.ref_id
    where pu.type = 'pack' and pu.reserve_abonnes and pk.slug = $t$ventes-de-fin-d-annee$t$;
  if n <> 1 then
    raise exception 'Publication du pack attendue : 1, trouvée : %', n;
  end if;
  select count(*) into n from publications pu join mises_a_jour_ia mj on mj.slug = pu.ref_id
    where pu.type = 'mise_a_jour' and pu.reserve_abonnes and mj.slug in ($t$gemini-skills-remplacent-les-gems$t$, $t$claude-sonnet-5-5$t$, $t$chatgpt-cartes-memoire$t$, $t$chatgpt-voix-et-plugins$t$, $t$gemini-3-8-live$t$, $t$claude-marketplace$t$, $t$chatgpt-privacy-center$t$, $t$gemini-guided-vision$t$, $t$claude-projets-repenses$t$, $t$chatgpt-images-2-5$t$, $t$gemini-notebook-outils-d-etude$t$, $t$claude-petites-entreprises$t$);
  if n <> 12 then
    raise exception 'Actualités publiées attendues : 12, trouvées : %', n;
  end if;
  -- Une tâche du fil sans publication ni pack ne s'ouvrirait jamais.
  select count(*) into n from taches t where t.du_fil
    and not exists (select 1 from publications pu where pu.type = 'tache' and pu.ref_id = t.id::text)
    and not exists (select 1 from packs_taches pt where pt.tache_id = t.id);
  if n <> 0 then
    raise exception 'Tâches du fil sans publication ni pack : %', n;
  end if;
end
$controle$;

commit;
