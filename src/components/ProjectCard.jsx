import { useState } from "react";
import { Link } from "react-router-dom";

export function ProjectCard({ id, title, images = [], description, stacks = [], isFeatured = false }) {
  // 1. On crée un state pour l'image active (par défaut: 0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. Fonctions pour naviguer dans le tableau
  const nextImage = (e) => {
    e.preventDefault(); // Évite tout comportement indésirable au clic
    // Si on est à la dernière image, on revient à la première, sinon on avance de 1
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    // Si on est à la première image, on va à la dernière, sinon on recule de 1
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <article className={`w-full bg-white rounded-lg border border-stone-300 flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 ${isFeatured ? 'md:col-span-2' : ''}`}>
      
      {/* --- ZONE IMAGE AVEC CARROUSEL --- */}
      <div className={`relative w-full bg-zinc-100 overflow-hidden group/carousel ${isFeatured ? 'h-64 md:h-80' : 'h-64'}`}>
        <img 
          className="w-full h-full object-cover" 
          // On affiche l'image correspondant à l'index actuel
          src={images?.[currentImageIndex]?.image_url || "https://placehold.co/366x256"} 
          alt={`Aperçu de ${title}`} 
        />

        {/* On n'affiche les flèches que s'il y a plus d'une image */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex justify-center items-center bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
            >
              ❮
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex justify-center items-center bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
            >
              ❯
            </button>
            
            {/* Petit indicateur visuel (ex: 1/3) */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* --- CONTENU --- */}
      <div className={`p-6 flex flex-col grow ${isFeatured ? 'md:p-8' : ''}`}>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {stacks.slice(0, 3).map((stack, index) => (
            <span key={index} className="px-2 py-1 bg-zinc-100 rounded-sm text-slate-600 text-xs font-bold font-['Inter'] uppercase leading-3 tracking-wide">
              {stack.name}
            </span>
          ))}
          {stacks.length > 3 && (
            <span className="px-2 py-1 bg-zinc-100 rounded-sm text-slate-600 text-xs font-bold font-['Inter'] uppercase leading-3 tracking-wide">
              +{stacks.length - 3}
            </span>
          )}
        </div>
        
        <h3 className="text-gray-950 text-2xl font-semibold font-['Inter'] leading-8 mb-3">
          {title}
        </h3>
        
        <p className="text-slate-600 text-base font-normal font-['Inter'] leading-relaxed mb-6 grow line-clamp-4">
          {description}
        </p>
        
        <Link 
          to={`/projects/${id}`} 
          className={`w-fit px-4 py-3 rounded-sm border inline-flex items-center gap-2 transition-colors mt-auto ${
            isFeatured 
              ? 'bg-blue-950 border-blue-950 text-white hover:bg-blue-900' 
              : 'border-blue-950 text-blue-950 hover:bg-blue-50'
          }`}
        >
          <span className="text-xs font-bold font-['Inter'] leading-3 tracking-wide">Voir les détails</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

      </div>
    </article>
  );
}