import { useEffect, useState } from 'react';
import axios from 'axios';
import './Cuenta.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface DeviceItem {
    deviceId: number;
    name: string;
    pictures?: string[];
    state: string;
}

interface ReservationItem {
    reservationId: number;
    status: string;
}

export function Cuenta() {
    const { user } = useAuth();

    const [dispositivos, setDispositivos] = useState<DeviceItem[]>([]);
    const [reservas, setReservas] = useState<ReservationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;

        const fetchDatosCuenta = async () => {
            try {
                // Consultamos los dispositivos en reparación y las reservas del usuario
                const [resDevices, resReservations] = await Promise.all([
                    axios.get(`${API_URL}/devices/user/${user.userId}`),
                    axios.get(`${API_URL}/reservations/user/${user.userId}`)
                ]);

                setDispositivos(resDevices.data);
                setReservas(resReservations.data);
            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDatosCuenta();
    }, [user]);

    if (!user) {
        return (
            <>
                <Header />
                <section className="cuentaInfo">
                    <div className="cuentaInfoContenedor">
                        <h2>Debes iniciar sesión para ver tu cuenta.</h2>
                        <a href="/login">Ir a Iniciar Sesión</a>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    // Formato de fecha de creación de la cuenta
    const fechaIngreso = (user as any).createdAt 
        ? new Date((user as any).createdAt).toLocaleDateString('es-AR')
        : '12/10/2026';

    // Contadores
    const dispositivosEnReparacion = dispositivos.filter(d => d.state !== 'Retirado').length;
    const reservasActivas = reservas.filter(r => r.status !== 'Retirado' && r.status !== 'CANCELADO').length;

    return (
        <>
            <Header />

            <section className="cuentaInfo">
                <div className="cuentaInfoContenedor">
                    <div className="cuentaPerfil">
                        {/* Etiqueta de la imagen según la ruta específica del usuario */}
                        <img 
                            src={`../src/assets/imgs/04 cuenta/${user.userId}/${user.picture}`}
                            alt={`Foto de perfil de ${user.username}`} 
                        />
                        <h1>{user.username}</h1>
                    </div>
                    <div className="cuentaDatos">
                        <h3>Usuario desde: {fechaIngreso}</h3>
                        <h3>Dispositivos en reparacion: {dispositivosEnReparacion}</h3>
                        <h3>Reservas Activas: {reservasActivas}</h3>

                        <a href="/reservas">Reservas</a>
                    </div>
                </div>
            </section>

            <section className="cuentaDispositivos">
                <div className="cuentaTituloDispositivos">
                    <h1>Tus Dispositivos</h1>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#fff' }}>Cargando dispositivos...</p>
                ) : (
                    <div className="cuentaListaDispositivos">
                        {dispositivos.length > 0 ? (
                            dispositivos.map((device) => {
                                const imagenDispositivo = device.pictures && device.pictures.length > 0 
                                    ? device.pictures[0] 
                                    : '../src/assets/imgs/05 dispositivo/productos/Producto1.png';

                                return (
                                    <div key={device.deviceId} className="cuentaArticuloDispositivo">
                                        <div className="cuentaInfoDispositivo">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="listaDispositivosArticuloImg">
                                                    <img src={`../src/assets/imgs/05 dispositivo/dispositivos/${user.userId}/${device.deviceId}/${imagenDispositivo}`} alt={device.name} />
                                                </div>
                                            </a>
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="cuentaDatosDispositivo">
                                                    <h3>{device.name}</h3>
                                                    <h2>#{String(device.deviceId).padStart(6, '0')}</h2>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="cuentaVerDispositivo">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <p>Ver</p>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ textAlign: 'center', color: '#aaa', width: '100%' }}>
                                No tienes dispositivos registrados en reparación.
                            </p>
                        )}
                    </div>
                )}

                <div className="cuentaVerListaDipositivos">
                    <h2>
                        <a href="/dispositivos">
                            Ver lista completa {'>'}
                        </a>
                    </h2>
                </div>
            </section>

            <Footer />
        </>
    );
}