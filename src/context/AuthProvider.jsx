import { useState } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  function login(token) {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >

      {children}
    </AuthContext.Provider>
  );
}
