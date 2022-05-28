import React from 'react'
import { db, auth } from '../firebase'

function AdminVistaTienda() {

    //Hooks de actividades.
    const [titulo, setTitulo] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [precioRecompensa, setPrecioRecompensa] = React.useState('')
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
                const data = await db.collection('recompensas').get()
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
    const guardarRecompensa = async (e) => {
        e.preventDefault()
        //Validaciones:

        if (!titulo.trim()) {
            setError("Ingrese el titulo de la recompensa")
            return
        }
        if (!descripcion.trim()) {
            setError("Ingrese la descripcion de la recompensa")
            return
        }
        if (!precioRecompensa.trim()) {
            setError("Ingrese la cantidad de $ECoins necesarios para esta recompensa")
            return
        }

        try {
            const nuevaRecompensa = {
                titulo, descripcion, precioRecompensa
            }
            const dato = await db.collection('recompensas').add(nuevaRecompensa)
            //Agregar a la lista.
            setLista([
                ...lista, { ...nuevaRecompensa, id: dato.id }
            ])
        } catch (error) {
            console.log(error)
        }

        console.log("Guardado exitoso!")
        setExito("Guardado exitoso")

        //Limpiar estados y formulario.
        setTitulo('')
        setDescripcion('')
        setPrecioRecompensa('')
        setError(null)
    }

    const eliminarRecompensa = async (id) => {
        try {
            await db.collection('recompensas').doc(id).delete()
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
        setPrecioRecompensa(elemento.precioRecompensa)
        setId(elemento.id)
    }

    const cancelarEdicion = () => {
        setModoEdicion(false)
        setTitulo('')
        setDescripcion('')
        setPrecioRecompensa('')
        setError(null)
        setExito(null)
    }

    const editarRecompensa = async (e) => {
        e.preventDefault()

        if (!titulo.trim()) {
            setError("Ingrese el titulo de la recompensa")
            return
        }
        if (!descripcion.trim()) {
            setError("Ingrese la descripcion de la recompensa")
            return
        }
        if (!precioRecompensa.trim()) {
            setError("Ingrese la cantidad de $ECoins necesarios para esta recompensa")
            return
        }

        try {
            await db.collection('recompensas').doc(id).update({
                titulo, descripcion, precioRecompensa
            })
            const listaEditada = lista.map(
                (elemento) => elemento.id === id ? { id: id, titulo: titulo, descripcion: descripcion, precioRecompensa: precioRecompensa } : elemento
            )

            setLista(listaEditada)//Listando nuevos valores
            setModoEdicion(false)
            setTitulo('')
            setDescripcion('')
            setPrecioRecompensa('')
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

            {
                lista.map((elemento) => (

                    <ul key={elemento.id}>
                        <li className='list-group-item d-flex justify-content-between align-items-start' id='actividad-li'>
                            <div className='ms-2 me-auto'>
                                <div className='fw-bold'>
                                    {elemento.titulo}
                                </div>
                                {elemento.descripcion}
                                <button className='ms-2 btn btn-primary btn-sm'>Canjear</button>
                            </div>
                            <span className='badge bg-black rounded-pill' title='$ECoins'><i className='bi bi-coin me-2'></i>{elemento.precioRecompensa}
                            </span>
                            <button className='btn btn-danger btn-sm ms-2' title='Eliminar' onClick={() => eliminarActividad(elemento.id)}><i className='bi bi-trash3'></i></button>
                            <button className='btn btn-success btn-sm ms-1' title='Actualizar' data-bs-toggle='modal' data-bs-target='#AbrirModal' onClick={() => editar(elemento)}><i className='bi bi-pencil'></i></button>
                        </li>
                    </ul>
                ))
            }


            <button type='button' className='btn btn-outline-dark' data-bs-toggle='modal' data-bs-target='#AbrirModal' title='Añadir'><i className='bi bi-plus-lg'></i></button>
            <div className='modal fade' id='AbrirModal' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>

                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>{modoEdicion ? 'Editar actividad' : 'Añadir actividad'}</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={() => cancelarEdicion()} ></button>
                        </div>

                        <div className='modal-body'>
                            <form onSubmit={modoEdicion ? editarRecompensa : guardarRecompensa}>
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
                                    <label htmlFor='message-text' className='col-form-label'>Precio en $ECoins:</label>
                                    <input type='number' className='form-control' id='message-text' onChange={(e) => { setPrecioRecompensa(e.target.value) }} value={precioRecompensa} />
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

export default AdminVistaTienda