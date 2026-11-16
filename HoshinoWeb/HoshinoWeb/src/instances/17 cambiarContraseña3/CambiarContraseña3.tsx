import "./CambiarContraseña3.css";
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';

// NUEVO
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Error } from '../01 login/components/01 error/Error'; // misma ruta que en Login.tsx

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function CambiarContraseña3() {
    // NUEVO
    const email = sessionStorage.getItem('recuperarEmail') || '';
    const codigo = sessionStorage.getItem('recuperarCodigo') || '';
    const [nuevaContraseña, setNuevaContraseña] = useState<string>('');
    const [repetirContraseña, setRepetirContraseña] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // NUEVO: si falta el email o el código, vuelve al principio
    useEffect(() => {
        if (!email || !codigo) window.location.href = '/login';
    }, [email, codigo]);

    // NUEVO: cambia la contraseña y manda al login
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (nuevaContraseña !== repetirContraseña) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${API_URL}/users/recuperar/cambiar`, { email, codigo, nuevaContraseña });

            // Limpio los datos temporales y mando al login
            sessionStorage.removeItem('recuperarEmail');
            sessionStorage.removeItem('recuperarCodigo');
            window.location.href = '/login';
        } catch (error: any) {
            setErrorMessage(error.response?.data?.mensaje || 'No se pudo conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='cambiarContraseña3Body'>
                <div className='cambiarContraseña3Div'>

                    {/* CAMBIO: se agrega onSubmit */}
                    <form className='cambiarContraseña3Form' onSubmit={handleSubmit}>

                        <a className='cambiarContraseña3FlechaVolver' href="/cambiarContraseña2">
                            <img src={flechaVolver} alt="volver" />
                        </a>

                        <h1 className='cambiarContraseña3Titulo'>Recuperar Contraseña</h1>

                        <p>Ingrese la nueva contraseña.</p>

                        <div className='cambiarContraseña3Campos'>
                            <label className='cambiarContraseña2Label' htmlFor="NuevaContraseña">Nueva Contraseña:</label>
                            <input
                                className='cambiarContraseña3Input'
                                type="password"
                                required
                                minLength={8}
                                id='NuevaContraseña'
                                name='NuevaContraseña'
                                value={nuevaContraseña}                                  // NUEVO
                                onChange={(e) => setNuevaContraseña(e.target.value)}     // NUEVO
                            />
                        </div>

                        <div className='cambiarContraseña3Campos'>
                            <label className='cambiarContraseña2Label' htmlFor="RepetirContraseña">Repetir Contraseña:</label>
                            <input
                                className='cambiarContraseña3Input'
                                type="password"
                                required
                                minLength={8}
                                id='RepetirContraseña'
                                name='RepetirContraseña'
                                value={repetirContraseña}                                // NUEVO
                                onChange={(e) => setRepetirContraseña(e.target.value)}   // NUEVO
                            />
                        </div>

                        {/* CAMBIO: antes era un <a href="/cambiarContraseña3"> que apuntaba a sí mismo */}
                        <button type="submit" className='cambiarContraseña3Button' disabled={loading}>
                            {loading ? 'Guardando..' : 'Cambiar Contraseña'}
                        </button>

                        <a className='cambiarContraseña3Link' href="/login">¿Ya tenes cuenta? Iniciar Sesión</a>
                    </form>
                </div>

                {/* NUEVO */}
                {errorMessage && <Error mensaje={errorMessage} />}
            </div>
        </>
    )
}