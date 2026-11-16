import './ReservarProducto.css';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';

export function ReservarProducto() {
    return (
        <>
            <Header/>

            <section className="reservarContenedor">
                <div className="reservarIzq">
                    <div className="reservarTexto">
                        <div className="reservaTitulo">
                            <h1>Reserva en preparacion</h1>
                        </div>

                        <div className="reservaInfo">
                            <p>Para confirmar la reserva necesitamos algunos datos para la validacion del pago.</p>

                            <p>Te solicitamos subir el comprobante de pago, DNI o CUIL, y Numero de Comprobante.</p>

                            <p>El dispositivo se mantendra reservado por 3 horas hasta que se reciba el comprobante. Pasado ese periodo se volvera a liberar.</p>
                        </div>

                        <div className="reservarInfoPago">
                            <p>Datos para la transferencia</p>

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
                <div className="reservarDer">
                    <div className="reservarFormulario">
                        <form action="">
                            <label htmlFor="">DNI o CUIL</label>
                            <input type="text" placeholder='12345678'/>
                            
                            <label htmlFor="">Numero de Comprobante</label>
                            <input type="text" placeholder='111333555777'/>

                            <label htmlFor="">Comprobante de Pago</label>
                            <input type="file" />
                            
                            <button>Enviar</button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    )
}