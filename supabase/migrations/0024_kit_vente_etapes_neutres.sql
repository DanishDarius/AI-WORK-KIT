-- 0024 : kit « Vente / Commercial », étapes neutres pour les tâches partagées
-- (4 octobre 2026)
--
-- Avant : les étapes de cinq tâches (F10, F17, F18, F21, F27) et la consigne
-- de F18 citaient par leur nom des documents du kit « Vente / Commercial ».
-- Ces tâches sont partagées avec d'autres métiers, dont le kit a d'autres
-- documents.
--
-- Après : ces textes parlent de « votre fichier clients », de « votre tableau
-- de suivi » ou de « votre modèle de devis ». Le bloc « Ce qu'il vous faut »
-- de chaque tâche montre le document du kit du métier d'où vient le client.
--
-- Ce fichier est fabriqué par un programme : ce sont les instructions de la
-- migration 0022 dont le texte change, régénérées à partir du fichier source
-- corrigé du kit. Aucune table créée, aucun droit modifié, aucun ancien cas
-- ni ancien prompt touché. Migration rejouable.

begin;

update taches set resultat = $t$Un fichier clients propre : les doublons repérés, les fiches à compléter, et chaque contact classé selon l'intérêt qu'il montre. Une base CRM est simplement votre fichier de clients et de prospects, tenu dans un tableau ou dans WhatsApp Business.$t$, etapes = $j$["Recopier vos contacts dans un tableau : une ligne par contact.", "Remplacer chaque nom par un code et retirer les numéros de téléphone.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque doublon avant de réunir deux fiches : l'IA propose, vous décidez.", "Reporter le classement dans votre fichier clients."]$j$::jsonb, precisions = $t$Ne collez jamais dans une IA le nom complet, le numéro ou l'adresse d'un client. Un code (C-012), le type de client et les dates suffisent pour ce travail.$t$
  where code = $t$F10$t$;

update taches set resultat = $t$Un premier message adapté à chaque prospect, la relance à envoyer s'il ne répond pas, et le dernier message qui clôt la démarche avec politesse. Un prospect est une personne ou une entreprise qui pourrait devenir cliente.$t$, etapes = $j$["Choisir quelques prospects et noter ce que vous savez de chacun : son activité, son besoin probable.", "Remplir le modèle et copier la consigne dans son IA.", "Adapter chaque message à votre façon de parler, puis l'envoyer à une heure convenable.", "Noter l'envoi dans votre fichier clients, avec la date de la relance.", "Relancer une fois, puis une dernière fois : jamais plus."]$j$::jsonb, precisions = $t$N'écrivez qu'à des personnes dont vous avez obtenu le contact de façon honnête : un client, une recommandation, une carte de visite, une page publique. Un prospect qui dit non ne se relance pas.$t$
  where code = $t$F17$t$;

update taches set resultat = $t$Une proposition commerciale complète : ce que le client demande, une ou deux formules chiffrées, le total, l'acompte, le délai et les conditions, avec le message d'envoi. Une proposition commerciale est un devis accompagné d'une courte explication de l'offre.$t$, etapes = $j$["Reformuler la demande du client en une phrase, et noter ce qu'il veut vraiment obtenir.", "Lister les lignes de chaque formule : désignation, quantité, prix à l'unité.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier chaque total, puis coller le texte dans votre modèle de devis ou de proposition.", "Envoyer en PDF, puis noter le devis dans votre tableau de suivi."]$j$::jsonb, precisions = $t$Ce modèle ne produit pas une facture normalisée. Dans plusieurs pays, dont le Bénin, la Côte d'Ivoire, le Niger et le Burkina Faso, la facture officielle passe par un dispositif de l'État. Pour une facture officielle, adressez-vous à votre comptable.$t$
  where code = $t$F18$t$;

update taches set resultat = $t$La liste de vos factures en retard, classées de la plus ancienne à la plus récente, le total qui reste à encaisser, et pour chacune le message de relance du bon niveau. Un impayé est une facture dont la date de paiement est passée.$t$, etapes = $j$["Relever les factures dont l'échéance est passée : le montant, ce qui est déjà payé, le nombre de jours de retard.", "Remplacer chaque nom par un code, puis remplir le modèle.", "Copier la consigne dans son IA, puis vérifier le total avec votre tableau.", "Envoyer chaque relance en privé, à une heure convenable, en ajoutant le prénom.", "Noter la relance dans votre tableau de suivi, avec la date promise par le client."]$j$::jsonb, precisions = $t$Ce modèle rédige des relances courtoises. Il ne donne aucun conseil sur un recouvrement en justice : pour une somme importante qui reste impayée, adressez-vous à votre responsable ou à un juriste.$t$
  where code = $t$F21$t$;

update taches set resultat = $t$Vos clients répartis en quelques groupes simples (les fidèles, ceux qui s'éloignent, les nouveaux, les acheteurs occasionnels), avec le critère de chaque groupe et le message qui lui convient. Un segment est un groupe de clients qui se ressemblent.$t$, etapes = $j$["Sortir de votre fichier, pour chaque client : la date du dernier achat, le nombre d'achats, le total acheté.", "Remplacer chaque nom par un code.", "Remplir le modèle et copier la consigne dans son IA.", "Vérifier que chaque client est dans un seul groupe, et que le critère est clair.", "Reporter le groupe dans votre fichier clients, puis écrire à un groupe à la fois."]$j$::jsonb, precisions = null
  where code = $t$F27$t$;

insert into modeles_prompts (tache_id, titre, gabarit, exemple_cas, avertissement, version, revu_le) select t.id, $t$Préparation de devis et propositions commerciales$t$, $t$Rôle : Vous rédigez des propositions commerciales claires, et vous vérifiez chaque calcul.

Contexte : Mon activité : {{activite}}. Le client et sa demande : {{demande}}. Mon offre, ligne par ligne, avec la quantité et le prix : {{offre}}. Les formules à proposer : {{formules}}. Mes conditions (acompte, délai, paiement, validité) : {{conditions}}.

Travail demandé :
1. La demande du client, reformulée en 2 lignes.
2. Chaque formule, ligne par ligne : désignation, quantité, prix à l'unité, total de la ligne.
3. Le total, l'acompte et le reste à payer de chaque formule, avec chaque calcul montré.
4. Les conditions en 4 lignes : délai, paiement, validité, ce qui est compris.
5. Un message de 3 lignes pour envoyer la proposition, avec une salutation.

Format : texte simple, sans astérisque, prêt à coller dans un document. Montants écrits ainsi : 25 000 FCFA.

Règle : utilisez seulement mes prix. S'il en manque un, demandez-le. Quand un prix vaut pour un lot (les 100, les 1 000), calculez à partir du lot et montrez le calcul. N'ajoutez ni taxe, ni remise, ni frais que je n'ai pas donnés. Cette proposition n'est pas une facture normalisée.$t$, 2, $t$Une IA peut se tromper dans un calcul. Vérifiez chaque total.$t$, 1, '2026-10-04' from taches t
  where t.code = $t$F18$t$
  on conflict (tache_id) do update set titre = excluded.titre, gabarit = excluded.gabarit, exemple_cas = excluded.exemple_cas, avertissement = excluded.avertissement, version = excluded.version, revu_le = excluded.revu_le;

commit;
