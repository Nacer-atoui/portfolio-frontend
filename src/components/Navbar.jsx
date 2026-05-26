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
<nav className="w-full bg-stone-50 border-b border-stone-300 flex flex-col justify-start items-center">
    
  <div className="w-full max-w-1200px px-6 py-4 flex justify-center items-center">

    {/* Liens de navigation */}
    <div className="flex justify-start items-center gap-8">
      
      {/* Lien Actif */}
      <Link to="/" className="pb-1 border-b-2 border-blue-950 flex flex-col justify-start items-start">
        <span className="justify-center text-blue-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide">
          Accueil
        </span>
      </Link>
      
      {/* Liens Inactifs */}
      <Link to="/projects" className="flex flex-col justify-start items-start group">
        <span className="justify-center text-slate-600 group-hover:text-blue-950 transition-colors text-xs font-bold font-['Inter'] leading-3 tracking-wide">
          Mes projets
        </span>
      </Link>

      {/* Affichage conditionnel basé sur la connexion */}
      {isLoggedIn ? (
        <>
          <Link to="/admin" className="flex flex-col justify-start items-start group">
            <span className="justify-center text-slate-600 group-hover:text-blue-950 transition-colors text-xs font-bold font-['Inter'] leading-3 tracking-wide">
              Admin
            </span>
          </Link>
          
          {/* Bouton de déconnexion calqué sur le style des liens inactifs */}
          <button 
            onClick={logout} 
            className="flex flex-col justify-start items-start bg-transparent border-none cursor-pointer p-0 group"
          >
            <span className="justify-center text-slate-600 group-hover:text-blue-950 transition-colors text-xs font-bold font-['Inter'] leading-3 tracking-wide">
              Déconnexion
            </span>
          </button>
        </>
      ) : (
        <Link to="/login" className="flex flex-col justify-start items-start group">
          <span className="justify-center text-slate-600 group-hover:text-blue-950 transition-colors text-xs font-bold font-['Inter'] leading-3 tracking-wide">
            Connexion
          </span>
        </Link>
      )}
    </div>
    
  </div>
</nav>
  );
}