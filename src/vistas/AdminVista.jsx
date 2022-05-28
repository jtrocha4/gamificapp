import React from 'react'
import { db, auth } from '../firebase'
import '../estilos/Actividades.css'

function AdminVista() {

  //Hooks de actividades.
  const [titulo, setTitulo] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [secoins, setSecoins] = React.useState('')
  const [id, setId] = React.useState('')

  //Objeto donde se estaran agreagando todas las actividades.
  const [lista, setLista] = React.useState([])

  const [error, setError] = React.useState(null)
  const [exito, setExito] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)

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

  //Guardar datos a fireStore.
  const guardarActividad = async (e) => {
    e.preventDefault()
    //Validaciones:

    if (!titulo.trim()) {
      setError("Ingrese el titulo de la actividad")
      return
    }
    if (!descripcion.trim()) {
      setError("Ingrese la descripcion de la actividad")
      return
    }
    if (!secoins.trim()) {
      setError("Ingrese la cantidad de $ECoins de la actividad")
      return
    }

    try {
      const nuevaActividad = {
        titulo, descripcion, secoins
      }
      const dato = await db.collection('actividades').add(nuevaActividad)
      //Agregar a la lista.
      setLista([
        ...lista, { ...nuevaActividad, id: dato.id }
      ])
    } catch (error) {
      console.log(error)
    }

    console.log("Guardado exitoso!")
    setExito("Guardado exitoso")

    //Limpiar estados y formulario.
    setTitulo('')
    setDescripcion('')
    setSecoins('')
    setError(null)
  }

  const eliminarActividad = async (id) => {
    try {
      await db.collection('actividades').doc(id).delete()
      const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
      //Lista actualizada.
      setLista(listaFiltrada)
    } catch (error) {
      console.log(error)
    }

  }

  //Editar

  const editar = (elemento) => {
    setModoEdicion(true)
    setTitulo(elemento.titulo)
    setDescripcion(elemento.descripcion)
    setSecoins(elemento.secoins)
    setId(elemento.id)
  }

  const cancelarEdicion = () => {
    setModoEdicion(false)
    setTitulo('')
    setDescripcion('')
    setSecoins('')
    setError(null)
    setExito(null)
  }

  const editarActividad = async (e) => {
    e.preventDefault()

    if (!titulo.trim()) {
      setError("Ingrese el titulo de la actividad")
      return
    }
    if (!descripcion.trim()) {
      setError("Ingrese la descripcion de la actividad")
      return
    }
    if (!secoins.trim()) {
      setError("Ingrese la cantidad de $ECoins de la actividad")
      return
    }

    try {
      await db.collection('actividades').doc(id).update({
        titulo, descripcion, secoins
      })
      const listaEditada = lista.map(
        (elemento) => elemento.id === id ? { id: id, titulo: titulo, descripcion: descripcion, secoins: secoins } : elemento
      )

      setLista(listaEditada)//Listando nuevos valores
      setModoEdicion(false)
      setTitulo('')
      setDescripcion('')
      setSecoins('')
      setError(null)
      
      console.log("Edicion exitosa")
      setExito("Edicion exitosa")
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h6>Vista Admin</h6>

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
                <span className='badge bg-black rounded-pill' title='$ECoins'><i className='bi bi-coin me-2'></i>{elemento.secoins}
                </span>
                <button className='btn btn-danger btn-sm ms-2' title='Eliminar' onClick={() => eliminarActividad(elemento.id)}><i className='bi bi-trash3'></i></button>
                <button className='btn btn-success btn-sm ms-1' title='Actualizar' data-bs-toggle='modal' data-bs-target='#AbrirModal' onClick={() => editar(elemento)}><i className='bi bi-pencil'></i></button>
              </li>
            </ul>

            
          ))
        }
      </div>

      <button type='button' className='btn btn-outline-dark' data-bs-toggle='modal' data-bs-target='#AbrirModal' title='Añadir'><i className='bi bi-plus-lg'></i></button>
      <div className='modal fade' id='AbrirModal' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>

            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>{modoEdicion ? 'Editar actividad' : 'Añadir actividad'}</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => cancelarEdicion()} ></button>
            </div>

            <div className='modal-body'>
              <form onSubmit={modoEdicion ? editarActividad : guardarActividad}>
                {
                  error ? <div className='alert alert-danger'> <i className='bi bi-exclamation-triangle'></i> {error}</div> : null
                }

                {
                  exito ? <div className='alert alert-success'> <i className='bi bi-check2-circle'></i> {exito}</div> : null
                }

                <div className='mb-3'>
                  <label htmlFor='recipient-name' className='col-form-label'>Titulo:</label>
                  <input type='text' className='form-control' id='recipient-name' onChange={(e) => { setTitulo(e.target.value) }} value={titulo} />
                </div>

                <div className='mb-3'>
                  <label htmlFor='recipient-name' className='col-form-label'>Descripcion:</label>
                  <input type='text' className='form-control' id='recipient-name' onChange={(e) => { setDescripcion(e.target.value) }} value={descripcion} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>$ECoins:</label>
                  <input type='number' className='form-control' id='message-text' onChange={(e) => { setSecoins(e.target.value) }} value={secoins} />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={() => cancelarEdicion()} >Cancelar</button>
                  <button type='sumbit' className='btn btn-primary'>{modoEdicion ? 'Editar' : 'Añadir'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminVista