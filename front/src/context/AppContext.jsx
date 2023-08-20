import { useContext, createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

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
      const getFavoritesList = async () => {
        await fetchFavorites(setFavoritesList);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };
      getFavoritesList();
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      toast.error("Failed to fetch favorites");
    }
  }, [loading]);

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
  }, [characters, planets, vehicles]);

  const getItemType = (item) => {
    if (characters.find((character) => character.name === item.name)) {
      return "character";
    }
    if (planets.find((planet) => planet.name === item.name)) {
      return "planet";
    }
    if (vehicles.find((vehicle) => vehicle.name === item.name)) {
      return "vehicle";
    }
    return "";
  };

  const handleAddFavoritesList = async (e) => {
    try {
      const token = localStorage.getItem("jwt-token");

      const element = e.target;

      const findItem = allData.find((item) => {
        return element.className.includes(item.name);
      });

      const itemType = getItemType(findItem);

      const postBody = {
        [`${itemType}_id`]: `${findItem.id}`,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postBody),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/favorite/${itemType}/${
          findItem.id
        }`,
        requestOptions
      );

      if (response.ok) {
        allData.forEach((item) => {
          if (element.id === item.id && element.className.includes(item.name)) {
            setFavoritesList((prev) => {
              if (!prev.includes(item.name)) {
                return [...prev, item.name];
              } else {
                const newList = prev.filter((element) => element !== item.name);
                return [...newList];
              }
            });
          }
        });
        setLoading(true);
        toast.success("Added to favorites");
      } else if (response.status === 409) {
        toast.error("Item is already in favorites");
      } else {
        console.error(
          "Failed to add to favorites. Response status:",
          response.status
        );
        toast.error("Failed to add to favorites");
      }
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      toast.error("Failed to add to favorites");
    }
  };

  const handleDeleteFavorites = async (e) => {
    try {
      const token = localStorage.getItem("jwt-token");

      const element = e.target;

      const findItem = allData.find((item) => {
        return element.className.includes(item.name);
      });

      const itemType = getItemType(findItem);

      const postBody = {
        [`${itemType}_id`]: `${findItem.id}`,
      };

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postBody),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/favorite/${itemType}/${
          findItem.id
        }`,
        requestOptions
      );

      if (response.ok) {
        setFavoritesList((prevFavorites) =>
          prevFavorites.filter((favorite) => favorite.name !== findItem.name)
        );
        setLoading(true);
        toast.success("Removed from favorites");
      } else {
        console.error(
          "Failed to delete from favorites. Response status:",
          response.status
        );
        toast.error("Failed to delete from favorites");
      }
    } catch (error) {
      console.error("Failed to delete from favorites:", error);
      toast.error("Failed to delete from favorites");
    }
  };

  const isItemInFavorites = (item) => {
    const itemInFavorites = favoritesList.some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    return itemInFavorites;
  };

  const actions = {
    handleDeleteFavorites,
    handleAddFavoritesList,
    getItemType,
    isItemInFavorites,
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
