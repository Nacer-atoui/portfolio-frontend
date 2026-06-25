import { ContactForm } from "../components/ContactForm";
import { Link } from "react-router-dom";
import { RecentProjects } from "../components/RecentProject";
import { Footer } from "../components/Footer";
// 1. On importe la librairie
import { TypeAnimation } from "react-type-animation";

export function HomePage() {
  return (
    <main
      style={{
        backgroundColor: "#121212",
        color: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Inter'",
      }}
    >
      {/* --- ZONE HERO --- */}
      <section className="w-full bg-stone-50 border-b border-stone-300 flex justify-center items-center py-16 md:py-28">
        <div className="w-full max-w-300 px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Colonne Gauche : Textes et Actions */}
          <div className="w-full md:max-w-164 flex flex-col justify-start items-start gap-6">
            
            {/* Titre Principal */}
            <h1 className="text-gray-950 text-4xl md:text-5xl font-extrabold font-['Inter'] leading-tight md:leading-[52.80px]">
              Développement.
              <br />
              Code.{" "}
              {/* 2. On insère le composant TypeAnimation ici */}
              <TypeAnimation
                sequence={[
                  "Précision.", // Mot 1
                  2000,         // Pause de 2 secondes
                  "Fluidité.",  // Mot 2
                  2000,
                  "Scalabilité.", // Mot 3
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

            {/* Description */}
            <p className="text-slate-600 text-base md:text-lg font-normal font-['Inter'] leading-relaxed max-w-[512px]">
              Conception d'interfaces web robustes et scalables.
              <br />
              Expertise technique au service de l'expérience utilisateur, avec
              une approche minimaliste et performante.
            </p>

            {/* Boutons d'action */}
            <div className="w-full flex flex-wrap justify-start items-center gap-4 pt-4">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-950 hover:bg-blue-900 transition-colors rounded-sm text-center text-white text-base font-medium font-['Inter'] leading-6 shadow-sm"
              >
                Voir les projets
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-sm border border-blue-950 hover:bg-blue-50 transition-colors text-center text-blue-950 text-base font-medium font-['Inter'] leading-6"
              >
                Me contacter
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Image / Avatar */}
          <div className="w-full md:w-auto flex justify-center items-center">
            <div className="w-full max-w-[384px] aspect-square perspective-[1000px]">
              <img
                className="w-full h-full rounded-xl border border-stone-300 object-cover shadow-sm transition-all duration-1000 ease-in-out hover:transform-[rotateY(180deg)] hover:grayscale"
                src="https://res.cloudinary.com/dalblqu3b/image/upload/v1782307274/Photo_3_brzfqi.jpg"
                alt="Illustration Nacer Atoui - Développeur Web"
              />
            </div>
          </div>
        </div>
      </section>

      <RecentProjects />

      {/* --- ZONE CONTACT --- */}
      <section className="w-full bg-zinc-100 py-16 md:py-28 flex justify-center items-center px-6">
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

          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}