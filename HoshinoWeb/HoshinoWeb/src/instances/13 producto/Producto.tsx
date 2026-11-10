import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Producto.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface SpecItem {
    part: string;
    model: string;
}

interface ProductItem {
    productId: number;
    serial?: string;
    name: string;
    brand?: string;
    model?: string;
    year?: number | string;
    type?: string;
    category?: string;
    condition?: string;
    stock?: number;
    warranty?: string;
    pictures?: string[];
    description?: string | string[];
    specs?: SpecItem[];
    price: number;
    state?: string;
}

export function Producto() {
    const { id } = useParams<{ id: string }>();

    const [producto, setProducto] = useState<ProductItem | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Consultar producto por su productId en la API
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProducto(response.data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setErrorMessage('No se pudo encontrar el producto solicitado.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProducto();
        }
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <div style={{ padding: '100px 0', textAlign: 'center', color: '#888' }}>
                    <h2>Cargando información del producto...</h2>
                </div>
                <Footer />
            </>
        );
    }

    if (errorMessage || !producto) {
        return (
            <>
                <Header />
                <div style={{ height:'70vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign: 'center', color: '#888' }}>
                    <h2>{errorMessage || 'Producto no disponible.'}</h2>
                    <a href="/tienda" style={{ color: '#555', textDecoration: 'underline' }}>Volver a la Tienda</a>
                </div>
                <Footer />
            </>
        );
    }

    // Cálculos de Precios
    const precio = producto.price || 0;
    const sena = precio * 0.05;

    // Manejo de la Galería de Imágenes
    const pictures = producto.pictures && producto.pictures.length > 0 
        ? producto.pictures 
        : ['01'];

    const getImagenSrc = (picName: string) => {
        if (picName.startsWith('../') || picName.startsWith('/') || picName.startsWith('http')) {
            return picName;
        }
        const hasExtension = picName.includes('.');
        const file = hasExtension ? picName : `${picName}.png`;
        return `../src/assets/imgs/08 tienda/Productos/${producto.productId}/${file}`;
    };

    const mainImgSrc = getImagenSrc(pictures[selectedImageIndex] || pictures[0]);

    return (
        <>
            <Header />

            <div className="productoContenedor">
                {/* Sección Galería de Imágenes */}
                <section className="productoImagenes">
                    <div className="productoImagenPrincipal">
                        <img src={mainImgSrc} alt={producto.name} />
                    </div>

                    <div className="productoImagenesProducto">
                        
                            {pictures.map((pic, idx) => {
                                const src = getImagenSrc(pic);
                                return (
                                    <div className="productoMiniatura">
                                        <img 
                                            key={idx}
                                            id={idx === selectedImageIndex ? 'seleccionado' : ''} 
                                            src={src} 
                                            alt={`${producto.name} miniatura ${idx + 1}`}
                                            onClick={() => setSelectedImageIndex(idx)}
                                        />
                                    </div>
                                );
                            })}
                        
                    </div>
                </section>

                {/* Sección Datos del Producto */}
                <section className="productoInfo">
                    <div className="productoTexto">
                        <div className="productoTitulo">
                            <h1>{producto.name}</h1>
                        </div>

                        <div className="productoSeparador">
                            <div className="productoLinea"></div>
                        </div>

                        <div className="productoDatos">
                            {producto.brand && <p>Marca: {producto.brand}</p>}
                            {producto.model && <p>Modelo: {producto.model}</p>}
                            {producto.year && <p>Año: {producto.year}</p>}
                            {producto.condition && <p>Condición: {producto.condition}</p>}
                            {producto.warranty && <p>Garantía: {producto.warranty}</p>}
                            {producto.stock !== undefined && <p>Stock: {producto.stock} disponible(s)</p>}
                        </div>

                        {producto.description && (
                            <div className="productoDescripcion">
                                {Array.isArray(producto.description) ? (
                                    producto.description.map((parrafo, index) => (
                                        <p key={index}>
                                            {parrafo}
                                        </p>
                                    ))
                                ) : (
                                    <p>{producto.description}</p>
                                )}
                            </div>
                        )}

                        {producto.specs && producto.specs.length > 0 && (
                            <div className="productoEspecificaciones">
                                <h3 style={{ fontSize: '2.5vh', fontWeight: 'normal', marginBottom: '1vh' }}>Especificaciones:</h3>
                                <ul style={{ listStyle: 'circle', paddingLeft: '2.5vh' }}>
                                    {producto.specs.map((spec, index) => (
                                        <li key={index} style={{ fontSize: '2vh' }}>
                                            <strong>{spec.part}:</strong> {spec.model}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="productoReserva">
                            <p>* Para la reserva del producto es requerido el pago de la Seña o el monto total del producto.</p>
                        </div>
                    </div>

                    <div className="productoPago">
                        <div className="productoPrecios">
                            <div className="productoSena">
                                <p>Seña 5%: ${sena.toLocaleString('es-AR')}</p>
                            </div>
                            <div className="productoTotal">
                                <p>Total: ${precio.toLocaleString('es-AR')}</p>
                            </div>
                        </div>

                        <a className="productoBotonReservar" href={`/subirComprobante/${producto.productId}`}>
                            Reservar
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}