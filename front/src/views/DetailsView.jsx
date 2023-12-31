import { useParams } from "react-router";
import useAppContext from "../context/AppContext";

import Details from "../components/Details";
import LoadingSpinner from "../components/LoadingSpinner";

export const DetailsView = () => {
  const params = useParams();
  const { store } = useAppContext();

  const character = store?.characters.find(
    (character) => character.id === Number(params.id)
  );

  if (store.loading) {
    return <LoadingSpinner />;
  }
  return (
    <Details
      details={character}
      src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
    >
      <p>
        Voluptate laborum laborum adipisicing occaecat cupidatat aliqua Lorem
        tempor do nulla. Magna pariatur minim aliqua esse pariatur Lorem
        cupidatat aute amet. Exercitation ipsum eiusmod cupidatat ex cillum duis
        reprehenderit exercitation sit cupidatat ad magna elit laboris. Quis
        nisi laborum ea nulla proident commodo. Cillum officia magna excepteur
        ullamco labore. Magna Lorem enim amet officia. Ea eu incididunt
        excepteur quis ipsum ipsum veniam consequat reprehenderit laborum
        ullamco.
      </p>
    </Details>
  );
};
