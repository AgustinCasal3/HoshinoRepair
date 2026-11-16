import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReservarProducto.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import { useAuth } from '../../context/AuthContext';
import FallbackImg from '../../assets/imgs/05 dispositivo/productos/Producto1.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface ProductItem {
    productId: number;
    name: string;
    brand?: string;
    pictures?: string[];
    price: number;
}

export function ReservarProducto() {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [producto, setProducto] = useState<ProductItem | null>(null);
    const [dniOrCuil, setDniOrCuil] = useState<string>('');
    const [receiptNumber, setReceiptNumber] = useState<string>('');
    const [imagenes, setImagenes] = useState<string[]>([]);
    const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
    const [enviando, setEnviando] = useState<boolean>(false);

    // Cargar datos del producto que se está reservando
    useEffect(() => {
        if (!id) return;
        axios.get(`${API_URL}/products/${id}`)
            .then((res) => setProducto(res.data))
            .catch((err) => console.error('Error al cargar producto:', err));
    }, [id]);

    // Acumular imágenes sin borrar las que ya estaban subidas
    const handleAgregarImagenes = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const archivos = Array.from(e.target.files);

        archivos.forEach((archivo) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImagenes((prev) => [...prev, reader.result as string]);
                }
            };
            reader.readAsDataURL(archivo);
        });

        // Limpiar el input para permitir volver a seleccionar el mismo archivo si se desea
        e.target.value = '';
    };

    const handleEliminarImagen = (indexToRemove: number) => {
        setImagenes((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert('Debes iniciar sesión para realizar una reserva.');
            navigate('/login');
            return;
        }

        if (imagenes.length === 0) {
            alert('Por favor, sube al menos una imagen del comprobante.');
            return;
        }

        setEnviando(true);
        try {
            await axios.post(`${API_URL}/payments`, {
                userId: user.userId,
                productId: producto?.productId || Number(id),
                dniOrCuil,
                receiptNumber,
                receiptImages: imagenes
            });

            alert('¡Reserva y comprobante enviados con éxito!');
            navigate('/reservas');
        } catch (error) {
            console.error('Error al enviar reserva:', error);
            alert('Hubo un error al procesar tu reserva.');
        } finally {
            setEnviando(false);
        }
    };

    const obtenerImagenProducto = (prod: ProductItem) => {
        if (!prod.pictures || prod.pictures.length === 0) return FallbackImg;
        const pic = prod.pictures[0];
        if (pic.startsWith('../') || pic.startsWith('/') || pic.startsWith('http')) return pic;
        const file = pic.includes('.') ? pic : `${pic}.png`;
        return `../../src/assets/imgs/08 tienda/Productos/${prod.productId}/${file}`;
    };

    return (
        <>
            <Header />

            <section className="reservarContenedor">
                {/* Columna Izquierda: Info + Resumen del Dispositivo */}
                <div className="reservarIzq">
                    <div className="reservarTexto">
                        <div className="reservaTitulo">
                            <h1>Reserva en preparacion</h1>
                        </div>

                        {/* Tarjeta del dispositivo a reservar */}
                        {producto && (
                            <div className="reservarDispositivoResumen">
                                <img src={obtenerImagenProducto(producto)} alt={producto.name} />
                                <div className="reservarDispositivoDetalles">
                                    <h3>{producto.name}</h3>
                                    <p>Total: <strong>${producto.price.toLocaleString('es-AR')}</strong></p>
                                    <p className="reservarMontoSena">
                                        Seña a transferir (5%): <strong>${(producto.price * 0.05).toLocaleString('es-AR')}</strong>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="reservaInfo">
                            <p>Para confirmar la reserva necesitamos algunos datos para la validacion del pago.</p>
                            <p>Te solicitamos subir el comprobante de pago, DNI o CUIL, y Numero de Comprobante.</p>
                            <p>El dispositivo se mantendra reservado por 3 horas hasta que se reciba el comprobante. Pasado ese periodo se volvera a liberar.</p>
                        </div>

                        <div className="reservarInfoPago">
                            <p><strong>Datos para la transferencia</strong></p>

                            <div className="reservarCuentasPago">
                                <div className="reservarCuenta">
                                    <p>Banco: Mercado Pago</p>
                                    <p>Alias: hoshino.repair.mp</p>
                                    <p>Titular: Hoshino & Co.</p>
                                </div>
                                <div className="reservarCuenta">
                                    <p>Banco: Santander</p>
                                    <p>Alias: hoshino.repair.st</p>
                                    <p>Titular: Hoshino & Co.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Formulario y Galería de Comprobantes */}
                <div className="reservarDer">
                    <form onSubmit={handleSubmit} className="reservarFormulario">
                        <div className="reservarInput">
                            <label htmlFor="dni">DNI o CUIL:</label>
                            <input 
                                id="dni"
                                type="text" 
                                required
                                placeholder="12345678"
                                value={dniOrCuil}
                                onChange={(e) => setDniOrCuil(e.target.value)}
                            />
                        </div>

                        <div className="reservarInput">
                            <label htmlFor="comprobanteNum">Numero de Comprobante:</label>
                            <input 
                                id="comprobanteNum"
                                type="text" 
                                required
                                placeholder="111333555777"
                                value={receiptNumber}
                                onChange={(e) => setReceiptNumber(e.target.value)}
                            />
                        </div>

                        <div className="reservarInput">
                            <label>Comprobante de Pago:</label>
                            
                            {/* Botón estilizado para añadir imágenes */}
                            <label htmlFor="subirComprobante" className="reservarDropzone">
                                <span>+ Agregar imagen de comprobante</span>
                            </label>
                            <input 
                                type="file" 
                                id="subirComprobante" 
                                accept="image/*"
                                multiple
                                onChange={handleAgregarImagenes}
                                style={{ display: 'none' }}
                            />

                            {/* Miniaturas de las imágenes subidas */}
                            {imagenes.length > 0 && (
                                <div className="reservarMiniaturas">
                                    {imagenes.map((imgSrc, idx) => (
                                        <div key={idx} className="reservarMiniaturaItem">
                                            <img src={imgSrc} alt={`Comprobante ${idx + 1}`} />
                                            <div 
                                                className="reservarMiniaturaOverlay"
                                                onClick={() => setImagenAmpliada(imgSrc)}
                                            >
                                                <span>Click para agrandar</span>
                                            </div>
                                            <button 
                                                type="button" 
                                                className="reservarEliminarImg"
                                                onClick={() => handleEliminarImagen(idx)}
                                                title="Quitar imagen"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <button type="submit" disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </section>

            {/* Vista Ampliada (Lightbox) - Se cierra al hacer clic afuera */}
            {imagenAmpliada && (
                <div className="reservarModalFondo" onClick={() => setImagenAmpliada(null)}>
                    <div className="reservarModalContenido" onClick={(e) => e.stopPropagation()}>
                        <img src={imagenAmpliada} alt="Comprobante ampliado" />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}