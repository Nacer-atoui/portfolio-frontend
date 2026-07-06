import { useState } from "react";

export function ContactForm() {
  // On utilise "name" au lieu de "nom" pour correspondre à l'attribut name="name" de l'input HTML
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // Pour afficher un message de succès/erreur

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      // On pointe bien vers le port 3001 de ton backend Express
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // On s'assure d'envoyer les clés que ton backend attend (nom, email, message)
        body: JSON.stringify({
          nom: formData.name, 
          email: formData.email,
          message: formData.message
        }),
      });

      if (response.ok) {
        setStatus("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" }); // On vide le formulaire
      } else {
        setStatus("Une erreur s'est produite lors de l'envoi.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Erreur de connexion au serveur.");
    }
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
            value={formData.name} // On relie la valeur à l'état React
            onChange={handleChange} // On met à jour l'état quand l'utilisateur tape
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Détaillez votre projet..." 
            className="w-full px-4 py-3 bg-stone-50 rounded-sm outline outline-1 outline-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-950 text-base font-normal font-['Inter'] placeholder-zinc-500 resize-y"
            required
          ></textarea>
        </div>

        {/* Bouton de soumission */}
        <button 
          type="submit" 
          disabled={status === "Envoi en cours..."} // On désactive le bouton pendant l'envoi
          className="w-full py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm text-center text-white text-base font-medium font-['Inter'] leading-6 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "Envoi en cours..." ? "Envoi en cours..." : "Envoyer le message"}
        </button>

        {/* Affichage conditionnel du statut de l'envoi */}
        {status && status !== "Envoi en cours..." && (
          <p className={`w-full text-center text-sm font-medium mt-1 ${status.includes("succès") ? "text-green-600" : "text-red-500"}`}>
            {status}
          </p>
        )}
        
      </form>
    </main>
  );
}