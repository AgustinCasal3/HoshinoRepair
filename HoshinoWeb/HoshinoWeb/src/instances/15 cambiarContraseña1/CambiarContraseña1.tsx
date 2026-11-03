//Importaciones del archivo cambiarContraseña1.tsx
import "./CambiarContraseña1.css";

//Importacion de la flecha volver
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';


//Funcion SobreLaEmpresa
export function CambiarContraseña1() {

    return (
        <>

            {/* Div del body del login, el que lo acomoda en el medio */}
            <div className='loginBody'>

                {/* Div del login (del cuadrado gris para adentro) */}
                <div className='loginDiv'>
                    
                    {/* Form con todo el contenido del login */}
                    <form className='loginForm'>

                        {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                        <a className='loginFlechaVolver' href="/login">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        {/* Titulo del formulario de login */}
                        <h1 className='loginTitulo'>Cambiar contraseña</h1>

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
                            />
                        </div>


                        {/* Boton que envia el formulario de inicio de sesión */}
                        <a href="/cambiarContraseña2" className='loginButton'>
                            Siguiente
                        {/* <button className='loginButton' type='submit' disabled>
                            Siguiente
                        </button> */}
                        </a>

                        {/* Anchor para llevar a la pagina de registro /register */}
                        <a className='loginLink' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

            </div>
        </>
    )
}