import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function VerifyEmail() {
    const { token } = useParams<{ token: string }>();
    const [estado, setEstado] = useState<'cargando' | 'exito' | 'error'>('cargando');
    const [mensaje, setMensaje] = useState<string>('Verificando tu cuenta...');
    const yaVerificadoRef = useRef(false);

    useEffect(() => {
        if (!token || yaVerificadoRef.current) return;
        yaVerificadoRef.current = true;

        const confirmarCuenta = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/verify/${token}`);
                setEstado('exito');
                setMensaje(response.data.mensaje || '¡Cuenta activada con éxito!');
            } catch (error: any) {
                setEstado('error');
                setMensaje(
                    error.response?.data?.mensaje ||
                    'El enlace de verificación es inválido o ya expiró.'
                );
            }
        };

        confirmarCuenta();
    }, [token]);

    return (
        <div className='registerBody'>
            <div className='registerDiv' style={{ minHeight: '45vh', padding: '4vh 2.5vw' }}>
                <div className='registerForm' style={{ textAlign: 'center' }}>
                    <h1 className='registerTitulo'>
                        {estado === 'cargando' && 'Verificando...'}
                        {estado === 'exito' && '¡Cuenta Activada!'}
                        {estado === 'error' && 'Enlace Inválido'}
                    </h1>

                    <p style={{ marginTop: '3vh', fontSize: '2.1vh', lineHeight: 1.5, color: '#333' }}>
                        {mensaje}
                    </p>

                    {estado !== 'cargando' && (
                        <a
                            href={estado === 'exito' ? '/login' : '/register'}
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
                            {estado === 'exito' ? 'Iniciar Sesión' : 'Volver a Registrarse'}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}