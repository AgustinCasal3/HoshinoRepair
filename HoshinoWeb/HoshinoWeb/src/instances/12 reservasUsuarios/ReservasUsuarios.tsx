import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReservasUsuarios.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import { useAuth } from '../../context/AuthContext';
import FallbackImg from '../../assets/imgs/05 dispositivo/productos/Producto1.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

interface TimelineItem {
    date: string;
    text: string;
}

interface ReservationDetail {
    reservationId: number;
    userId: number;
    productId: number;
    productData: {
        name: string;
        picture?: string;
    };
    status: string;
    reservationDate?: string;
    timeline?: TimelineItem[];
    pickupDate?: string;
    pricing: {
        totalPrice: number;
        deposit: number;
        remaining: number;
    };
    billingData?: {
        clientName?: string;
        cuil?: string;
    };
    receipts?: string[];
}

export function ReservasUsuarios() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();

    const [reserva, setReserva] = useState<ReservationDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Estados para el carrusel de comprobantes y modal ampliado
    const [comprobanteActual, setComprobanteActual] = useState<number>(0);
    const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchReserva = async () => {
            try {
                const response = await axios.get(`${API_URL}/reservations/${id}`);
                setReserva(response.data);
            } catch (error) {
                console.error('Error al obtener el detalle de la reserva:', error);
                setErrorMessage('No se pudo encontrar la reserva solicitada.');
            } finally {
                setLoading(false);
            }
        };

        fetchReserva();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <div style={{ padding: '120px 0', textAlign: 'center', color: '#555' }}>
                    <h2>Cargando detalles de la reserva...</h2>
                </div>
                <Footer />
            </>
        );
    }

    if (errorMessage || !reserva) {
        return (
            <>
                <Header />
                <div style={{ padding: '120px 0', textAlign: 'center', color: '#555' }}>
                    <h2>{errorMessage || 'Reserva no encontrada.'}</h2>
                    <a href="/reservas" style={{ color: '#000', textDecoration: 'underline' }}>
                        Volver a Mis Reservas
                    </a>
                </div>
                <Footer />
            </>
        );
    }

    // Formatear fecha y hora (ej: 15/09/2026 15:25)
    const formatearFechaHora = (fechaIso: string) => {
        const date = new Date(fechaIso);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();
        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    };

    // Formatear solo fecha (ej: 17/09/2026)
    const formatearSoloFecha = (fechaIso?: string) => {
        if (!fechaIso) {
            // Si aún no tiene fecha asignada, estimar +2 días desde la creación
            const base = reserva.reservationDate ? new Date(reserva.reservationDate) : new Date();
            base.setDate(base.getDate() + 2);
            return base.toLocaleDateString('es-AR');
        }
        return new Date(fechaIso).toLocaleDateString('es-AR');
    };

    // Obtener ruta de imagen del producto
    const obtenerImagenProducto = () => {
        const pic = reserva.productData?.picture;
        if (!pic) return FallbackImg;
        if (pic.startsWith('../') || pic.startsWith('/') || pic.startsWith('http') || pic.startsWith('data:')) {
            return pic;
        }
        const archivo = pic.includes('.') ? pic : `${pic}.png`;
        return `../src/assets/imgs/08 tienda/Productos/${reserva.productId}/${archivo}`;
    };

    // Obtener clase de color según el estado
    const obtenerClaseEstado = (estado: string) => {
        const est = estado.toUpperCase();
        if (est.includes('CONFIRMADO') || est.includes('RETIRADO') || est.includes('PAGADO')) return 'estadoVerde';
        if (est.includes('CANCELADO')) return 'estadoRojo';
        return 'estadoPendiente';
    };

    // Manejo de comprobantes
    const comprobantes = reserva.receipts && reserva.receipts.length > 0 ? reserva.receipts : [];

    const siguienteComprobante = () => {
        if (comprobantes.length === 0) return;
        setComprobanteActual((prev) => (prev + 1) % comprobantes.length);
    };

    const anteriorComprobante = () => {
        if (comprobantes.length === 0) return;
        setComprobanteActual((prev) => (prev - 1 + comprobantes.length) % comprobantes.length);
    };

    const nombreCliente = reserva.billingData?.clientName || user?.username || 'Cliente Hoshino';
    const cuilCliente = reserva.billingData?.cuil || 'No especificado';

    return (
        <>
            <Header />

            <section className="reservaDetalleContenedor">
                {/* Columna Izquierda: Imagen del producto y Desglose de Precios */}
                <div className="reservaDetalleIzq">
                    <div className="reservaDetalleImg">
                        <img src={obtenerImagenProducto()} alt={reserva.productData?.name} />
                    </div>

                    <div className="reservaDetallePrecios">
                        <div className="reservaFilaPrecio">
                            <span>Precio Total</span>
                            <span>${reserva.pricing.totalPrice.toLocaleString('es-AR')}</span>
                        </div>

                        <div className="reservaSubtituloAbonado">
                            <p>Abonado</p>
                        </div>

                        <div className="reservaFilaPrecio">
                            <span>Seña</span>
                            <span>${reserva.pricing.deposit.toLocaleString('es-AR')}</span>
                        </div>

                        <div className="reservaFilaPrecio">
                            <span>Resto</span>
                            <span>${reserva.pricing.remaining.toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Info, Timeline de Estado y Facturación + Comprobante */}
                <div className="reservaDetalleDer">
                    {/* Título y Código */}
                    <div className="reservaDetalleCabecera">
                        <h1>{reserva.productData?.name}</h1>
                        <p className="reservaCodigo">#{String(reserva.productId).padStart(8, '0')}</p>
                    </div>

                    {/* Estado de la Reserva + Timeline */}
                    <div className="reservaDetalleEstadoBloque">
                        <div className="reservaEstadoFila">
                            <h2>Estado de la Reserva</h2>
                            <span className={`reservaBadgeEstado ${obtenerClaseEstado(reserva.status)}`}>
                                {reserva.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="reservaTimeline">
                            {reserva.timeline && reserva.timeline.length > 0 ? (
                                reserva.timeline.map((item, index) => (
                                    <p key={index}>
                                        {formatearFechaHora(item.date)} - {item.text}
                                    </p>
                                ))
                            ) : (
                                <p>
                                    {reserva.reservationDate ? formatearFechaHora(reserva.reservationDate) : ''} - Creación de la Reserva
                                </p>
                            )}
                        </div>

                        <div className="reservaFechaRetiro">
                            <h3>Retirar a partir de: {formatearSoloFecha(reserva.pickupDate)}</h3>
                        </div>
                    </div>

                    {/* Comprobante y Datos de Facturación */}
                    <div className="reservaDetalleFacturacion">
                        <h2>Comprobante y Datos de Facturacion</h2>

                        <div className="reservaFacturacionContenido">
                            {/* Datos Cliente y Empresa */}
                            <div className="reservaDatosColumnas">
                                <div className="reservaBloqueDatos">
                                    <h4>Cliente</h4>
                                    <p>Cliente: {nombreCliente}</p>
                                    <p>CUIL: {cuilCliente}</p>
                                </div>

                                <div className="reservaBloqueDatos">
                                    <h4>Hoshino Repair</h4>
                                    <p>Banco: Mercado Pago</p>
                                    <p>Alias: hoshino.repair.mp</p>
                                    <p>Titular: Hoshino & Co.</p>
                                </div>
                            </div>

                            {/* Visor / Carrusel de Comprobantes */}
                            <div className="reservaCarruselComprobantes">
                                {comprobantes.length > 0 ? (
                                    <>
                                        <div className="reservaCarruselVisor">
                                            {comprobantes.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    className="reservaCarruselFlecha" 
                                                    onClick={anteriorComprobante}
                                                >
                                                    {'<'}
                                                </button>
                                            )}

                                            <div 
                                                className="reservaComprobanteImgContenedor"
                                                onClick={() => setImagenAmpliada(comprobantes[comprobanteActual])}
                                                title="Click para ampliar comprobante"
                                            >
                                                <img 
                                                    src={comprobantes[comprobanteActual]} 
                                                    alt={`Comprobante ${comprobanteActual + 1}`} 
                                                />
                                                <div className="reservaComprobanteHover">
                                                    <span>Click para ampliar</span>
                                                </div>
                                            </div>

                                            {comprobantes.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    className="reservaCarruselFlecha" 
                                                    onClick={siguienteComprobante}
                                                >
                                                    {'>'}
                                                </button>
                                            )}
                                        </div>

                                        {/* Puntos indicadores */}
                                        {comprobantes.length > 1 && (
                                            <div className="reservaCarruselPuntos">
                                                {comprobantes.map((_, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`reservaPunto ${idx === comprobanteActual ? 'activo' : ''}`}
                                                        onClick={() => setComprobanteActual(idx)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="reservaSinComprobantes">Sin comprobantes adjuntos</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal para ver comprobante ampliado */}
            {imagenAmpliada && (
                <div className="reservaModalFondo" onClick={() => setImagenAmpliada(null)}>
                    <div className="reservaModalContenido" onClick={(e) => e.stopPropagation()}>
                        <img src={imagenAmpliada} alt="Comprobante ampliado" />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}