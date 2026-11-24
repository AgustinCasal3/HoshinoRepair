import './Register.css';
import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';
import { useState } from 'react';
import axios from 'axios';

import { Error } from './components/01 error/Error';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function Register() {
    const [errorRegistro, setErrorRegistro] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);
    const [correoEnviadoA, setCorreoEnviadoA] = useState<string>('');

    const manejarRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = String(formData.get('username') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const password = String(formData.get('password') || '');
        const repeatpassword = String(formData.get('repeatpassword') || '');

        if (username.length < 3) {
            setErrorRegistro('El nombre de usuario debe tener al menos 3 caracteres.');
            return;
        }

        if (password !== repeatpassword) {
            setErrorRegistro('Las contraseñas no coinciden. Verificalas e intentá de nuevo.');
            return;
        }

        setErrorRegistro('');
        setEnviando(true);

        try {
            await axios.post(`${API_URL}/users/register`, {
                username,
                email,
                password
            });

            setCorreoEnviadoA(email);
        } catch (error: any) {
            const msg = error.response?.data?.mensaje || 'Ocurrió un error al crear la cuenta.';
            setErrorRegistro(msg);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className='registerBody'>
            <div className='registerDiv'>
                <a className='registerFlechaVolver' href="/home">
                    <img src={flechaVolver} alt="volver" />
                </a>

                {correoEnviadoA ? (
                    <div className='registerForm' style={{ padding: '0 2.5vw', textAlign: 'center' }}>
                        <h1 className='registerTitulo'>¡Revisá tu correo!</h1>
                        <p style={{ marginTop: '3vh', fontSize: '2.1vh', lineHeight: 1.5 }}>
                            Te enviamos un enlace de activación a <strong>{correoEnviadoA}</strong>.
                        </p>
                        <p style={{ marginTop: '1.5vh', fontSize: '1.8vh', color: '#555' }}>
                            Hacé clic en el link del correo para activar tu cuenta (expira en 24 horas).
                        </p>
                        <a
                            href="/login"
                            className='registerButton'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                color: '#000',
                                fontSize: '2vh'
                            }}
                        >
                            Ir a Iniciar Sesión
                        </a>
                    </div>
                ) : (
                    <form className='registerForm' onSubmit={manejarRegistro}>
                        <h1 className='registerTitulo'>Registrarse</h1>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="username">Nombre de usuario:</label>
                            <input
                                className='registerInput'
                                type="text"
                                required
                                minLength={3}
                                id='username'
                                name='username'
                                placeholder='Ej: Jose Roberto'
                                />
                        </div>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="email">Email:</label>
                            <input
                                className='registerInput'
                                type="email"
                                required
                                placeholder='example@mail.com'
                                minLength={5}
                                id='email'
                                name='email'
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                title="Por favor, ingresá un correo electrónico válido"
                            />
                        </div>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="password">Contraseña:</label>
                            <input
                                className='registerInput'
                                type="password"
                                required
                                minLength={8}
                                id='password'
                                name='password'
                            />
                        </div>

                        <div className='registerCampos'>
                            <label className='registerLabel' htmlFor="repeatpassword">Repetir contraseña:</label>
                            <input
                                className='registerInput'
                                type="password"
                                required
                                minLength={8}
                                id='repeatpassword'
                                name='repeatpassword'
                            />
                        </div>

                        <button type="submit" className='registerButton' disabled={enviando}>
                            {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>

                        <a className='registerLink' href="/login">¿Ya tenes una cuenta? iniciar sesión</a>
                    </form>
                )}
            </div>

            <Error mensaje={errorRegistro} />
        </div>
    );
}