import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/apiFetch";
import { toast } from "react-toast";

export function AdminPage() {
  const { apiFetch } = useFetch();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectAdmin = async () => {
      try {
        const data = await apiFetch('/projects');
        setProjects(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAdmin();
  }, []);

  const handleDelete = async (id, title) => {
    const isConfirmed = window.confirm(
      `Es-tu sûr de vouloir supprimer ce projet "${title}" ?`
    );

    if (isConfirmed) {
      try {
        await apiFetch(`/projects/${id}`, {
          method: "DELETE",
        });
        toast.success("Projet supprimé !");
        setProjects(projects.filter((project) => project.id !== id));
      } catch (err) {
        console.error(err);
        alert("Une erreur est survenue lors de la suppression : " + err.message);
      }
    }
  }; 

  // --- STYLES DES ÉTATS (Chargement, Erreur) ---
  const stateContainerClass = "w-full min-h-screen bg-stone-50 flex justify-center items-center p-6";
  const stateTextClass = "text-center text-blue-950 text-xl font-medium font-['Inter']";

  if (loading) return <main className={stateContainerClass}><p className={stateTextClass}>Chargement de l'administration...</p></main>;
  if (error) return <main className={stateContainerClass}><p className={`${stateTextClass} text-red-600`}>Erreur : {error}</p></main>;

  return (
    <main className="w-full min-h-screen bg-stone-50 flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-6 pt-16 pb-32 flex flex-col gap-12">
        
        {/* EN-TÊTE DE L'ADMINISTRATION */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-blue-950 text-3xl md:text-4xl font-bold font-['Inter'] leading-10">
              Tableau de bord
            </h1>
            <p className="text-zinc-700 text-base font-normal font-['Inter'] leading-6">
              Gérez vos projets et votre portfolio.
            </p>
          </div>
          
          <Link 
            to="/admin/projects/new" 
            className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors shadow-sm rounded-sm flex justify-center items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white font-bold transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-white text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Ajouter un projet
            </span>
          </Link>
        </div>

        {/* LISTE DES PROJETS (Mode Tableau) */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-stone-300 flex flex-col overflow-hidden">
          
          {/* En-tête du tableau (Masqué sur mobile, visible sur tablette/PC) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-100 border-b border-stone-300">
            <div className="col-span-6 text-slate-600 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Titre du projet
            </div>
            <div className="col-span-3 text-slate-600 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Catégorie
            </div>
            <div className="col-span-3 text-right text-slate-600 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Actions
            </div>
          </div>

          {/* Lignes du tableau */}
          {projects.length === 0 ? (
            <div className="p-8 text-center text-slate-600 font-['Inter']">Aucun projet trouvé. Créez votre premier projet !</div>
          ) : (
            <div className="flex flex-col">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center px-6 py-5 border-b border-stone-300 last:border-0 hover:bg-stone-50 transition-colors"
                >
                  
                  {/* Titre */}
                  <div className="md:col-span-6">
                    <h2 className="text-zinc-900 text-base md:text-lg font-semibold font-['Inter'] leading-7">
                      {project.title}
                    </h2>
                  </div>

                  {/* Catégorie */}
                  <div className="md:col-span-3 flex items-center">
                    <span className="px-3 py-1 bg-zinc-100 border border-stone-300 rounded-sm text-slate-600 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                      {project.category || "PROJET"}
                    </span>
                  </div>

                  {/* Actions (Modifier / Supprimer) */}
                  <div className="md:col-span-3 flex flex-wrap justify-start md:justify-end gap-2 mt-4 md:mt-0">
                    
                    <Link 
                      to={`/admin/projects/${project.id}/edit`} 
                      className="px-4 py-2 border border-blue-950 rounded-sm hover:bg-blue-50 transition-colors flex items-center gap-2 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-blue-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span className="text-blue-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                        Modifier
                      </span>
                    </Link>

                    <button 
                      onClick={() => handleDelete(project.id, project.title)} 
                      className="px-4 py-2 bg-rose-200 hover:bg-rose-300 transition-colors rounded-sm flex items-center gap-2 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="text-red-800 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                        Supprimer
                      </span>
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}