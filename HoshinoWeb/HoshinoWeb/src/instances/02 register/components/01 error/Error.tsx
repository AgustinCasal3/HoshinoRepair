//Importaciones del archivo Error.tsx (del register)
import './Error.css';
import iconoAdvertencia from '../../../../assets/imgs/02 register/IconoAdvertencia.png';

//Funcion Error
export function Error() {

    //Variable para almacenar y mostrar el error en el futuro
    let error = "Por favor completa todos los campos";

    return (
        <>

            {/* Div del error (del cuadrado gris para adentro) */}
            <div className='errorDiv'>

                {/* div con todo el contenido del error */}
                <div className='errorContenido'>

                    {/* Img con la imagen de la advertencia */}
                    <img className='errorIconoAdvertencia' src={iconoAdvertencia} alt="Icono de advertencia" />

                    {/* Utilizacion de la variable del error */}
                    {error}
                </div>
            </div>
        </>
    )
}