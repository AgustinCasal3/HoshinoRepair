import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

import FlechaBtn from '../../assets/imgs/00 home/FlechaBtn.png';

import ImgCarrousel1 from '../../assets/imgs/00 home/ImgCarrousel1.png';
import ImgCarrousel2 from '../../assets/imgs/00 home/ImgCarrousel2.png';
import ImgCarrousel3 from '../../assets/imgs/00 home/ImgCarrousel3.png';
import ImgCarrousel4 from '../../assets/imgs/00 home/ImgCarrousel4.png';
import ImgCarrousel5 from '../../assets/imgs/00 home/ImgCarrousel5.png';
import ImgCarrousel6 from '../../assets/imgs/00 home/ImgCarrousel6.png';

import FallbackImg from '../../assets/imgs/05 dispositivo/productos/Producto1.png';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface ProductItem {
    productId: number;
    name: string;
    brand?: string;
    pictures?: string[];
    price: number;
    state?: string;
}

export function Home() {
    const [imagenActual, setImagenActual] = useState(0);

    // Estados para productos dinámicos
    const [productosSugeridos, setProductosSugeridos] = useState<ProductItem[]>([]);
    const [loadingProductos, setLoadingProductos] = useState<boolean>(true);

    const imagenesCarrousel = [
        ImgCarrousel1,
        ImgCarrousel2,
        ImgCarrousel3,
        ImgCarrousel4,
        ImgCarrousel5,
        ImgCarrousel6,
    ];

    const siguienteImagen = () => {
        setImagenActual(
            (imagenActual + 1) % imagenesCarrousel.length
        );
    };

    const anteriorImagen = () => {
        setImagenActual(
            (imagenActual - 1 + imagenesCarrousel.length)
            % imagenesCarrousel.length
        );
    };

    // Obtener catálogo y seleccionar 3 productos al azar
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                const todos: ProductItem[] = response.data;

                // Filtrar disponibles si es necesario y mezclar aleatoriamente
                const mezclar = [...todos].sort(() => 0.5 - Math.random());
                const tresSugeridos = mezclar.slice(0, 3);

                setProductosSugeridos(tresSugeridos);
            } catch (error) {
                console.error('Error al obtener productos sugeridos:', error);
            } finally {
                setLoadingProductos(false);
            }
        };

        fetchProductos();
    }, []);

    // Función helper para construir la ruta de la imagen
    const obtenerRutaImagen = (prod: ProductItem) => {
        if (!prod.pictures || prod.pictures.length === 0) return FallbackImg;
        const pic = prod.pictures[0];

        if (pic.startsWith('../') || pic.startsWith('/') || pic.startsWith('http')) {
            return pic;
        }
        const tieneExtension = pic.includes('.');
        const nombreArchivo = tieneExtension ? pic : `${pic}.png`;
        return `../src/assets/imgs/08 tienda/Productos/${prod.productId}/${nombreArchivo}`;
    };

    return (
        <>
            <Header />

            {/* Carrusel Principal */}
            <section className="homeCarrousel">
                <div className="homeCarrouselContenedor">
                    <div className="homeBtnIzq" onClick={anteriorImagen}>
                        <img src={FlechaBtn} alt="Imagen Anterior"/>
                    </div>
                    
                    <img 
                        className="homeImgPrincipal" 
                        src={imagenesCarrousel[imagenActual]} 
                        alt='Imagen de promocion' 
                    />

                    <div className="homeBtnDer" onClick={siguienteImagen}>
                        <img className="flechaInvertida" src={FlechaBtn} alt="Imagen Siguiente"/>
                    </div>
                </div>
            </section>

            {/* Productos Sugeridos / Destacados */}
            <section className="homeProductos">
                <div className="homeTituloProductos">
                    <h1>Productos Sugeridos</h1>
                </div>
                <div className="homeContenedorProductos">
                    {loadingProductos ? (
                        <p style={{ textAlign: 'center', color: '#fff', padding: '20px' }}>
                            Cargando sugerencias...
                        </p>
                    ) : (
                        <div className="homeProductosSugeridos">
                            {productosSugeridos.length > 0 ? (
                                productosSugeridos.map((producto) => (
                                    <div key={producto.productId} className="homeProductoSugerido">
                                        <div className="homeImgProducto">
                                            <img
                                                src={obtenerRutaImagen(producto)} 
                                                alt={producto.name}
                                            />
                                        </div>
                                        <div className="homeInfoProducto">
                                            <h3 className='homeTituloProducto'>
                                                {producto.name}
                                            </h3>
                                            <h2 className="homePrecioProducto">
                                                ${producto.price.toLocaleString('es-AR')}
                                            </h2>
                                        </div>
                                        <div className="homeBotonVerProducto">
                                            <a href={`/producto/${producto.productId}`}>
                                                <button className="homeBotonVerProducto">Ver</button>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: '#aaa', width: '100%' }}>
                                    No hay productos disponibles en este momento.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}