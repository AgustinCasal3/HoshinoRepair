import './Footer.css';
import whatsapp from '../../assets/imgs/0 footer/whatsapp.png';
import facebook from '../../assets/imgs/0 footer/facebook.png';
import twitter from '../../assets/imgs/0 footer/twitter.png';
import youtube from '../../assets/imgs/0 footer/youtube.png';

export function Footer() {
    return (
        <>
        <footer>

            <div className="footerContenido">

                <div className="footerContenedorListas">

                    <div className='footerLista'>

                        <ul>
                            <li>Servicios</li>
                            <li>Reparaciones en el local</li>
                            <li>Reparaciones a domicilio</li>
                            <li>Tienda</li>
                        </ul>
                    </div>

                    <div className='footerLista'>

                        <ul>
                            <li>Descubrir</li>
                            <li>PCs</li>
                            <li>Notebooks</li>
                            <li>Celulares</li>
                            <li>Consolas</li>
                            <li>Componentes</li>
                        </ul>
                    </div>

                    <div className='footerLista'>

                        <ul>
                            <li>Cuenta</li>
                            <li>Administrar cuenta</li>
                            <li> Mis reservas</li>
                            <li>Mis dispositivos</li>
                        </ul>
                    </div>

                    <div className='footerLista'>

                        <ul>
                            <li>Empresa</li>
                            <li>Terminos y condiciones</li>
                            <li>Acerca de Hoshino Repair</li>
                            <li>Politicas</li>
                        </ul>
                    </div>
                </div>

                <div className="footerCopyRedes">
                    <p>Copyright© 2026 Hoshino Repair</p>
                    <img src={whatsapp} alt="Whatsapp" />
                    <img src={facebook} alt="Facebook" />
                    <img src={twitter} alt="Twitter" />
                    <img src={youtube} alt="Youtube" />
                </div>


            </div>

        </footer>

        </>
    )
}