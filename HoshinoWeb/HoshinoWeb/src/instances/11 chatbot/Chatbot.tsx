//Importaciones del archivo Chatbot.tsx (del login)
import './Chatbot.css';

import flechaEnviar from '../../assets/imgs/11 chatbot/ArrowRight.svg';
import botonCerrar from '../../assets/imgs/11 chatbot/Close.svg';


import {Home} from '../00 home/Home';

//Funcion Chatbot
export function Chatbot() {

    return (
        <>
            
            {/* Etiqueta del home para que se vea junto con el chatbot (temporal) */}
            <Home/>

            {/* Div del chatbot (del cuadrado gris para adentro) */}
            <div className='chatbotDiv'>

                {/* div con todo el contenido del chatbot */}
                <div className='chatbotContenido'>

                    {/* Div con el titulo y el boton de cerrar el chatbot. Basicamente la parte de arriba del chatbot */}
                    <div className='chatbotDivTitulo'>

                        {/* Titulo del chatbot */}
                        <h2 className='chatbotTitulo'>Chatbot: Hoshi :3</h2>

                        {/* Boton para cerrar el chatbot. Funciona con una imagen */}
                        <a href='/home' className='chatbotButtonCerrar' >
                            <img src={botonCerrar} alt="X" />
                        </a>
                    </div>
                    
                    {/* Div de la parte del titulo para abajo del chatbot (desde donde se ven los mensajes para abajo) */}
                    <div className='chatbotChat'>

                        {/* Div de la parte de los mensajes del chatbot (abajo del titulo pero arriba de la parte de enviar) */}
                        <div className='chatbotDivMensajes'>
                        </div>
                        
                        {/* Div de la parte para escribir y enviar mensajes (abajo de la parte de los mensajes) */}
                        <div className='chatbotDivEnviar'>

                            {/* Input para escribir los mensajes */}
                            <input className='chatbotInput' type="text" placeholder="Escribe un mensaje..." />

                            {/* Boton para enviar los mensajes */}
                            <a className='chatbotButtonEnviar' href='/home'>
                                <img src={flechaEnviar} alt=">" />
                            </a>
                        </div>

                    </div>
                    
                </div>
            </div>
        </>
    )
}