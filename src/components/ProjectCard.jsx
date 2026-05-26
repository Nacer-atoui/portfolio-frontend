import { Link } from "react-router-dom";

export function ProjectCard({ id, title, image_url, description, tags = ["PROJET"], isFeatured = false }) {
  return (
    <article className={`w-full bg-white rounded-lg border border-stone-300 flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 ${isFeatured ? 'md:col-span-2' : ''}`}>
      
      {/* Image du projet */}
      <div className={`w-full bg-zinc-100 overflow-hidden ${isFeatured ? 'h-64 md:h-80' : 'h-64'}`}>
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          src={image_url || "https://placehold.co/366x256"} 
          alt={`Aperçu de ${title}`} 
        />
      </div>

      {/* Contenu */}
      <div className={`p-6 flex flex-col flex-grow ${isFeatured ? 'md:p-8' : ''}`}>
        
        {/* Badges / Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-zinc-100 rounded-sm text-slate-600 text-xs font-bold font-['Inter'] uppercase leading-3 tracking-wide">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Titre */}
        <h3 className="text-gray-950 text-2xl font-semibold font-['Inter'] leading-8 mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-600 text-base font-normal font-['Inter'] leading-relaxed mb-6 flex-grow line-clamp-4">
          {description}
        </p>
        
        {/* Bouton style Outline calqué sur la maquette */}
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