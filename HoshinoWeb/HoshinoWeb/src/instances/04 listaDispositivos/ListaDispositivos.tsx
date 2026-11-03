import { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaDispositivos.css';

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

export function ListaDispositivos() {
    const { user } = useAuth();
    const [dispositivos, setDispositivos] = useState<DeviceItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) return;

        const fetchDispositivos = async () => {
            try {
                const response = await axios.get(`${API_URL}/devices/user/${user.userId}`);
                setDispositivos(response.data);
            } catch (error) {
                console.error('Error al obtener los dispositivos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDispositivos();
    }, [user]);

    if (!user) {
        return (
            <>
                <Header />
                <section className="listaDispositivosSection">
                    <div className="listaDispositivosTitulo">
                        <h1>Debes iniciar sesión para ver tus dispositivos.</h1>
                        <a href="/login">Ir a Iniciar Sesión</a>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    // Separación de dispositivos según su estado
    const dispositivosEnReparacion = dispositivos.filter(d => d.state !== 'Retirado');
    const dispositivosListosYRetirados = dispositivos.filter(d => d.state === 'Retirado');

    return (
        <>
            <Header />

            {/* Sección: Dispositivos en Proceso/Reparación */}
            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Tus Dispositivos ({dispositivosEnReparacion.length})</h1>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#fff' }}>Cargando dispositivos...</p>
                ) : (
                    <div className="listaDispositivos">
                        {dispositivosEnReparacion.length > 0 ? (
                            dispositivosEnReparacion.map((device) => {
                                const imagenDispositivo = device.pictures && device.pictures.length > 0 
                                    ? device.pictures[0] 
                                    : 'Producto1.png';

                                return (
                                    <div key={device.deviceId} className="listaDispositivosArticulo">
                                        <div className="listaDispositivosInfo">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="listaDispositivosArticuloImg">
                                                    <img 
                                                        src={`../src/assets/imgs/05 dispositivo/dispositivos/${user.userId}/${device.deviceId}/${imagenDispositivo}`} 
                                                        alt={device.name} 
                                                    />
                                                </div>
                                            </a>
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="listaDispositivosDatos">
                                                    <h3>{device.name}</h3>
                                                    <h2>#{String(device.deviceId).padStart(6, '0')}</h2>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="listaDispositivosVer">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <p>Ver</p>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ textAlign: 'center', color: '#aaa', width: '100%' }}>
                                No tienes dispositivos actualmente en reparación.
                            </p>
                        )}
                    </div>
                )}
            </section>

            {/* Sección: Dispositivos Listos y Retirados */}
            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Listos y retirados ({dispositivosListosYRetirados.length})</h1>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#fff' }}>Cargando dispositivos...</p>
                ) : (
                    <div className="listaDispositivos">
                        {dispositivosListosYRetirados.length > 0 ? (
                            dispositivosListosYRetirados.map((device) => {
                                const imagenDispositivo = device.pictures && device.pictures.length > 0 
                                    ? device.pictures[0] 
                                    : '1.png';

                                return (
                                    <div key={device.deviceId} className="listaDispositivosArticulo">
                                        <div className="listaDispositivosInfo">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="listaDispositivosArticuloImg">
                                                    <img 
                                                        src={`../src/assets/imgs/05 dispositivo/dispositivos/${user.userId}/${device.deviceId}/${imagenDispositivo}`} 
                                                        alt={device.name} 
                                                    />
                                                </div>
                                            </a>
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="listaDispositivosDatos">
                                                    <h3>{device.name}</h3>
                                                    <h2>#{String(device.deviceId).padStart(6, '0')}</h2>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="listaDispositivosVer">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <p>Ver</p>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ textAlign: 'center', color: '#aaa', width: '100%' }}>
                                No tienes dispositivos listos o retirados.
                            </p>
                        )}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}