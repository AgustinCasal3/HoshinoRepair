import "./CambiarContraseña1.css";
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';

// NUEVO: importaciones para el backend
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { Error } from '../01 login/components/01 error/Error' // misma ruta que en Login.tsx

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function CambiarContraseña1() {
    // NUEVO: estados
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // NUEVO: envía el mail y pasa a la pantalla 2
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            await axios.post(`${API_URL}/users/recuperar/solicitar`, { email });
            sessionStorage.setItem('recuperarEmail', email);
            window.location.href = '/cambiarContraseña2';
        } catch (error: any) {
            setErrorMessage(error.response?.data?.mensaje || 'No se pudo conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='cambiarContraseña1Body'>
                <div className='cambiarContraseña1Div'>

                    {/* CAMBIO: se agrega onSubmit */}
                    <form className='cambiarContraseña1Form' onSubmit={handleSubmit}>

                        <a className='cambiarContraseña1FlechaVolver' href="/login">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        <h1 className='cambiarContraseña1Titulo'>Recuperar Contraseña</h1>

                        <p className="cambiarContraseña1p">Ingrese el correo de la cuenta a recuperar la contraseña.</p>

                        <div className='cambiarContraseña1Campos'>
                            <label className='cambiarContraseña1Label' htmlFor="email">Email:</label>
                            <input
                                className='cambiarContraseña1Input'
                                type="email"
                                required
                                minLength={5}
                                id='email'
                                name='email'
                                value={email}                                  // NUEVO
                                onChange={(e) => setEmail(e.target.value)}     // NUEVO
                            />
                        </div>

                        {/* CAMBIO: el <a> pasa a ser un <button type="submit"> */}
                        <button type="submit" className='cambiarContraseña1Button' disabled={loading}>
                            {loading ? 'Enviando..' : 'Siguiente'}
                        </button>

                        <a className='cambiarContraseña1Link' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

                {/* NUEVO */}
                {errorMessage && <Error mensaje={errorMessage} />}
            </div>
        </>
    )
}