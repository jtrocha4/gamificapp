import React from 'react'
import AdminVistaTienda from '../vistas/AdminVistaTienda'

function Tienda({user}) {
    return (
        <div className='container my-2'>
            <h1>Tienda</h1>
            <p>Bienvenido a la tienda de canje, en la cual podras intercambiar tus $ECoins por recompensas extraordinarias.</p>
            {
                user.email === 'usuario@gmail.com' ? <AdminVistaTienda></AdminVistaTienda> : <UserVista></UserVista>
            }
        </div>
    )
}

export default Tienda