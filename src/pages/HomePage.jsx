import { ContactForm } from "../components/ContactForm";
import { Link } from 'react-router-dom';
import { RecentProjects } from "../components/RecentProject";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <main style={{ backgroundColor: "#121212", color: "#f8f9fa", minHeight: "100vh", fontFamily: "'Inter', sans-serif, system-ui" }}>
      
      {/* --- ZONE HERO --- */}
<section className="w-full bg-stone-50 border-b border-stone-300 flex justify-center items-center py-16 md:py-28">
      <div className="w-full max-w-[1200px] px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* Colonne Gauche : Textes et Actions */}
        <div className="w-full md:max-w-[656px] flex flex-col justify-start items-start gap-6">
          
          {/* Titre Principal */}
          <h1 className="text-gray-950 text-4xl md:text-5xl font-extrabold font-['Inter'] leading-tight md:leading-[52.80px]">
            Architecture.<br />Code. Précision.
          </h1>
          
          {/* Description */}
          <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-relaxed max-w-[512px]">
            Conception d'interfaces web robustes et scalables.<br />
            Expertise technique au service de l'expérience utilisateur, avec une approche minimaliste et performante.
          </p>
          
          {/* Boutons d'action */}
          <div className="w-full flex flex-wrap justify-start items-center gap-4 pt-4">
            
            {/* Bouton Principal - Lié à tes projets */}
            <Link 
              to="/projects" 
              className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm text-center text-white text-base font-medium font-['Inter'] leading-6 shadow-sm"
            >
              Voir les projets
            </Link>
            
            {/* Bouton Secondaire - Lié au contact */}
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-sm border border-blue-950 hover:bg-blue-50 transition-colors text-center text-blue-950 text-base font-medium font-['Inter'] leading-6"
            >
              Me contacter
            </Link>
            
          </div>
        </div>

        {/* Colonne Droite : Image / Avatar */}
        <div className="w-full md:w-auto flex justify-center items-center">
          <img 
            className="w-full max-w-[384px] h-auto aspect-square rounded-xl border border-stone-300 object-cover shadow-sm" 
            src="src/assets/Photo_3.JPG" 
            alt="Illustration Nacer Atoui - Développeur Web" 
          />
        </div>

      </div>
    </section>

    <RecentProjects />

      {/* --- ZONE CONTACT --- */}
<section className="w-full bg-zinc-100 py-16 md:py-28 flex justify-center items-center px-6">
      <div className="w-full max-w-md flex flex-col justify-start items-center gap-10">
        
        {/* En-tête de la section */}
        <div className="w-full flex flex-col justify-start items-center gap-3.5 text-center">
          <h2 className="text-gray-950 text-3xl md:text-4xl font-bold font-['Inter'] leading-10">
            Démarrer un projet
          </h2>
          <p className="text-slate-600 text-base font-normal font-['Inter'] leading-relaxed">
            Remplissez le formulaire ci-dessous pour discuter<br className="hidden md:block" /> de votre prochaine architecture web.
          </p>
        </div>

        {/* Le vrai formulaire sémantique */}
        
        <ContactForm />

      </div>
    </section>

    <Footer />

    </main>
  );
}