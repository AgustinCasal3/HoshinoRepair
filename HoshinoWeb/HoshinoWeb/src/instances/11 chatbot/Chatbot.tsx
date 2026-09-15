//Importaciones del archivo Chatbot.tsx (del login)
import './Chatbot.css';

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
                        <button className='chatbotButtonCerrar' >X</button>
                    </div>

                    <div className='chatbotInputButton'>
                        <input className='chatbotInput' type="text" placeholder="Escribe un mensaje..." />
                        <button className='chatbotButtonEnviar'>&gt;</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}