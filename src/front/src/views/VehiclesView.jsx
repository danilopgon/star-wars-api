import { useParams } from "react-router";
import useAppContext from "../context/AppContext";

import Vehicles from "../components/Vehicles";
import LoadingSpinner from "../components/LoadingSpinner";

export const VehiclesView = () => {
  const params = useParams();
  const { store } = useAppContext();

  const vehicle = store.vehicles.find(
    (vehicle) => vehicle.id === Number(params.id)
  );

  if (store.loading) {
    return <LoadingSpinner />;
  }

  return (
    <Vehicles
      details={vehicle}
      src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`}
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
    </Vehicles>
  );
};
