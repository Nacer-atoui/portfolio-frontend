import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export function useFetch() {
  const { logout } = useContext(AuthContext);

  async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    // 1. On détecte si le corps de la requête est un envoi de fichier (FormData)
    const isFormData = options.body instanceof FormData;

    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      ...options,
      headers: {
        // 2. On n'ajoute "Content-Type" que si ce N'EST PAS un FormData
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (res.status === 400) {
      return { validationErrors: data.errors };
    }

    // Gestion de l'expiration du token (optionnel mais recommandé si tu as logout ici)
    if (res.status === 401) {
      logout();
    }

    if (!res.ok) {
      throw new Error(data.message || "Une erreur est survenue.");
    }

    return data;
  }

  return { apiFetch };
}