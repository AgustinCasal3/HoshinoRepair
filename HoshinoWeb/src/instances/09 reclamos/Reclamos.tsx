import './Reclamos.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { Header } from '../0 header/Header';
import { Footer } from '../0 footer/Footer';
import { useAuth } from '../../context/AuthContext';
import FlechaAbajo from '../../assets/imgs/09 reclamos/FlechaAbajo.svg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const MAX_CARACTERES = 2500;
const MAX_ARCHIVOS = 10;
const MAX_BYTES_ARCHIVO = 5 * 1024 * 1024; // 5MB

interface OrdenOpcion {
    value: string;
    label: string;
    orderType: 'reparacion' | 'compra' | 'otra';
    orderId?: number;
    detectedDeviceType: string;
}

interface ArchivoAdjunto {
    id: string;
    name: string;
    mimeType: string;
    dataUrl: string;
}

interface ReclamoHistorial {
    claimId: number;
    orderReference: string;
    deviceType: string;
    reason: string;
    description: string;
    attachments?: { name: string; mimeType: string; dataUrl: string }[];
    contactPhone?: string;
    contactEmail?: string;
    altPhone?: string;
    altEmail?: string;
    status: 'En revisión' | 'En proceso' | 'Resuelto' | string;
    resolution?: string;
    createdAt: string;
    resolvedAt?: string | null;
}

// Normaliza el tipo de dispositivo a una de las opciones del select
function normalizarTipoDispositivo(texto?: string): string {
    if (!texto) return 'Otro';
    const t = texto.toLowerCase();

    if (t.includes('celular') || t.includes('iphone') || t.includes('samsung') || t.includes('galaxy') || t.includes('xiaomi') || t.includes('motorola')) {
        return 'Celular';
    }
    if (t.includes('notebook') || t.includes('laptop') || t.includes('macbook') || t.includes('lenovo') || t.includes('asus')) {
        return 'Notebook';
    }
    if (t.includes('pc') || t.includes('escritorio') || t.includes('gabinete') || t.includes('ryzen') || t.includes('intel')) {
        return 'PC de escritorio';
    }
    if (t.includes('consola') || t.includes('playstation') || t.includes('ps5') || t.includes('ps4') || t.includes('xbox') || t.includes('nintendo') || t.includes('switch') || t.includes('joystick')) {
        return 'Consola';
    }
    if (t.includes('monitor')) {
        return 'Monitor';
    }
    if (t.includes('vr') || t.includes('quest') || t.includes('steam frame') || t.includes('realidad virtual')) {
        return 'Realidad Virtual';
    }
    if (t.includes('placa') || t.includes('procesador') || t.includes('ram') || t.includes('mother') || t.includes('fuente') || t.includes('disco')) {
        return 'Componente';
    }
    return 'Otro';
}

// Convierte un File a Base64 (dataURL)
function archivoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('No se pudo leer el archivo.'));
            }
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo.'));
        reader.readAsDataURL(file);
    });
}

export function Reclamos() {
    const { user } = useAuth();

    // Órdenes levantadas de MongoDB (reparaciones + compras/reservas)
    const [ordenesUsuario, setOrdenesUsuario] = useState<OrdenOpcion[]>([]);
    const [cargandoOrdenes, setCargandoOrdenes] = useState<boolean>(false);

    // Campos del formulario
    const [ordenSeleccionada, setOrdenSeleccionada] = useState<string>('');
    const [tipoDispositivo, setTipoDispositivo] = useState<string>('');
    const [motivo, setMotivo] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');

    // Archivos adjuntos (acumulativos: imágenes y PDFs)
    const [archivosAdjuntos, setArchivosAdjuntos] = useState<ArchivoAdjunto[]>([]);
    const [errorArchivos, setErrorArchivos] = useState<string>('');
    const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

    // Datos de contacto principales y alternativos
    const [telefono, setTelefono] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telefonoAlternativo, setTelefonoAlternativo] = useState<string>('');
    const [emailAlternativo, setEmailAlternativo] = useState<string>('');

    // Estados de envío y mensajes
    const [errorFormulario, setErrorFormulario] = useState<string>('');
    const [exitoFormulario, setExitoFormulario] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);

    // Historial de reclamos anteriores
    const [reclamosAnteriores, setReclamosAnteriores] = useState<ReclamoHistorial[]>([]);
    const [cargandoHistorial, setCargandoHistorial] = useState<boolean>(false);
    const [reclamosDesplegados, setReclamosDesplegados] = useState<Record<number, boolean>>({});

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Cargar órdenes, datos de contacto del usuario y reclamos anteriores
    useEffect(() => {
        if (!user) {
            setOrdenesUsuario([]);
            setReclamosAnteriores([]);
            return;
        }

        const cargarDatosUsuario = async () => {
            setCargandoOrdenes(true);
            setCargandoHistorial(true);

            try {
                const [resUser, resDevices, resReservations, resClaims] = await Promise.all([
                    axios.get(`${API_URL}/users/${user.userId}`),
                    axios.get(`${API_URL}/devices/user/${user.userId}`),
                    axios.get(`${API_URL}/reservations/user/${user.userId}`),
                    axios.get(`${API_URL}/claims/user/${user.userId}`)
                ]);

                // 1. Pre-rellenar contacto desde la base de datos
                const userData = resUser.data || user;
                setTelefono(userData.number ? String(userData.number) : '');
                setEmail(userData.email || '');

                // 2. Armar desplegable con reparaciones y compras/reservas reales
                const listaOrdenes: OrdenOpcion[] = [];

                if (Array.isArray(resDevices.data)) {
                    for (const dev of resDevices.data) {
                        const codigo = `#${String(dev.deviceId).padStart(4, '0')}`;
                        const label = `${codigo} — Reparación: ${dev.name} (${dev.state})`;
                        listaOrdenes.push({
                            value: `rep-${dev.deviceId}`,
                            label,
                            orderType: 'reparacion',
                            orderId: dev.deviceId,
                            detectedDeviceType: normalizarTipoDispositivo(dev.type || dev.name)
                        });
                    }
                }

                if (Array.isArray(resReservations.data)) {
                    for (const resv of resReservations.data) {
                        const codigo = `#${String(resv.reservationId).padStart(4, '0')}`;
                        const fecha = resv.reservationDate
                            ? new Date(resv.reservationDate).toLocaleDateString('es-AR')
                            : '';
                        const nombreProd = resv.productData?.name || 'Producto reservado';
                        const label = `${codigo} — Compra: ${nombreProd}${fecha ? ` (${fecha})` : ''}`;
                        listaOrdenes.push({
                            value: `comp-${resv.reservationId}`,
                            label,
                            orderType: 'compra',
                            orderId: resv.reservationId,
                            detectedDeviceType: normalizarTipoDispositivo(nombreProd)
                        });
                    }
                }

                setOrdenesUsuario(listaOrdenes);

                // 3. Cargar reclamos anteriores del usuario
                if (Array.isArray(resClaims.data)) {
                    setReclamosAnteriores(resClaims.data);
                }
            } catch (error) {
                console.error('Error al cargar información para reclamos:', error);
            } finally {
                setCargandoOrdenes(false);
                setCargandoHistorial(false);
            }
        };

        cargarDatosUsuario();
    }, [user]);

    // Al elegir una orden, actualiza automáticamente el tipo de dispositivo
    const handleCambioOrden = (valor: string) => {
        setOrdenSeleccionada(valor);
        const encontrada = ordenesUsuario.find((o) => o.value === valor);
        if (encontrada) {
            setTipoDispositivo(encontrada.detectedDeviceType);
        }
    };

    // Auto-ajustar altura del textarea a medida que crece el texto
    const handleCambioDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nuevoTexto = e.target.value.slice(0, MAX_CARACTERES);
        setDescripcion(nuevoTexto);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // Agregar archivos de forma acumulativa (solo Imágenes y PDFs)
    const manejarArchivos = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const seleccionados = Array.from(e.target.files);
        setErrorArchivos('');

        if (archivosAdjuntos.length + seleccionados.length > MAX_ARCHIVOS) {
            setErrorArchivos(`Podés adjuntar como máximo ${MAX_ARCHIVOS} archivos en total.`);
            e.target.value = '';
            return;
        }

        const nuevosAdjuntos: ArchivoAdjunto[] = [];

        for (const archivo of seleccionados) {
            const esImagen = archivo.type === 'image/png' || archivo.type === 'image/jpeg' || archivo.type === 'image/webp';
            const esPdf = archivo.type === 'application/pdf';

            if (!esImagen && !esPdf) {
                setErrorArchivos('Solo se permiten imágenes (JPG, PNG, WEBP) o archivos PDF.');
                continue;
            }

            if (archivo.size > MAX_BYTES_ARCHIVO) {
                setErrorArchivos(`El archivo "${archivo.name}" supera el límite de 5MB.`);
                continue;
            }

            try {
                const dataUrl = await archivoABase64(archivo);
                nuevosAdjuntos.push({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                    name: archivo.name,
                    mimeType: archivo.type,
                    dataUrl
                });
            } catch {
                setErrorArchivos(`No se pudo procesar "${archivo.name}".`);
            }
        }

        if (nuevosAdjuntos.length > 0) {
            setArchivosAdjuntos((prev) => [...prev, ...nuevosAdjuntos]);
        }

        // Resetea el input para permitir volver a agregar más archivos después
        e.target.value = '';
    };

    const eliminarArchivo = (idBorrar: string) => {
        setArchivosAdjuntos((prev) => prev.filter((item) => item.id !== idBorrar));
        setErrorArchivos('');
    };

    const limpiarSoloNumeros = (valor: string) => valor.replace(/[^0-9]/g, '');

    // Enviar reclamo al backend
    const handleSubmitReclamo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorFormulario('');
        setExitoFormulario('');

        if (!user) {
            setErrorFormulario('No se puede enviar un reclamo sin tener una sesión iniciada.');
            return;
        }

        // Validar que los contactos alternativos no coincidan con los principales
        const telPrin = telefono.trim();
        const telAlt = telefonoAlternativo.trim();
        if (telPrin && telAlt && telPrin === telAlt) {
            setErrorFormulario('El teléfono de contacto alternativo no puede ser igual al teléfono principal.');
            return;
        }

        const mailPrin = email.trim().toLowerCase();
        const mailAlt = emailAlternativo.trim().toLowerCase();
        if (mailPrin && mailAlt && mailPrin === mailAlt) {
            setErrorFormulario('El correo alternativo no puede ser igual al correo de contacto principal.');
            return;
        }

        const ordenObj = ordenesUsuario.find((o) => o.value === ordenSeleccionada);
        const orderReference = ordenObj ? ordenObj.label : 'Consulta / Orden general';

        setEnviando(true);
        try {
            const response = await axios.post(`${API_URL}/claims`, {
                userId: user.userId,
                orderReference,
                orderType: ordenObj ? ordenObj.orderType : 'otra',
                orderId: ordenObj?.orderId,
                deviceType: tipoDispositivo,
                reason: motivo,
                description: descripcion.trim(),
                attachments: archivosAdjuntos.map(({ name, mimeType, dataUrl }) => ({
                    name,
                    mimeType,
                    dataUrl
                })),
                contactPhone: telPrin,
                contactEmail: mailPrin,
                altPhone: telAlt,
                altEmail: mailAlt
            });

            // Agregar inmediatamente el nuevo reclamo arriba del historial
            if (response.data.claim) {
                setReclamosAnteriores((prev) => [response.data.claim, ...prev]);
            }

            // Limpiar campos del reclamo (manteniendo los contactos principales del usuario)
            setOrdenSeleccionada('');
            setTipoDispositivo('');
            setMotivo('');
            setDescripcion('');
            setArchivosAdjuntos([]);
            setTelefonoAlternativo('');
            setEmailAlternativo('');
            if (textareaRef.current) {
                textareaRef.current.style.height = '120px';
            }

            setExitoFormulario('¡Tu reclamo fue enviado con éxito! Podés seguir su estado más abajo.');
        } catch (error: any) {
            const msg = error.response?.data?.mensaje || 'Ocurrió un error al enviar el reclamo.';
            setErrorFormulario(msg);
        } finally {
            setEnviando(false);
        }
    };

    const toggleDesplegableReclamo = (claimId: number) => {
        setReclamosDesplegados((prev) => ({
            ...prev,
            [claimId]: !prev[claimId]
        }));
    };

    const obtenerClaseBadge = (status: string) => {
        const s = status.toLowerCase();
        if (s.includes('resuelto')) return 'resuelto';
        if (s.includes('proceso')) return 'proceso';
        return 'revision';
    };

    return (
        <>
            <Header />

            <div className="reclamosBody">
                <div className="reclamosContenedor">
                    <h1>Reclamo</h1>
                    <p className="reclamoSubtitulo">
                        Contanos qué pasó con tu equipo o servicio y te vamos a responder a la brevedad.
                    </p>

                    {/* Aviso obligatorio si el usuario no inició sesión */}
                    {!user ? (
                        <div className="reclamosAvisoSesion">
                            <p>No se puede enviar un reclamo sin tener una sesión iniciada.</p>
                            <a href="/login" className="reclamosBtnLogin">
                                Iniciar sesión
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitReclamo}>
                            {/* SOBRE EL SERVICIO */}
                            <fieldset className="reclamosCampos">
                                <legend>Sobre el servicio</legend>

                                <div className="reclamosRowSingle">
                                    <div className="reclamosField">
                                        <label>
                                            Orden de reparación / compra <span className="req">*</span>
                                        </label>

                                        <select
                                            value={ordenSeleccionada}
                                            onChange={(e) => handleCambioOrden(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                {cargandoOrdenes
                                                    ? 'Cargando tus órdenes...'
                                                    : 'Seleccioná una orden'}
                                            </option>
                                            {ordenesUsuario.map((orden) => (
                                                <option key={orden.value} value={orden.value}>
                                                    {orden.label}
                                                </option>
                                            ))}
                                            <option value="otra">Otra orden / Consulta general</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="reclamosRow">
                                    <div className="reclamosField">
                                        <label>
                                            Tipo de dispositivo <span className="req">*</span>
                                        </label>

                                        <select
                                            value={tipoDispositivo}
                                            onChange={(e) => setTipoDispositivo(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Seleccioná
                                            </option>
                                            <option value="Celular">Celular</option>
                                            <option value="Notebook">Notebook</option>
                                            <option value="PC de escritorio">PC de escritorio</option>
                                            <option value="Consola">Consola</option>
                                            <option value="Monitor">Monitor</option>
                                            <option value="Componente">Componente</option>
                                            <option value="Realidad Virtual">Realidad Virtual</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>

                                    <div className="reclamosField">
                                        <label>
                                            Motivo del reclamo <span className="req">*</span>
                                        </label>

                                        <select
                                            value={motivo}
                                            onChange={(e) => setMotivo(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Seleccioná
                                            </option>
                                            <option value="Problema con la reparación">
                                                Problema con la reparación
                                            </option>
                                            <option value="Falla recurrente luego de la reparación">
                                                Falla recurrente luego de la reparación
                                            </option>
                                            <option value="Demora en el servicio">
                                                Demora en el servicio
                                            </option>
                                            <option value="Cobro incorrecto">
                                                Cobro incorrecto
                                            </option>
                                            <option value="Producto defectuoso">
                                                Producto defectuoso
                                            </option>
                                            <option value="Problema con una reserva o seña">
                                                Problema con una reserva o seña
                                            </option>
                                            <option value="Producto recibido diferente al solicitado">
                                                Producto recibido diferente al solicitado
                                            </option>
                                            <option value="Daño físico o estético en el equipo">
                                                Daño físico o estético en el equipo
                                            </option>
                                            <option value="Atención al cliente">
                                                Atención al cliente
                                            </option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>

                            {/* DETALLE */}
                            <fieldset className="reclamosCampos">
                                <legend>Detalle</legend>

                                <div className="reclamosRowSingle">
                                    <div className="reclamosField">
                                        <label>
                                            Descripción del reclamo <span className="req">*</span>
                                        </label>

                                        <textarea
                                            ref={textareaRef}
                                            className="reclamosTextareaAuto"
                                            placeholder="Contanos con el mayor detalle posible qué ocurrió..."
                                            value={descripcion}
                                            onChange={handleCambioDescripcion}
                                            maxLength={MAX_CARACTERES}
                                            required
                                        />

                                        <div className="reclamosContadorCaracteres">
                                            {descripcion.length} / {MAX_CARACTERES}
                                        </div>
                                    </div>
                                </div>

                                <div className="reclamosRowSingle">
                                    <div className="reclamosField">
                                        <label>
                                            Adjuntar foto o comprobante{' '}
                                            <span className="opt">(opcional)</span>
                                        </label>

                                        {/* Dropzone punteada igual a ReservarProducto */}
                                        <label htmlFor="reclamosArchivos" className="reclamosDropzone">
                                            <span>+ Agregar foto o comprobante</span>
                                            <small>JPG, PNG, WEBP o PDF — máx. 5MB (hasta {MAX_ARCHIVOS})</small>
                                        </label>

                                        <input
                                            ref={fileInputRef}
                                            id="reclamosArchivos"
                                            className="reclamosFileInput"
                                            type="file"
                                            accept="image/png, image/jpeg, image/webp, application/pdf"
                                            multiple
                                            onChange={manejarArchivos}
                                        />

                                        {errorArchivos && (
                                            <span className="reclamosErrorTexto">{errorArchivos}</span>
                                        )}

                                        {/* Galería de miniaturas subidas */}
                                        {archivosAdjuntos.length > 0 && (
                                            <div className="reclamosMiniaturas">
                                                {archivosAdjuntos.map((archivo) => {
                                                    const esPdf = archivo.mimeType === 'application/pdf';

                                                    return (
                                                        <div key={archivo.id} className="reclamosMiniaturaItem">
                                                            {esPdf ? (
                                                                <a
                                                                    href={archivo.dataUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="reclamosPdfMiniatura"
                                                                    title={`Abrir ${archivo.name}`}
                                                                >
                                                                    <span className="reclamosPdfBadge">PDF</span>
                                                                    <span className="reclamosPdfNombre">{archivo.name}</span>
                                                                    <div className="reclamosMiniaturaOverlay">
                                                                        <span>Click para abrir</span>
                                                                    </div>
                                                                </a>
                                                            ) : (
                                                                <>
                                                                    <img src={archivo.dataUrl} alt={archivo.name} />
                                                                    <div
                                                                        className="reclamosMiniaturaOverlay"
                                                                        onClick={() => setImagenAmpliada(archivo.dataUrl)}
                                                                    >
                                                                        <span>Click para agrandar</span>
                                                                    </div>
                                                                </>
                                                            )}

                                                            <button
                                                                type="button"
                                                                className="reclamosEliminarImg"
                                                                onClick={() => eliminarArchivo(archivo.id)}
                                                                title="Quitar archivo"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </fieldset>

                            {/* CONTACTO */}
                            <fieldset className="reclamosCampos">
                                <legend>Contacto</legend>

                                <div className="reclamosRow">
                                    <div className="reclamosField">
                                        <label>
                                            Teléfono de contacto{' '}
                                            <span className="opt">(opcional)</span>
                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="11 2222 3333"
                                            value={telefono}
                                            onChange={(e) =>
                                                setTelefono(limpiarSoloNumeros(e.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="reclamosField">
                                        <label>
                                            Email de contacto{' '}
                                            <span className="opt">(opcional)</span>
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="nombre@correo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                            title="Por favor, ingresá un correo electrónico válido"
                                        />
                                    </div>
                                </div>

                                <div className="reclamosRow">
                                    <div className="reclamosField">
                                        <label>
                                            Teléfono de contacto Alternativo{' '}
                                            <span className="opt">(opcional)</span>
                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="Otro número de contacto"
                                            value={telefonoAlternativo}
                                            onChange={(e) =>
                                                setTelefonoAlternativo(
                                                    limpiarSoloNumeros(e.target.value)
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="reclamosField">
                                        <label>
                                            Correo Alternativo{' '}
                                            <span className="opt">(opcional)</span>
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="otro@correo.com"
                                            value={emailAlternativo}
                                            onChange={(e) => setEmailAlternativo(e.target.value)}
                                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                            title="Por favor, ingresá un correo electrónico válido"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {errorFormulario && (
                                <div className="reclamosMensajeError">{errorFormulario}</div>
                            )}

                            {exitoFormulario && (
                                <div className="reclamosMensajeExito">{exitoFormulario}</div>
                            )}

                            <button
                                type="submit"
                                className="reclamosSubmitBtn"
                                disabled={enviando}
                            >
                                {enviando ? 'Enviando reclamo...' : 'Enviar reclamo'}
                            </button>
                        </form>
                    )}
                </div>

                {/* HISTORIAL DE RECLAMOS ANTERIORES (DESPLEGABLES) */}
                {user && (
                    <div className="reclamosHistorial">
                        <h2>Tus reclamos anteriores</h2>
                        <p className="sub">
                            Hacé clic en cada reclamo para ver el resumen completo y su resolución.
                        </p>

                        {cargandoHistorial ? (
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                Cargando tus reclamos...
                            </p>
                        ) : reclamosAnteriores.length > 0 ? (
                            reclamosAnteriores.map((rec) => {
                                const abierto = !!reclamosDesplegados[rec.claimId];
                                const fechaCreacion = rec.createdAt
                                    ? new Date(rec.createdAt).toLocaleDateString('es-AR')
                                    : '-';
                                const fechaResolucion = rec.resolvedAt
                                    ? new Date(rec.resolvedAt).toLocaleDateString('es-AR')
                                    : 'Pendiente';

                                return (
                                    <div
                                        key={rec.claimId}
                                        className={`reclamoItemCard ${abierto ? 'abierto' : ''}`}
                                    >
                                        <div
                                            className="reclamoItemHeader"
                                            onClick={() => toggleDesplegableReclamo(rec.claimId)}
                                        >
                                            <div className="info">
                                                <span className="ord">
                                                    Reclamo #{String(rec.claimId).padStart(4, '0')} ·{' '}
                                                    {rec.orderReference} · Creado el {fechaCreacion}
                                                </span>
                                                <span className="desc">{rec.reason}</span>
                                            </div>

                                            <div className="reclamoItemAcciones">
                                                <span
                                                    className={`reclamoBadge ${obtenerClaseBadge(
                                                        rec.status
                                                    )}`}
                                                >
                                                    {rec.status}
                                                </span>
                                                <img
                                                    src={FlechaAbajo}
                                                    alt="Desplegar"
                                                    className={`reclamoFlecha ${
                                                        abierto ? 'rotada' : ''
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        {/* Contenido desplegable */}
                                        <div
                                            className={`reclamoDetalleWrapper ${
                                                abierto ? 'abierto' : ''
                                            }`}
                                        >
                                            <div className="reclamoDetalleInner">
                                                <div className="reclamoDetalleGrid">
                                                    <div>
                                                        <strong>Dispositivo:</strong>{' '}
                                                        {rec.deviceType}
                                                    </div>
                                                    <div>
                                                        <strong>Fecha de creación:</strong>{' '}
                                                        {fechaCreacion}
                                                    </div>
                                                    <div>
                                                        <strong>Fecha de resolución:</strong>{' '}
                                                        {fechaResolucion}
                                                    </div>
                                                    <div>
                                                        <strong>Contacto:</strong>{' '}
                                                        {rec.contactEmail || rec.contactPhone || '-'}
                                                    </div>
                                                </div>

                                                <div className="reclamoDetalleDescripcion">
                                                    <strong>Detalle enviado:</strong>
                                                    <p>{rec.description}</p>
                                                </div>

                                                {rec.attachments && rec.attachments.length > 0 && (
                                                    <div className="reclamoDetalleAdjuntos">
                                                        <strong>Archivos adjuntos:</strong>
                                                        <div className="reclamosMiniaturas">
                                                            {rec.attachments.map((adj, i) => (
                                                                <div key={i} className="reclamosMiniaturaItem">
                                                                    {adj.mimeType === 'application/pdf' ? (
                                                                        <a
                                                                            href={adj.dataUrl}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="reclamosPdfMiniatura"
                                                                        >
                                                                            <span className="reclamosPdfBadge">PDF</span>
                                                                            <span className="reclamosPdfNombre">{adj.name}</span>
                                                                            <div className="reclamosMiniaturaOverlay">
                                                                                <span>Click para abrir</span>
                                                                            </div>
                                                                        </a>
                                                                    ) : (
                                                                        <>
                                                                            <img src={adj.dataUrl} alt={adj.name} />
                                                                            <div
                                                                                className="reclamosMiniaturaOverlay"
                                                                                onClick={() => setImagenAmpliada(adj.dataUrl)}
                                                                            >
                                                                                <span>Click para agrandar</span>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="reclamoResolucionBox">
                                                    <strong>Resolución de Hoshino Repair:</strong>
                                                    <p>
                                                        {rec.resolution && rec.resolution.trim()
                                                            ? rec.resolution
                                                            : 'Tu reclamo fue recibido y está siendo evaluado por nuestro equipo. Te responderemos a la brevedad.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                Todavía no enviaste ningún reclamo.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Lightbox para ampliar cualquiera de las imágenes adjuntas */}
            {imagenAmpliada && (
                <div
                    className="reclamosLightboxFondo"
                    onClick={() => setImagenAmpliada(null)}
                >
                    <div
                        className="reclamosLightboxContenido"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="reclamosLightboxCerrar"
                            onClick={() => setImagenAmpliada(null)}
                        >
                            ×
                        </button>
                        <img src={imagenAmpliada} alt="Vista ampliada" />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}