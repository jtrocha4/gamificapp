import '../estilos/Login.css'
import React from 'react'
import { db, auth } from '../firebase'

function Login() {
    const [modoRegistro, setmModoRegistro] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(null)

    const guardarDatos = (e) => {
        e.preventDefault()

        if (!email.trim()) {
            setError("Ingrese su email")
            return;
        }

        if (!password.trim()) {
            setError("Ingrese su contraseña")
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return;
        }

        setError(null)
        if (modoRegistro) {
            registrarUsuario()

        } else {
            login()
        }

    }

    const login = React.useCallback(async () => {
        try {
            const respuesta = await auth.signInWithEmailAndPassword(email, password)
            console.log(respuesta.user)

            //Limpiar los estados
            setEmail('')
            setPassword('')
            setError(null)
            console.log('Sesion iniciada')

        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError("La direccion de correo electronico no es valida")
            }

            if (error.code === 'auth/user-not-found') {
                setError("Este usuario no esta registrado")
            }

            if (error.code === 'auth/wrong-password') {
                setError("Contraseña incorrecta.")
            }
        }
    }, [email, password])

    const registrarUsuario = React.useCallback(async () => {
        try {
            const respuesta = await auth.createUserWithEmailAndPassword(email, password)

            console.log(respuesta.user)
            //doc(respuesta.user.email) es el identificador en la base de datos
            await db.collection('usuarios').doc(respuesta.user.email).set({
                email: respuesta.user.email,
                id: respuesta.user.uid,
            })

            //Limpiar los estados
            setEmail('')
            setPassword('')
            setError(null)

        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError("La direccion de correo electronico no es valida")
            }
            if (error.code === 'auth/email-already-in-use') {
                setError("La direccion de correo electronico ya se encuentra registrada")
            }
        }
    }, [email, password])

    return (
        <div>

            <div className='row justify-content-center'>

                <div className='col-10 col-sm-10 col-md-10 col-xl-5' id='col-informacion'>
                    <h1>GamificApp</h1>
                    <p>Gamificapp es una plataforma gratuita creada para generar motivacion y compromiso por parte de los estudiantes en sus asignaturas</p>

                    <small className="text-muted">By: Bugs Company</small>
                </div>

                <div className='col-10 col-sm-10 col-md-10 col-xl-5' id='col-formulario'>

                    <h1 className='text-center mb-2'>
                        {
                            modoRegistro ? 'Registrarse' : 'Iniciar Sesion'
                        }
                    </h1>

                    <form onSubmit={guardarDatos}>

                        {
                            error ? <div className='alert alert-danger'> <i className='bi bi-exclamation-triangle '></i> {error}</div> : null
                        }

                        <div className='mb-3'>
                            <input type="email" className='form-control' placeholder='Email' onChange={e => setEmail(e.target.value)} value={email} />
                        </div>

                        <div className='mb-3'>
                            <input type="password" className='form-control' placeholder='Contraseña' onChange={e => setPassword(e.target.value)} value={password} />
                        </div>

                        <div className='d-grid gap-2'>
                            <button className='btn btn-primary'>
                                {
                                    modoRegistro ? 'Registrarse' : 'Ingresar'
                                }
                            </button>

                            <button type='button' className='btn btn-primary' onClick={() => { setmModoRegistro(!modoRegistro) }}>
                                {
                                    modoRegistro ? 'Ya tienes una cuenta ?' : 'Aun no tienes una cuenta ?'
                                }
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login