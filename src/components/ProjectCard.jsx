import { Link } from "react-router-dom";

export function ProjectCard({ id, title, description, image_url, tech_stack, github_url, demo_url }) {
  return (
    <article 
      style={{
        backgroundColor: "#1e1e1e", // Gris très foncé pour l'effet "carte"
        borderRadius: "15px",
        overflow: "hidden", // Permet à l'image d'épouser les bords arrondis en haut
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", // Ombre profonde
        display: "flex",
        flexDirection: "column",
        height: "100%", // Permet aux cartes d'avoir toutes la même hauteur dans une grille
        fontFamily: "'Inter', sans-serif, system-ui",
      }}
    >
      {/* 1. IMAGE DE COUVERTURE */}
      <img 
        src={image_url} 
        alt={`Couverture du projet ${title}`} 
        style={{
          width: "100%",
          height: "220px", // Hauteur fixe pour l'uniformité
          objectFit: "cover", // Coupe l'image sans la déformer pour remplir le cadre
          borderBottom: "2px solid #D4AF37" // Liseré doré très chic sous l'image
        }} 
      />

      {/* 2. CONTENU TEXTUEL */}
      <div style={{ 
        padding: "1.5rem", 
        display: "flex", 
        flexDirection: "column", 
        flexGrow: 1 // Prend tout l'espace restant pour pousser le lien "Voir plus" tout en bas
      }}>
        
        <h2 style={{ 
          color: "#f8f9fa", // Blanc cassé
          fontSize: "1.25rem", 
          fontWeight: "600", 
          margin: "0 0 1rem 0",
          lineHeight: "1.3"
        }}>
          {title.length > 50 ? title.slice(0, 50) + "..." : title}
        </h2>
        
        <p style={{ 
          color: "#a0a0a0", // Gris clair pour la lecture
          fontSize: "0.95rem", 
          lineHeight: "1.6", 
          margin: "0 0 1.5rem 0",
          flexGrow: 1
        }}>
          {description}
        </p>

        {/* 3. LIEN D'ACTION */}
        <Link 
          to={`/projects/${id}`} 
          style={{
            display: "inline-block",
            color: "#D4AF37", // Or
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginTop: "auto" // S'assure que le lien reste collé en bas de la carte
          }}
        >
          Voir les détails →
        </Link>
        
      </div>
    </article>
  );
}