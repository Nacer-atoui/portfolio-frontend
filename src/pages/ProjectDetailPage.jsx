import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/apiFetch";

export function ProjectDetailPage() {
  const { apiFetch } = useFetch();
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const data = await apiFetch('/projects/' + id);
        setProjectDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  // --- STYLES DES ÉTATS (Chargement, Erreur, Vide) ---
  const stateContainerClass = "w-full min-h-screen bg-stone-50 flex justify-center items-center p-6";
  const stateTextClass = "text-center text-blue-950 text-xl font-medium font-['Inter']";

  if (loading) return <main className={stateContainerClass}><p className={stateTextClass}>Chargement du projet...</p></main>;
  if (error) return <main className={stateContainerClass}><p className={`${stateTextClass} text-red-600`}>Erreur : {error}</p></main>;
  if (!projectDetail) return <main className={stateContainerClass}><p className={stateTextClass}>Projet introuvable.</p></main>;

  // Simulation de tags si ton API ne les renvoie pas encore (à remplacer/supprimer selon ta BDD)
  const tags = projectDetail.tags || ["REACT", "TAILWIND CSS", "NODE.JS"];

  return (
    <main className="w-full min-h-screen bg-stone-50 flex flex-col items-center py-12 md:py-16">
      
      {/* Conteneur principal */}
      <article className="w-full max-w-[1200px] px-6 flex flex-col justify-start items-start gap-8 md:gap-12">
        
        {/* Bouton Retour aux projets */}
        <Link 
          to="/projects" 
          className="inline-flex justify-start items-center gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600 group-hover:text-blue-950 transition-colors group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-slate-600 group-hover:text-blue-950 transition-colors text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
            Retour aux projets
          </span>
        </Link>

        {/* Image de couverture du projet */}
        <div className="w-full bg-zinc-100 rounded-lg shadow-sm border border-stone-300 flex flex-col justify-center items-start overflow-hidden">
          <img 
            className="w-full h-auto max-h-[500px] object-cover" 
            src={projectDetail.image_url || "https://placehold.co/1150x492"} 
            alt={`Aperçu du projet ${projectDetail.title}`} 
          />
        </div>

        {/* Conteneur du texte (limité à 768px pour une lecture optimale) */}
        <div className="w-full max-w-[768px] flex flex-col justify-start items-start gap-6">
          
          {/* Titre */}
          <h1 className="text-blue-950 text-4xl md:text-5xl font-extrabold font-['Inter'] leading-tight md:leading-[52.80px]">
            {projectDetail.title}
          </h1>

          {/* Tags / Technologies */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-start items-start gap-2 pt-1">
              {tags.map((tag, index) => (
                <div key={index} className="px-3 py-1 bg-zinc-100 rounded-sm border border-stone-300 flex justify-center items-center">
                  <span className="text-slate-600 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Description de l'article */}
          <div className="w-full flex flex-col gap-6">
            <p className="text-zinc-700 text-base md:text-lg font-normal font-['Inter'] leading-7 md:leading-relaxed whitespace-pre-wrap">
              {projectDetail.description}
            </p>
          </div>

          {/* Boutons d'action (GitHub / Démo) - Affichés uniquement si l'URL existe */}
          <div className="w-full pt-6 border-t border-stone-300 flex flex-wrap justify-start items-start gap-4">
            
            {projectDetail.github_url && (
              <a 
                href={projectDetail.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm shadow-sm flex justify-center items-center gap-2"
              >
                <span className="text-white text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">URL GITHUB</span>
              </a>
            )}

            {projectDetail.demo_url && (
              <a 
                href={projectDetail.demo_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-sm border border-blue-950 hover:bg-blue-50 transition-colors flex justify-center items-center gap-2"
              >
                <span className="text-blue-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">URL DÉMO</span>
              </a>
            )}

          </div>

        </div>

      </article>
    </main>
  );
}