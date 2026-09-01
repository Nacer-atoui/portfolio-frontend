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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- STYLES DES ÉTATS (Chargement, Erreur) ---
  const stateContainerClass =
    "w-full min-h-[50vh] bg-stone-50 flex justify-center items-center p-6";
  const stateTextClass =
    "text-center text-blue-950 text-xl font-medium font-['Atkinson Hyperlegible']";

  if (loading)
    return (
      <div className={stateContainerClass}>
        <p className={stateTextClass}>Chargement des projets...</p>
      </div>
    );
  if (error)
    return (
      <div className={stateContainerClass}>
        <p className={`${stateTextClass} text-red-600`}>Erreur : {error}</p>
      </div>
    );
  if (!projects || projects.length === 0)
    return (
      <div className={stateContainerClass}>
        <p className={stateTextClass}>Aucun projet trouvé pour le moment.</p>
      </div>
    );

  return (
    <>
      <section className="w-full bg-stone-50 flex justify-center items-start">
        <div className="w-full max-w-[1200px] px-6 pt-28 pb-32 flex flex-col justify-start items-center gap-16 md:gap-24">
          
          {/* En-tête de la page */}
          <div className="w-full max-w-[672px] flex flex-col justify-start items-center gap-6 text-center">
            <h1 className="text-gray-950 text-4xl md:text-5xl font-extrabold font-['Atkinson Hyperlegible'] leading-tight md:leading-[52.80px]">
              Mes projets
            </h1>
            <p className="text-slate-600 text-base md:text-lg font-normal font-['Atkinson Hyperlegible'] leading-7">
              Aperçu de mon travail. Une pluralité de projets — réalisés en
              équipe ou en autonomie, à des fins professionnelles ou
              d'expérimentations techniques.{" "}
            </p>
          </div>

          {/* Grille dynamique remplacée par Flexbox pour centrer les éléments restants */}
          <div className="w-full flex flex-wrap justify-center gap-8">
            {projects.map((proj, index) => {
              return (
                <div 
                  key={proj.id} 
                  // Ces classes simulent les colonnes de la grille tout en permettant le centrage
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex justify-center"
                >
                  <ProjectCard
                    id={proj.id}
                    title={proj.title}
                    description={proj.description}
                    images={proj.images}
                    stacks={proj.stacks}
                    isFeatured={index === 2 || index === 5}
                  />
                </div>
              );
            })}
          </div>
          
        </div>
      </section>
      <Footer />
    </>
  );
}