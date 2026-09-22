//Importaciones del archivo Chatbot.tsx (del login)
import './Chatbot.css';

import flechaEnviar from '../../assets/imgs/11 chatbot/ArrowRight.svg';
import botonCerrar from '../../assets/imgs/11 chatbot/Close.svg';


import {Home} from '../00 home/Home';

//Funcion Chatbot
export function Chatbot() {

    return (
        <>

            <Home/>

            {/* Div del chatbot (del cuadrado gris para adentro) */}
            <div className='chatbotDiv'>

                {/* div con todo el contenido del chatbot */}
                <div className='chatbotContenido'>


                    <div className='chatbotDivTitulo'>


                        <h2 className='chatbotTitulo'>Chatbot: Hoshi :3</h2>


                        <a href='/home' className='chatbotButtonCerrar' >
                            <img src={botonCerrar} alt="X" />
                        </a>
                    </div>
                    
                    <div className='chatbotChat'>

                        <div className='chatbotDivMensajes'>
                        </div>
                        

                        <div className='chatbotDivEnviar'>

                            <input className='chatbotInput' type="text" placeholder="Escribe un mensaje..." />

                            <a className='chatbotButtonEnviar' href='#'>
                                <img src={flechaEnviar} alt=">" />
                            </a>
                        </div>

                    </div>
                    
                </div>
            </div>
        </>
    )
}