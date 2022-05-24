import '../estilos/Navbar.css'

import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";

import { db, auth } from '../firebase'




function Navbar() {

    const cerrarsesion = () => {
        auth.signOut().then(() => {
            console.log("Sesion cerrada")
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className=''>
            <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>

                    <Link to='/' className='navbar-brand mb-0 h1' id='brand'>GamificApp</Link>

                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#firstNavbar'>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className='collapse navbar-collapse justify-content-md-center' id='firstNavbar'>
                        <ul className='navbar-nav'>
                            <Link to='/actividades' className='nav-link'><li className='nav-item'>Actividades</li></Link>
                            <Link to='/tienda' className='nav-link'><li className='nav-item'>Tienda</li></Link>
                        </ul>
                    </div>

                    <div className='justify-content-md-end ' id='firstNavbar'>
                        <button className='btn btn-outline-dark me-2' title='$ECoins disponibles'>{500} <i className='bi bi-piggy-bank'></i></button>
                        <button className='btn btn-outline-dark me-2' title='Cerrar sesion' onClick={cerrarsesion}><i className="bi bi-box-arrow-right"></i></button>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar