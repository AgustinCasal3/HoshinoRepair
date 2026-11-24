import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import axios from 'axios';
import './Cuenta.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import { useAuth } from '../../context/AuthContext';
import FallbackImg from '../../assets/imgs/05 dispositivo/productos/Producto1.png';

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

// Recorta el cuadrado más grande posible desde el centro de la imagen sin estirarla
const recortarCuadradoCentroBase64 = (archivo: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const lado = Math.min(img.naturalWidth, img.naturalHeight);
                const origenX = (img.naturalWidth - lado) / 2;
                const origenY = (img.naturalHeight - lado) / 2;

                // Limitamos a 512x512 para que sea nítida pero liviana en MongoDB
                const tamanoFinal = Math.min(lado, 512);

                const canvas = document.createElement('canvas');
                canvas.width = tamanoFinal;
                canvas.height = tamanoFinal;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('No se pudo inicializar el canvas.'));
                    return;
                }

                ctx.drawImage(
                    img,
                    origenX,
                    origenY,
                    lado,
                    lado,
                    0,
                    0,
                    tamanoFinal,
                    tamanoFinal
                );

                resolve(canvas.toDataURL('image/jpeg', 0.9));
            };
            img.onerror = () => reject(new Error('No se pudo cargar la imagen.'));
            if (typeof reader.result === 'string') {
                img.src = reader.result;
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo.'));
        reader.readAsDataURL(archivo);
    });
};

export function Cuenta() {
    const auth = useAuth();
    const { user } = auth;

    const [dispositivos, setDispositivos] = useState<DeviceItem[]>([]);
    const [reservas, setReservas] = useState<ReservationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Estados de foto de perfil, historial y modal
    const [fotoActual, setFotoActual] = useState<string>(user?.picture || '1.png');
    const [historialFotos, setHistorialFotos] = useState<string[]>(
        (user as any)?.pictureHistory || []
    );
    const [modalFotoAbierto, setModalFotoAbierto] = useState<boolean>(false);
    const [guardandoFoto, setGuardandoFoto] = useState<boolean>(false);

    const inputArchivoRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchDatosCuenta = async () => {
            try {
                // Consultamos los datos frescos del usuario, dispositivos y reservas
                const [resUser, resDevices, resReservations] = await Promise.all([
                    axios.get(`${API_URL}/users/${user.userId}`),
                    axios.get(`${API_URL}/devices/user/${user.userId}`),
                    axios.get(`${API_URL}/reservations/user/${user.userId}`)
                ]);

                if (resUser.data) {
                    setFotoActual(resUser.data.picture || '1.png');
                    setHistorialFotos(resUser.data.pictureHistory || []);
                }
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

    // Soporta tanto archivos locales ("1.png") como imágenes Base64 ("data:image/...")
    const obtenerRutaFotoPerfil = (pic?: string) => {
        if (!pic) return FallbackImg;
        if (
            pic.startsWith('data:') ||
            pic.startsWith('http') ||
            pic.startsWith('/') ||
            pic.startsWith('../')
        ) {
            return pic;
        }
        return `../src/assets/imgs/04 cuenta/${user.userId}/${pic}`;
    };

    // Guardar nueva foto principal y actualizar historial en MongoDB y en la sesión local
    const aplicarNuevaFotoPerfil = async (nuevaImagen: string) => {
        if (guardandoFoto || nuevaImagen === fotoActual) return;

        setGuardandoFoto(true);
        try {
            const response = await axios.put(`${API_URL}/users/${user.userId}/picture`, {
                newPicture: nuevaImagen
            });

            const usuarioActualizado = response.data.user;
            setFotoActual(usuarioActualizado.picture);
            setHistorialFotos(usuarioActualizado.pictureHistory || []);

            // Sincronizar con localStorage y AuthContext si corresponde
            try {
                const guardado = localStorage.getItem('user');
                if (guardado) {
                    const parsed = JSON.parse(guardado);
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            ...parsed,
                            picture: usuarioActualizado.picture,
                            pictureHistory: usuarioActualizado.pictureHistory
                        })
                    );
                }
                if (typeof (auth as any).login === 'function') {
                    (auth as any).login(usuarioActualizado);
                }
            } catch {
                // Ignorar si no usa localStorage
            }
        } catch (error) {
            console.error('Error al cambiar la foto de perfil:', error);
            alert('No se pudo actualizar la foto de perfil.');
        } finally {
            setGuardandoFoto(false);
        }
    };

    const handleSeleccionarArchivo = async (e: ChangeEvent<HTMLInputElement>) => {
        const archivo = e.target.files?.[0];
        if (!archivo) return;

        if (!archivo.type.startsWith('image/')) {
            alert('Por favor, seleccioná únicamente un archivo de imagen.');
            e.target.value = '';
            return;
        }

        try {
            const imagenCuadradaBase64 = await recortarCuadradoCentroBase64(archivo);
            await aplicarNuevaFotoPerfil(imagenCuadradaBase64);
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            alert('Hubo un problema al procesar la imagen seleccionada.');
        } finally {
            e.target.value = '';
        }
    };

    // Formato de fecha de creación de la cuenta
    const fechaIngreso = (user as any).createdAt
        ? new Date((user as any).createdAt).toLocaleDateString('es-AR')
        : '12/10/2026';

    // Contadores
    const dispositivosEnReparacion = dispositivos.filter((d) => d.state !== 'Retirado').length;
    const reservasActivas = reservas.filter(
        (r) => r.status !== 'Retirado' && r.status !== 'CANCELADO'
    ).length;

    return (
        <>
            <Header />

            <section className="cuentaInfo">
                <div className="cuentaInfoContenedor">
                    <div className="cuentaPerfil">
                        <div className="cuentaFotoWrapper">
                            <img
                                className="cuentaFotoPrincipal"
                                src={obtenerRutaFotoPerfil(fotoActual)}
                                alt={`Foto de perfil de ${user.username}`}
                            />

                            {/* Botón circular gris con ícono de cámara abajo a la izquierda */}
                            <button
                                type="button"
                                className="cuentaCamaraBtn"
                                onClick={() => setModalFotoAbierto(true)}
                                title="Cambiar foto de perfil"
                                aria-label="Cambiar foto de perfil"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </button>
                        </div>

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
                                const imagenDispositivo =
                                    device.pictures && device.pictures.length > 0
                                        ? device.pictures[0]
                                        : '../src/assets/imgs/05 dispositivo/productos/Producto1.png';

                                return (
                                    <div key={device.deviceId} className="cuentaArticuloDispositivo">
                                        <div className="cuentaInfoDispositivo">
                                            <a href={`/dispositivo/${device.deviceId}`}>
                                                <div className="listaDispositivosArticuloImg">
                                                    <img
                                                        src={`../src/assets/imgs/05 dispositivo/dispositivos/${user.userId}/${device.deviceId}/${imagenDispositivo}`}
                                                        alt={device.name}
                                                    />
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
                        <a href="/dispositivos">Ver lista completa {'>'}</a>
                    </h2>
                </div>
            </section>

            {/* Modal para ver foto grande, subir nueva e historial de últimas 3 */}
            {modalFotoAbierto && (
                <div
                    className="cuentaModalFondo"
                    onClick={() => !guardandoFoto && setModalFotoAbierto(false)}
                >
                    <div
                        className="cuentaModalContenido"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="cuentaModalFotoGrande">
                            <img
                                src={obtenerRutaFotoPerfil(fotoActual)}
                                alt="Foto de perfil ampliada"
                            />
                        </div>

                        <div className="cuentaModalOpciones">
                            {/* Botón "+" para subir una foto nueva */}
                            <button
                                type="button"
                                className="cuentaModalBtnAgregar"
                                onClick={() => inputArchivoRef.current?.click()}
                                disabled={guardandoFoto}
                                title="Subir nueva foto"
                            >
                                +
                            </button>

                            <input
                                ref={inputArchivoRef}
                                type="file"
                                accept="image/*"
                                onChange={handleSeleccionarArchivo}
                                style={{ display: 'none' }}
                            />

                            {/* Historial de las últimas 3 fotos a la derecha del "+" */}
                            {historialFotos.slice(0, 5).map((fotoHist, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="cuentaModalHistorialItem"
                                    onClick={() => aplicarNuevaFotoPerfil(fotoHist)}
                                    disabled={guardandoFoto}
                                    title="Volver a usar esta foto"
                                >
                                    <img
                                        src={obtenerRutaFotoPerfil(fotoHist)}
                                        alt={`Foto anterior ${index + 1}`}
                                    />
                                </button>
                            ))}
                        </div>

                        {guardandoFoto && (
                            <p className="cuentaModalGuardando">Actualizando foto...</p>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}