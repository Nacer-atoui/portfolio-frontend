import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/apiFetch";

export function ContactForm() {
  const { apiFetch } = useFetch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (data) => {
    try {
      const result = await apiFetch("/contact/", {
        method: "POST",
        body: JSON.stringify(data), 
      });
      
      alert("Message envoyé !");
      reset();
      
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  // --- DÉFINITION DES STYLES (Thème sombre & Or) ---
  const labelStyle = {
    color: "#a0a0a0",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "block",
    marginBottom: "0.5rem"
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#121212", // Fond très sombre
    border: "1px solid #333", // Bordure discrète
    borderRadius: "8px",
    color: "#f8f9fa",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontFamily: "inherit"
  };

  const errorStyle = {
    color: "#ff6b6b", // Rouge doux adapté au mode sombre
    fontSize: "0.85rem",
    margin: "0.5rem 0 0 0"
  };

  return (
    <main className="form-container" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      
      {/* On cache le H1 visuellement s'il est redondant avec le "Contactez-moi" de la page d'accueil, 
          tout en le gardant pour le SEO et l'accessibilité */}
      <h1 style={{ display: "none" }}>Contact</h1>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
          gap: "1.5rem",
          backgroundColor: "#1e1e1e", // Effet "carte" pour détacher le formulaire du fond
          padding: "clamp(1.5rem, 5vw, 3rem)", // Padding responsive
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" // Ombre portée élégante
        }}
      >
        {/* 1. NOM */}
        <div>
          <label htmlFor="name" style={labelStyle}>Votre nom</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name", {
              required: "Le nom est obligatoire.",
              minLength: {
                value: 2,
                message: "Le nom doit faire au moins 2 caractères.",
              },
            })}
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        {/* 2. E-MAIL */}
        <div>
          <label htmlFor="email" style={labelStyle}>Votre e-mail</label>
          <input
            id="email"
            type="email"
            placeholder="john@exemple.com"
            {...register("email", {
              required: "L'e-mail est obligatoire.",
            })}
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        {/* 3. MESSAGE */}
        <div>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Comment puis-je vous aider ?"
            {...register("message", {
              required: "Le message est obligatoire.",
              minLength: {
                value: 8,
                message: "Le message doit faire au moins 8 caractères.",
              },
            })}
            style={{ ...inputStyle, resize: "vertical" }} // Permet d'agrandir la zone de texte de haut en bas
          />
          {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
        </div>

        {/* BOUTON SUBMIT */}
        <button
          type="submit"
          style={{
            padding: "1rem 2.5rem",
            backgroundColor: "#D4AF37", // Or
            color: "#121212", // Texte noir
            border: "none",
            borderRadius: "30px", // Forme pilule
            fontWeight: "600",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
            marginTop: "1rem"
          }}
        >
          Envoyer le message
        </button>

      </form>
    </main>
  );
}