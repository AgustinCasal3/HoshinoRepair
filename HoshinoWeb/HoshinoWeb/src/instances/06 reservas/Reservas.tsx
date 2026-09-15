import './Reservas.css';

import { Header } from '../0 header/Header';

import ImgDispositivo4 from '../../assets/imgs/05 dispositivo/productos/Producto4.png'
import ImgDispositivo5 from '../../assets/imgs/05 dispositivo/productos/Producto5.png'
import ImgDispositivo6 from '../../assets/imgs/05 dispositivo/productos/Producto6.png'

export function Reservas() {

    let cantDispositivosRetirados = 1;

    let cantDispositivosReservados = 2;
    let numDispositivo = 1;

    return (
        <>
            <Header />

            <section className="listaDispositivosSection">
                <div className="listaDispositivosTitulo">
                    <h1>Tus reservas ({cantDispositivosReservados})</h1>
                </div>
                <div className="listaDispositivos">
                    <div className="listaDispositivosArticulo">
                        <div className="listaDispositivosInfo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosArticuloImg">
                                    <img src={ImgDispositivo4} alt={`Foto del dispositivo ${numDispositivo}`} />
                                </div>
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosDatos">
                                    <h3>Steam Frame 1TB</h3>
                                    <h2>#000004</h2>
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
                                    <img src={ImgDispositivo5} alt={`Foto del dispositivo ${numDispositivo}`} />
                                </div>
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosDatos">
                                    <h3>Mac Pro 6,1</h3>
                                    <h2>#000005</h2>
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
                    <h1>Listos y retirados ({cantDispositivosRetirados})</h1>
                </div>
                <div className="listaDispositivos">
                    <div className="listaDispositivosArticulo">
                        <div className="listaDispositivosInfo">
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosArticuloImg">
                                    <img src={ImgDispositivo6} alt={`Foto del dispositivo ${numDispositivo}`} />
                                </div>
                            </a>
                            <a href={`dispositivo/${numDispositivo}`}>
                                <div className="listaDispositivosDatos">
                                    <h3>Playstation 1</h3>
                                    <h2>#000006</h2>
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