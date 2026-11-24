import { useState, useEffect, useRef, useCallback, memo, useMemo, Fragment } from 'react';
import axios from 'axios';
import './Chatbot.css';

import flechaEnviar from '../../assets/imgs/11 chatbot/ArrowRight.svg';
import botonCerrar from '../../assets/imgs/11 chatbot/Close.svg';
import logoGato from '../../assets/imgs/0 header/Gato Hoshino.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const STORAGE_MENSAJES_KEY = 'hoshi_chat_mensajes';
const STORAGE_ABIERTO_KEY = 'hoshi_chat_abierto';

interface MensajeChat {
    id: number;
    emisor: 'usuario' | 'hoshi';
    texto: string;
    animar?: boolean;
}

const MENSAJE_INICIAL: MensajeChat = {
    id: 1,
    emisor: 'hoshi',
    texto: '¡Holis! Soy Hoshi :3 ¿En qué te puedo ayudar hoy con Hoshino Repair?',
    animar: false
};

// Detecta una sola vez por carga si el usuario presionó F5 / Recargar para limpiar la sesión
let verificacionRecargaHecha = false;

function limpiarSiEsRecarga() {
    if (verificacionRecargaHecha) return;
    verificacionRecargaHecha = true;

    try {
        const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navEntries.length > 0 && navEntries[0].type === 'reload') {
            sessionStorage.removeItem(STORAGE_MENSAJES_KEY);
            sessionStorage.removeItem(STORAGE_ABIERTO_KEY);
        }
    } catch {
        // Ignorar si el navegador no soporta PerformanceNavigationTiming
    }
}

function obtenerMensajesIniciales(): MensajeChat[] {
    limpiarSiEsRecarga();
    try {
        const guardados = sessionStorage.getItem(STORAGE_MENSAJES_KEY);
        if (guardados) {
            const parsed: MensajeChat[] = JSON.parse(guardados);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Evita que se vuelvan a animar letra por letra los mensajes anteriores al cambiar de página
                return parsed.map((m) => ({ ...m, animar: false }));
            }
        }
    } catch {
        // Si falla el parseo, usar el mensaje por defecto
    }
    return [MENSAJE_INICIAL];
}

function obtenerEstadoAbiertoInicial(): boolean {
    limpiarSiEsRecarga();
    try {
        return sessionStorage.getItem(STORAGE_ABIERTO_KEY) === 'true';
    } catch {
        return false;
    }
}

interface SegmentoTexto {
    texto: string;
    negrita: boolean;
}

// Convierte *texto* y **texto** en negritas, y limpia viñetas iniciales
function parsearTextoConNegritas(textoOriginal: string): SegmentoTexto[] {
    const textoConVinetas = textoOriginal.replace(/^(\s*)\*\s+/gm, '$1• ');
    const partes = textoConVinetas.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g);

    return partes
        .filter((parte) => parte.length > 0)
        .map((parte) => {
            if (parte.startsWith('**') && parte.endsWith('**') && parte.length > 4) {
                return { texto: parte.slice(2, -2), negrita: true };
            }
            if (parte.startsWith('*') && parte.endsWith('*') && parte.length > 2) {
                return { texto: parte.slice(1, -1), negrita: true };
            }
            return { texto: parte, negrita: false };
        });
}

// Genera el texto letra por letra para que la burbuja crezca naturalmente
function TextoAnimadoHoshi({
    texto,
    animar
}: {
    texto: string;
    animar?: boolean;
}) {
    const segmentos = useMemo(() => parsearTextoConNegritas(texto), [texto]);
    const totalCaracteres = useMemo(
        () => segmentos.reduce((acc, seg) => acc + seg.texto.length, 0),
        [segmentos]
    );

    const [letrasVisibles, setLetrasVisibles] = useState<number>(
        animar ? 0 : totalCaracteres
    );
    const [animacionTerminada, setAnimacionTerminada] = useState<boolean>(!animar);

    useEffect(() => {
        if (!animar) {
            setLetrasVisibles(totalCaracteres);
            setAnimacionTerminada(true);
            return;
        }

        setLetrasVisibles(0);
        setAnimacionTerminada(false);

        let timeoutColapso: ReturnType<typeof setTimeout>;
        const intervalo = setInterval(() => {
            setLetrasVisibles((prev) => {
                if (prev >= totalCaracteres) {
                    clearInterval(intervalo);
                    timeoutColapso = setTimeout(() => {
                        setAnimacionTerminada(true);
                    }, 550);
                    return totalCaracteres;
                }
                return prev + 1;
            });
        }, 22);

        return () => {
            clearInterval(intervalo);
            clearTimeout(timeoutColapso);
        };
    }, [totalCaracteres, animar]);

    if (animacionTerminada) {
        return (
            <>
                {segmentos.map((seg, idx) =>
                    seg.negrita ? (
                        <strong key={idx}>{seg.texto}</strong>
                    ) : (
                        <Fragment key={idx}>{seg.texto}</Fragment>
                    )
                )}
            </>
        );
    }

    let acumulado = 0;

    return (
        <>
            {segmentos.map((seg, segIdx) => {
                if (acumulado >= letrasVisibles) return null;

                const disponibles = letrasVisibles - acumulado;
                const fragmentoVisible = seg.texto.slice(0, disponibles);
                acumulado += seg.texto.length;

                const letras = fragmentoVisible.split('').map((caracter, charIdx) => (
                    <span key={charIdx} className="chatbotLetraFade">
                        {caracter}
                    </span>
                ));

                return seg.negrita ? (
                    <strong key={segIdx}>{letras}</strong>
                ) : (
                    <Fragment key={segIdx}>{letras}</Fragment>
                );
            })}
        </>
    );
}

const BurbujaMensaje = memo(function BurbujaMensaje({
    msg
}: {
    msg: MensajeChat;
}) {
    return (
        <div
            className={`chatbotBurbujaFila ${
                msg.emisor === 'usuario' ? 'filaUsuario' : 'filaHoshi'
            }`}
        >
            <div
                className={`chatbotBurbuja ${
                    msg.emisor === 'usuario' ? 'burbujaUsuario' : 'burbujaHoshi'
                }`}
            >
                {msg.emisor === 'hoshi' ? (
                    <TextoAnimadoHoshi texto={msg.texto} animar={msg.animar} />
                ) : (
                    msg.texto
                )}
            </div>
        </div>
    );
});

export function Chatbot() {
    const [isOpen, setIsOpen] = useState<boolean>(obtenerEstadoAbiertoInicial);
    const [inputTexto, setInputTexto] = useState('');
    const [cargando, setCargando] = useState(false);
    const [mensajes, setMensajes] = useState<MensajeChat[]>(obtenerMensajesIniciales);

    const contenedorMensajesRef = useRef<HTMLDivElement | null>(null);
    const mensajesInnerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Sincronizar historial de mensajes en sessionStorage durante la navegación
    useEffect(() => {
        try {
            const paraGuardar = mensajes.map(({ id, emisor, texto }) => ({
                id,
                emisor,
                texto,
                animar: false
            }));
            sessionStorage.setItem(STORAGE_MENSAJES_KEY, JSON.stringify(paraGuardar));
        } catch {
            // Ignorar si sessionStorage no está disponible
        }
    }, [mensajes]);

    // Sincronizar estado abierto/cerrado en sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_ABIERTO_KEY, String(isOpen));
        } catch {
            // Ignorar
        }
    }, [isOpen]);

    const scrollAlFondo = useCallback(() => {
        const contenedor = contenedorMensajesRef.current;
        if (contenedor) {
            contenedor.scrollTop = contenedor.scrollHeight;
        }
    }, []);

    useEffect(() => {
        const inner = mensajesInnerRef.current;
        if (!inner) return;

        const observer = new ResizeObserver(() => {
            scrollAlFondo();
        });

        observer.observe(inner);
        return () => observer.disconnect();
    }, [scrollAlFondo]);

    useEffect(() => {
        if (isOpen) {
            scrollAlFondo();
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isOpen, scrollAlFondo]);

    const enviarMensaje = async () => {
        const textoLimpio = inputTexto.trim();
        if (!textoLimpio || cargando) return;

        const nuevoMensajeUsuario: MensajeChat = {
            id: Date.now(),
            emisor: 'usuario',
            texto: textoLimpio
        };

        const historialPrevio = [...mensajes];
        setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
        setInputTexto('');
        setCargando(true);

        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });

        try {
            const response = await axios.post(`${API_URL}/chatbot`, {
                message: textoLimpio,
                history: historialPrevio.slice(-8)
            });

            const nuevoMensajeHoshi: MensajeChat = {
                id: Date.now() + 1,
                emisor: 'hoshi',
                texto: response.data.reply,
                animar: true
            };

            setMensajes((prev) => [...prev, nuevoMensajeHoshi]);
        } catch (error) {
            console.error('Error al hablar con Hoshi:', error);
            setMensajes((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    emisor: 'hoshi',
                    texto: 'Ups, tuve un problemita de conexión. ¡Intentá de nuevo en un ratito! :3',
                    animar: true
                }
            ]);
        } finally {
            setCargando(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            enviarMensaje();
        }
    };

    return (
        <div
            className={`chatbotWidget ${isOpen ? 'abierto' : ''}`}
            onClick={!isOpen ? () => setIsOpen(true) : undefined}
        >
            {/* Cabecera */}
            <div className="chatbotHeader">
                <div className="chatbotHeaderInfo">
                    <img src={logoGato} alt="Hoshi" className="chatbotHeaderIcono" />
                    <h2 className="chatbotTitulo">Hablar con Hoshi</h2>
                </div>

                {isOpen && (
                    <button
                        type="button"
                        className="chatbotButtonCerrar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    >
                        <img src={botonCerrar} alt="Cerrar" />
                    </button>
                )}
            </div>

            {/* Cuerpo del Chatbot */}
            <div className="chatbotCuerpo">
                <div className="chatbotChat">
                    <div className="chatbotDivMensajes" ref={contenedorMensajesRef}>
                        <div className="chatbotMensajesInner" ref={mensajesInnerRef}>
                            {mensajes.map((msg) => (
                                <BurbujaMensaje key={msg.id} msg={msg} />
                            ))}

                            {cargando && (
                                <div className="chatbotBurbujaFila filaHoshi">
                                    <div className="chatbotBurbuja burbujaHoshi chatbotEscribiendo">
                                        {'Hoshi está pensando...'.split('').map((letra, index) => (
                                            <span
                                                key={index}
                                                className="chatbotLetraOla"
                                                style={{ animationDelay: `${index * 0.06}s` }}
                                            >
                                                {letra}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="chatbotDivEnviar">
                        <input
                            ref={inputRef}
                            className="chatbotInput"
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={inputTexto}
                            onChange={(e) => setInputTexto(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type="button"
                            className="chatbotButtonEnviar"
                            onClick={enviarMensaje}
                            disabled={cargando}
                        >
                            <img src={flechaEnviar} alt="Enviar" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}