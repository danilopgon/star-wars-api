import React, { useContext, createContext, useState } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    await sendLogin(userInput);
    setLoggedIn(true);
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
  };

  const actions = {
    setSignupMode,
    setUserInput,
    setLoggedIn,
    handleUserInput,
    handleLogin,
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
