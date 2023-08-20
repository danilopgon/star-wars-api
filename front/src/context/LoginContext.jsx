import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import login from "../services/login";
import signup from "../services/signup";
import checkTokenValidity from "../services/checkTokenValidity";

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
    checkTokenValidity(handleLogout, handleValidationLogin);
  }, []);

  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setUserInput((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleLogin = async (event) => {
    const loadingLogin = toast.loading("Connecting...");
    event.preventDefault();

    const response = await login(userInput);

    if (response.error) {
      toast.error(response.error, {
        id: loadingLogin,
      });
      return;
    }

    setLoggedIn(true);
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
    toast.success("You're connected", {
      id: loadingLogin,
    });
    navigate("/");
  };

  const handleValidationLogin = () => {
    setLoggedIn(true);
    navigate("/");
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    await signup(userInput);
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
    toast.success("Sucessfully signed up");
    navigate("/login");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt-token");
    toast.success("You are logged out");
    navigate("/login");
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
