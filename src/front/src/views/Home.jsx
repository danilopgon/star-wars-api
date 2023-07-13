import { useState } from "react";

import Title from "../components/Title";
import CardGroup from "../components/CardGroup";
import { Card } from "../components/Card";
import useAppContext from "../context/AppContext";
import LoadingSpinner from "../components/LoadingSpinner";

export const Home = () => {
  const { store, actions } = useAppContext();

  if (store.loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Title>Characters</Title>
      <CardGroup>
        {store?.characters.map((character) => {
          return (
            <Card
              title={character.name}
              key={character.id}
              url={`/characters/${character.id}`}
              id={character.id}
              src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
            >
              <p>{`Gender: ${character.gender}`}</p>
              <p>{`Hair Color: ${character.hair_color}`}</p>
              <p>{`Eye Color: ${character.eye_color}`}</p>
            </Card>
          );
        })}
      </CardGroup>
      <Title>Planets</Title>
      <CardGroup>
        {store?.planets.map((planet) => {
          return (
            <Card
              title={planet.name}
              key={planet.id}
              url={`/planets/${planet.id}`}
              id={planet.id}
              src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
            >
              <p>{`Population: ${planet.population}`}</p>
              <p>{`Terrain: ${planet.terrain}`}</p>
            </Card>
          );
        })}
      </CardGroup>
      <Title>Vehicles</Title>
      <CardGroup>
        {store?.vehicles.map((vehicle) => {
          return (
            <Card
              title={vehicle.name}
              key={vehicle.id}
              url={`/vehicles/${vehicle.id}`}
              id={vehicle.id}
              src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`}
            >
              <p>{`Model: ${vehicle.model}`}</p>
              <p>{`Manufacturer: ${vehicle.manufacturer}`}</p>
            </Card>
          );
        })}
      </CardGroup>
    </>
  );
};
