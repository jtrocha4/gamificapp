import React from 'react'
import AdminVista from '../vistas/AdminVista'
import UserVista from '../vistas/UserVista'

function Actividades({user}) {
    return (
        <div className='container my-2'>
            <h1>Actividades</h1>
            <p>Bienvenido a la sesion de actividades, aqui encontraras todas los eventos disponibles los cuales al realizarlos podras obtener $ECoins</p>
            {
                user.email === 'usuario@gmail.com' ? <AdminVista></AdminVista> : <UserVista></UserVista>
            }
        </div>
    )
}

export default Actividades