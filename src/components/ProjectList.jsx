import { useEffect, useState } from "react";
import { useFetch } from "../hooks/apiFetch";
import { ProjectCard } from "./ProjectCard";
import { Footer } from "./Footer";

export function ProjectList() {
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
  }, []);

  // --- STYLES DES ÉTATS (Chargement, Erreur) ---
  const stateContainerClass = "w-full min-h-[50vh] bg-stone-50 flex justify-center items-center p-6";
  const stateTextClass = "text-center text-blue-950 text-xl font-medium font-['Inter']";

  if (loading) return <div className={stateContainerClass}><p className={stateTextClass}>Chargement des projets...</p></div>;
  if (error) return <div className={stateContainerClass}><p className={`${stateTextClass} text-red-600`}>Erreur : {error}</p></div>;
  if (!projects || projects.length === 0) return <div className={stateContainerClass}><p className={stateTextClass}>Aucun projet trouvé pour le moment.</p></div>;

  return (
    <>
    <section className="w-full bg-stone-50 flex justify-center items-start">
      <div className="w-full max-w-[1200px] px-6 pt-28 pb-32 flex flex-col justify-start items-center gap-16 md:gap-24">
        
        {/* En-tête de la page */}
        <div className="w-full max-w-[672px] flex flex-col justify-start items-center gap-6 text-center">
          <h1 className="text-gray-950 text-4xl md:text-5xl font-extrabold font-['Inter'] leading-tight md:leading-[52.80px]">
            Mes projets
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-7">
            A selection of recent architectural software developments, focusing on scalable systems, pristine codebases, and uncompromising performance.
          </p>
        </div>

        {/* Grille dynamique des projets */}
        {/* 1 colonne sur mobile, 2 sur tablette, 3 sur PC */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {projects.map((proj, index) => {
            // Transforme ta catégorie simple en tableau pour correspondre au design, 
            // ou utilise directement un tableau si ton API l'envoie.
            const projectTags = proj.tags ? proj.tags : [proj.category || "PROJET"];

            return (
              <ProjectCard
                key={proj.id}
                id={proj.id}
                title={proj.title}
                image_url={proj.image_url}
                description={proj.description}
                tags={projectTags}
                // Astuce : On rend le 3ème élément (index 2) ou le 6ème (index 5) plus grand pour casser la symétrie
                isFeatured={index === 2 || index === 5} 
              />
            );
          })}
          
        </div>
        
      </div>
    </section>
    <Footer />
    </>
  );
}