import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Dispositivo.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import FallbackImg from '../../assets/imgs/05 dispositivo/productos/Producto1.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface SpecItem {
    part: string;
    model: string;
}

interface RevisionInfo {
    text: string;
    state: string;
}

interface RevisionGroup {
    date: string;
    info: RevisionInfo[];
}

interface BudgetItem {
    amount: number;
    text: string;
    approved: boolean;
}

interface DeviceDetail {
    deviceId: number;
    userId: number;
    serial: string;
    name: string;
    brand?: string;
    model?: string;
    year?: number;
    type?: string;
    pictures?: string[];
    description?: string;
    specs?: SpecItem[];
    revisions?: RevisionGroup[];
    budget?: BudgetItem[];
    totalCost: number;
    paymentStatus?: string;
    state: string;
}

export function Dispositivo() {
    const { id } = useParams<{ id: string }>();

    const [dispositivo, setDispositivo] = useState<DeviceDetail | null>(null);
    const [imagenActual, setImagenActual] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        const fetchDispositivo = async () => {
            try {
                const response = await axios.get(`${API_URL}/devices/${id}`);
                setDispositivo(response.data);
            } catch (error) {
                console.error('Error al obtener el dispositivo:', error);
                setErrorMessage('No se pudo encontrar el dispositivo solicitado.');
            } finally {
                setLoading(false);
            }
        };

        fetchDispositivo();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <div style={{ padding: '120px 0', textAlign: 'center', color: '#555' }}>
                    <h2>Cargando información del dispositivo...</h2>
                </div>
                <Footer />
            </>
        );
    }

    if (errorMessage || !dispositivo) {
        return (
            <>
                <Header />
                <div style={{ padding: '120px 0', textAlign: 'center', color: '#555' }}>
                    <h2>{errorMessage || 'Dispositivo no disponible.'}</h2>
                    <a href="/dispositivos" style={{ color: '#000', textDecoration: 'underline' }}>
                        Volver a Mis Dispositivos
                    </a>
                </div>
                <Footer />
            </>
        );
    }

    // Manejo de galería / carrusel
    const pictures = dispositivo.pictures && dispositivo.pictures.length > 0 
        ? dispositivo.pictures 
        : ['1.png'];

    const obtenerRutaImagen = (picName: string) => {
        if (!picName) return FallbackImg;
        if (picName.startsWith('../') || picName.startsWith('/') || picName.startsWith('http')) {
            return picName;
        }
        const archivo = picName.includes('.') ? picName : `${picName}.png`;
        return `../src/assets/imgs/05 dispositivo/dispositivos/${dispositivo.userId}/${dispositivo.deviceId}/${archivo}`;
    };

    const siguienteImagen = () => {
        setImagenActual((prev) => (prev + 1) % pictures.length);
    };

    const anteriorImagen = () => {
        setImagenActual((prev) => (prev - 1 + pictures.length) % pictures.length);
    };

    // Unificar todas las revisiones de las distintas fechas en una sola lista
    const listaRevisiones = dispositivo.revisions
        ? dispositivo.revisions.flatMap((rev) => rev.info)
        : [];

    // Armar línea resumen de especificaciones (ej: Intel i7 10th Gen • 16GB DDR4 • GTX 1650...)
    const resumenSpecs = dispositivo.specs && dispositivo.specs.length > 0
        ? dispositivo.specs.map((s) => s.model).join(' • ')
        : '';

    // Color dinámico del estado de reparación
    const obtenerClaseEstado = (estado: string) => {
        const est = estado.toUpperCase();
        if (est.includes('LISTO') || est.includes('RETIRADO') || est.includes('REPARADO')) return 'estadoVerde';
        if (est.includes('CANCELADO')) return 'estadoRojo';
        return 'estadoPendiente';
    };

    return (
        <>
            <Header />

            <section className="dispositivoContenedor">
                {/* Columna Izquierda: Carrusel + Miniaturas + Desglose de Costos */}
                <div className="dispositivoIzq">
                    <div className="dispositivoCarrusel">
                        {pictures.length > 1 && (
                            <button 
                                type="button" 
                                className="dispositivoCarruselFlecha" 
                                onClick={anteriorImagen}
                                aria-label="Imagen anterior"
                            >
                                {'<'}
                            </button>
                        )}

                        <div className="dispositivoImg">
                            <img 
                                src={obtenerRutaImagen(pictures[imagenActual])} 
                                alt={`${dispositivo.name} - vista ${imagenActual + 1}`} 
                            />
                        </div>

                        {pictures.length > 1 && (
                            <button 
                                type="button" 
                                className="dispositivoCarruselFlecha" 
                                onClick={siguienteImagen}
                                aria-label="Siguiente imagen"
                            >
                                {'>'}
                            </button>
                        )}
                    </div>

                    {/* Miniaturas debajo de la imagen principal */}
                    {pictures.length > 1 && (
                        <div className="dispositivoMiniaturas">
                            {pictures.map((pic, index) => (
                                <img
                                    key={index}
                                    src={obtenerRutaImagen(pic)}
                                    alt={`Miniatura ${index + 1}`}
                                    className={index === imagenActual ? 'miniaturaActiva' : ''}
                                    onClick={() => setImagenActual(index)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Desglose de Costos y Aviso de Retiro */}
                    <div className="dispositivoPago">
                        <h3 className="dispositivoPresupuestoTitulo">Detalle de Costos</h3>

                        {dispositivo.budget && dispositivo.budget.length > 0 && (
                            <div className="dispositivoDesglose">
                                {dispositivo.budget.map((item, index) => (
                                    <div key={index} className="dispositivoDesgloseFila">
                                        <span className="dispositivoDesgloseTexto">
                                            {item.text} {!item.approved && <small>(Pendiente de aprobación)</small>}
                                        </span>
                                        <span className="dispositivoDesgloseMonto">
                                            ${item.amount.toLocaleString('es-AR')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="dispositivoPrecioTotal">
                            <h3>Total</h3>
                            <h3>${dispositivo.totalCost.toLocaleString('es-AR')}</h3>
                        </div>

                        <p className="dispositivoAvisoPago">
                            Este monto sera abonado en persona al retirar el dispositivo del local.
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Título + Estado + Descripción + Revisiones */}
                <div className="dispositivoDer">
                    <div className="dispositivoTituloDispositivo">
                        <div className="dispositivoCabeceraFila">
                            <h1>{dispositivo.name}</h1>
                            <span className={`dispositivoBadgeEstado ${obtenerClaseEstado(dispositivo.state)}`}>
                                {dispositivo.state.toUpperCase()}
                            </span>
                        </div>
                        <div className="dispositivoId">
                            <h3>#{String(dispositivo.deviceId).padStart(6, '0')}</h3>
                        </div>
                    </div>

                    <div className="dispositivoDescripcion">
                        {resumenSpecs && (
                            <p style={{ fontWeight: '500', marginBottom: '1vh' }}>{resumenSpecs}</p>
                        )}
                        {dispositivo.description && (
                            <p>{dispositivo.description}</p>
                        )}
                    </div>

                    <div className="dispositivoRevisiones">
                        <h2>Revisiones:</h2>
                        {listaRevisiones.length > 0 ? (
                            <div className="dispositivoListaRevisiones">
                                <ol>
                                    {listaRevisiones.map((rev, index) => (
                                        <li key={index}>
                                            {rev.text} <span className="dispositivoRevisionEstado">({rev.state})</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ) : (
                            <p style={{ color: '#777', fontSize: '2.2vh' }}>
                                Aún no se han cargado revisiones técnicas.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}