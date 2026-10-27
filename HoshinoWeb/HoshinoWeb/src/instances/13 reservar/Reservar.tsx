//Importaciones del archivo Reservar.tsx
import './Reservar.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';

//Funcion Reservar
export function Reservar() {

    let variable = 1;
    let pictureArray = ['01', '02', '03'];
    let selected = 0;

    let precio = 2000000;
    let sena = precio*0.05;

    let brand = 'Valve';
    let model = 'Steam Frame';
    let year = '2026';
    let condition = 'Nuevo';

    return (
        <>
            {/* Etiqueta del header para que se vea arriba de la pantalla */}
            <Header/>

            <div className="reservarContenedor">
                <section className="reservarImagenes">
                    <div className="reservarImagenPrincipal">
                        <img src={'../src/assets/imgs/08 tienda/Productos/'+variable+'/'+pictureArray[selected]+'.png'} alt="" />
                    </div>
                    <div className="reservarImagenesProducto">
                        <img id="seleccionado" src={'../src/assets/imgs/08 tienda/Productos/'+variable+'/'+pictureArray[selected]+'.png'} alt="" />
                        <img src={'../src/assets/imgs/08 tienda/Productos/'+variable+'/'+pictureArray[selected]+'.png'} alt="" />
                        <img src={'../src/assets/imgs/08 tienda/Productos/'+variable+'/'+pictureArray[selected]+'.png'} alt="" />
                    </div>
                </section>

                <section className="reservarInfo">
                    <div className="reservarTexto">
                        <div className="reservarTitulo">
                            <h1>VR Steam Frame</h1>
                        </div>
                        <div className="reservarSeparador">
                            <div className="reservarLinea"></div>
                        </div>
                        <div className="reservarDatos">
                            <p>Marca: {brand}</p>
                            <p>Modelo: {model}</p>
                            <p>Año: {year}</p>
                            <p>Condicion: {condition}</p>
                        </div>
                        <div className="reservarDescripcion">
                            <p>
                                Visor de realidad virtual autónomo de alta gama para una experiencia inmersiva sin cables.
                            </p>
                        </div>
                        <div className="reservarReserva">
                            <p>* Para la reserva del producto es requerido el pago de la Seña o el monto total del producto.</p>
                        </div>
                        
                    </div>

                    <div className="reservarPago">
                        <div className="reservarPrecios">
                                <div className="reservarSena">
                                    <p>
                                        Seña 5%: ${sena}
                                    </p>
                                </div>
                                <div className="reservarTotal">
                                    <p>
                                        Total: ${precio}
                                    </p>
                                </div>
                        </div>

                        <a className="reservarProducto" href='/subirComprobante/'>Reservar</a>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    )
}