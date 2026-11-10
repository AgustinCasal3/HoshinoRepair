// Importaciones del archivo Register.tsx
import './Register.css';
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';
import { useState } from 'react';

// Importacion del componente Error
import { Error } from './components/01 error/Error';

//Funcion Register
export function Register() {

    // Estado para manejar el error de validación de contraseñas
    const [errorRegistro, setErrorRegistro] = useState<string>('');

    // Función para manejar el envío y validaciones locales
    const manejarRegistro = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        // Extraemos los valores de los inputs usando FormData
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatpassword = formData.get('repeatpassword');

        // Validación: Las contraseñas deben ser exactamente iguales
        if (password !== repeatpassword) {
            setErrorRegistro('Las contraseñas no coinciden. Verificalas e intentá de nuevo.');
            return;
        }

        // Si pasan la validación, limpiamos el error
        setErrorRegistro('');
        
        console.log("Formulario válido. Listo para conectar con la base de datos.");
        console.log("Datos listos para enviar:", { email, password });
    };

    return (
        <>
            {/* Div body del registro, el que lo acomoda en el medio */}
            <div className='registerBody'>

                {/* Div del registro (del cuadrado gris para adentro) */}
                <div className='registerDiv'>

                    {/* Form con el evento onSubmit vinculado a nuestra función */}
                    <form className='registerForm' onSubmit={manejarRegistro}>

                        <a className='registerFlechaVolver' href="/home"><img src={flechaVolver} alt="volver" /></a>

                        <h1 className='registerTitulo'>Registrarse</h1>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="email">Email:</label>
                            <input 
                                className='registerInput' 
                                type="email" 
                                required 
                                minLength={5} 
                                id='email' 
                                name='email'
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                title="Por favor, ingresá un correo electrónico válido"
                            />
                        </div>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="password">Contraseña:</label>
                            <input className='registerInput' type="password" required minLength={8} id='password' name='password'/>
                        </div>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="repeatpassword">Repetir contraseña:</label>
                            <input className='registerInput' type="password" required minLength={8} id='repeatpassword' name='repeatpassword'/>
                        </div>
                        
                        {/* Se eliminó el texto rojo de acá */}

                        <button type="submit" className='registerButton'>Crear cuenta</button>

                        <a className='registerLink' href="/login">¿Ya tenes una cuenta? iniciar sesión</a>
                    </form>
                </div>

                {/* Le pasamos el estado errorRegistro como prop al componente */}
                <Error mensaje={errorRegistro} />

            </div>
        </>
    )
}