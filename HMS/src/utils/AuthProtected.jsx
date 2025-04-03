import { createContext, useState } from "react";

export const AuthContext = createContext("");

export const AuthProtected = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
