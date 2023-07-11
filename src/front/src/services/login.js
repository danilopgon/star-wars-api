const login = async () => {
  const reponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`);
};

export default login;
