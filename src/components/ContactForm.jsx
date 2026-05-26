import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/apiFetch";
import { toast } from "react-toast";

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
      
      toast.success("Message envoyé !");
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
          onSubmit={handleSubmit} 
          className="w-full flex flex-col justify-start items-start gap-6"
        >
          
          {/* Champ Nom & Prénom */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name" className="text-blue-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Nom & Prénom
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="John Doe" 
              className="w-full px-4 py-3.5 bg-stone-50 rounded-sm outline outline-1 outline-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-950 text-base font-normal font-['Inter'] placeholder-zinc-500"
              required
            />
          </div>

          {/* Champ Email */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-blue-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Email
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="john@example.com" 
              className="w-full px-4 py-3.5 bg-stone-50 rounded-sm outline outline-1 outline-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-950 text-base font-normal font-['Inter'] placeholder-zinc-500"
              required
            />
          </div>

          {/* Champ Message */}
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="message" className="text-blue-950 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Message
            </label>
            <textarea 
              id="message"
              name="message"
              rows="5"
              placeholder="Détaillez votre projet..." 
              className="w-full px-4 py-3 bg-stone-50 rounded-sm outline outline-1 outline-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-950 text-base font-normal font-['Inter'] placeholder-zinc-500 resize-y"
              required
            ></textarea>
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm text-center text-white text-base font-medium font-['Inter'] leading-6 cursor-pointer shadow-sm"
          >
            Envoyer le message
          </button>
          
        </form>
    </main>
  );
}