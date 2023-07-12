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
    fetchFavorites().catch((error) => {
      console.error("Failed to fetch favorites:", error);
    });
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

  const handleAddFavoritesList = async (e) => {
    const element = e.target;

    allData.forEach(async (item) => {
      if (element.id === item.id && element.className.includes(item.name)) {
        const favoriteEndpoint =
          item.type === "character"
            ? `/character/${item.id}`
            : `/planet/${item.id}`;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
          body: JSON.stringify({}),
        };

        if (favoritesList.includes(item.name)) {
          // If the favorite already exists, send a DELETE request
          requestOptions.method = "DELETE";
        }

        try {
          const response = await fetch(favoriteEndpoint, requestOptions);
          if (response.ok) {
            // Update favoritesList based on the response
            const updatedFavorites = await response.json();
            setFavoritesList(updatedFavorites);
          } else {
            const errorData = await response.json();
            // Handle error response
            console.error(
              `Failed to add/delete favorite: ${errorData.message}`
            );
          }
        } catch (error) {
          // Handle fetch error
          console.error("Failed to fetch data:", error);
        }
      }
    });
  };

  const handleDeleteFavorites = async (e) => {
    const elementId = e.target.id;
    const newList = favoritesList.filter((item) => item !== elementId);
    setFavoritesList([...newList]);

    const item = allData.find((item) => item.name === elementId);
    const favoriteEndpoint =
      item.type === "character"
        ? `/character/${item.id}`
        : `/planet/${item.id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    };

    try {
      const response = await fetch(favoriteEndpoint, requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        // Handle error response
        console.error(`Failed to delete favorite: ${errorData.message}`);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Failed to fetch data:", error);
    }
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

  return (
    <AppContext.Provider value={{ actions, store }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
