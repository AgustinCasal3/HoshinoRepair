//Importaciones del archivo Error.tsx (del login)
import './Error.css';
import iconoAdvertencia from '../../../../assets/imgs/01 login/IconoAdvertencia.png';

//Funcion Error
export function Error({ mensaje }: { mensaje: string }) {
    return (
        <>

            {/* Div del error (del cuadrado gris para adentro) */}
            <div className='errorDiv'>

                {/* div con todo el contenido del error */}
                <div className='errorContenido'>

                    {/* Img con la imagen de la advertencia */}
                    <img className='errorIconoAdvertencia' src={iconoAdvertencia} alt="Icono de advertencia" />

                    {/* Utilizacion de la variable del error */}
                    {mensaje}
                </div>
            </div>
        </>
    )
}