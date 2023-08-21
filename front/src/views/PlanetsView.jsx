import { useParams } from "react-router";
import useAppContext from "../context/AppContext";

import Planets from "../components/Planets";
import LoadingSpinner from "../components/LoadingSpinner";

export const PlanetsView = () => {
  const params = useParams();
  const { store } = useAppContext();

  const planet = store.planets.find(
    (planet) => planet.id === Number(params.id)
  );

  if (store.loading) {
    return <LoadingSpinner />;
  }

  return (
    <Planets
      details={planet}
      src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
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
    </Planets>
  );
};
