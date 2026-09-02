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
    defaultValues: {
      title: "",
      description: "",
      github_url: "",
      demo_url: "",
      stacks: [{ name: "", type: "", logo_url: "" }],
      images: [{ file: null }], 
    },
  });

  // Gestion dynamique des technologies (Stacks)
  const {
    fields: stackFields,
    append: appendStack,
    remove: removeStack,
  } = useFieldArray({
    control,
    name: "stacks",
  });

  // Gestion dynamique des images
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const handleSubmitForm = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.github_url) formData.append("github_url", data.github_url);
      if (data.demo_url) formData.append("demo_url", data.demo_url);

      formData.append("stacks", JSON.stringify(data.stacks));

      data.images.forEach((imgObj) => {
        if (imgObj.file && imgObj.file[0]) {
          formData.append("image_url", imgObj.file[0]);
        }
      });

      await apiFetch("/projects", {
        method: "POST",
        body: formData,
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
          <h1 className="text-gray-950 text-3xl font-bold font-['Atkinson Hyperlegible'] leading-10">
            Édition du Projet
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal font-['Atkinson Hyperlegible'] leading-7">
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
              <label
                htmlFor="title"
                className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
              >
                Titre du projet *
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-900 text-base font-normal font-['Atkinson Hyperlegible']"
                {...register("title", {
                  required: "Le titre est obligatoire.",
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs font-semibold mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
              >
                Description *
              </label>
              <textarea
                id="description"
                rows="5"
                className="w-full px-4 py-3.5 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 transition-all text-gray-900 text-base font-normal font-['Atkinson Hyperlegible'] resize-y"
                {...register("description", {
                  required: "La description est obligatoire.",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-xs font-semibold mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="github_url"
                  className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
                >
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
                <label
                  htmlFor="demo_url"
                  className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
                >
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

          {/* --- SECTION 2 : IMAGES --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-gray-950 text-xl font-bold font-['Atkinson Hyperlegible']">
                Galerie d'images
              </h2>
              <p className="text-slate-600 text-sm font-normal font-['Atkinson Hyperlegible']">
                Sélectionnez un fichier image local pour l'importer dans votre galerie.
              </p>
            </div>

            {imageFields.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-end">
                <div className="flex-1 flex flex-col gap-2">
                  <label 
                    htmlFor={`image-${index}`} 
                    className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
                  >
                    Fichier Image {index + 1} *
                  </label>
                  <input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 bg-stone-50 rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm text-gray-500
                      file:mr-4 file:py-1 file:px-3
                      file:rounded-sm file:border-0
                      file:text-xs file:font-semibold
                      file:bg-blue-50 file:text-blue-950
                      hover:file:bg-blue-100"
                    {...register(`images.${index}.file`, {
                      required: "Veuillez sélectionner un fichier image.",
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
              onClick={() => appendImage({ file: null })}
              className="mt-2 py-3 border-2 border-dashed border-stone-300 text-slate-600 hover:text-blue-950 hover:border-blue-950 hover:bg-stone-50 transition-all rounded-sm text-xs font-bold font-['Atkinson Hyperlegible'] uppercase tracking-wide"
            >
              + Ajouter une image
            </button>
          </div>

          {/* --- SECTION 3 : STACK TECHNIQUE --- */}
          <div className="pt-8 border-t border-stone-300 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-gray-950 text-xl font-bold font-['Atkinson Hyperlegible']">
                Technologies utilisées
              </h2>
            </div>

            {stackFields.map((item, index) => (
              <div
                key={item.id}
                className="p-4 border border-stone-200 bg-stone-50/50 rounded-sm flex flex-col gap-4 relative"
              >
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
                    <label 
                      htmlFor={`stackname-${index}`} 
                      className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
                    >
                      Nom *
                    </label>
                    <input
                      id={`stackname-${index}`}
                      type="text"
                      className="w-full px-3 py-2 bg-white rounded-sm border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-950"
                      {...register(`stacks.${index}.name`, { required: true })}
                    />
                    {errors.stacks?.[index]?.name && (
                      <span className="text-red-500 text-xs font-semibold mt-1">
                        {errors.stacks[index].name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label 
                      htmlFor={`stacktype-${index}`} 
                      className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
                    >
                      Type *
                    </label>
                    <select
                      id={`stacktype-${index}`}
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
                    {errors.stacks?.[index]?.type && (
                      <span className="text-red-500 text-xs font-semibold mt-1">
                        {errors.stacks[index].type.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor={`urllogo-${index}`} 
                    className="text-zinc-700 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase"
                  >
                    URL du Logo
                  </label>
                  <input
                    id={`urllogo-${index}`}
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
            <Link
              to="/admin"
              className="px-6 py-3 border border-gray-900 hover:bg-gray-100 transition-colors rounded-sm"
            >
              <span className="text-gray-900 text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
                Annuler
              </span>
            </Link>

            <button
              type="submit"
              disabled={status === "Enregistrement du projet en cours..."}
              className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm"
            >
              <span className="text-white text-xs font-bold font-['Atkinson Hyperlegible'] uppercase">
                Enregistrer le projet
              </span>
              
            </button>

                    {status && status !== "Enregistrement du projet en cours..." && (
          <p className={`w-full text-center text-sm font-medium mt-1 ${status.includes("succès") ? "text-green-600" : "text-red-500"}`}>
            {status}
          </p>
        )}
          </div>
        </form>
      </div>
    </main>
  );
}