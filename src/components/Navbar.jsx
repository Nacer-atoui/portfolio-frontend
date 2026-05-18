import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  // --- DÉFINITION DES STYLES ---
  
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", // Permet aux liens de passer à la ligne sur de très petits écrans
    gap: "clamp(1rem, 4vw, 2.5rem)", // L'espace s'adapte à la taille de l'écran
    padding: "1.5rem",
    backgroundColor: "#121212", // Noir profond
    borderBottom: "1px solid #2a2a2a", // Séparation subtile avec le reste de la page
    position: "sticky", // Garde la navbar en haut au scroll
    top: 0,
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif, system-ui"
  };

  const linkStyle = {
    color: "#f8f9fa", // Blanc cassé doux
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "1.5px" // Donne un côté aéré et premium
  };

  // Style spécifique pour attirer l'œil sur l'authentification
  const actionStyle = {
    ...linkStyle,
    color: "#D4AF37", // Touche dorée
    fontWeight: "700"
  };

  return (
    <nav className="navbar" style={navStyle}>
      <Link to="/" style={linkStyle}>Accueil</Link>
      <Link to="/projects" style={linkStyle}>Portfolio</Link>

      {/* Affichage conditionnel basé sur la connexion */}
      {isLoggedIn ? (
        <>
          <Link to="/admin" style={linkStyle}>Administration</Link>
          
          {/* Le bouton reprend exactement la forme d'un lien doré */}
          <button 
            onClick={logout} 
            className="btn-logout" 
            style={{ 
              ...actionStyle, 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              padding: 0,
              fontFamily: "inherit"
            }}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <Link to="/login" className="btn-login" style={actionStyle}>
          Connexion
        </Link>
      )}
    </nav>
  );
}