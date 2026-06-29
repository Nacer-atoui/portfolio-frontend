import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useFetch } from "../hooks/apiFetch";
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

  return (
    <main className="w-full min-h-screen bg-stone-50 flex justify-center items-center p-6">
      <div className="w-full max-w-md flex flex-col justify-start items-center gap-8">
        
        {/* En-tête de la page */}
        <div className="w-full flex flex-col justify-start items-center gap-2 text-center">
          {/* Icône de cadenas / sécurité */}
          <div className="flex justify-center items-center mb-2">
            <div className="w-12 h-12 bg-gray-950 rounded-full flex justify-center items-center text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-gray-950 text-4xl md:text-5xl font-extrabold font-['Inter'] leading-tight">
            Accès Sécurisé
          </h1>
          <p className="text-slate-600 text-base font-normal font-['Inter'] leading-6 mt-1">
            Authentification requise pour l'administration.
          </p>
        </div>

        {/* Boîte du Formulaire connectée à react-hook-form */}
        <div className="w-full p-8 bg-white rounded-lg shadow-[0px_10px_20px_0px_rgba(26,32,44,0.05)] border border-stone-300">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Champ Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-zinc-900 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                Adresse e-mail
              </label>
              <div className="relative flex items-center">
                {/* Icône Email */}
                <div className="absolute left-3 text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                {/* Input couplé avec register() */}
                <input 
                  type="email" 
                  id="email"
                  placeholder="architect@devportfolio.com" 
                  className={`w-full pl-10 pr-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-stone-700 text-base font-normal font-['Inter'] ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs font-medium mt-1">L'adresse e-mail est requise</span>}
            </div>

            {/* Champ Mot de passe */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-zinc-900 text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                Mot de passe
              </label>
              <div className="relative flex items-center">
                {/* Icône Mot de passe */}
                <div className="absolute left-3 text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                {/* Input couplé avec register() */}
                <input 
                  type="password" 
                  id="password"
                  placeholder="••••••••••••" 
                  className={`w-full pl-10 pr-4 py-3.5 bg-stone-50 rounded-sm border focus:outline-none focus:ring-2 transition-all text-stone-700 text-base font-normal font-['Inter'] tracking-widest ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:ring-blue-950'}`}
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs font-medium mt-1">Le mot de passe est requis</span>}
            </div>

            {/* Bouton de Soumission */}
            <button 
              type="submit" 
              className="w-full mt-2 py-4 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm flex justify-center items-center gap-2 group cursor-pointer"
            >
              <span className="text-white text-xs font-bold font-['Inter'] leading-3 tracking-wide uppercase">
                Se connecter
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </form>
        </div>

        {/* Lien de Retour avec React Router */}
        <div className="flex justify-center items-center mt-2">
          <Link 
            to="/" 
            className="text-slate-600 hover:text-blue-950 transition-colors text-sm font-medium font-['Inter'] underline underline-offset-4 decoration-stone-300 hover:decoration-blue-950"
          >
            Retour au portfolio
          </Link>
        </div>

      </div>
    </main>
  );
}