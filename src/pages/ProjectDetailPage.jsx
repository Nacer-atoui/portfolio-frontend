
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/apiFetch";
import { ProjectsPage } from "./ProjectsPage";

// fonction pour afficher l'article dans sa page individuellement
export function ProjectDetailPage() {
    const { apiFetch } = useFetch();
    const { id } = useParams(); // récupère le paramètre dynamique
    const [projectDetail, setProjectDetail] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProjectDetail = async () => {
    try {
      const data = await apiFetch('/projects/' + id);
      setProjectDetail(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

  fetchProjectDetail();
}, [id]);

    if (loading) {
        return <p>Chargement de l'article...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    if (!projectDetail) {
        return "Projet introuvable."
    }

    return (
        <main className="article-card-detail">
            <div>
                <Link to={"/projects/"}>← Retour aux projets</Link>
            </div>
            <div className="content-detail">
                <h2 id="title-detail" className='titleCard'>{projectDetail.title}</h2>
                <img className='img-article-detail' src={projectDetail.image_url} alt="toto" />
                <p id="p-detail">{projectDetail.description}</p><br />
            </div>
        </main>
    )
}