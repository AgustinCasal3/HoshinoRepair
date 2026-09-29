import './Reparaciones.css';

import { Header } from '../0 header/Header';

import IconoLocal from '../../assets/imgs/07 reparaciones/IconoCasa.png'
import IconoEntrega from '../../assets/imgs/07 reparaciones/IconoEntrega.png'
import IconoCelular from '../../assets/imgs/07 reparaciones/IconoCelular.png'
import IconoPC from '../../assets/imgs/07 reparaciones/IconoPC.png'
import IconoNotebook from '../../assets/imgs/07 reparaciones/IconoNotebook.png'
import IconoConsola from '../../assets/imgs/07 reparaciones/IconoConsola.png'

export function Reparaciones() {
    return (
        <>
            <Header />

            <section className="reparacionesContenido">
                <div className="reparacionesModalidad">
                    <div className="reparacionesModalidadIconos">
                        <img src={IconoLocal} alt="Icono Local" className="seleccionado"/>
                        <img src={IconoEntrega} alt="Icono Entrega" />
                    </div>
                    <div className="reparacionesModalidadTexto">
                        <h3>Reparacion en el Local</h3>
                        <p>Dentro del local usted dejara su dispositivo a manos de nuestros tecnicos.</p>
                        <p>Este sera revisado, testeado, probado y diagnosticado por ellos.</p>
                        <p>Al cabo de 48hs se enviara un diagnostico y las posibles soluciones por correo.</p>
                    </div>
                </div>

                <div className="reparacionesDispositivo">
                    <div className="reparacionesDispositivoIconos">
                        <img src={IconoCelular} alt="Icono Celular" className="seleccionado" />
                        <img src={IconoPC} alt="Icono PC Escritorio" />
                        <img src={IconoNotebook} alt="Icono Notebook" />
                        <img src={IconoConsola} alt="Icono Consolas" />
                    </div>
                    <div className="reparacionesDispositivoTexto">
                        <div className="reparacionesDispositivoInformacion">
                            <h3>Reparacion de Celulares</h3>
                            <p>En el momento de ser entregado se solicitaran los datos necesarios para hacer pruebas en el dispositivo.</p>
                            <p>En el caso de ser un cambio de pantalla y/o bateria, mientras el costo total de la reparacion sea menor a $50.000, se hara sin confirmacion previa.</p>
                            <p>En caso contrario, se enviara un diagnostico y presupuesto por correo.</p>
                        </div>

                        <div className="reparacionesSolicitarServicio">
                            <a href='/reparaciones/formulario'>Solicitar Servicio</a>
                        </div>
                    </div>
                </div>

                <div className="reparacionesUbicacion">
                    <h1>Nos Encontramos</h1>
                    <p>Nuestro local se ubica en: Francisco N. Laprida 1469, Vicente Lopez.</p>
                    <p>Entre calles 25 de Mayo y Av. Maipu.</p>

                    <div id="reparacionesMapa">
                        <iframe
                            title="Ubicación del local"
                            src="https://www.google.com/maps?q=Laprida+1469,+Vicente+Lopez,+Buenos+Aires&output=embed"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}