import React from 'react'
import { db, auth } from '../firebase'

function UserVista() {

  //Objeto donde se estaran agreagando todas las actividades.
  const [lista, setLista] = React.useState([])

  //Leer datos de firebase.
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db.collection('actividades').get()
        const arrayData = data.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        console.log(arrayData);
        setLista(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, []
  )

  return (
    <div>
      <h6>Usuario vista</h6>
      {/* Presentacion de las actividades */}
      <div>
        {
          lista.map((elemento) => (
            <ul key={elemento.id}>
              <li className='list-group-item d-flex justify-content-between align-items-start' id='actividad-li'>
                <div className='ms-2 me-auto'>
                  <div className='fw-bold'>
                    {elemento.titulo}
                  </div>
                  {elemento.descripcion}
                </div>
                <span className='badge bg-black rounded-pill'><i className='bi bi-coin me-2'></i>{elemento.secoins}
                </span>
              </li>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default UserVista