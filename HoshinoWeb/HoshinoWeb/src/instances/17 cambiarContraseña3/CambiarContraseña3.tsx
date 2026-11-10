//Importaciones del archivo cambiarContraseña3.tsx
import "./CambiarContraseña3.css";

//Importacion de la flecha volver
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';


//Funcion CambiarContraseña3
export function CambiarContraseña3() {

    return (
        <>

            {/* Div del body del cambiar contraseña 3, el que lo acomoda en el medio */}
            <div className='cambiarContraseña3Body'>

                {/* Div del cambiar contraseña 3 (del cuadrado gris para adentro) */}
                <div className='cambiarContraseña3Div'>
                    
                    {/* Form con todo el contenido del cambiar contraseña 3 */}
                    <form className='cambiarContraseña3Form'>

                        {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                        <a className='cambiarContraseña3FlechaVolver' href="/cambiarContraseña2">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        {/* Titulo del formulario de cambiar contraseña 3 */}
                        <h1 className='cambiarContraseña3Titulo'>Recuperar Contraseña</h1>

                        <p>Ingrese la nueva contraseña.</p>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='cambiarContraseña3Campos'>
                            <label className='cambiarContraseña2Label' htmlFor="NuevaContraseña">Nueva Contraseña:</label>
                            <input 
                                className='cambiarContraseña3Input'
                                type="password"
                                required
                                minLength={8}
                                id='NuevaContraseña'
                                name='NuevaContraseña'
                            />
                        </div>

                        <div className='cambiarContraseña3Campos'>
                            <label className='cambiarContraseña2Label' htmlFor="RepetirContraseña">Repetir Contraseña:</label>
                            <input 
                                className='cambiarContraseña3Input'
                                type="password"
                                required
                                minLength={8}
                                id='RepetirContraseña'
                                name='RepetirContraseña'
                            />
                        </div>


                        {/* Boton que envia el formulario de cambiar contraseña 3 */}
                        <a href="/cambiarContraseña3" className='cambiarContraseña3Button'>
                            Cambiar Contraseña
                        {/* <button className='loginButton' type='submit' disabled>
                            Siguiente
                        </button> */}
                        </a>

                        {/* Anchor para llevar a la pagina de registro /register */}
                        <a className='cambiarContraseña3Link' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

            </div>
        </>
    )
}