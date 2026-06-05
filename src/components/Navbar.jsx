import { NavLink } from 'react-router-dom'; // 1. On importe NavLink
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Fonction utilitaire pour éviter de répéter les mêmes classes Tailwind
  // Elle applique la bordure et la couleur si le lien est actif
  const getLinkClasses = ({ isActive }) => {
    const baseClasses = "flex flex-col justify-start items-start text-xs font-bold font-['Inter'] leading-3 tracking-wide transition-colors";
    const activeClasses = "pb-1 border-b-2 border-blue-950 text-blue-950";
    const inactiveClasses = "text-slate-600 hover:text-blue-950";
    
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="w-full bg-stone-50 border-b border-stone-300 flex flex-col justify-start items-center">
      <div className="w-full max-w-[1200px] px-6 py-4 flex justify-center items-center">

        <div className="flex justify-start items-center gap-8">
          
          {/* Navigation standard */}
          <NavLink to="/" className={getLinkClasses}>
            Accueil
          </NavLink>
          
          <NavLink to="/projects" className={getLinkClasses}>
            Mes projets
          </NavLink>

          {/* Affichage conditionnel basé sur la connexion */}
          {isLoggedIn ? (
            <>
              <NavLink to="/admin" className={getLinkClasses}>
                Admin
              </NavLink>
              
              <button 
                onClick={logout} 
                className="flex flex-col justify-start items-start bg-transparent border-none cursor-pointer p-0 text-slate-600 hover:text-blue-950 transition-colors text-xs font-bold font-['Inter'] leading-3 tracking-wide"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <NavLink to="/login" className={getLinkClasses}>
              Connexion
            </NavLink>
          )}
        </div>
        
      </div>
    </nav>
  );
}