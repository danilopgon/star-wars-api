const login = async (userInput) => {
  const { username, password } = userInput;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default login;
