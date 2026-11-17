import './Reparaciones.css';

import { useState } from 'react'; // NUEVO
import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';

import IconoLocal from '../../assets/imgs/07 reparaciones/IconoCasa.png'
import IconoEntrega from '../../assets/imgs/07 reparaciones/IconoEntrega.png'
import IconoCelular from '../../assets/imgs/07 reparaciones/IconoCelular.png'
import IconoPC from '../../assets/imgs/07 reparaciones/IconoPC.png'
import IconoNotebook from '../../assets/imgs/07 reparaciones/IconoNotebook.png'
import IconoConsola from '../../assets/imgs/07 reparaciones/IconoConsola.png'

// NUEVO: valores posibles de cada pestaña
type Modalidad = 'local' | 'domicilio';
type Dispositivo = 'celular' | 'pc' | 'notebook' | 'consola';

// NUEVO: datos de las pestañas de modalidad (ícono, título y texto)
const MODALIDADES: { id: Modalidad; icono: string; alt: string; titulo: string; parrafos: string[] }[] = [
    {
        id: 'local',
        icono: IconoLocal,
        alt: 'Icono Local',
        titulo: 'Reparacion en el Local',
        parrafos: [
            'Dentro del local usted dejara su dispositivo a manos de nuestros tecnicos.',
            'Este sera revisado, testeado, probado y diagnosticado por ellos.',
            'Al cabo de 48hs se enviara un diagnostico y las posibles soluciones por correo.'
        ]
    },
    {
        id: 'domicilio',
        icono: IconoEntrega,
        alt: 'Icono Entrega',
        titulo: 'Reparacion a Domicilio',
        // TEXTO DE RELLENO: reemplazalo por el real
        parrafos: [
            'Un tecnico se acercara a su domicilio para retirar el dispositivo.',
            'El dia y horario se coordinaran previamente por correo.',
            'Una vez diagnosticado, se enviaran las posibles soluciones por correo.'
        ]
    }
];

// NUEVO: datos de las pestañas de dispositivo (ícono, título y texto)
const DISPOSITIVOS: { id: Dispositivo; icono: string; alt: string; titulo: string; parrafos: string[] }[] = [
    {
        id: 'celular',
        icono: IconoCelular,
        alt: 'Icono Celular',
        titulo: 'Reparacion de Celulares',
        parrafos: [
            'En el momento de ser entregado se solicitaran los datos necesarios para hacer pruebas en el dispositivo.',
            'En el caso de ser un cambio de pantalla y/o bateria, mientras el costo total de la reparacion sea menor a $50.000, se hara sin confirmacion previa.',
            'En caso contrario, se enviara un diagnostico y presupuesto por correo.'
        ]
    },
    {
        id: 'pc',
        icono: IconoPC,
        alt: 'Icono PC Escritorio',
        titulo: 'Reparacion de PC de Escritorio',
        // TEXTO DE RELLENO: reemplazalo por el real
        parrafos: [
            'Se revisaran los componentes internos del equipo: fuente, placa madre, memoria y almacenamiento.',
            'Se enviara un diagnostico y presupuesto por correo antes de realizar cualquier reparacion.'
        ]
    },
    {
        id: 'notebook',
        icono: IconoNotebook,
        alt: 'Icono Notebook',
        titulo: 'Reparacion de Notebooks',
        // TEXTO DE RELLENO: reemplazalo por el real
        parrafos: [
            'Se solicitara el cargador junto con la notebook para poder hacer pruebas.',
            'Se enviara un diagnostico y presupuesto por correo antes de realizar cualquier reparacion.'
        ]
    },
    {
        id: 'consola',
        icono: IconoConsola,
        alt: 'Icono Consolas',
        titulo: 'Reparacion de Consolas',
        // TEXTO DE RELLENO: reemplazalo por el real
        parrafos: [
            'Se solicitara la consola junto con su fuente y un joystick para poder hacer pruebas.',
            'Se enviara un diagnostico y presupuesto por correo antes de realizar cualquier reparacion.'
        ]
    }
];

export function Reparaciones() {

    // NUEVO: qué pestaña está elegida en cada grupo
    const [modalidad, setModalidad] = useState<Modalidad>('local');
    const [dispositivo, setDispositivo] = useState<Dispositivo>('celular');

    // NUEVO: los datos de la pestaña elegida (para el título y el texto)
    const modalidadActual = MODALIDADES.find(m => m.id === modalidad)!;
    const dispositivoActual = DISPOSITIVOS.find(d => d.id === dispositivo)!;

    return (
        <>
            <Header />

            <section className="reparacionesContenido">
                <div className="reparacionesModalidad">
                    <div className="reparacionesModalidadIconos">
                        {/* CAMBIO: los íconos se generan desde el array y cada uno cambia el estado al hacer clic */}
                        {MODALIDADES.map((m) => (
                            <img
                                key={m.id}
                                src={m.icono}
                                alt={m.alt}
                                className={modalidad === m.id ? 'seleccionado' : ''}
                                onClick={() => setModalidad(m.id)}
                            />
                        ))}
                    </div>
                    <div className="reparacionesModalidadTexto">
                        {/* CAMBIO: el texto sale de la pestaña elegida */}
                        <h3>{modalidadActual.titulo}</h3>
                        {modalidadActual.parrafos.map((texto, i) => (
                            <p key={i}>{texto}</p>
                        ))}
                    </div>
                </div>

                <div className="reparacionesDispositivo">
                    <div className="reparacionesDispositivoIconos">
                        {/* CAMBIO: igual que arriba */}
                        {DISPOSITIVOS.map((d) => (
                            <img
                                key={d.id}
                                src={d.icono}
                                alt={d.alt}
                                className={dispositivo === d.id ? 'seleccionado' : ''}
                                onClick={() => setDispositivo(d.id)}
                            />
                        ))}
                    </div>
                    <div className="reparacionesDispositivoTexto">
                        <div className="reparacionesDispositivoInformacion">
                            <h3>{dispositivoActual.titulo}</h3>
                            {dispositivoActual.parrafos.map((texto, i) => (
                                <p key={i}>{texto}</p>
                            ))}
                        </div>

                        <div className="reparacionesSolicitarServicio">
                            <a href={`/reparaciones/formulario?modalidad=${modalidad}&dispositivo=${dispositivo}`}>
                                Solicitar Servicio
                            </a>
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

            <Footer/>
        </>
    )
}