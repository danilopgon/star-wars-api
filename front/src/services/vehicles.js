const getVehicles = async (setVehicle) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}api/vehicles`);
  const data = await response.json();

  const orderedData = data.sort((a, b) => a.id - b.id);

  setVehicle(orderedData);
};

export default getVehicles;
