import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
  server: {
    host: true, // Permet d'exposer le serveur en dehors du conteneur (0.0.0.0)
    port: 5173, // Le port par défaut de Vite
    watch: {
      usePolling: true, // Force la détection des modifications de fichiers via Docker
    }}
});
