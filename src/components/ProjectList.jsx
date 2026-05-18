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

  // --- DÉFINITION DES STYLES ---
  
  const sectionStyle = {
    backgroundColor: "#121212", // Fond noir
    minHeight: "100vh",
    padding: "4rem 1.5rem",
    fontFamily: "'Inter', sans-serif, system-ui"
  };

  const messageStyle = {
    textAlign: "center",
    color: "#D4AF37", // Texte doré pour les statuts
    fontSize: "1.2rem",
    padding: "5rem 2rem",
    fontWeight: "500"
  };

  const gridStyle = {
    display: "grid",
    // C'est LA ligne magique pour le responsive sans Media Queries :
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2.5rem",
    maxWidth: "1200px", // Limite la largeur sur les écrans géants
    margin: "0 auto", // Centre la grille
  };

  // Conditions et messages d'erreurs stylisés
  if (loading) return <div style={sectionStyle}><p style={messageStyle}>Chargement de mes projets...</p></div>;
  if (error) return <div style={sectionStyle}><p style={{...messageStyle, color: "#ff6b6b"}}>Erreur : {error}</p></div>;
  if (!projects || projects.length === 0) return <div style={sectionStyle}><p style={messageStyle}>Aucun projet trouvé pour le moment.</p></div>;

  return (
    <section style={sectionStyle}>
      {/* Optionnel : Un petit titre de section pour habiller la page si elle est affichée seule */}
      <h2 style={{ 
        textAlign: "center", 
        color: "#ffffff", 
        fontSize: "clamp(1.8rem, 5vw, 2.5rem)", 
        marginBottom: "3rem",
        fontWeight: "700" 
      }}>
        Mes <span style={{ color: "#D4AF37" }}>Réalisations</span>
      </h2>

      <div className='containList' style={gridStyle}>
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
    </section>
  );
}