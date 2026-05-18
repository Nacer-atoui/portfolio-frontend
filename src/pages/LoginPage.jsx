import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/apiFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { apiFetch } = useFetch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1. On récupère DIRECTEMENT les données (le token) de l'API
      const responseData = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data), 
      });

      console.log("Réponse du serveur :", responseData); 

      // 2. On passe le token à notre contexte (qui va s'occuper de le ranger dans le localStorage et changer le state)
      login(responseData.token);
      
      // 3. On redirige
      navigate("/admin");

    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  // --- DÉFINITION DES STYLES ---

  const mainStyle = {
    backgroundColor: "#121212",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centre le formulaire parfaitement au milieu de l'écran
    alignItems: "center",
    padding: "2rem 1.5rem",
    fontFamily: "'Inter', sans-serif, system-ui",
    color: "#f8f9fa"
  };

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
    backgroundColor: "#121212", 
    border: "1px solid #333", 
    borderRadius: "8px",
    color: "#f8f9fa",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontFamily: "inherit"
  };

  const errorStyle = {
    color: "#ff6b6b", // Rouge doux adapté au thème sombre
    fontSize: "0.85rem",
    margin: "0.5rem 0 0 0"
  };

  return (
    <main style={mainStyle}>
      
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: "700", margin: "0 0 0.5rem 0" }}>
          Espace <span style={{ color: "#D4AF37" }}>Admin</span>
        </h1>
        <p style={{ color: "#a0a0a0", margin: 0 }}>Veuillez vous connecter pour continuer</p>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px", // Plus étroit qu'un formulaire de contact, parfait pour un login
          gap: "1.5rem",
          backgroundColor: "#1e1e1e", // Effet carte
          padding: "clamp(1.5rem, 5vw, 2.5rem)",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* EMAIL */}
        <div>
          <label htmlFor="email" style={labelStyle}>Adresse e-mail</label>
          <input 
            id="email"
            type="email" 
            placeholder="admin@exemple.com"
            {...register("email", { required: true })} 
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>L'email est requis</p>}
        </div>
        
        {/* MOT DE PASSE */}
        <div>
          <label htmlFor="password" style={labelStyle}>Mot de passe</label>
          <input 
            id="password"
            type="password" 
            placeholder="••••••••"
            {...register("password", { required: true })} 
            style={inputStyle}
          />
          {errors.password && <p style={errorStyle}>Le mot de passe est requis</p>}
        </div>
        
        {/* BOUTON */}
        <button 
          type="submit"
          style={{
            padding: "1rem",
            backgroundColor: "#D4AF37", // Or
            color: "#121212", // Texte noir
            border: "none",
            borderRadius: "30px", // Forme pilule
            fontWeight: "700",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
            marginTop: "0.5rem"
          }}
        >
          Se connecter
        </button> 
      </form>

    </main>
  );
}