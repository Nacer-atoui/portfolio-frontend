import { useNavigate, Link } from "react-router-dom";
import { useFetch } from "../../hooks/apiFetch";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toast";

export function CreateProjectPage() {
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // On initialise le formulaire avec un champ vide pour une image et une stack
    defaultValues: {
      stacks: [{ name: "", type: "", logo_url: "" }],
      images: [{ image_url: "" }], // Nouveau tableau pour les images
    },
  });

  // Gestion dynamique des technologies (Stacks)
  const { 
    fields: stackFields, 
    append: appendStack, 
    remove: removeStack 
  } = useFieldArray({
    control,
    name: "stacks",
  });

  // Gestion dynamique des images
  const { 
    fields: imageFields, 
    append: appendImage, 
    remove: removeImage 
  } = useFieldArray({
    control,
    name: "images",
  });

  const handleSubmitForm = async (data) => {
    try {
      await apiFetch("/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.success("Projet ajouté !");
      navigate("/admin");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      toast.error("Erreur lors de la création du projet.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-stone-50 flex justify-center items-start pt-12 pb-24 px-6">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-950 text-3xl font-bold font-['Inter'] leading-10">
            Édition du Projet
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-7">
            Ajoutez ou modifiez les détails d'un projet pour le portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full p-6 md:p-8 bg-white rounded-lg shadow-sm border border-stone-300 flex flex-col gap-8"
        >
          {/* --- SECTION 1 : INFOS DE BASE DU PROJET --- */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">
                Titre du projet *
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-900 text-base font-normal font-['Inter']"
                {...register("title", { required: "Le titre est obligatoire." })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">
                Description *
              </label>
              <textarea
                id="description"
                rows="5"
                className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-900 text-base font-normal font-['Inter'] resize-y"
                {...register("description", { required: "La description est obligatoire." })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="github_url" className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">
                  URL GitHub
                </label>
                <input
                  id="github_url"
                  type="url"
                  className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                  {...register("github_url")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="demo_url" className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">
                  URL de la démo
                </label>
                <input
                  id="demo_url"
                  type="url"
                  className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                  {...register("demo_url")}
                />
              </div>
            </div>
          </div>

          {/* --- SECTION 2 : IMAGES (NOUVEAU) --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-gray-950 text-xl font-bold font-['Inter']">
                Galerie d'images
              </h2>
              <p className="text-slate-600 text-sm font-normal font-['Inter']">
                Ajoutez une ou plusieurs images pour illustrer votre projet.
              </p>
            </div>

            {imageFields.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">
                    URL de l'image {index + 1}
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                    {...register(`images.${index}.image_url`, { required: "L'URL est requise" })}
                  />
                </div>
                
                {imageFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="mb-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-sm text-xs font-bold uppercase transition-colors"
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendImage({ image_url: "" })}
              className="mt-2 py-3 border-2 border-dashed border-stone-300 text-slate-600 hover:text-blue-950 hover:border-blue-950 hover:bg-stone-50 transition-all rounded-sm text-xs font-bold font-['Inter'] uppercase tracking-wide"
            >
              + Ajouter une image
            </button>
          </div>

          {/* --- SECTION 3 : STACK TECHNIQUE --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-gray-950 text-xl font-bold font-['Inter']">
                Technologies utilisées
              </h2>
            </div>

            {stackFields.map((item, index) => (
              <div key={item.id} className="p-4 border border-stone-200 bg-stone-50/50 rounded-sm flex flex-col gap-4 relative">
                
                {stackFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStack(index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider"
                  >
                    Retirer
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">Nom *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                      {...register(`stacks.${index}.name`, { required: true })}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">Type *</label>
                    <select
                      className="w-full px-3 py-2 bg-white rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                      {...register(`stacks.${index}.type`, { required: true })}
                    >
                      <option value="">Sélectionner</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Base de données</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-700 text-xs font-bold font-['Inter'] uppercase">URL du Logo</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 bg-white rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                    {...register(`stacks.${index}.logo_url`)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendStack({ name: "", type: "", logo_url: "" })}
              className="mt-2 py-3 border-2 border-dashed border-stone-300 text-slate-600 hover:text-blue-950 hover:border-blue-950 hover:bg-stone-50 transition-all rounded-sm text-xs font-bold font-['Inter'] uppercase tracking-wide"
            >
              + Ajouter une technologie
            </button>
          </div>

          {/* --- ACTIONS --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-wrap justify-end items-center gap-4">
            <Link to="/admin" className="px-6 py-3 border border-gray-900 hover:bg-gray-100 transition-colors rounded-sm">
              <span className="text-gray-900 text-xs font-bold font-['Inter'] uppercase">Annuler</span>
            </Link>

            <button type="submit" className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm">
              <span className="text-white text-xs font-bold font-['Inter'] uppercase">Enregistrer le projet</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}