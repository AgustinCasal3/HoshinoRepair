import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tienda.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';

import FlechaArriba from '../../assets/imgs/08 tienda/ArrowUp.svg';
import FlechaAbajo from '../../assets/imgs/08 tienda/ArrowDown.svg';
import Buscar from '../../assets/imgs/08 tienda/Search.svg';
import FallbackImg from '../../assets/imgs/05 dispositivo/productos/Producto1.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const PRODUCTOS_POR_PAGINA = 30;

interface ProductItem {
    productId: number;
    name: string;
    brand?: string;
    model?: string;
    category?: string;
    type?: string;
    pictures?: string[];
    price: number;
    state?: string;
}

// Estructura de categorías principales y subcategorías
const CATEGORIAS = [
    {
        nombre: 'PCs Armadas',
        subcategorias: ['PCs Intel', 'PCs Amd', 'PCs Nvidia']
    },
    {
        nombre: 'Notebooks',
        subcategorias: ['Gamer', 'Oficina']
    },
    {
        nombre: 'Monitores',
        subcategorias: ['Gamer', 'Oficina']
    },
    {
        nombre: 'Componentes',
        subcategorias: [
            'Procesadores',
            'Motherboard',
            'Memorias RAM',
            'Coolers',
            'Placas de Video',
            'Discos',
            'Fuentes de Poder',
            'Gabinetes'
        ]
    },
    {
        nombre: 'Consolas',
        subcategorias: ['Playstation', 'Nintendo', 'Xbox', 'Otras']
    },
    {
        nombre: 'Realidad Virtual',
        subcategorias: ['Meta', 'Valve', 'Pico', 'Pimax']
    },
    {
        nombre: 'Otros dispositivos',
        subcategorias: ['Impresoras', 'TVs', 'Microondas', 'Aceleradores de Adrones']
    }
];

export function Tienda() {
    const [productos, setProductos] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Estados de filtros, búsqueda y orden
    const [busqueda, setBusqueda] = useState<string>('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [orden, setOrden] = useState<string>('default');

    // Estado del paginado
    const [paginaActual, setPaginaActual] = useState<number>(1);

    // Estado para saber qué categorías están desplegadas en el menú lateral
    const [categoriasAbiertas, setCategoriasAbiertas] = useState<Record<string, boolean>>({});

    // Desplegable de "Ordenar por"
    const [mostrarMenuOrden, setMostrarMenuOrden] = useState<boolean>(false);

    // Cargar productos desde el backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    // Reiniciar a la página 1 cuando cambia algún filtro o búsqueda
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoriaSeleccionada, orden]);

    // Función para abrir/cerrar acordeón de cada categoría
    const toggleCategoriaAbierta = (nombreCategoria: string) => {
        setCategoriasAbiertas((prev) => ({
            ...prev,
            [nombreCategoria]: !prev[nombreCategoria]
        }));
    };

    // 1. Filtrar por búsqueda de texto y por categoría/subcategoría/marca
    const productosFiltrados = productos.filter((prod) => {
        const coincideBusqueda = prod.name.toLowerCase().includes(busqueda.toLowerCase()) ||
            (prod.brand && prod.brand.toLowerCase().includes(busqueda.toLowerCase()));

        const selCat = categoriaSeleccionada.toLowerCase();

        const coincideCategoria = categoriaSeleccionada === '' ||
            (prod.category && prod.category.toLowerCase() === selCat) ||
            (prod.brand && prod.brand.toLowerCase() === selCat) ||
            (prod.type && prod.type.toLowerCase() === selCat);

        return coincideBusqueda && coincideCategoria;
    });

    // 2. Aplicar ordenamiento a la lista filtrada
    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (orden === 'precio-asc') return a.price - b.price;
        if (orden === 'precio-desc') return b.price - a.price;
        if (orden === 'nombre') return a.name.localeCompare(b.name);
        return a.productId - b.productId;
    });

    // 3. Cálculos para la paginación (30 por página)
    const totalPaginas = Math.ceil(productosOrdenados.length / PRODUCTOS_POR_PAGINA) || 1;
    const indiceInicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const productosPaginados = productosOrdenados.slice(indiceInicio, indiceInicio + PRODUCTOS_POR_PAGINA);

    const cambiarPagina = (nuevaPagina: number) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Función helper para construir la ruta de la imagen
    const obtenerRutaImagen = (prod: ProductItem) => {
        if (!prod.pictures || prod.pictures.length === 0) return FallbackImg;
        const pic = prod.pictures[0];

        if (pic.startsWith('../') || pic.startsWith('/') || pic.startsWith('http')) {
            return pic;
        }
        return `../src/assets/imgs/08 tienda/Productos/${prod.productId}/${pic}.png`;
    };

    return (
        <>
            <Header />

            <section className="tiendaContenedor">
                {/* Campo de búsqueda */}
                <div className="tiendaBusqueda">
                    <input 
                        type="text" 
                        placeholder='Buscar productos'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <p>
                        <img src={Buscar} alt="Buscar" />
                    </p>
                </div>

                <div className="tiendaEspaciador"></div>

                <div className="tiendaContenido">
                    {/* Panel Izquierdo: Categorías desplegables */}
                    <div className="tiendaIzq">
                        <div className="tiendaCategorias">
                            {categoriaSeleccionada && (
                                <button 
                                    onClick={() => setCategoriaSeleccionada('')}
                                    className='tiendaLimpiarFiltros'
                                >
                                    Limpiar filtros
                                </button>
                            )}

                            <h3>Categorías</h3>

                            {CATEGORIAS.map((cat) => {
                                const tieneSubcategorias = cat.subcategorias && cat.subcategorias.length > 0;
                                const estaAbierta = !!categoriasAbiertas[cat.nombre];
                                const estaSeleccionada = categoriaSeleccionada === cat.nombre;

                                return (
                                    <div key={cat.nombre}>
                                        {/* Categoría Principal */}
                                        <h4 
                                            onClick={() => {
                                                if (tieneSubcategorias) {
                                                    toggleCategoriaAbierta(cat.nombre);
                                                }
                                                setCategoriaSeleccionada(cat.nombre);
                                            }}
                                            style={{ 
                                                cursor: 'pointer', 
                                                opacity: estaSeleccionada ? 1 : 0.85, 
                                                fontWeight: estaSeleccionada ? 'bold' : 'normal',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            {tieneSubcategorias && (
                                                <img src={estaAbierta ? FlechaAbajo : FlechaArriba} alt="" />
                                            )}
                                            {cat.nombre}
                                        </h4>

                                        {/* Subcategorías */}
                                        {tieneSubcategorias && estaAbierta && (
                                            <div>
                                                {cat.subcategorias!.map((subCat) => {
                                                    const subSeleccionada = categoriaSeleccionada === subCat;
                                                    return (
                                                        <h5 
                                                            key={subCat}
                                                            onClick={() => setCategoriaSeleccionada(subCat)}
                                                            style={{ 
                                                                cursor: 'pointer', 
                                                                opacity: subSeleccionada ? 1 : 0.7,
                                                                fontWeight: subSeleccionada ? 'bold' : 'normal',
                                                                paddingLeft: '20px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            }}
                                                        >
                                                            <img src={FlechaArriba} alt="" />
                                                            {subCat}
                                                        </h5>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Panel Derecho: Filtro de orden y Lista de artículos */}
                    <div className="tiendaDer">
                        <div className="tiendaFiltros">
                            <div 
                                className={`tiendaOrdenarPor ${mostrarMenuOrden ? 'abierto' : ''}`}
                                onClick={() => setMostrarMenuOrden(!mostrarMenuOrden)}
                            >
                                <p>
                                    Ordenar por: {
                                        orden === 'precio-asc' ? 'Menor precio' :
                                        orden === 'precio-desc' ? 'Mayor precio' :
                                        orden === 'nombre' ? 'Nombre (A-Z)' : 'Destacados'
                                    }
                                </p>
                                <img src={FlechaAbajo} alt="" />

                                {mostrarMenuOrden && (
                                    <div className="tiendaOrdenDropdown">
                                        <p onClick={() => setOrden('default')}>Destacados</p>
                                        <p onClick={() => setOrden('precio-asc')}>Menor Precio</p>
                                        <p onClick={() => setOrden('precio-desc')}>Mayor Precio</p>
                                        <p onClick={() => setOrden('nombre')}>Nombre (A-Z)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <p style={{ textAlign: 'center', color: '#fff', padding: '40px' }}>Cargando catálogo...</p>
                        ) : (
                            <div className="tiendaContenedorArticulos">
                                {productosPaginados.length > 0 ? (
                                    productosPaginados.map((producto) => (
                                        <div key={producto.productId} className="tiendaArticulo">
                                            <a href={`/producto/${producto.productId}`}>
                                                <div className="tiendaArticuloImg">
                                                    <img 
                                                        src={obtenerRutaImagen(producto)} 
                                                        alt={producto.name} 
                                                    />
                                                </div>
                                                <div className="tiendaArticuloTexto">
                                                    <h4>{producto.name}</h4>
                                                    <h4>${producto.price.toLocaleString('es-AR')}</h4>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', color: '#aaa', width: '100%', padding: '40px' }}>
                                        No se encontraron productos que coincidan con la búsqueda.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* PAGINADO */}
                <div className="tiendaPaginado">
                    <p 
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        style={{ opacity: paginaActual === 1 ? 0.4 : 1, cursor: paginaActual === 1 ? 'default' : 'pointer' }}
                    >
                        {'<'}
                    </p>

                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numPagina) => (
                        <p
                            key={numPagina}
                            onClick={() => cambiarPagina(numPagina)}
                            style={{
                                fontWeight: numPagina === paginaActual ? 'bold' : 'normal',
                                backgroundColor: numPagina === paginaActual ? 'rgb(180, 180, 180)' : 'lightgray'
                            }}
                        >
                            {numPagina}
                        </p>
                    ))}

                    <p 
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        style={{ opacity: paginaActual === totalPaginas ? 0.4 : 1, cursor: paginaActual === totalPaginas ? 'default' : 'pointer' }}
                    >
                        {'>'}
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
}