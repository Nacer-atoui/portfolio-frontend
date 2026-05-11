import { useEffect, useState } from "react";
import { useFetch } from "../hooks/apiFetch";
import { ProjectCard } from "./ProjectCard";

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

// conditions et messages d'erreurs
if (loading) { return <p>Chargement...</p>; } // Affichage lors du chargement
if (error) return <p>Erreur : {error}</p>; // Affichage si erreur
if (!projects) return <p>Aucune donnée trouvée.</p>; // Affichage si aucun donnée trouvé

    return (
        <>
            <div className='containList'>
                {projects.map((proj) => (
                    <ProjectCard
                        key={proj.id}
                        id={proj.id}
                        title={proj.title}
                        image_url={proj.image_url}
                        description={proj.description}
                    />
                ))}
            </div>
        </>
    )

}