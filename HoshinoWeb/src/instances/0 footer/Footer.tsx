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
                            <li className='footerListaTitulo'><a href="/home">Servicios</a></li>
                            <li><a href="/reparaciones">Reparaciones en el local</a></li>
                            <li><a href="/reparaciones">Reparaciones a domicilio</a></li>
                            <li><a href="/tienda">Tienda</a></li>
                        </ul>
                    </div>

                    <div className='footerLista'>

                        <ul>
                            <li className='footerListaTitulo'><a href="">Descubrir</a></li>
                            <li><a href="/tienda">PCs</a></li>
                            <li><a href="/tienda">Notebooks</a></li>
                            <li><a href="/tienda">Celulares</a></li>
                            <li><a href="/tienda">Consolas</a></li>
                            <li><a href="/tienda">Componentes</a></li>
                        </ul>
                    </div>

                    <div className='footerLista'>

                        <ul>
                            <li className='footerListaTitulo'><a href="/cuenta">Cuenta</a></li>
                            <li><a href="/cuenta">Administrar cuenta</a></li>
                            <li><a href="/reservas">Mis reservas</a></li>
                            <li><a href="/dispositivos">Mis dispositivos</a></li>
                        </ul>
                    </div>

                    <div className='footerLista'>

                        <ul>
                            <li className='footerListaTitulo'><a href="/about">Empresa</a></li>
                            <li><a href="/about">Terminos y condiciones</a></li>
                            <li><a href="/about">Acerca de Hoshino Repair</a></li>
                            <li><a href="/about">Politicas</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footerCopy">
                    <p>Copyright© 2026 Hoshino Repair</p>

                    <div className='footerRedes'>
                        <a className='footerImg' href="https://wa.me/5491171473214?text=Quiero%20hacer%20una%20consulta%20" target='_blank'><img src={whatsapp} alt="Whatsapp" /></a>
                        <a className='footerImg' href=""><img src={facebook} alt="Facebook" /></a>
                        <a className='footerImg' href=""><img src={twitter} alt="Twitter" /></a>
                        <a className='footerImg' href="https://www.youtube.com/@Aquwus" target="_blank"><img src={youtube} alt="Youtube" /></a>
                    </div>
                </div>


            </div>

        </footer>

        </>
    )
}