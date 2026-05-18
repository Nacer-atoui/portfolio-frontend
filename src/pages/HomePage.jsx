import { ContactForm } from "../components/ContactForm";
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main style={{ backgroundColor: "#121212", color: "#f8f9fa", minHeight: "100vh", fontFamily: "'Inter', sans-serif, system-ui" }}>
      
      {/* --- ZONE HERO --- */}
      <section className="hero-section" style={{ 
        minHeight: "75vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "4rem 1.5rem", 
        textAlign: "center",
        borderBottom: "1px solid #2a2a2a" // Légère ligne de séparation grise
      }}>
        
        <h1 className="hero-title" style={{ 
          fontSize: "clamp(2rem, 8vw, 3.5rem)", // S'adapte du mobile au PC
          fontWeight: "700",
          marginBottom: "1.5rem",
          color: "#ffffff"
        }}>
          Bonjour, je suis <span style={{ color: "#D4AF37" }}>Nacer Atoui</span>
        </h1>

        <p className="hero-description" style={{ 
          fontSize: "clamp(1rem, 4vw, 1.15rem)", 
          maxWidth: "600px", 
          margin: "0 auto 3rem auto", 
          color: "#a0a0a0", // Gris élégant pour ne pas agresser l'œil
          lineHeight: "1.6"
        }}>
          Développeur Web passionné par la création d'applications modernes, intuitives et performantes. Bienvenue sur mon portfolio.
        </p>

        <Link 
          to="/projects" 
          className="btn-hero"
          style={{
            display: "inline-block",
            padding: "1rem 2.5rem",
            backgroundColor: "#D4AF37", // Le bouton doré
            color: "#121212", // Texte noir pour le contraste
            textDecoration: "none",
            borderRadius: "30px", // Bouton arrondi style "pilule" très moderne
            fontWeight: "600",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)" // Léger halo doré
          }}
        >
          Découvrir mes projets
        </Link>
        
      </section>

      {/* --- ZONE CONTACT --- */}
      <section style={{ 
        padding: "4rem 1.5rem", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        backgroundColor: "#1a1a1a" // Un fond très légèrement plus clair pour détacher cette section
      }}>
        
        <h2 style={{ 
          fontSize: "clamp(1.5rem, 6vw, 2.5rem)", 
          color: "#ffffff", 
          marginBottom: "2.5rem",
          fontWeight: "600"
        }}>
          Contactez-moi <span style={{ color: "#D4AF37" }}>!</span>
        </h2>

        {/* Le formulaire va s'insérer ici. On lui donnera son propre style noir/or quand tu m'enverras son code ! */}
        <ContactForm />
        
      </section>

    </main>
  );
}