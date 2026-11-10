//Importaciones del archivo cambiarContraseña1.tsx
import "./CambiarContraseña1.css";

//Importacion de la flecha volver
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';


//Funcion CambiarContraseña1
export function CambiarContraseña1() {

    return (
        <>

            {/* Div del body del cambiar contraseña 1, el que lo acomoda en el medio */}
            <div className='cambiarContraseña1Body'>

                {/* Div del cambiar contraseña 1 (del cuadrado gris para adentro) */}
                <div className='cambiarContraseña1Div'>
                    
                    {/* Form con todo el contenido del cambiar contraseña 1 */}
                    <form className='cambiarContraseña1Form'>

                        {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                        <a className='cambiarContraseña1FlechaVolver' href="/login">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        {/* Titulo del formulario de cambiar contraseña 1 */}
                        <h1 className='cambiarContraseña1Titulo'>Recuperar Contraseña</h1>

                        <p className="cambiarContraseña1p">Ingrese el correo de la cuenta a recuperar la contraseña.</p>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='cambiarContraseña1Campos'>
                            <label className='cambiarContraseña1Label' htmlFor="email">Email:</label>
                            <input 
                                className='cambiarContraseña1Input'
                                type="email"
                                required
                                minLength={5}
                                id='email'
                                name='email'
                            />

                        </div>


                        {/* Boton que envia el formulario de cambiar contraseña 1 */}
                        <a href="/cambiarContraseña2" className='cambiarContraseña1Button'>
                            Siguiente
                        {/* <button className='loginButton' type='submit' disabled>
                            Siguiente
                        </button> */}
                        </a>

                        {/* Anchor para llevar a la pagina de registro /register */}
                        <a className='cambiarContraseña1Link' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

            </div>
        </>
    )
}