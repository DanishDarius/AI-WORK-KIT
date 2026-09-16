import { Back, Intro } from "@/components/kit-ui";
import { FavorisList } from "@/components/favoris-list";

export default function Favoris() {
  return (
    <>
      <Back />
      <Intro eyebrow="Votre espace personnel" title="Mes favoris">
        Vos tâches utiles, réunies au même endroit pour y revenir facilement.
      </Intro>
      <div className="aw-personal">
        <FavorisList />
      </div>
    </>
  );
}
