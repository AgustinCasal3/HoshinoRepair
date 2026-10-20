// Importaciones del archivo Login.tsx
import './Login.css';
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';

// Importaciones para el Backend
import { useState, FormEvent } from 'react';
import axios from 'axios';

// Importacion del componente Error
import { Error } from './components/01 error/Error';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Funcion Login
export function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email,
                password
            });

            console.log('Login exitoso: ', response.data);

            //Guardar datos del usuario en el navegador (localStorage)
            localStorage.setItem('user', JSON.stringify(response.data.user));

            //Redirigir al inicio o a Cuenta
            window.location.href = '/home';
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.mensaje) {
                setErrorMessage(error.response.data.mensaje);
            } else {
                setErrorMessage('No se pudo conectar con el servidor');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>

            {/* Div del body del login, el que lo acomoda en el medio */}
            <div className='loginBody'>

                {/* Div del login (del cuadrado gris para adentro) */}
                <div className='loginDiv'>
                    
                    {/* Form con todo el contenido del login */}
                    <form className='loginForm' onSubmit={handleSubmit}>

                        {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                        <a className='loginFlechaVolver' href="/home">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        {/* Titulo del formulario de login */}
                        <h1 className='loginTitulo'>Inicio de sesión</h1>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='loginCampos'>
                            <label className='loginLabel' htmlFor="email">Email:</label>
                            <input 
                                className='loginInput'
                                type="email"
                                required
                                minLength={5}
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='loginCampos'>
                            <label className='loginLabel' htmlFor="password">Contraseña:</label>
                            
                            <input
                                className='loginInput'
                                type="password"
                                required
                                minLength={8}
                                id='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                                
                            <a className='loginLink' href="">¿Olvidaste tu contraseña?</a>
                        </div>

                        {/* Boton que envia el formulario de inicio de sesión */}
                        <button className='loginButton' type='submit' disabled={loading}>
                            {loading ? 'Ingresando..' : 'Iniciar sesión'}
                        </button>

                        {/* Anchor para llevar a la pagina de registro /register */}
                        <a className='loginLink' href="/register">¿Aun no tenes una cuenta?</a>
                    </form>
                </div>

                {/* Etiqueta del componente del error */}
                {errorMessage && <Error mensaje={errorMessage}/>}

            </div>
        </>
    )
}