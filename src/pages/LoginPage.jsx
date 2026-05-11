import { useForm } from "react-hook-form";
import { useFetch } from "../hooks/apiFetch";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { apiFetch } = useFetch();

  const onSubmit = async (data) => {
    
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data), 
      });

      
      const responseData = await response; 
      console.log("Réponse du serveur :", responseData); 
      
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
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
