import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      <Link to="/projects">Portfolio</Link>

      {/* Affichage conditionnel basé sur la connexion */}
      {isLoggedIn ? (
        <>
          <Link to="/admin">Administration</Link>
          <button onClick={logout} className="btn-logout" style={{ background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}>
            Déconnexion
          </button>
        </>
      ) : (
        <Link to="/login" className="btn-login">
          Connexion
        </Link>
      )}
    </nav>
  );
}