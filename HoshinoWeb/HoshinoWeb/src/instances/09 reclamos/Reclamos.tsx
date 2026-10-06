import './Reclamos.css';
import { Header } from '../0 header/Header';
import { useState } from 'react';

export function Reclamos() {

    // Estado para guardar las URLs de vista previa
    const [imagenes, setImagenes] = useState<string[]>([]);

    // Función para manejar la selección de archivos
    const manejarImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const archivos = Array.from(e.target.files);

        const previews = archivos.map((archivo) =>
            URL.createObjectURL(archivo)
        );

        document.querySelector('.reclamosArchivos').style.display = 'flex';

        setImagenes(previews);
    };

    return (
        <>
            <Header />

            {/* Div del body de reclamos, lo que lo acomoda en el centro y lo que viene a ser el fondo */}
            <div className='reclamosBody'>

                <div className='reclamosContenedor'>

                    {/* Titulo de la pagina de reclamos */}
                    <h1>Reclamo</h1>

                    <p className='reclamoSubtitulo'>Contanos qué pasó con tu equipo o servicio y te vamos a responder a la brevedad.</p>

                    {/* Etiqueta del form para reclamos */}
                    <form>

                        {/* fieldset para agrupar los diferentes grupos de campos */}
                        <fieldset className='reclamosCampos'>

                            {/* Legend que sirve como titulo del fieldset (esa es su funcion posta) */}
                            <legend>Sobre el servicio</legend>

                            <div className='reclamosRow'>

                                <div className='reclamosField full'>

                                    <label>Orden de reparación / compra <span className='req'>*</span></label>

                                    <select defaultValue="" required>
                                        <option value="" disabled>Seleccioná una orden</option>
                                        <option>#4821 — Reparación de pantalla, iPhone 12 (12/09/2026)</option>
                                        <option>#4790 — Cambio de batería, Notebook Lenovo (03/09/2026)</option>
                                        <option>#4712 — Venta, Joystick PS5 (28/08/2026)</option>
                                    </select>
                                </div>
                            </div>

                            <div className='reclamosRow'>

                                <div className='reclamosField'>

                                    <label>Tipo de dispositivo <span className='req'>*</span></label>

                                    <select defaultValue="" required>
                                        <option value="" disabled>Seleccioná</option>
                                        <option>Celular</option>
                                        <option>Notebook</option>
                                        <option>PC de escritorio</option>
                                        <option>Consola</option>
                                        <option>Otro</option>
                                    </select>
                                </div>

                                <div className='reclamosField'>

                                    <label>Motivo del reclamo <span className='req'>*</span></label>

                                    <select defaultValue="" required>
                                        <option value="" disabled>Seleccioná</option>
                                        <option>Problema con la reparación</option>
                                        <option>Demora en el servicio</option>
                                        <option>Cobro incorrecto</option>
                                        <option>Producto defectuoso</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='reclamosCampos'>

                            <legend>Detalle</legend>

                            <div className='reclamosRow'>

                                <div className='reclamosField full'>

                                    <label>Descripción del reclamo <span className='req'>*</span></label>

                                    <textarea placeholder="Contanos con el mayor detalle posible qué ocurrió..." required></textarea>
                                </div>
                            </div>

                            <div className='reclamosRow'>

                                <div className='reclamosField full'>

                                    <label>Adjuntar foto o comprobante <span className='opt'>(opcional)</span></label>

                                    <div className='reclamosFilerow'>

                                        <div className='reclamosTextoArchivos'>

                                            <label htmlFor="reclamosArchivos">
                                                📎 <span><strong>Elegir archivo</strong> — JPG, PNG o PDF, máx. 5MB</span>

                                                <input
                                                    id='reclamosArchivos'
                                                    className='reclamosFileInput'
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={manejarImagenes}
                                                />
                                            </label>
                                        </div>

                                        <div className='reclamosArchivos'>


                                            {/* Texto descriptivo de cuántos archivos se seleccionaron */}
                                            {imagenes.length > 0 && (
                                                <span className="archivosSeleccionadosInfo">
                                                    {imagenes.length} archivo(s) seleccionado(s)
                                                </span>
                                            )}

                                            {/* Contenedor de las vistas previas de las imágenes */}
                                            <div className="previewImagenes">
                                                {imagenes.map((imagen, index) => (
                                                    <img
                                                        key={`${imagen}-${index}`}
                                                        src={imagen}
                                                        alt={`Vista previa ${index + 1}`}
                                                    />
                                                ))}
                                        </div>
                                    </div>

                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='reclamosCampos'>

                            <legend>Contacto</legend>

                            <div className='reclamosRow'>

                                <div className='reclamosField'>

                                    <label>Teléfono de contacto <span className='opt'>(opcional)</span></label>

                                    <input type="tel" placeholder="11 2222 3333" />
                                </div>

                                <div className='reclamosField'>

                                    <label>Email de contacto <span className='opt'>(opcional)</span></label>

                                    <input type="email" placeholder="nombre@correo.com" />
                                </div>
                            </div>
                        </fieldset>

                        <button type="submit" className='reclamosSubmitBtn'>Enviar reclamo</button>
                    </form>
                </div>

                <div className='reclamosHistorial'>

                    <h2>Tus reclamos anteriores</h2>

                    <p className='sub'>Podés ver el estado de tus reclamos ya enviados.</p>

                    <div className='reclamoItem'>

                        <div className='info'>

                            <span className='ord'>Orden #4790 · 05/09/2026</span>

                            <span className='desc'>Demora en el servicio</span>
                        </div>

                        <span className='reclamoBadge proceso'>En proceso</span>
                    </div>

                    <div className='reclamoItem'>

                        <div className='info'>

                            <span className='ord'>Orden #4712 · 29/08/2026</span>

                            <span className='desc'>Producto defectuoso</span>
                        </div>

                        <span className='reclamoBadge resuelto'>Resuelto</span>
                    </div>

                    <div className='reclamoItem'>

                        <div className='info'>

                            <span className='ord'>Orden #4650 · 15/08/2026</span>

                            <span className='desc'>Cobro incorrecto</span>
                        </div>

                        <span className='reclamoBadge revision'>En revisión</span>
                    </div>
                </div>
            </div>
        </>
    );
}