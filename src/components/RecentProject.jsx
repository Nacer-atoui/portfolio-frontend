import { useEffect, useState } from "react";
import { useFetch } from "../hooks/apiFetch";
import { ProjectCard } from "./ProjectCard";

export function RecentProjects() {
  const { apiFetch } = useFetch();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch("/projects");
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- STYLES DES ÉTATS (Chargement, Erreur) ---
  const stateContainerClass = "w-full py-28 bg-zinc-100 flex justify-center items-center";
  const stateTextClass = "text-center text-blue-950 text-xl font-medium font-['Inter']";

  if (loading) {
    return (
      <div className={stateContainerClass}>
        <p className={stateTextClass}>Chargement de mes projets récents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={stateContainerClass}>
        <p className={`${stateTextClass} text-red-600`}>Erreur : {error}</p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className={stateContainerClass}>
        <p className={stateTextClass}>Aucun projet trouvé pour le moment.</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-zinc-100 py-16 md:py-28 flex justify-center items-center">
      <div className="w-full max-w-[1200px] px-6 flex flex-col justify-start items-start gap-12">
        
        {/* Titre */}
        <div className="w-full flex flex-col justify-start items-start">
          <h2 className="text-gray-950 text-3xl font-bold font-['Inter'] leading-10">
            Projets Récents
          </h2>
        </div>

        {/* Grille des projets */}
        {/* On limite l'affichage aux 2 premiers projets pour la page d'accueil avec .slice(0, 2) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((proj) => (
            <ProjectCard
              key={proj.id}
              id={proj.id}
              title={proj.title}
              description={proj.description}
              images={proj.images}   
              stacks={proj.stacks}   
            />
          ))}
        </div>

      </div>
    </section>
  );
}