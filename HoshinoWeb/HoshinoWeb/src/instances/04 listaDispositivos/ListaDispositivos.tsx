import './ListaDispositivos.css';

import { Header } from '../0 header/Header';

import ImgDispositivo1 from '../../assets/imgs/05 dispositivo/productos/Producto1.png'
import ImgDispositivo2 from '../../assets/imgs/05 dispositivo/productos/Producto2.png'
import ImgDispositivo3 from '../../assets/imgs/05 dispositivo/productos/Producto3.png'

export function ListaDispositivos() {

    let cantDispositivosListos = 1;

    let cantDispositivosReparacion = 2;
    let numDispositivo = 1;

    return (
        <>
            <Header />

            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Tus Dispositivos ({cantDispositivosReparacion})</h1>
                </div>
                <div className="listaDispositivos">
                    <div className="listaDispositivosArticulo">
                        <div className="listaDispositivosInfo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosArticuloImg">
                                    <img src={ImgDispositivo1} alt={`Foto del dispositivo ${numDispositivo}`} />
                                </div>
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosDatos">
                                    <h3>Notebook Gamer Lenovo</h3>
                                    <h2>#000001</h2>
                                </div>
                            </a>
                        </div>
                        <div className="listaDispositivosVer">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <p>Ver</p>
                            </a>
                        </div>
                    </div>

                    <div className="listaDispositivosArticulo">
                        <div className="listaDispositivosInfo">
                            
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosArticuloImg">
                                    <img src={ImgDispositivo2} alt={`Foto del dispositivo ${numDispositivo}`} />
                                </div>
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosDatos">
                                    <h3>Monitor Samsung</h3>
                                    <h2>#000002</h2>
                                </div>
                            </a>
                        </div>
                        <div className="listaDispositivosVer">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <p>Ver</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Listos y retirados ({cantDispositivosListos})</h1>
                </div>
                <div className="listaDispositivos">
                    <div className="listaDispositivosArticulo">
                        <div className="listaDispositivosInfo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosArticuloImg">
                                    <img src={ImgDispositivo3} alt={`Foto del dispositivo ${numDispositivo}`} />
                                </div>
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosDatos">
                                    <h3>Nokia N-Gage</h3>
                                    <h2>#000003</h2>
                                </div>
                            </a>
                        </div>
                        <div className="listaDispositivosVer">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <p>Ver</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}