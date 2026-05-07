import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

export function Navbar() {



    return (
        <>
            <div className='navBar'>
                <nav className='onglets'>
                    <ul>
                        <li><NavLink to="/" className='btnOnglet'>Accueil</NavLink></li>
                        <li><NavLink to="/projects" className='btnOnglet'>Projets</NavLink></li>
                        <li><NavLink to="/login" className='btnOnglet'>Connexion</NavLink></li>
                    </ul>
                </nav>
            </div>

        </>
    )
}