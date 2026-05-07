export function useFetch() {
  const { logout } = useContext(AuthContext);

  async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await res.json();

    if (res.status === 400) {
      return { validationErrors: data.errors };
    }

    if (!res.ok) {
      throw new Error(data.message || "Une erreur est survenue.");
    }

    return data;
  }

  return { apiFetch };
}
