const getPlanets = async (setPlanets) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}api/planets`);
  const data = await response.json();

  const orderedData = data.sort((a, b) => a.id - b.id);

  setPlanets(orderedData);
};

export default getPlanets;
