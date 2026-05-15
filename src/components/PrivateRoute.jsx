import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime; 
  } catch (error) {
    return false; 
  }
};

export default function PrivateRoute({ children, role }) {

  const { isLoggedIn, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!isLoggedIn || !isTokenValid(token)) {
    return <Navigate to="/login" />;
  }

  if (role) {
    const { role: userRole } = jwtDecode(token);
    if (userRole !== role) {
      return <Navigate to="/" />;
    }
  }

  return children;
}