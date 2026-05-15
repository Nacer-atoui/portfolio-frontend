import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/apiFetch";
import { ProjectDetailPage } from "../ProjectDetailPage";

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

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Es-tu sûr de vouloir supprimer ce projet ?",
    );

    if (isConfirmed) {
      try {
        await apiFetch("/projects/" + id, {
          method: "DELETE",
        });
        setProjects(projects.filter((project) => project.id !== id));
      } catch (err) {
        console.error(err);
        alert(
          "Une erreur est survenue lors de la suppression : " + err.message,
        );
      }
    }
  }; 

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (projects.length === 0) return <p>Aucun projet trouvé.</p>;

  return (
    <main>
      {projects.map((project) => (
        <div key={project.id}>
          <h1>{project.title}</h1>
          <img className="w-50" src={project.image_url} alt="" />
          <p>{project.description}</p>
          <button onClick={() => handleDelete(project.id)}>Supprimer</button>
        </div>
      ))}
    </main>
  );
}