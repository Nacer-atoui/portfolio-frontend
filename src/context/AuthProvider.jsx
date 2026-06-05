import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";


const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    const expirationDate = payload.exp * 1000; 
    
    return Date.now() < expirationDate;
  } catch (error) {
    
    return false;
  }
};

export function AuthProvider({ children }) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return isTokenValid(token);
  });

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token && !isTokenValid(token)) {
      logout(); 
    }
  }, []);

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