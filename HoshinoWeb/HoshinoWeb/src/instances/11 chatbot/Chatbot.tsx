import { useState } from 'react';
import './Chatbot.css';

import flechaEnviar from '../../assets/imgs/11 chatbot/ArrowRight.svg';
import botonCerrar from '../../assets/imgs/11 chatbot/Close.svg';
import logoGato from '../../assets/imgs/0 header/Gato Hoshino.png';

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            className={`chatbotWidget ${isOpen ? 'abierto' : ''}`}
            onClick={!isOpen ? () => setIsOpen(true) : undefined}
        >
            {/* Cabecera: Sirve como botón cuando está cerrado y como título cuando está abierto */}
            <div className="chatbotHeader">
                <div className="chatbotHeaderInfo">
                    <img src={logoGato} alt="Hoshi" className="chatbotHeaderIcono" />
                    <h2 className="chatbotTitulo">Chatbot Hoshi :3</h2>
                </div>

                {/* Botón de cierre que aparece solo al expandirse */}
                {isOpen && (
                    <button 
                        type="button"
                        className="chatbotButtonCerrar" 
                        onClick={(e) => {
                            e.stopPropagation(); // Evita reabrir al hacer clic en cerrar
                            setIsOpen(false);
                        }}
                    >
                        <img src={botonCerrar} alt="Cerrar" />
                    </button>
                )}
            </div>
            
            {/* Cuerpo del Chatbot: Se revela suavemente cuando la ventana termina de expandirse */}
            <div className="chatbotCuerpo">
                <div className="chatbotChat">
                    <div className="chatbotDivMensajes"></div>
                    
                    <div className="chatbotDivEnviar">
                        <input 
                            className="chatbotInput" 
                            type="text" 
                            placeholder="Escribe un mensaje..." 
                        />
                        <button type="button" className="chatbotButtonEnviar">
                            <img src={flechaEnviar} alt="Enviar" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}