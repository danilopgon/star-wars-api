import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/login";
import signup from "../services/signup";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) {
      setLoggedIn(true);
      alert("Welcome back!");
    }
  }, []);

  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setUserInput((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    await login(userInput);

    if (localStorage.getItem("jwt-token") === null) {
      return alert("Failed to login. Please check your credentials.");
    }

    setLoggedIn(true);
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
    navigate("/");
    alert("You're logged in");
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    await signup(userInput);
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
    navigate("/login");
    alert("¡Registro completado!");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt-token");
    navigate("/login");
    alert("You have been logged out");
  };

  const actions = {
    setSignupMode,
    setUserInput,
    setLoggedIn,
    handleUserInput,
    handleLogin,
    handleSignup,
    handleLogout,
  };

  const store = {
    signupMode,
    userInput,
    loggedIn,
  };

  return (
    <LoginContext.Provider value={{ actions, store }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);

export default useLoginContext;
