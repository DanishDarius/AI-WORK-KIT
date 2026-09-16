import { Icon } from "./kit-icons";

export function VideoGuide({
  kind,
  title,
  code,
}: {
  kind: "choose" | "intro" | "task";
  title?: string;
  code?: string;
}) {
  const meta =
    kind === "choose"
      ? {
          heading: "IA : laquelle choisir ?",
          title: "Trouvez votre point de départ.",
          description:
            "Comprendre ChatGPT, Claude et Gemini : fonctions, avantages et limites selon votre activité.",
          tags: ["ChatGPT", "Claude", "Gemini"],
        }
      : kind === "intro"
        ? {
            heading: "Les différentes manières d’utiliser l’IA",
            title: "De la première demande à l’automatisation.",
            description:
              "Génération, automatisation et agents IA : découvrez comment aborder votre parcours.",
            tags: ["Génération", "Automatisation", "Agents IA"],
          }
        : {
            heading: "Comment utiliser l’IA pour cette tâche",
            title,
            description:
              "Une démonstration pour comprendre la méthode avant de passer aux cas pratiques.",
            tags: ["Comprendre", "Pratiquer", "Vérifier"],
          };
  return (
    <section className="aw-video-section" aria-label={meta.heading}>
      <div className="aw-video-heading">
        <div>
          <div className="aw-eyebrow">
            <Icon name="video" /> Le guide vidéo
          </div>
          <h2>{meta.heading}</h2>
          <p>{meta.description}</p>
        </div>
      </div>
      <div className="aw-video-frame">
        <div className="aw-video-screen">
          <div className="aw-video-poster">
            <span className="aw-video-kicker">
              AI WORK KIT · {code || "Pour bien commencer"}
            </span>
            <span className="aw-video-play" aria-hidden="true">
              <Icon name="play" size={26} />
            </span>
            <strong>{meta.title}</strong>
            <div className="aw-video-tags">
              {meta.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="aw-video-note">
          <strong>Vidéo à venir</strong>
          <span>Vous pouvez déjà explorer le kit et pratiquer.</span>
        </div>
      </div>
    </section>
  );
}
