import './Cuenta.css';

import UserPfp from '../../assets/imgs/04 cuenta/UserPfp1.png';

import { Header } from '../0 header/Header';

export function Cuenta() {

    let NombreCuenta = 'Jonny Joestar';
    let FechaIngreso = '12/03/2025';
    let DispositivosReparacion = 2;
    let ReservasActivas = 1;
    
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
        </>
    )
}