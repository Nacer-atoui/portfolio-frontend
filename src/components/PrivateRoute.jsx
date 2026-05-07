export default function PrivateRoute({ children, role }) {

  const { isAuthenticated, logout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!isAuthenticated || !isTokenValid(token)) {
    logout();
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