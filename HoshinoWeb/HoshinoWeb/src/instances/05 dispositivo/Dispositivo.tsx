import './Dispositivo.css';

import { Header } from '../0 header/Header';

import ImgDispositivo1 from '../../assets/imgs/05 dispositivo/productos/Producto1.png'

export function Dispositivo() {
    return (
        <>
            <Header />

            <section className="dispositivoContenedor">
                <div className="dispositivoIzq">
                    <div className="dispositivoImg">
                        <img src={ImgDispositivo1} alt="Fotografia del dispositivo" />
                    </div>
                    <div className="dispositivoPago">
                        <a href="">Pagar</a>
                        <div className="dispositivoPrecio">
                            <h3>Costos</h3>
                            <h3>$340.000</h3>
                        </div>
                    </div>
                </div>
                <div className="dispositivoDer">
                    <div className="dispositivoTituloDispositivo">
                        <h1>Notebook Gamer Lenovo</h1>
                        <div className="dispositivoId">
                            <h3>#000001</h3>
                        </div>
                    </div>
                    <div className="dispositivoDescripcion">
                        <p>Notebook Gamer Lenovo Intel i7 10th 16gb Gtx 1650 480gb.</p>
                        <p>Esta notebook sera revisada y presupuestada por nuestros tecnicos especialistas.</p>
                    </div>
                    <div className="dispositivoRevisiones">
                        <h2>Revisiones:</h2>
                        <div className="dispositivoListaRevisiones">
                            <ol>
                                <li>La Notebook se encuentra destruida, se necesita nuevo chasis.</li>
                                <li>La mother necesita reconstruccion de pistas.</li>
                                <li>Se partio la memoria ram y el M.2</li>
                                <li>La pantalla sera reemplazada.</li>
                                <li>El teclado sera reparado, junto al trachpad y botones del mouse.</li>
                                <li>El sistema de refrigeracion sera reemplazado.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}