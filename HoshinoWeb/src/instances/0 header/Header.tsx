import './Header.css';
import { useAuth } from '../../context/AuthContext';

import GatoHoshino from '../../assets/imgs/0 header/Gato Hoshino.png';
import GatoHoshinoHover from '../../assets/imgs/0 header/Gato Hoshino Hover.png';

export function Header() {
    const { user, logout } = useAuth();

    // Soporta tanto imágenes Base64 ("data:image/...") como archivos locales ("1.png")
    const obtenerFotoHeader = (pic?: string) => {
        if (!pic) return GatoHoshino;
        if (
            pic.startsWith('data:') ||
            pic.startsWith('http') ||
            pic.startsWith('/') ||
            pic.startsWith('../')
        ) {
            return pic;
        }
        return `/src/assets/imgs/04 cuenta/${user?.userId}/${pic}`;
    };

    return (
        <>
            <header>
                <div className="headerImg">
                    <a href="/home">
                        <img className='gatoImg' src={GatoHoshino} alt="Mascota Hoshino Repair" />
                        <img className='gatoImgHover' src={GatoHoshinoHover} alt="Mascota Hoshino Repair" />
                    </a>
                </div>

                <nav className="headerContenido">
                    <p><a href="/home">Inicio</a></p>
                    <p><a href="/tienda">Tienda</a></p>
                    <p><a href="/reclamos">Reclamos</a></p>
                    <p><a href="/reparaciones">Reparaciones</a></p>
                </nav>

                <div className="headerCuenta">
                    {user ? (
                        <div className="headerCuentaContenido">
                            <a href="/cuenta">
                                <p>{user.username}</p>
                                <img
                                    src={obtenerFotoHeader(user.picture)}
                                    alt="Icono de la Cuenta"
                                    onError={(e) => {
                                        e.currentTarget.src = GatoHoshino;
                                    }}
                                />
                            </a>
                            <p>|</p>
                            <a
                                href="#logout"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            >
                                <p>Logout</p>
                            </a>
                        </div>
                    ) : (
                        <div className="headerCuentaContenido">
                            <a href="/login">
                                <p>Iniciar Sesión</p>
                            </a>
                        </div>
                    )}
                </div>
            </header>

            <div className="headerEspaciador"></div>
        </>
    );
}