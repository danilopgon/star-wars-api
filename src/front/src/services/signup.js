const signup = async (userInput) => {
  const { username, password, email } = userInput;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}api/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    }
  );
  const data = await response.json;
  console.log(data);
};

export default signup;
