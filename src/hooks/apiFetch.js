import { useContext } from "react";

export function useFetch() {
  const { logout } = useContext(AuthContext);

  async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    // NOUVELLE VÉRIFICATION INFAILLIBLE :
    // Si c'est du JSON, on l'a forcément transformé en string avant.
    // Si c'est un FormData, c'est un objet, donc typeof renverra "object".
    const isJsonString = typeof options.body === "string";

    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      ...options,
      headers: {
        // On force le JSON uniquement si le body est une string
        ...(isJsonString && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (res.status === 400) {
      return { validationErrors: data.errors };
    }

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