import React, { createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
