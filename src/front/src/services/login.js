const login = async (userInput) => {
  const { username, password } = userInput;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  const data = await response.json;
  console.log(data);
};

export default login;
