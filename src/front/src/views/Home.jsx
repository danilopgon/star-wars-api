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
            <Card item={character} key={character.id}>
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
            <Card item={planet} key={planet.id}>
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
            <Card item={vehicle} key={vehicle.id}>
              <p>{`Model: ${vehicle.model}`}</p>
              <p>{`Manufacturer: ${vehicle.manufacturer}`}</p>
            </Card>
          );
        })}
      </CardGroup>
    </>
  );
};
