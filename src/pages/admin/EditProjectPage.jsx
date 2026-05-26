import { useNavigate, useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/apiFetch";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toast";

export function EditProjectPage() {
  const [projectEdit, setProjectEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams();
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
      await apiFetch("/projects/" + id, {
        method: "PUT",
        body: JSON.stringify(data), 
      });
      
      toast.success("Projet modifié avec succès !");
      navigate("/admin");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      toast.error("Erreur lors de la modification du projet.");
    }
  };

  useEffect(() => {
    const fetchProjectEdit = async () => {
      try {
        const data = await apiFetch('/projects/' + id);
        setProjectEdit(data);
        reset(data); // Pré-remplit les champs de react-hook-form
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjectEdit();
  }, [id]);

  // --- STYLES DES ÉTATS (Chargement, Erreur) ---
  const stateContainerClass = "w-full min-h-screen bg-stone-50 flex justify-center items-center p-6";
  const stateTextClass = "text-center text-blue-950 text-xl font-medium font-['Inter']";

  if (loading) return <main className={stateContainerClass}><p className={stateTextClass}>Chargement du projet...</p></main>;
  if (error) return <main className={stateContainerClass}><p className={`${stateTextClass} text-red-600`}>Erreur : {error}</p></main>;
  if (!projectEdit) return <main className={stateContainerClass}><p className={stateTextClass}>Projet introuvable.</p></main>;

  return (
    <main className="w-full min-h-screen bg-stone-50 flex justify-center items-start pt-12 pb-24 px-6">
      
      {/* Conteneur principal */}
      <div className="w-full max-w-3xl flex flex-col gap-10">
        
        {/* En-tête */}
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-950 text-3xl font-bold font-['Inter'] leading-10">
            Édition du Projet
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-7">
            Modifiez les détails de ce projet pour mettre à jour le portfolio.
          </p>
        </div>

        {/* Formulaire (Carte blanche) */}
        <form 
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full p-6 md:p-8 bg-white rounded-lg shadow-sm border border-stone-300 flex flex-col gap-8"
        >
          
          {/* 1. TITRE */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-zinc-700 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Titre du projet *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Ex: E-commerce Platform"
              className={`w-full px-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-gray-900 text-base font-normal font-['Inter'] ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
              {...register("title", {
                required: "Le titre est obligatoire.",
                minLength: { value: 2, message: "Le titre doit faire au moins 2 caractères." },
                maxLength: { value: 150, message: "Le titre doit faire au maximum 150 caractères." },
              })}
            />
            {errors.title && <span className="text-red-500 text-xs font-medium">{errors.title.message}</span>}
          </div>

          {/* 2. DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-zinc-700 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Description *
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="Détaillez les défis techniques et les solutions apportées..."
              className={`w-full px-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-gray-900 text-base font-normal font-['Inter'] resize-y ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
              {...register("description", {
                required: "La description est obligatoire.",
                maxLength: { value: 2000, message: "La description doit faire au maximum 2000 caractères." },
              })}
            />
            {errors.description && <span className="text-red-500 text-xs font-medium">{errors.description.message}</span>}
          </div>

          {/* 3. TECH STACK */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tech_stack" className="text-zinc-700 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              Stack technique
            </label>
            <input
              id="tech_stack"
              type="text"
              placeholder="Ex: React, Node.js, PostgreSQL"
              className={`w-full px-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-gray-900 text-base font-normal font-['Inter'] ${errors.tech_stack ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
              {...register("tech_stack", {
                maxLength: { value: 255, message: "La stack technique doit faire au maximum 255 caractères." },
              })}
            />
            <span className="text-slate-500 text-xs font-mono">Séparez les technologies par des virgules.</span>
            {errors.tech_stack && <span className="text-red-500 text-xs font-medium">{errors.tech_stack.message}</span>}
          </div>

          {/* Grille pour les URLs (Côte à côte sur PC) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 4. GITHUB URL */}
            <div className="flex flex-col gap-2">
              <label htmlFor="github_url" className="text-zinc-700 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                URL GitHub
              </label>
              <input
                id="github_url"
                type="url"
                placeholder="https://github.com/..."
                className={`w-full px-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-gray-900 text-base font-normal font-['Inter'] ${errors.github_url ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
                {...register("github_url")}
              />
              {errors.github_url && <span className="text-red-500 text-xs font-medium">{errors.github_url.message}</span>}
            </div>

            {/* 5. DEMO URL */}
            <div className="flex flex-col gap-2">
              <label htmlFor="demo_url" className="text-zinc-700 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                URL de la démo
              </label>
              <input
                id="demo_url"
                type="url"
                placeholder="https://..."
                className={`w-full px-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-gray-900 text-base font-normal font-['Inter'] ${errors.demo_url ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
                {...register("demo_url")}
              />
              {errors.demo_url && <span className="text-red-500 text-xs font-medium">{errors.demo_url.message}</span>}
            </div>
            
          </div>

          {/* 6. IMAGE URL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="image_url" className="text-zinc-700 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
              URL de l'image de couverture
            </label>
            <input
              id="image_url"
              type="text"
              placeholder="https://..."
              className={`w-full px-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-gray-900 text-base font-normal font-['Inter'] ${errors.image_url ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
              {...register("image_url")}
            />
            {errors.image_url && <span className="text-red-500 text-xs font-medium">{errors.image_url.message}</span>}
          </div>

          {/* Actions (Boutons) */}
          <div className="pt-6 border-t border-stone-300 flex flex-wrap justify-end items-center gap-4">
            
            {/* Bouton Annuler */}
            <Link 
              to="/admin" 
              className="px-6 py-3 border border-gray-900 hover:bg-gray-100 transition-colors rounded-sm flex justify-center items-center"
            >
              <span className="text-gray-900 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                Annuler
              </span>
            </Link>

            {/* Bouton Mettre à jour */}
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm shadow-sm flex justify-center items-center cursor-pointer"
            >
              <span className="text-white text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                Mettre à jour le projet
              </span>
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}