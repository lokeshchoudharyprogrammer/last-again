import React from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";
export const AppContext = createContext();

const Context = ({ children }) => {
  const [token, settoken] = React.useState("");
  const [Auth, setAuth] = React.useState(false);
  const login = (tokens) => {
    settoken(tokens);
    setAuth(true);
    return <Navigate to="/product"></Navigate>;
  };

  return (
    <AppContext.Provider value={{ login, Auth, token }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
