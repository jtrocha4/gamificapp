import React from 'react'
import { db, auth } from '../firebase'

import AdminVista from '../vistas/AdminVista'
import UserVista from '../vistas/UserVista'

function Inicio() {

    return (
        <div className='container my-2'>
            <h1>Inicio</h1>
            <p>Bienvenido, en esta sesion encontraras tus insgnias y el ranking de las posiciones de las empresas en tu asignatura.</p>
            {/* {
                user.email==='usuario@gmail.com' ? <AdminVista></AdminVista> : <UserVista></UserVista>
            } */}
       </div>
    )
}

export default Inicio