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

                    
                </div>
            </div>
        </>
    )
}