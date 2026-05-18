import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/apiFetch";
import { useForm } from "react-hook-form";

export function CreateProjectPage() {
  const { apiFetch } = useFetch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async (data) => {
    try {
      const result = await apiFetch("/projects/", {
        method: "POST",
        body: JSON.stringify(data), 
      });
      
      alert("Projet ajouté !");
      navigate("/admin");
      
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  // --- DÉFINITION DES STYLES ---

  const mainStyle = {
    backgroundColor: "#121212",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4rem 1.5rem",
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
    color: "#ff6b6b", // Rouge doux
    fontSize: "0.85rem",
    margin: "0.5rem 0 0 0"
  };

  return (
    <main className="form-container" style={mainStyle}>
      
      <h1 style={{ 
        fontSize: "clamp(1.5rem, 5vw, 2.5rem)", 
        fontWeight: "700", 
        marginBottom: "2.5rem",
        textAlign: "center"
      }}>
        Créer un nouveau <span style={{ color: "#D4AF37" }}>Projet</span>
      </h1>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "600px", // Un peu plus large pour être confortable
          gap: "1.5rem",
          backgroundColor: "#1e1e1e", // Effet carte
          padding: "clamp(1.5rem, 5vw, 3rem)",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* 1. TITLE */}
        <div>
          <label htmlFor="title" style={labelStyle}>Titre du projet *</label>
          <input
            id="title"
            type="text"
            placeholder="Mon Super Projet"
            {...register("title", {
              required: "Le titre est obligatoire.",
              minLength: {
                value: 2,
                message: "Le titre doit faire au moins 2 caractères.",
              },
              maxLength: {
                value: 150,
                message: "Le titre doit faire au maximum 150 caractères.",
              },
            })}
            style={inputStyle}
          />
          {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
        </div>

        {/* 2. DESCRIPTION */}
        <div>
          <label htmlFor="description" style={labelStyle}>Description *</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Expliquez brièvement le but du projet..."
            {...register("description", {
              required: "La description est obligatoire.", // J'ai rajouté le required logique ici
              maxLength: {
                value: 2000,
                message: "La description doit faire au maximum 2000 caractères.",
              },
            })}
            style={{ ...inputStyle, resize: "vertical" }}
          />
          {errors.description && <p style={errorStyle}>{errors.description.message}</p>}
        </div>

        {/* 3. TECH_STACK */}
        <div>
          <label htmlFor="tech_stack" style={labelStyle}>
            Stack technique (ex: React, Node.js)
          </label>
          <input
            id="tech_stack"
            type="text"
            placeholder="React, Express, MySQL"
            {...register("tech_stack", {
              maxLength: {
                value: 255,
                message: "La stack technique doit faire au maximum 255 caractères.",
              },
            })}
            style={inputStyle}
          />
          {errors.tech_stack && <p style={errorStyle}>{errors.tech_stack.message}</p>}
        </div>

        {/* 4. GITHUB_URL */}
        <div>
          <label htmlFor="github_url" style={labelStyle}>URL GitHub</label>
          <input
            id="github_url"
            type="url"
            placeholder="https://github.com/..."
            {...register("github_url")}
            style={inputStyle}
          />
          {errors.github_url && <p style={errorStyle}>{errors.github_url.message}</p>}
        </div>

        {/* 5. DEMO_URL */}
        <div>
          <label htmlFor="demo_url" style={labelStyle}>URL de la démo (Live)</label>
          <input
            id="demo_url"
            type="url"
            placeholder="https://mon-projet.com"
            {...register("demo_url")}
            style={inputStyle}
          />
          {errors.demo_url && <p style={errorStyle}>{errors.demo_url.message}</p>}
        </div>

        {/* 6. IMAGE_URL */}
        <div>
          <label htmlFor="image_url" style={labelStyle}>URL de l'image de couverture</label>
          <input
            id="image_url"
            type="text"
            placeholder="/images/projet1.png ou https://..."
            {...register("image_url")}
            style={inputStyle}
          />
          {errors.image_url && <p style={errorStyle}>{errors.image_url.message}</p>}
        </div>

        {/* BOUTON SUBMIT */}
        <button
          type="submit"
          style={{
            padding: "1rem 2.5rem",
            backgroundColor: "#D4AF37",
            color: "#121212",
            border: "none",
            borderRadius: "30px",
            fontWeight: "600",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
            marginTop: "1rem"
          }}
        >
          Enregistrer le projet
        </button>
      </form>
    </main>
  );
}