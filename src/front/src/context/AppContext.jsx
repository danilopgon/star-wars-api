import { useContext, createContext, useEffect } from "react";
import { useState } from "react";

import getCharacters from "../services/characters";
import getPlanets from "../services/planets";
import getVehicles from "../services/vehicles";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allData, setAllData] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => setFavoritesList([]), []);

  const handleAddFavoritesList = (e) => {
    const element = e.target;

    allData.forEach((item) => {
      element.id === item.id && element.className.includes(item.name)
        ? setFavoritesList((prev) => {
            if (!prev.includes(item.name)) {
              return [...prev, item.name];
            } else {
              const newList = prev.filter((element) => element !== item.name);
              return [...newList];
            }
          })
        : null;
    });
  };

  useEffect(() => {
    getCharacters(setCharacters);
  }, []);

  useEffect(() => {
    getPlanets(setPlanets);
  }, []);

  useEffect(() => {
    getVehicles(setVehicles);
  }, []);

  //USE EFFECT PARA CONTROLAR LOADING (ESTO ES MEJORABLE, ¿NO?)
  useEffect(() => {
    if (
      characters.length >= 10 &&
      planets.length >= 10 &&
      vehicles.length >= 10
    ) {
      setLoading(false);
    }
  }, [characters, planets]);

  const handleDeleteFavorites = (e) => {
    const elementId = e.target.id;
    const newList = favoritesList.filter((item) => item !== elementId);
    setFavoritesList([...newList]);
  };

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

  useEffect(
    () => setAllData(() => [...planets, ...characters]),
    [planets, characters]
  );

  return (
    <AppContext.Provider value={{ actions, store }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
