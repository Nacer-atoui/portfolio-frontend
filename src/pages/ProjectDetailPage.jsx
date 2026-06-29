import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/apiFetch";

export function ProjectDetailPage() {
  const { id } = useParams();
  const { apiFetch } = useFetch();
  
  // États de la page
  const [projectDetail, setProjectDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // État pour le carrousel
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // --- RÉCUPÉRATION DES DONNÉES ---
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await apiFetch(`/projects/${id}`);
        setProjectDetail(data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération du projet:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- FONCTIONS DU CARROUSEL ---
  const images = projectDetail?.images || [];
  
  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // --- AFFICHAGES CONDITIONNELS (Chargement & Erreur) ---
  if (loading) {
    return (
      <main className="w-full min-h-screen bg-stone-50 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (error || !projectDetail) {
    return (
      <main className="w-full min-h-screen bg-stone-50 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-950 font-['Inter']">Projet introuvable</h2>
        <Link to="/" className="text-blue-950 hover:underline font-bold font-['Inter']">
          Retour à l'accueil
        </Link>
      </main>
    );
  }

  // --- RENDU PRINCIPAL DE LA PAGE ---
  return (
    <main className="w-full min-h-screen bg-stone-50 pt-12 pb-24 px-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* En-tête / Bouton retour */}
        <div>
          <Link 
            to="/projects" // Ou "/" selon où se trouve ta liste de projets
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-950 transition-colors font-bold font-['Inter'] text-sm uppercase tracking-wide"
          >
            <span>❮</span>
            <span>Retour aux projets</span>
          </Link>
        </div>

        {/* --- CARROUSEL D'IMAGES --- */}
        <div className="relative w-full bg-zinc-100 rounded-lg overflow-hidden border border-stone-200 group shadow-sm">
          <img 
            className="w-full h-auto max-h-[500px] md:max-h-[600px] object-cover transition-opacity duration-300" 
            src={images[currentImgIndex]?.image_url || "https://placehold.co/1150x492"} 
            alt={`Aperçu du projet ${projectDetail.title} - Image ${currentImgIndex + 1}`} 
          />

          {images.length > 1 && (
            <>
              {/* Flèches de navigation */}
              <button 
                onClick={prevImg}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex justify-center items-center bg-black/40 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              >
                ❮
              </button>
              <button 
                onClick={nextImg}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex justify-center items-center bg-black/40 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100"
              >
                ❯
              </button>

              {/* Points de navigation (Dots) en bas */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImgIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      currentImgIndex === index 
                        ? "bg-white scale-125 shadow-md" 
                        : "bg-white/50 hover:bg-white/90"
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* --- DÉTAILS DU PROJET --- */}
        <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-stone-300 flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-200 pb-8">
            <h1 className="text-gray-950 text-4xl font-bold font-['Inter']">
              {projectDetail.title}
            </h1>

            {/* Liens externes (GitHub / Démo) */}
            <div className="flex flex-wrap gap-4">
              {projectDetail.github_url && (
                <a 
                  href={projectDetail.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-100 transition-colors rounded-sm text-xs font-bold font-['Inter'] uppercase tracking-wide flex items-center gap-2"
                >
                  Code source
                </a>
              )}
              {projectDetail.demo_url && (
                <a 
                  href={projectDetail.demo_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-950 text-white hover:bg-blue-900 transition-colors rounded-sm text-xs font-bold font-['Inter'] uppercase tracking-wide flex items-center gap-2 shadow-sm"
                >
                  Voir la démo
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-950 font-['Inter']">À propos du projet</h2>
            <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-relaxed whitespace-pre-wrap">
              {projectDetail.description}
            </p>
          </div>

          {/* Stack technique */}
          {projectDetail.stacks && projectDetail.stacks.length > 0 && (
            <div className="flex flex-col gap-4 pt-8 border-t border-stone-200">
              <h2 className="text-xl font-bold text-gray-950 font-['Inter']">Technologies utilisées</h2>
              <div className="flex flex-wrap gap-3">
                {projectDetail.stacks.map((stack, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 px-4 py-2 bg-stone-100 border border-stone-200 rounded-sm"
                  >
                    {stack.logo_url && (
                      <img src={stack.logo_url} alt={`${stack.name} logo`} className="w-5 h-5 object-contain" />
                    )}
                    <span className="text-slate-700 text-sm font-bold font-['Inter'] tracking-wide">
                      {stack.name}
                    </span>
                    <span className="text-slate-400 text-xs font-medium font-['Inter'] pl-2 border-l border-stone-300">
                      {stack.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}