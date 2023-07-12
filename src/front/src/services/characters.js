const getCharacters = async (setCharacter) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}api/people`);
  const data = await response.json();

  const orderedData = data.sort((a, b) => a.id - b.id);

  setCharacter(orderedData);
};

export default getCharacters;
