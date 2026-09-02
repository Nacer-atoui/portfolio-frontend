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
    }
  },
  // 👇 AJOUT POUR L'OPTIMISATION DU SCORE LIGHTHOUSE 👇
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Isole React et React-DOM
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Isole React Router
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Isole React Hook Form (utilisé sur ta page CreateProjectPage)
          if (id.includes('node_modules/react-hook-form')) {
            return 'vendor-form';
          }
        },
      },
    },
  }
});