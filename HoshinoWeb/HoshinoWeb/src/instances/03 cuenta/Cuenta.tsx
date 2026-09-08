import './Cuenta.css';

import UserPfp from '../../assets/imgs/04 cuenta/UserPfp1.png';

import ImgDispositivo1 from '../../assets/imgs/05 dispositivo/productos/Producto1.png'
import ImgDispositivo2 from '../../assets/imgs/05 dispositivo/productos/Producto2.png'

import { Header } from '../0 header/Header';

export function Cuenta() {

    let NombreCuenta = 'Jonny Joestar';
    let FechaIngreso = '12/03/2025';
    let DispositivosReparacion = 2;
    let ReservasActivas = 1;

    let numDispositivo = 1;
    
    return (
        <>
            <Header />

            <section className="cuentaInfo">
                <div className="cuentaInfoContenedor">
                    <div className="cuentaPerfil">
                        <img src={UserPfp} alt="Foto de Perfil" />
                        <h1>{NombreCuenta}</h1>
                    </div>
                    <div className="cuentaDatos">
                        <h3>Usuario desde: {FechaIngreso}</h3>
                        <h3>Dispositivos en reparacion: {DispositivosReparacion}</h3>
                        <h3>Reservas Activas: {ReservasActivas}</h3>

                        <a href="/reservas">Reservas</a>
                    </div>
                </div>
            </section>

            <section className="cuentaDispositivos">
                <div className="cuentaTituloDispositivos">
                    <h1>Tus Dispositivos</h1>
                </div>
                <div className="cuentaListaDispositivos">
                    <div className="cuentaArticuloDispositivo">
                        <div className="cuentaInfoDispositivo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <img src={ImgDispositivo1} alt={`Foto del dispositivo ${numDispositivo}`} />
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="cuentaDatosDispositivo">
                                    <h3>Notebook Gamer Lenovo</h3>
                                    <h2>#000001</h2>
                                </div>
                            </a>
                        </div>
                        <div className="cuentaVerDispositivo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <p>Ver</p>
                            </a>
                        </div>
                    </div>

                    <div className="cuentaArticuloDispositivo">
                        <div className="cuentaInfoDispositivo">
                            
                            <a href={`dispositivo/${numDispositivo}`}>
                                <img src={ImgDispositivo2} alt={`Foto del dispositivo ${numDispositivo}`} />
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="cuentaDatosDispositivo">
                                    <h3>Notebook Gamer Lenovo</h3>
                                    <h2>#000001</h2>
                                </div>
                            </a>
                        </div>
                        <div className="cuentaVerDispositivo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <p>Ver</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}