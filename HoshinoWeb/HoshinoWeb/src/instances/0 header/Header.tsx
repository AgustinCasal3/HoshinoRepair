import './Header.css';

import GatoHoshino from '../../assets/imgs/0 header/Gato Hoshino.png'
import GatoHoshinoHover from '../../assets/imgs/0 header/Gato Hoshino Hover.png'

export function Header() {
    return (
        <>
        <header>
            <div className="headerImg">
                <img className='gatoImg' src={GatoHoshino} alt="Mascota Hoshino Repair" />
                <img className='gatoImgHover' src={GatoHoshinoHover} alt="Mascota Hoshino Repair" />
            </div>

            <nav className="headerContenido">
                <p><a href="/home">Inicio</a></p>
                <p><a href="/tienda">Tienda</a></p>
                <p><a href="/home">Chatbot</a></p>
                <p><a href="/reclamos">Reclamos</a></p>
                <p><a href="/reparaciones">Reparaciones</a></p>
            </nav>

            <div className="headerCuenta">
                <p><a href="/login">Iniciar Sesion</a></p>
            </div>
        </header>
        </>
    )
}