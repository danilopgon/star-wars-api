import { useContext, createContext, useEffect } from "react";
import { useState } from "react";

import getCharacters from "../services/characters";
import getPlanets from "../services/planets";
import getVehicles from "../services/vehicles";
import fetchFavorites from "../services/fetchFavorites";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchFavorites(setFavoritesList);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  }, []);

  useEffect(() => {
    getCharacters(setCharacters);
  }, []);

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  useEffect(() => {
    getVehicles(setVehicles);
  }, []);

  useEffect(
    () => setAllData(() => [...planets, ...characters, ...vehicles]),
    [planets, characters, vehicles]
  );

  useEffect(() => {
    if (
      characters.length >= 10 &&
      planets.length >= 10 &&
      vehicles.length >= 10
    ) {
      setLoading(false);
    }
  }, [characters, planets]);

  const handleAddFavoritesList = async () => {};

  const handleDeleteFavorites = async () => {};

  const actions = {
    handleDeleteFavorites,
    handleAddFavoritesList,
  };

  const store = {
    favoritesList,
    characters,
    planets,
    vehicles,
    loading,
    allData,
  };

  return (
    <AppContext.Provider value={{ actions, store }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
