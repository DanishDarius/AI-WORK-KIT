import { Back, Intro } from "@/components/kit-ui";
import { FavorisList } from "@/components/favoris-list";

export default function Favoris() {
  return (
    <>
      <Back />
      <Intro eyebrow="Votre espace personnel" title="Mes favoris">
        Les tâches que vous utilisez souvent, à un clic.
      </Intro>
      <div className="aw-personal">
        <FavorisList />
      </div>
    </>
  );
}
