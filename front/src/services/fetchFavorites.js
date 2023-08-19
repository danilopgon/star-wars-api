const fetchFavorites = async (setFavorites) => {
  try {
    const token = localStorage.getItem("jwt-token");

    if (token) {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/favorite`,
        requestOptions
      );
      const favorites = await response.json();

      const favoritesList = [
        ...favorites.favorites_characters,
        ...favorites.favorites_planets,
        ...favorites.favorites_vehicles,
      ];
      setFavorites(favoritesList);
    }
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
  }
};

export default fetchFavorites;
