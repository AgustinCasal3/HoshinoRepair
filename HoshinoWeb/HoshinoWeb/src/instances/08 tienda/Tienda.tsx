import './Tienda.css';

import { Header } from '../0 header/Header';

import ImgDispositivo1 from '../../assets/imgs/05 dispositivo/productos/Producto1.png'
import ImgDispositivo2 from '../../assets/imgs/05 dispositivo/productos/Producto2.png'
import ImgDispositivo3 from '../../assets/imgs/05 dispositivo/productos/Producto3.png'
import ImgDispositivo4 from '../../assets/imgs/05 dispositivo/productos/Producto4.png'
import ImgDispositivo5 from '../../assets/imgs/05 dispositivo/productos/Producto5.png'
import ImgDispositivo6 from '../../assets/imgs/05 dispositivo/productos/Producto6.png'

export function Tienda() {
    return (
        <>
            <Header />

            <section className="tiendaContenedor">
                <div className="tiendaBusqueda">
                    <input type="text" placeholder='Buscar productos'/>
                </div>
                <div className="tiendaContenido">
                    <div className="tiendaIzq">
                        <div className="tiendaCategorias">
                            <h3>Categorias</h3>
                            <ul>
                                <li>PCs Armadas</li>
                                <li>Notebooks</li>
                                <li>Monitores</li>
                                <li>
                                    Componentes
                                    <ul>
                                        <li>Procesadores</li>
                                        <li>Motherboard</li>
                                        <li>Memorias RAM</li>
                                        <li>Coolers</li>
                                        <li>Placas de Video</li>
                                        <li>Discos</li>
                                        <li>Fuentes de Poder</li>
                                        <li>Gabinetes</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tiendaDer">
                        <div className="tiendaFiltros">
                            <div className="tiendaOrdenarPor">
                                <h2>Ordernar por</h2>
                                <h2>↓</h2>
                            </div>
                        </div>
                        <div className="tiendaContenedorArticulos">
                            <div className="tiendaArticulo">
                                <a href="dispositivo/1">
                                    <div className="tiendaArticuloImg">
                                        <img src={ImgDispositivo4} alt="Imagen del dispositivo" />
                                    </div>
                                    <div className="tiendaArticuloTexto">
                                        <h4>Steam Frame</h4>
                                        <h4>$2.500.000</h4>
                                    </div>
                                </a>
                            </div>
                            
                            <div className="tiendaArticulo">
                                <a href="dispositivo/1">
                                    <div className="tiendaArticuloImg">
                                        <img src={ImgDispositivo5} alt="Imagen del dispositivo" />
                                    </div>
                                    <div className="tiendaArticuloTexto">
                                        <h4>Mac Pro 6,1</h4>
                                        <h4>$500.000</h4>
                                    </div>
                                </a>
                            </div>
                            
                            <div className="tiendaArticulo">
                                <a href="dispositivo/1">
                                    <div className="tiendaArticuloImg">
                                        <img src={ImgDispositivo3} alt="Imagen del dispositivo" />
                                    </div>
                                    <div className="tiendaArticuloTexto">
                                        <h4>Nokia N-Gage</h4>
                                        <h4>$200.000</h4>
                                    </div>
                                </a>
                            </div>
                            
                            <div className="tiendaArticulo">
                                <a href="dispositivo/1">
                                    <div className="tiendaArticuloImg">
                                        <img src={ImgDispositivo2} alt="Imagen del dispositivo" />
                                    </div>
                                    <div className="tiendaArticuloTexto">
                                        <h4>Monitor Destruido</h4>
                                        <h4>$10.000</h4>
                                    </div>
                                </a>
                            </div>

                            <div className="tiendaArticulo">
                                <a href="dispositivo/1">
                                    <div className="tiendaArticuloImg">
                                        <img src={ImgDispositivo1} alt="Imagen del dispositivo" />
                                    </div>
                                    <div className="tiendaArticuloTexto">
                                        <h4>Laptop Lenovo</h4>
                                        <h4>$5.000</h4>
                                    </div>
                                </a>
                            </div>

                            <div className="tiendaArticulo">
                                <a href="dispositivo/1">
                                    <div className="tiendaArticuloImg">
                                        <img src={ImgDispositivo6} alt="Imagen del dispositivo" />
                                    </div>
                                    <div className="tiendaArticuloTexto">
                                        <h4>Playstation 1</h4>
                                        <h4>$250.000</h4>
                                    </div>
                                </a>
                            </div>

                            
                        </div>
                    </div>
                </div>
                <div className="tiendaPaginado">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>{'>'}</p>
                </div>
            </section>
        </>
    )
}