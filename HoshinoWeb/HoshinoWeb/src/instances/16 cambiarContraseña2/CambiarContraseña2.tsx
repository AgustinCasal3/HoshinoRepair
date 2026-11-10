//Importaciones del archivo cambiarContraseña2.tsx
import "./CambiarContraseña2.css";

//Importacion de la flecha volver
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';


//Funcion CambiarContraseña2
export function CambiarContraseña2() {

    return (
        <>

            {/* Div del body del cambiar contraseña 2, el que lo acomoda en el medio */}
            <div className='cambiarContraseña2Body'>

                {/* Div del cambiar contraseña 2 (del cuadrado gris para adentro) */}
                <div className='cambiarContraseña2Div'>
                    
                    {/* Form con todo el contenido del cambiar contraseña 2 */}
                    <form className='cambiarContraseña2Form'>

                        {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                        <a className='cambiarContraseña2FlechaVolver' href="/cambiarContraseña1">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        {/* Titulo del formulario de cambiar contraseña 2 */}
                        <h1 className='cambiarContraseña2Titulo'>Recuperar Contraseña</h1>

                        <p className="cambiarContraseña2p">Se le enviara un codigo por correo.</p>
                        <p className="cambiarContraseña2p">En caso de no haberlo recibido solicitar uno nuevo.</p>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='cambiarContraseña2Campos'>
                            <label className='cambiarContraseña2Label' htmlFor="codigo">Codigo:</label>

                            <div className="cambiarContraseña2InputButton">

                            <input 
                                className='cambiarContraseña2Input'
                                type="text"
                                required
                                minLength={5}
                                id='codigo'
                                name='codigo'
                            />
                            <a href="/cambiarContraseña3" className='cambiarContraseña2ButtonCodigo'>
                                Reenviar Codigo
                                {/* <button className='loginButton' type='submit' disabled>
                                    Siguiente
                                </button> */}
                            </a>
                            </div>
                        </div>


                        {/* Boton que envia el formulario de cambiar contraseña 2 */}
                        <a href="/cambiarContraseña3" className='cambiarContraseña2ButtonSiguiente'>
                            Siguiente
                        {/* <button className='loginButton' type='submit' disabled>
                            Siguiente
                        </button> */}
                        </a>

                        {/* Anchor para llevar a la pagina de registro /register */}
                        <a className='cambiarContraseña2Link' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

            </div>
        </>
    )
}