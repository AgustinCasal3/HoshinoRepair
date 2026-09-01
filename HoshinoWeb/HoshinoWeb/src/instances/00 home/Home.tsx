import './Home.css';

import FlechaBtn from '../../assets/imgs/00 home/FlechaBtn.png';

import { useState } from 'react';

import ImgCarrousel1 from '../../assets/imgs/00 home/ImgCarrousel1.png';
import ImgCarrousel2 from '../../assets/imgs/00 home/ImgCarrousel2.png';

import { Header } from '../0 header/Header';

export function Home() {

    const [imagenActual, setImagenActual] = useState(0);

    const imagenesCarrousel = [
        ImgCarrousel1,
        ImgCarrousel2,
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

    return (
        <>
            <Header />

            <section className="homeCarrousel" onClick={anteriorImagen}>
                <div className="homeBtnIzq">
                    <img src={FlechaBtn} alt="Imagen Anteior"/>
                </div>
                <div className="homeImgCarrousel">
                    <img src={imagenesCarrousel[imagenActual]} alt='Imagen de promocion' />
                </div>
                <div className="homeBtnDer" onClick={siguienteImagen}>
                    <img className="flechaInvertida" src={FlechaBtn} alt="Imagen Siguiente"/>
                </div>
            </section>

            <section className="homeProductos">
                <div className="homeTituloProductos">
                    <h1>Productos Sugeridos</h1>
                </div>
                <div className="homeProductoSugerido">
                    <div className="homeImgProducto">
                        <img className="homeImgProducto" src="" alt=""/>
                    </div>
                    <div className="homeInfoProducto">
                        <h3 className='homeTituloProducto'></h3>
                        <h2 className="homePrecioProducto"></h2>
                    </div>
                    <div className="homeBotonVerProducto">
                        <button className="homeBotonVerProducto">Ver</button>
                    </div>
                </div>
            </section>
        </>
    )
}