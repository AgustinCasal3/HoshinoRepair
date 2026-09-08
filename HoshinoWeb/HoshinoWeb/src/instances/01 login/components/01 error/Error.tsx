import './Error.css';
import iconoAdvertencia from '../../../../assets/imgs/01 login/IconoAdvertencia.png';

export function Error() {
    let error = "Por favor completa todos los campos";
    return (
        <>
            <div className='errorBody'>

                <div className='errorContenedor'>

                    <img className='errorIconoAdvertencia' src={iconoAdvertencia} alt="Icono de advertencia" />

                    {error}
                </div>
            </div>
        </>
    )
}