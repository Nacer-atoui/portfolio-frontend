export function Footer() {
  // Petite astuce pour que l'année se mette à jour automatiquement
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-50 border-t border-stone-300 flex justify-center items-center">
      <div className="w-full max-w-[1200px] px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <div className="flex flex-col justify-start items-center md:items-start text-center md:text-left">
          <span className="text-gray-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
            © {currentYear} Nacer Atoui. Tous droits réservés.
          </span>
        </div>

        {/* Liens Réseaux Sociaux */}
        <div className="flex justify-center items-center gap-6">
          <a 
            href="https://github.com/ton-profil" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-950 transition-colors text-base font-normal font-['Inter'] leading-6"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/ton-profil" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-950 transition-colors text-base font-normal font-['Inter'] leading-6"
          >
            LinkedIn
          </a>
          <a 
            href="https://twitter.com/ton-profil" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-950 transition-colors text-base font-normal font-['Inter'] leading-6"
          >
            Twitter
          </a>
        </div>

      </div>
    </footer>
  );
}