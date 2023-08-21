const fetchFavorites = async (setFavorites) => {
  try {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/favorite`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      return;
    }

    const favorites = await response.json();

    const favoritesList = [
      ...favorites.favorites_characters,
      ...favorites.favorites_planets,
      ...favorites.favorites_vehicles,
    ];
    setFavorites(favoritesList);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
  }
};

export default fetchFavorites;
