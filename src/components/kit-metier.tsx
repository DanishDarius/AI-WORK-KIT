"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api, chemins, type IA, iaLabels, type InstallationOutil, type KitMetier, type KitReponse, type RessourceKit, tacheHref, type TypeRessource } from "@/lib/kit-api";
import { copierTexte } from "@/lib/presse-papiers";
import { Icon, type IconName } from "./icon";
import { Bar, Chip, IconBox, Kicker, PageHead } from "./ui";

// Mon kit, pour un métier qui a un kit : la configuration de l'IA, les
// skills, les documents et les routines, à installer en quelques étapes.
// Ce que le client coche est enregistré sur son compte.

const TYPE: Record<TypeRessource, { nom: string; icone: IconName }> = {
  configuration: { nom: "Configuration", icone: "settings" },
  skill: { nom: "Skill", icone: "wand" },
  document: { nom: "Document", icone: "sheet" },
  routine: { nom: "Routine", icone: "calendar" },
};

const dateLisible = (iso: string | null) => {
  if (!iso) return null;
  const date = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
};

/** Une skill s'écrit « nom, description, instructions » : on sépare les trois. */
function partiesSkill(contenu: string) {
  const m = contenu.match(/^---\n([\s\S]*?)\n---\n+([\s\S]*)$/);
  if (!m) return null;
  const nom = m[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = m[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (!nom || !description) return null;
  return { nom, description, instructions: m[2].trim() };
}

function BoutonCopier({ texte, libelle, principal }: { texte: string; libelle: string; principal?: boolean }) {
  const [etat, setEtat] = useState<"" | "ok" | "echec">("");
  return (
    <button
      type="button"
      className={`btn btn-sm btn-plain${principal ? "" : " btn-secondary"}`}
      onClick={async () => {
        setEtat((await copierTexte(texte)) ? "ok" : "echec");
        window.setTimeout(() => setEtat(""), 2000);
      }}
    >
      <Icon name={etat === "ok" ? "check" : "copy"} size={16} />
      {etat === "ok" ? "Copié !" : etat === "echec" ? "Copie impossible" : libelle}
    </button>
  );
}

const styleTexte = { margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "var(--font-mono)", fontSize: 13.5, lineHeight: 1.6, background: "var(--bg)", borderRadius: 14, padding: 14, maxHeight: 320, overflow: "auto" } as const;

function Contenu({ ressource }: { ressource: RessourceKit }) {
  const { contenu, type } = ressource;
  if (!contenu) return null;
  if (type === "document")
    return (
      <ul className="steps" style={{ listStyle: "disc" }}>
        {contenu.split("\n").filter(Boolean).map((ligne, i) => <li key={i}>{ligne}</li>)}
      </ul>
    );
  const skill = type === "skill" ? partiesSkill(contenu) : null;
  if (skill)
    return (
      <div className="stack">
        <div className="stack-sm">
          <span className="field-label">Nom</span>
          <div className="row"><code className="grow">{skill.nom}</code><BoutonCopier texte={skill.nom} libelle="Copier le nom" /></div>
        </div>
        <div className="stack-sm">
          <span className="field-label">Description</span>
          <p className="small">{skill.description}</p>
          <div className="row"><BoutonCopier texte={skill.description} libelle="Copier la description" /></div>
        </div>
        <div className="stack-sm">
          <span className="field-label">Instructions</span>
          <pre style={styleTexte}>{skill.instructions}</pre>
          <div className="row"><BoutonCopier texte={skill.instructions} libelle="Copier les instructions" principal /></div>
        </div>
      </div>
    );
  return (
    <div className="stack-sm">
      <pre style={styleTexte}>{contenu}</pre>
      <div className="row"><BoutonCopier texte={contenu} libelle="Copier le texte" principal /></div>
    </div>
  );
}

function Installation({ installation, ia }: { installation: InstallationOutil | undefined; ia: IA | null }) {
  if (!installation) return null;
  return (
    <div className="stack-sm">
      <Kicker>{ia ? `Comment faire avec ${iaLabels[ia]}` : "Comment faire"}</Kicker>
      {installation.etapes?.length ? (
        <ol className="steps">
          {installation.etapes.map((etape, i) => <li key={i}>{etape}</li>)}
        </ol>
      ) : null}
      {installation.gratuit && <p className="small"><b>Avec un compte gratuit.</b> {installation.gratuit}</p>}
      {installation.telephone && <p className="small"><b>Sur téléphone.</b> {installation.telephone}</p>}
      {installation.notes?.map((note, i) => <p key={i} className="small muted">{note}</p>)}
    </div>
  );
}

function Ressource({ ressource, ia, slug, explication, basculer }: { ressource: RessourceKit; ia: IA; slug: string; explication?: string; basculer: (r: RessourceKit) => void }) {
  const type = TYPE[ressource.type];
  const propre = ressource.installation[ia];
  const installation = propre ?? ressource.installation.tous;
  return (
    <div id={ressource.cle} className="list-row" style={{ display: "block", scrollMarginTop: 90 }}>
      <div className="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
        <button
          type="button"
          className={`check-dot${ressource.installee ? "" : " is-empty"}`}
          aria-pressed={ressource.installee}
          aria-label={`${ressource.installee ? "Installé" : "Marquer comme installé"} : ${ressource.titre}`}
          onClick={() => basculer(ressource)}
          style={{ width: 32, height: 32, border: ressource.installee ? 0 : undefined, cursor: "pointer" }}
        >
          {ressource.installee && <Icon name="check" size={16} strokeWidth={3} />}
        </button>
        <IconBox name={type.icone} size="sm" />
        <div className="grow stack-sm" style={{ gap: 2 }}>
          <span className="title">{ressource.titre}</span>
          <span className="tiny muted">{type.nom}{ressource.outil ? ` pour ${iaLabels[ressource.outil]}` : ""}</span>
        </div>
      </div>

      <div className="stack-sm" style={{ marginTop: 10 }}>
        {explication && <p className="tiny muted">{type.nom} : {explication}</p>}
        {ressource.description && <p className="small">{ressource.description}</p>}

        {(ressource.lien_copie || ressource.fichier || ressource.video_url) && (
          <div className="row">
            {ressource.lien_copie && (
              <a className="btn btn-sm btn-plain" href={ressource.lien_copie} target="_blank" rel="noreferrer"><Icon name="external" size={16} /> Faire une copie</a>
            )}
            {ressource.fichier && (
              <a className="btn btn-secondary btn-sm btn-plain" href={`/api/kits/fichiers/${encodeURIComponent(ressource.fichier)}`} download><Icon name="download" size={16} /> Télécharger</a>
            )}
            {ressource.video_url && (
              <a className="btn btn-secondary btn-sm btn-plain" href={ressource.video_url} target="_blank" rel="noreferrer"><Icon name="video" size={16} /> Voir la vidéo</a>
            )}
          </div>
        )}

        <details>
          <summary className="link" style={{ cursor: "pointer" }}>{ressource.type === "document" ? "Mode d’emploi" : "Voir le texte et l’installer"}</summary>
          <div className="stack" style={{ marginTop: 10 }}>
            <Contenu ressource={ressource} />
            <Installation installation={installation} ia={propre ? ia : null} />
          </div>
        </details>

        {ressource.taches.length > 3 ? (
          <p className="tiny muted">Sert à {ressource.taches.length} tâches du kit.</p>
        ) : ressource.taches.length > 0 ? (
          <p className="tiny muted">
            Sert {ressource.taches.length > 1 ? "aux tâches" : "à la tâche"} :{" "}
            {ressource.taches.map((t, i) => (
              <span key={t.id}>{i > 0 && ", "}<Link href={tacheHref(t.id, slug)}>{t.titre}</Link></span>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function KitMetierEcran({ slug, data, setData }: { slug: string; data: KitReponse & { kit: KitMetier }; setData: (maj: (precedent: KitReponse) => KitReponse) => void }) {
  const { kit } = data;
  const [choix, setChoix] = useState<IA | null>(null);
  const [erreur, setErreur] = useState("");
  const verrous = useRef(new Set<string>());
  const ia: IA = choix ?? data.chemin_choisi ?? "chatgpt";

  // Arrivée depuis une tâche (« /kit#cle ») : on ouvre la ressource visée.
  useEffect(() => {
    const cle = decodeURIComponent(window.location.hash.slice(1));
    if (!cle) return;
    const cible = document.getElementById(cle);
    if (!cible) return;
    cible.querySelector("details")?.setAttribute("open", "");
    cible.scrollIntoView({ block: "start" });
  }, [ia]);

  const ressources = kit.ressources.filter((r) => !r.outil || r.outil === ia);
  const installees = ressources.filter((r) => r.installee).length;
  const pct = ressources.length ? Math.round((installees / ressources.length) * 100) : 0;
  const plusTard = ressources.filter((r) => r.etape === null);
  const revu = dateLisible(kit.revu_le);
  // Chaque mot technique est expliqué la première fois qu'il apparaît.
  const explications = new Map<string, string>();
  for (const r of ressources) {
    if ([...explications.values()].includes(r.type)) continue;
    explications.set(r.id, r.type);
  }
  const explication = (r: RessourceKit) => {
    if (!explications.has(r.id)) return undefined;
    const phrase = kit.mots.find((m) => m.mot === TYPE[r.type].nom)?.phrase;
    return phrase ? phrase.charAt(0).toLowerCase() + phrase.slice(1) : undefined;
  };

  function marquer(id: string, installee: boolean) {
    setData((precedent) =>
      precedent.kit
        ? { ...precedent, kit: { ...precedent.kit, ressources: precedent.kit.ressources.map((r) => (r.id === id ? { ...r, installee } : r)) } }
        : precedent,
    );
  }

  async function basculer(ressource: RessourceKit) {
    if (verrous.current.has(ressource.id)) return;
    verrous.current.add(ressource.id);
    const voulu = !ressource.installee;
    marquer(ressource.id, voulu);
    setErreur("");
    try {
      const r = await api<{ ok: boolean; fait?: boolean }>(`/api/kits/ressources/${encodeURIComponent(ressource.id)}/installee`, { method: "POST", body: JSON.stringify({ fait: voulu }) });
      if (!r.ok || r.fait !== voulu) throw new Error("L’enregistrement n’a pas été confirmé. Réessayez.");
    } catch (e) {
      marquer(ressource.id, !voulu);
      setErreur(e instanceof Error ? e.message : "L’enregistrement a échoué.");
    } finally {
      verrous.current.delete(ressource.id);
    }
  }

  return (
    <>
      <PageHead kicker="Votre boîte à outils" title={`Mon kit : ${kit.titre}`}>{kit.presentation}</PageHead>

      <section className="card row" style={{ gap: 20 }}>
        <div aria-hidden="true" style={{ width: 88, height: 88, borderRadius: "50%", background: `conic-gradient(var(--green) 0 ${pct}%, #e6ecea ${pct}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <span style={{ width: 66, height: 66, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} className="strong">{pct} %</span>
        </div>
        <div className="grow stack-sm" style={{ minWidth: 220 }}>
          <h2 className="h2">Installer mon kit</h2>
          <p className="muted">{installees} ressource{installees > 1 ? "s" : ""} installée{installees > 1 ? "s" : ""} sur {ressources.length}. Cochez au fur et à mesure : c’est enregistré sur votre compte.</p>
          <Bar value={pct} thin label={`Kit installé à ${pct} %`} />
        </div>
      </section>

      <div className="seg" role="group" aria-label="Kit pour quelle IA">
        {chemins.map((c) => <button key={c} type="button" aria-pressed={ia === c} onClick={() => setChoix(c)}>{iaLabels[c]}</button>)}
      </div>

      {erreur && <p className="form-error" role="alert">{erreur}</p>}

      {kit.a_savoir[ia] && (
        <div className="notice" role="note">
          <span style={{ flex: "none", display: "inline-flex" }}><Icon name="help" size={20} /></span>
          <p><b>À savoir.</b> {kit.a_savoir[ia]}</p>
        </div>
      )}

      {kit.prerequis.length > 0 && (
        <details className="faq">
          <summary>Ce qu’il vous faut pour démarrer <Icon name="down" size={18} /></summary>
          <ul className="steps" style={{ listStyle: "disc", marginTop: 10 }}>
            {kit.prerequis.map((ligne, i) => <li key={i}>{ligne}</li>)}
          </ul>
          {kit.limites.length > 0 && (
            <>
              <p className="strong" style={{ color: "var(--ink)" }}>Ce que le kit ne fait pas</p>
              <ul className="steps" style={{ listStyle: "disc" }}>
                {kit.limites.map((ligne, i) => <li key={i}>{ligne}</li>)}
              </ul>
            </>
          )}
        </details>
      )}

      {kit.etapes.map((etape) => {
        const liste = ressources.filter((r) => r.etape === etape.numero);
        if (!liste.length) return null;
        const finie = liste.every((r) => r.installee);
        return (
          <section key={etape.numero} className="card stack" aria-labelledby={`kit-etape-${etape.numero}`}>
            <div className="row-between">
              <h2 id={`kit-etape-${etape.numero}`} className="h2">{etape.numero}. {etape.titre}</h2>
              {finie ? <Chip tone="green" icon="check">Fait</Chip> : etape.minutes ? <Chip icon="clock">environ {etape.minutes} min</Chip> : null}
            </div>
            <div>
              {liste.map((r) => <Ressource key={r.id} ressource={r} ia={ia} slug={slug} explication={explication(r)} basculer={basculer} />)}
            </div>
          </section>
        );
      })}

      {plusTard.length > 0 && (
        <section className="card stack" aria-labelledby="kit-plus-tard">
          <h2 id="kit-plus-tard" className="h2">Pour plus tard</h2>
          <p className="muted small">Ces ressources s’installent ensuite, au moment de la tâche qui s’en sert.</p>
          <div>
            {plusTard.map((r) => <Ressource key={r.id} ressource={r} ia={ia} slug={slug} explication={explication(r)} basculer={basculer} />)}
          </div>
        </section>
      )}

      {kit.mots.length > 0 && (
        <details className="faq">
          <summary>Les mots du kit, expliqués <Icon name="down" size={18} /></summary>
          <dl className="stack-sm" style={{ marginTop: 10 }}>
            {kit.mots.map((m) => (
              <div key={m.mot}>
                <dt className="strong">{m.mot}</dt>
                <dd className="small muted" style={{ margin: 0 }}>{m.phrase}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}

      {revu && <p className="tiny muted">Kit revu le {revu}. Les outils d’IA changent vite : chaque ressource est relue régulièrement.</p>}
    </>
  );
}
