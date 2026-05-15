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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input 
          type="email" 
          placeholder="Votre email"
          {...register("email", { required: true })} 
        />
        {errors.email && <p style={{ color: "red" }}>Email requis</p>}
        
        <input 
          type="password" 
          placeholder="Votre mot de passe"
          {...register("password", { required: true })} 
        />
        {errors.password && <p style={{ color: "red" }}>Mot de passe requis</p>}
      </div>
      <button type="submit">Se connecter</button> 
    </form>
  );
}