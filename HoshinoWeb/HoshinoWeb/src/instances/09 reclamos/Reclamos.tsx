import './Reclamos.css'

export function Reclamos() {
    return (
        <>
            <nav className='reclamosNav'>
                <div className='reclamosLogo'>
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8 L24 24 M50 8 L40 24" stroke="black" strokeWidth="3.5" strokeLinecap="round"/>
                        <circle cx="32" cy="34" r="22" fill="none" stroke="black" strokeWidth="3.5"/>
                        <circle cx="24" cy="30" r="2.2" fill="black"/>
                        <circle cx="40" cy="30" r="2.2" fill="black"/>
                        <path d="M27 40 Q32 44 37 40" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    </svg>
                    <span>Hoshino Repair</span>
                </div>
                <div className='reclamosNavLinks'>
                    <a href="#">Inicio</a>
                    <a href="#">Tienda</a>
                    <a href="#">Chatbot</a>
                    <a href="#" className='active'>Reclamos</a>
                    <a href="#">Reparaciones</a>
                </div>
                <div className='reclamosNavCuenta'>Cuenta</div>
            </nav>

            <main className='reclamosMain'>
                <div className='reclamosCard'>
                    <h1>Reclamo</h1>
                    <p className='sub'>Contanos qué pasó con tu equipo o servicio y te vamos a responder a la brevedad.</p>

                    <form>
                        <fieldset className='reclamosFieldset'>
                            <legend>Sobre el servicio</legend>
                            <div className='reclamosRow'>
                                <div className='reclamosField full'>
                                    <label>Orden de reparación / compra <span className='req'>*</span></label>
                                    <select required>
                                        <option value="">Seleccioná una orden</option>
                                        <option>#4821 — Reparación de pantalla, iPhone 12 (12/09/2026)</option>
                                        <option>#4790 — Cambio de batería, Notebook Lenovo (03/09/2026)</option>
                                        <option>#4712 — Venta, Joystick PS5 (28/08/2026)</option>
                                    </select>
                                </div>
                            </div>
                            <div className='reclamosRow'>
                                <div className='reclamosField'>
                                    <label>Tipo de dispositivo <span className='req'>*</span></label>
                                    <select required>
                                        <option value="">Seleccioná</option>
                                        <option>Celular</option>
                                        <option>Notebook</option>
                                        <option>PC de escritorio</option>
                                        <option>Consola</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                <div className='reclamosField'>
                                    <label>Motivo del reclamo <span className='req'>*</span></label>
                                    <select required>
                                        <option value="">Seleccioná</option>
                                        <option>Problema con la reparación</option>
                                        <option>Demora en el servicio</option>
                                        <option>Cobro incorrecto</option>
                                        <option>Producto defectuoso</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='reclamosFieldset'>
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
                                        📎 <span><strong>Elegir archivo</strong> — JPG, PNG o PDF, máx. 5MB</span>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className='reclamosFieldset'>
                            <legend>Contacto</legend>
                            <div className='reclamosRow'>
                                <div className='reclamosField'>
                                    <label>Teléfono de contacto <span className='opt'>(opcional)</span></label>
                                    <input type="tel" placeholder="11 2345 6789" />
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
            </main>
        </>
    )
}