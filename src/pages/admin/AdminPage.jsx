import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/apiFetch";
import { ProjectDetailPage } from "../ProjectDetailPage";
import { Link } from "react-router-dom";
import { CreateProjectPage } from "./CreateProjectPage";

export function AdminPage({ id }) {
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
      "Es-tu sûr de vouloir supprimer ce projet ?"
    );

    if (isConfirmed) {
      try {
        await apiFetch("/projects/" + id, {
          method: "DELETE",
        });
        alert("Projet supprimé !");
        setProjects(projects.filter((project) => project.id !== id));
      } catch (err) {
        console.error(err);
        alert(
          "Une erreur est survenue lors de la suppression : " + err.message
        );
      }
    }
  }; 

  // --- DÉFINITION DES STYLES ---

  const mainStyle = {
    backgroundColor: "#121212",
    color: "#f8f9fa",
    minHeight: "100vh",
    padding: "clamp(2rem, 5vw, 4rem) 1.5rem",
    fontFamily: "'Inter', sans-serif, system-ui"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    maxWidth: "1200px",
    margin: "0 auto 3rem auto",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #2a2a2a"
  };

  const btnCreateStyle = {
    display: "inline-block",
    backgroundColor: "#D4AF37",
    color: "#121212",
    textDecoration: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "0.9rem",
    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Grille responsive
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto"
  };

  const cardStyle = {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column"
  };

  const cardActionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    backgroundColor: "#1a1a1a",
    borderTop: "1px solid #2a2a2a"
  };

  const btnEditStyle = {
    color: "#D4AF37",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase"
  };

  const btnDeleteStyle = {
    background: "none",
    border: "none",
    color: "#ff6b6b", // Rouge doux pour la suppression
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit"
  };

  // Conditions et messages d'erreurs
  if (loading) return <main style={mainStyle}><p style={{ textAlign: "center", color: "#D4AF37" }}>Chargement de l'administration...</p></main>;
  if (error) return <main style={mainStyle}><p style={{ textAlign: "center", color: "#ff6b6b" }}>Erreur : {error}</p></main>;
  if (projects.length === 0) return <main style={mainStyle}><p style={{ textAlign: "center", color: "#a0a0a0" }}>Aucun projet trouvé.</p></main>;

  return (
    <main style={mainStyle}>
      
      {/* EN-TÊTE DE L'ADMINISTRATION */}
      <div style={headerStyle}>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "700", margin: 0 }}>
          Gestion des <span style={{ color: "#D4AF37" }}>Projets</span>
        </h1>
        <Link to={"/admin/projects/new"} style={btnCreateStyle}>
          + Créer un projet
        </Link>
      </div>

      {/* GRILLE DES PROJETS (Mode Admin) */}
      <div style={gridStyle}>
        {projects.map((project) => (
          <article key={project.id} style={cardStyle}>
            
            {/* Image (plus petite que sur le portfolio pour gagner de la place) */}
            <img 
              src={project.image_url} 
              alt={project.title} 
              style={{ width: "100%", height: "160px", objectFit: "cover" }} 
            />
            
            {/* Contenu */}
            <div style={{ padding: "1.5rem", flexGrow: 1 }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "0.8rem", color: "#f8f9fa", lineHeight: "1.3" }}>
                {project.title.length > 40 ? project.title.slice(0, 40) + "..." : project.title}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#a0a0a0", margin: 0, lineHeight: "1.5" }}>
                {project.description.length > 80 ? project.description.slice(0, 80) + "..." : project.description}
              </p>
            </div>

            {/* Boutons d'action (Modifier / Supprimer) */}
            <div style={cardActionStyle}>
              <Link to={`/admin/projects/${project.id}/edit`} style={btnEditStyle}>
                Modifier
              </Link>
              <button onClick={() => handleDelete(project.id)} style={btnDeleteStyle}>
                Supprimer
              </button>
            </div>

          </article>
        ))}
      </div>
    </main>
  );
}