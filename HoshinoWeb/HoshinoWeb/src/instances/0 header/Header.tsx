import './Header.css';
import { useAuth } from '../../context/AuthContext'; // Importar el hook de autenticación

import GatoHoshino from '../../assets/imgs/0 header/Gato Hoshino.png';
import GatoHoshinoHover from '../../assets/imgs/0 header/Gato Hoshino Hover.png';

export function Header() {
    const { user, logout } = useAuth(); // Obtener el usuario activo

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
                <p><a href="/chatbot">Chatbot</a></p>
                <p><a href="/reclamos">Reclamos</a></p>
                <p><a href="/reparaciones">Reparaciones</a></p>
            </nav>

            <div className="headerCuenta">
                {user ? (
                    <div className="headerCuentaContenido">
                        {/* // Si el usuario está logueado, se muestra el botón de Cuenta */}
                        <a href="/cuenta">
                            <p>
                                {user.username}
                            </p>
                            <img src={`../src/assets/imgs/04 cuenta/${user.userId}/${user.picture}`} alt="Icono de la Cuenta" />
                        </a>
                        <p>
                            |
                        </p>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        >
                            <p>
                                Logout
                            </p>
                        </a>
                    </div>
                ) : (
                    <div className="headerCuentaContenido">
                        <a href="/login">
                            <p>
                                Iniciar Sesión
                            </p>
                        </a>
                    </div>
                )}
            </div>

        </header>

        {/* Espaciador para mantener espacio con posición fixed */}
        <div className="headerEspaciador"></div>
        </>
    );
}