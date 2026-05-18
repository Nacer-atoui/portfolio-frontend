import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/apiFetch";
import { ProjectsPage } from "./ProjectsPage"; // Conservé comme dans ton fichier d'origine

// fonction pour afficher l'article dans sa page individuellement
export function ProjectDetailPage() {
  const { apiFetch } = useFetch();
  const { id } = useParams(); // récupère le paramètre dynamique
  const [projectDetail, setProjectDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const data = await apiFetch('/projects/' + id);
        setProjectDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id, apiFetch]); // apiFetch ajouté aux dépendances

  // --- DÉFINITION DES STYLES ---

  const mainStyle = {
    backgroundColor: "#121212",
    minHeight: "100vh",
    padding: "clamp(2rem, 5vw, 4rem) 1.5rem",
    fontFamily: "'Inter', sans-serif, system-ui",
    color: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center" // Centre le conteneur principal
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "800px", // Largeur idéale pour la lecture d'un article
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  };

  const backLinkStyle = {
    display: "inline-block",
    color: "#D4AF37", // Or
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "1rem"
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 6vw, 3.5rem)", // S'adapte parfaitement du mobile au PC
    fontWeight: "800",
    color: "#ffffff",
    margin: "0",
    lineHeight: "1.2"
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "500px",
    objectFit: "cover", // Coupe l'image proprement sans la déformer
    borderRadius: "15px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)", // Ombre profonde
    borderBottom: "3px solid #D4AF37", // Soulignement doré très chic
    backgroundColor: "#1e1e1e" // Couleur de fond si l'image met du temps à charger
  };

  const textStyle = {
    fontSize: "1.1rem",
    lineHeight: "1.8", // Très aéré pour la lecture
    color: "#d0d0d0", // Gris très clair, presque blanc, pour reposer les yeux
    whiteSpace: "pre-wrap" // Permet de respecter les sauts de ligne si ta description en a
  };

  // Conditions avec le thème sombre
  if (loading) return <main style={mainStyle}><p style={{ color: "#D4AF37", fontSize: "1.2rem", marginTop: "10vh" }}>Chargement du projet...</p></main>;
  if (error) return <main style={mainStyle}><p style={{ color: "#ff6b6b", fontSize: "1.2rem", marginTop: "10vh" }}>Erreur : {error}</p></main>;
  if (!projectDetail) return <main style={mainStyle}><p style={{ color: "#a0a0a0", fontSize: "1.2rem", marginTop: "10vh" }}>Projet introuvable.</p></main>;

  return (
    <main className="article-card-detail" style={mainStyle}>
      
      <article style={containerStyle}>
        
        {/* Lien de retour */}
        <div>
          <Link to={"/projects/"} style={backLinkStyle}>
            ← Retour aux projets
          </Link>
        </div>
        
        {/* En-tête de l'article (Titre + Image) */}
        <header style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <h1 id="title-detail" className='titleCard' style={titleStyle}>
            {projectDetail.title}
          </h1>
          
          {/* L'attribut alt dynamique est meilleur pour l'accessibilité que "toto" ;) */}
          <img 
            className='img-article-detail' 
            src={projectDetail.image_url} 
            alt={`Aperçu du projet ${projectDetail.title}`} 
            style={imageStyle} 
          />
        </header>

        {/* Corps de l'article */}
        <div className="content-detail" style={{ padding: "1rem 0 3rem 0" }}>
          <p id="p-detail" style={textStyle}>
            {projectDetail.description}
          </p>
          
          {/* Si tu veux afficher les liens GitHub / Demo plus tard, tu pourras les mettre ici ! */}
        </div>

      </article>

    </main>
  );
}