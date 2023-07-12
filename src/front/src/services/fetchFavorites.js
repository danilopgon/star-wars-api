const fetchFavorites = async () => {
  try {
    const token = localStorage.getItem("jwt-token");
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
    if (response.ok) {
      const favorites = await response.json();
      setFavoritesList(favorites);
    } else {
      const errorData = await response.json();
      console.error("Failed to fetch favorites:", errorData.message);
    }
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
  }
};

export default fetchFavorites;
