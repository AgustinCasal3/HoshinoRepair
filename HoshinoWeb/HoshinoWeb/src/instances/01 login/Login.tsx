// Importaciones del archivo Login.tsx
import './Login.css';
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';

// Importacion del componente Error
import { Error } from './components/01 error/Error';

// Funcion Login
export function Login() {

    return (
        <>

            {/* Div del body del login, el que lo acomoda en el medio */}
            <div className='loginBody'>

                {/* Div del login (del cuadrado gris para adentro) */}
                <div className='loginDiv'>
                    
                    {/* Form con todo el contenido del login */}
                    <form className='loginForm'>

                        {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                        <a className='loginFlechaVolver' href="/home"><img src={flechaVolver} alt="volver" /></a>

                        {/* Titulo del formulario de login */}
                        <h1 className='loginTitulo'>Inicio de sesión</h1>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='loginCampos'>
                            <label className='loginLabel' htmlFor="email">Email:</label>
                            <input className='loginInput' type="email" required minLength={5} id='email' name='email' />
                        </div>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='loginCampos'>
                            <label className='loginLabel' htmlFor="password">Contraseña:</label>
                            <input className='loginInput' type="password" required minLength={8} id='password' name='password'/>
                            <a className='loginLink' href="">¿Olvidaste tu contraseña?</a>
                        </div>

                        {/* Boton que envia el formulario de inicio de sesión */}
                        <button className='loginButton' type='submit'>Iniciar sesión</button>

                        {/* Anchor para llevar a la pagina de registro /register */}
                        <a className='loginLink' href="/register">¿Aun no tenes una cuenta?</a>
                    </form>
                </div>

                {/* Etiqueta del componente del error */}
                <Error/>

            </div>
        </>
    )
}