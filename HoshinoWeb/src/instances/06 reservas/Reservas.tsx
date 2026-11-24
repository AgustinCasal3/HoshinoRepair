import { useEffect, useState } from 'react';
import axios from 'axios';
import './Reservas.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface ReservationItem {
    reservationId: number;
    userId: number;
    productId: number;
    productData: {
        name: string;
        picture?: string;
    };
    status: string;
    reservationDate?: string;
    pickupDate?: string;
}

export function Reservas() {
    const { user } = useAuth();
    const [reservas, setReservas] = useState<ReservationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;

        const fetchReservas = async () => {
            try {
                const response = await axios.get(`${API_URL}/reservations/user/${user.userId}`);
                setReservas(response.data);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [user]);

    if (!user) {
        return (
            <>
                <Header />
                <section className="listaDispositivosSection">
                    <div className="listaDispositivosTitulo">
                        <h1>Debes iniciar sesión para ver tus reservas.</h1>
                        <a href="/login">Ir a Iniciar Sesión</a>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    // Helper para apuntar directamente a la carpeta de productos original
    const obtenerImagenReserva = (reserva: ReservationItem) => {
        const pic = reserva.productData?.picture;
        if (!pic) return '../src/assets/imgs/05 dispositivo/productos/Producto4.png';

        if (pic.startsWith('../') || pic.startsWith('/') || pic.startsWith('http') || pic.startsWith('data:')) {
            return pic;
        }

        const nombreArchivo = pic.includes('.') ? pic : `${pic}.png`;
        return `../src/assets/imgs/08 tienda/Productos/${reserva.productId}/${nombreArchivo}`;
    };

    // Clasificación de reservas por estado
    const reservasActivas = reservas.filter(r => r.status !== 'Retirado');
    const reservasRetiradas = reservas.filter(r => r.status === 'Retirado');

    return (
        <>
            <Header />

            {/* Sección: Reservas Activas */}
            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Tus reservas ({reservasActivas.length})</h1>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#fff' }}>Cargando reservas...</p>
                ) : (
                    <div className="listaDispositivos">
                        {reservasActivas.length > 0 ? (
                            reservasActivas.map((reserva) => (
                                <div key={reserva.reservationId} className="listaDispositivosArticulo">
                                    <div className="listaDispositivosInfo">
                                        <a href={`/reservasUsuarios/${reserva.reservationId}`}>
                                            <div className="listaDispositivosArticuloImg">
                                                <img 
                                                    src={obtenerImagenReserva(reserva)} 
                                                    alt={reserva.productData?.name} 
                                                />
                                            </div>
                                        </a>
                                        <a href={`/reservasUsuarios/${reserva.reservationId}`}>
                                            <div className="listaDispositivosDatos">
                                                <h3>{reserva.productData?.name}</h3>
                                                <h2>#{String(reserva.reservationId).padStart(6, '0')}</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="listaDispositivosVer">
                                        <a href={`/reservasUsuarios/${reserva.reservationId}`}>
                                            <p>Ver</p>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#aaa', width: '100%' }}>
                                No tienes reservas activas en este momento.
                            </p>
                        )}
                    </div>
                )}
            </section>

            {/* Sección: Reservas Listas y Retiradas */}
            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Listos y retirados ({reservasRetiradas.length})</h1>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#fff' }}>Cargando reservas...</p>
                ) : (
                    <div className="listaDispositivos">
                        {reservasRetiradas.length > 0 ? (
                            reservasRetiradas.map((reserva) => (
                                <div key={reserva.reservationId} className="listaDispositivosArticulo">
                                    <div className="listaDispositivosInfo">
                                        <a href={`/reservasUsuarios/${reserva.reservationId}`}>
                                            <div className="listaDispositivosArticuloImg">
                                                <img 
                                                    src={obtenerImagenReserva(reserva)} 
                                                    alt={reserva.productData?.name} 
                                                />
                                            </div>
                                        </a>
                                        <a href={`/reservasUsuarios/${reserva.reservationId}`}>
                                            <div className="listaDispositivosDatos">
                                                <h3>{reserva.productData?.name}</h3>
                                                <h2>#{String(reserva.reservationId).padStart(6, '0')}</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="listaDispositivosVer">
                                        <a href={`/reservasUsuarios/${reserva.reservationId}`}>
                                            <p>Ver</p>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#aaa', width: '100%' }}>
                                No tienes reservas retiradas.
                            </p>
                        )}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}