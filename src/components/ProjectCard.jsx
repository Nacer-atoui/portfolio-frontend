import { Link } from "react-router-dom";

export function ProjectCard({ id, title, description, image_url, tech_stack, github_url, demo_url }) {
    return (
        <>
            {
                <div>
                    <h2 className='titleCard'>{title.length > 50 ? title.slice(0, 50) + "..." : title}</h2>
                    <img className='imgCard' src={image_url} alt="" />
                    <p className='content-card'>{description} <Link className='see-more' to={`/projects/${id}`}>Voir plus</Link></p>
                    {/* <p className='date'>{dateObj.toLocaleDateString()}</p> */}
                </div>
            }
        </>
    )
}