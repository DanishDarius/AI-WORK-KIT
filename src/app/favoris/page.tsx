import { Back, Intro } from "@/components/kit-ui";
import { FavorisList } from "@/components/favoris-list";
import { SavedGuides } from "@/components/saved-guides";
import { getGuideSummaries } from "@/lib/guides";

export default function Favoris() {
  const guides = getGuideSummaries().map(({ slug, title, tool, duration }) => ({
    slug,
    title,
    tool,
    duration,
  }));
  return (
    <>
      <Back />
      <Intro eyebrow="Votre espace personnel" title="Mes favoris">
        Les tâches et les guides que vous voulez garder sous la main.
      </Intro>
      <div className="aw-personal">
        <h2 className="aw-personal-title">Tâches favorites</h2>
        <FavorisList />
        <SavedGuides guides={guides} />
      </div>
    </>
  );
}
