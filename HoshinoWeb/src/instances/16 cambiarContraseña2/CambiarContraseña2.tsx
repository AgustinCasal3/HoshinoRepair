import "./CambiarContraseña2.css";
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';

// NUEVO
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Error } from '../01 login/components/01 error/Error'; // misma ruta que en Login.tsx

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function CambiarContraseña2() {
    // NUEVO
    const email = sessionStorage.getItem('recuperarEmail') || '';
    const [codigo, setCodigo] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // NUEVO: si llegaron acá sin pasar por la pantalla 1, los mando para allá
    useEffect(() => {
        if (!email) window.location.href = '/cambiarContraseña1';
    }, [email]);

    // NUEVO: valida el código y pasa a la pantalla 3
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            await axios.post(`${API_URL}/users/recuperar/verificar`, { email, codigo });
            sessionStorage.setItem('recuperarCodigo', codigo);
            window.location.href = '/cambiarContraseña3';
        } catch (error: any) {
            setErrorMessage(error.response?.data?.mensaje || 'No se pudo conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // NUEVO: reenviar código
    const reenviarCodigo = async () => {
        setErrorMessage('');
        try {
            await axios.post(`${API_URL}/users/recuperar/solicitar`, { email });
            alert('Te enviamos un código nuevo');
        } catch (error: any) {
            setErrorMessage(error.response?.data?.mensaje || 'No se pudo reenviar el código');
        }
    };

    return (
        <>
            <div className='cambiarContraseña2Body'>
                <div className='cambiarContraseña2Div'>

                    {/* CAMBIO: se agrega onSubmit */}
                    <form className='cambiarContraseña2Form' onSubmit={handleSubmit}>

                        <a className='cambiarContraseña2FlechaVolver' href="/cambiarContraseña1">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        <h1 className='cambiarContraseña2Titulo'>Recuperar Contraseña</h1>

                        <p className="cambiarContraseña2p">Se le enviara un codigo por correo.</p>
                        <p className="cambiarContraseña2p">En caso de no haberlo recibido solicitar uno nuevo.</p>

                        <div className='cambiarContraseña2Campos'>
                            <label className='cambiarContraseña2Label' htmlFor="codigo">Codigo:</label>

                            <div className="cambiarContraseña2InputButton">
                                <input
                                    className='cambiarContraseña2Input'
                                    type="text"
                                    inputMode="numeric"                              // NUEVO: teclado numérico en el celu
                                    required
                                    minLength={6}                                    // CAMBIO: el código tiene 6 dígitos
                                    maxLength={6}                                    // NUEVO
                                    id='codigo'
                                    name='codigo'
                                    value={codigo}                                   // NUEVO
                                    onChange={(e) => setCodigo(e.target.value)}      // NUEVO
                                />
                                {/* CAMBIO: el <a> pasa a ser <button type="button"> (no envía el form) */}
                                <button type="button" className='cambiarContraseña2ButtonCodigo' onClick={reenviarCodigo}>
                                    Reenviar Codigo
                                </button>
                            </div>
                        </div>

                        {/* CAMBIO: el <a> pasa a ser un <button type="submit"> */}
                        <button type="submit" className='cambiarContraseña2ButtonSiguiente' disabled={loading}>
                            {loading ? 'Verificando..' : 'Siguiente'}
                        </button>

                        <a className='cambiarContraseña2Link' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

                {/* NUEVO */}
                {errorMessage && <Error mensaje={errorMessage} />}
            </div>
        </>
    )
}