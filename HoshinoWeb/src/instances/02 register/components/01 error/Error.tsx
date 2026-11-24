//Importaciones del archivo Error.tsx (del register)
import './Error.css';
import iconoAdvertencia from '../../../../assets/imgs/02 register/IconoAdvertencia.png';

// Definimos la interfaz para las props
interface ErrorProps {
    mensaje: string;
}

//Funcion Error
export function Error({ mensaje }: ErrorProps) {

    // Si no hay mensaje, no renderiza el componente
    if (!mensaje) return null;

    return (
        <>
            <div className='errorDiv'>
                <div className='errorContenido'>
                    <img className='errorIconoAdvertencia' src={iconoAdvertencia} alt="Icono de advertencia" />
                    {/* Renderiza el texto que le llega desde Register.tsx */}
                    {mensaje}
                </div>
            </div>
        </>
    )
}