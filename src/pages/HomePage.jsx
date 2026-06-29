import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
// 1. On importe la librairie
import { TypeAnimation } from "react-type-animation";

const RecentProjects = lazy(() =>
  import("../components/RecentProject").then((mod) => ({
    default: mod.RecentProjects,
  })),
);
const ContactForm = lazy(() =>
  import("../components/ContactForm").then((mod) => ({
    default: mod.ContactForm,
  })),
);

export function HomePage() {
  return (
    <main className="bg-[#121212] text-[#f8f9fa] min-h-screen font-['Inter']">
      {/* --- ZONE HERO --- */}
      <section className="w-full bg-stone-50 border-b border-stone-300 flex justify-center items-center py-16 md:py-28">
        <div className="w-full max-w-300 px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Colonne Gauche : Textes et Actions */}
          <div className="w-full md:max-w-164 flex flex-col justify-start items-start gap-6">
            {/* Titre Principal */}
            <h1 className="text-gray-950 text-4xl md:text-5xl font-extrabold font-['Inter'] leading-tight md:leading-[52.80px]">
              Développement.
              <br />
              Code. {/* 2. On insère le composant TypeAnimation ici */}
              <TypeAnimation
                sequence={[
                  "Visibilité.", // Mot 1
                  2000, // Pause de 2 secondes
                  "Fluidité.", // Mot 2
                  2000,
                  "Impact.", // Mot 3
                  2000,
                  "Performance.", // Mot 4
                  2000,
                ]}
                wrapper="span" // S'intègre comme un simple <span> dans ton <h1>
                speed={50} // Vitesse de frappe
                deletionSpeed={50} // Vitesse d'effacement
                repeat={Infinity} // Tourne en boucle
                className="text-blue-950 inline-block" // Couleur accentuée pour le mettre en valeur
              />
            </h1>

            {/* Description avec le nouveau texte */}
            <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-relaxed max-w-[512px]">
              Je suis Nacer Atoui, <strong>développeur web</strong>. Je conçois
              des interfaces <strong>optimisées et performantes</strong> pour
              booster votre visibilité et offrir une{" "}
              <strong>expérience utilisateur</strong> irréprochable.
            </p>

            {/* Boutons d'action */}
            <div className="w-full flex flex-wrap justify-start items-center gap-4 pt-4">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm text-center text-white text-base font-medium font-['Inter'] leading-6 shadow-sm"
              >
                Voir les projets
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault(); // Empêche le comportement par défaut du navigateur
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-sm border border-blue-950 hover:bg-blue-50 transition-colors text-center text-blue-950 text-base font-medium font-['Inter'] leading-6 cursor-pointer"
              >
                Me contacter
              </button>
            </div>
          </div>

          {/* Colonne Droite : Image / Avatar */}
          <div className="w-full md:w-auto flex justify-center items-center">
            <div className="w-full max-w-[384px] aspect-square perspective-[1000px]">
              <img
                className="w-full h-full rounded-xl border border-stone-300 object-cover shadow-sm hover:grayscale"
                src="https://res.cloudinary.com/dalblqu3b/image/upload/v1782459522/Photo_3_sb9rsx.webp"
                alt="Illustration Nacer Atoui - Développeur Web"
                fetchPriority="high" /* Indique au navigateur de la charger en priorité absolue */
                width="384"
                height="384"
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-64 flex items-center justify-center text-slate-500">
            Chargement des projets...
          </div>
        }
      >
        <RecentProjects />
      </Suspense>

      {/* --- ZONE CONTACT --- */}
      <section
        id="contact"
        className="w-full bg-zinc-100 py-16 md:py-28 flex justify-center items-center px-6"
      >
        <div className="w-full max-w-md flex flex-col justify-start items-center gap-10">
          <div className="w-full flex flex-col justify-start items-center gap-3.5 text-center">
            <h2 className="text-gray-950 text-3xl md:text-4xl font-bold font-['Inter'] leading-10">
              Démarrer un projet
            </h2>
            <p className="text-slate-600 text-base font-normal font-['Inter'] leading-relaxed">
              Remplissez le formulaire ci-dessous pour discuter
              <br className="hidden md:block" /> de votre prochaine architecture
              web.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center text-slate-500">
                Chargement du formulaire...
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
