import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFetch } from "../../hooks/apiFetch";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toast";

export function EditProjectPage() {
  const { id } = useParams();
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      github_url: "",
      demo_url: "",
      stacks: [],
      images: [],
    },
  });

  const {
    fields: stackFields,
    append: appendStack,
    remove: removeStack,
  } = useFieldArray({ control, name: "stacks" });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  // --- RECUPERATION DES DONNEES AU CHARGEMENT ---
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const data = await apiFetch(`/projects/${id}`);

        reset({
          ...data,
          // On initialise les images avec leur URL existante et un champ file vide
          images: data.images?.length
            ? data.images.map((img) => ({ image_url: img.image_url, file: null }))
            : [{ image_url: "", file: null }],

          stacks: data.stacks?.length
            ? data.stacks.map((stack) => ({
                name: stack.name,
                type: stack.type,
                logo_url: stack.logo_url || "",
              }))
            : [{ name: "", type: "", logo_url: "" }],
        });
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        toast.error("Impossible de charger les données du projet.");
      }
    };

    fetchProjectData();
  }, [id, reset]);

  // --- SOUMISSION DE LA MISE A JOUR ---
  const handleSubmitForm = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.github_url) formData.append("github_url", data.github_url);
      if (data.demo_url) formData.append("demo_url", data.demo_url);
      formData.append("stacks", JSON.stringify(data.stacks));

      // Gestion des images : on sépare les anciennes URLs des nouveaux fichiers
      const existingImages = [];
      data.images.forEach((imgObj) => {
        // S'il y a un nouveau fichier sélectionné
        if (imgObj.file && imgObj.file.length > 0) {
          formData.append("image_url", imgObj.file[0]);
        } 
        // Sinon, si c'est une ancienne image qu'on n'a pas modifiée
        else if (imgObj.image_url) {
          existingImages.push(imgObj.image_url);
        }
      });

      // On envoie les anciennes images sous forme de JSON pour que le backend 
      // sache lesquelles conserver (à adapter selon la logique de ton backend)
      if (existingImages.length > 0) {
        formData.append("existing_images", JSON.stringify(existingImages));
      }

      await apiFetch(`/projects/${id}`, {
        method: "PUT",
        // ATTENTION : On enlève le Content-Type: application/json
        // Le navigateur s'occupe de mettre multipart/form-data
        body: formData,
      });

      toast.success("Projet mis à jour avec succès !");
      navigate("/admin");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Erreur lors de la modification du projet.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-stone-50 flex justify-center items-start pt-12 pb-24 px-6">
      <div className="w-full max-w-3xl flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-950 text-3xl font-bold font-['Atkinson Hyperlegible'] leading-10">
            Modification du Projet
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal font-['Atkinson Hyperlegible'] leading-7">
            Mettez à jour les informations, les images ou les technologies de ce projet.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full p-6 md:p-8 bg-white rounded-lg shadow-sm border border-stone-300 flex flex-col gap-8"
        >
          {/* --- SECTION 1 : INFOS DE BASE DU PROJET --- */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
                Titre du projet *
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-900 text-base font-normal font-['Atkinson Hyperlegible']"
                {...register("title", { required: "Le titre est obligatoire." })}
              />
              {errors.title && <span className="text-red-500 text-xs font-semibold mt-1">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
                Description *
              </label>
              <textarea
                id="description"
                rows="5"
                className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-900 text-base font-normal font-['Atkinson Hyperlegible'] resize-y"
                {...register("description", { required: "La description est obligatoire." })}
              />
              {errors.description && <span className="text-red-500 text-xs font-semibold mt-1">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="github_url" className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
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
                <label htmlFor="demo_url" className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
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

          {/* --- SECTION 2 : IMAGES (ADAPTÉE POUR L'ÉDITION) --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-gray-950 text-xl font-bold font-['Atkinson Hyperlegible']">Galerie d'images</h2>
              <p className="text-slate-600 text-sm font-normal font-['Atkinson Hyperlegible']">
                Gérez vos images. Uploadez un nouveau fichier pour remplacer une image existante.
              </p>
            </div>

            {imageFields.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
                    Image {index + 1}
                  </label>
                  
                  {/* Indication visuelle si une image existe déjà */}
                  {item.image_url && (
                    <span className="text-xs text-slate-500 mb-1">
                      Image actuelle : <a href={item.image_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Voir</a> (Sélectionnez un fichier pour la remplacer)
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm text-gray-500
                      file:mr-4 file:py-1 file:px-3
                      file:rounded-sm file:border-0
                      file:text-xs file:font-semibold
                      file:bg-blue-50 file:text-blue-950
                      hover:file:bg-blue-100"
                    {...register(`images.${index}.file`, {
                      // Requis uniquement si c'est une nouvelle image (pas d'ancienne URL)
                      required: item.image_url ? false : "Veuillez sélectionner un fichier image.",
                    })}
                  />
                  {errors.images?.[index]?.file && (
                    <span className="text-red-500 text-xs font-semibold mt-1">
                      {errors.images[index].file.message}
                    </span>
                  )}
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
              onClick={() => appendImage({ image_url: "", file: null })}
              className="mt-2 py-3 border-2 border-dashed border-stone-300 text-slate-600 hover:text-blue-950 hover:border-blue-950 hover:bg-stone-50 transition-all rounded-sm text-xs font-bold font-['Atkinson Hyperlegible'] uppercase tracking-wide"
            >
              + Ajouter une image
            </button>
          </div>

          {/* --- SECTION 3 : STACK TECHNIQUE --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-gray-950 text-xl font-bold font-['Atkinson Hyperlegible']">Technologies utilisées</h2>
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
                    <label className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">Nom *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                      {...register(`stacks.${index}.name`, { required: true })}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">Type *</label>
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
                  <label className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">URL du Logo</label>
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
              className="mt-2 py-3 border-2 border-dashed border-stone-300 text-slate-600 hover:text-blue-950 hover:border-blue-950 hover:bg-stone-50 transition-all rounded-sm text-xs font-bold font-['Atkinson Hyperlegible'] uppercase tracking-wide"
            >
              + Ajouter une technologie
            </button>
          </div>

          {/* --- ACTIONS --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-wrap justify-end items-center gap-4">
            <Link to="/admin" className="px-6 py-3 border border-gray-900 hover:bg-gray-100 transition-colors rounded-sm">
              <span className="text-gray-900 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">Annuler</span>
            </Link>

            <button type="submit" className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm shadow-sm flex justify-center items-center cursor-pointer">
              <span className="text-white text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">Mettre à jour le projet</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}