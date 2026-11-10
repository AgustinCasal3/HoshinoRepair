import './ReparacionesFormulario.css';

import { Header } from '../../0 header/Header';
import { Footer } from '../../0 footer/Footer';

import { useState } from "react";

export function ReparacionesFormulario() {

    const [imagenes, setImagenes] = useState<string[]>([]);
    const [errorArchivos, setErrorArchivos] = useState<string>('');

    const manejarImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const archivos = Array.from(e.target.files);

        // Validación: Máximo 10 imágenes
        if (archivos.length > 10) {
            setErrorArchivos('No podés subir más de 10 imágenes.');
            e.target.value = ''; // Limpia el input
            setImagenes([]);
            return;
        }

        setErrorArchivos('');

        const previews = archivos.map((archivo) =>
            URL.createObjectURL(archivo)
        );

        setImagenes(previews);
    };

    const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        
        if (imagenes.length === 0) {
            e.preventDefault();
            alert('Se requieren fotografías del dispositivo.');
            return;
        }
    };

    return (
        <>
            <Header />

            <section className="reparacionesFormulario">
                <h1>Formulario para Solicitud de Reparación</h1>

                <form onSubmit={manejarEnvio}>
                    
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" type="text" required />

                    <label htmlFor="apellido">Apellido</label>
                    <input id="apellido" type="text" required />

                    <label htmlFor="tipoDispositivo">Tipo de Dispositivo</label>
                    <select id="tipoDispositivo" defaultValue="" required>
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="celular">Celular</option>
                        <option value="pc">PC Escritorio</option>
                        <option value="notebook">Notebook</option>
                        <option value="consola">Consola</option>
                        <option value="handheld">Consola Portatil</option>
                        <option value="vr">Headset VR</option>
                        <option value="tv">TVs</option>
                        <option value="impresora">Impresora</option>
                        <option value="otro">Otro</option>
                    </select>

                    <label htmlFor="marcaInput">Marca</label>
                    <input id="marcaInput" list='marcas' required />
                    <datalist id='marcas'>
                        <option value="Samsung"></option>
                        <option value="Apple"></option>
                        <option value="Motorola"></option>
                        <option value="Xiaomi"></option>
                        <option value="Nubia"></option>
                        <option value="Sony"></option>
                    </datalist>

                    <label htmlFor="modelo">Modelo</label>
                    <input id="modelo" type="text" placeholder='S22 Ultra' required />

                    <label htmlFor="formularioImagenes">
                        Fotografías del dispositivo:
                    </label>

                    <div className="inputImagenes">
                        {/* Se reemplazó el document.querySelector por un estilo dinámico basado en el estado */}
                        <div className="divEnviarImagenes" style={{ marginBottom: imagenes.length > 0 ? '2.5vh' : '0' }}>
                            <label htmlFor="formularioImagenes" className="botonSubirImagenes" id='SINMARGIN'>
                                Elegir archivos
                                <input
                                    id="formularioImagenes"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={manejarImagenes}
                                />
                            </label>
                            <span>{imagenes.length} archivo(s) seleccionados</span>
                        </div>

                        {/* Mensaje de error si se superan las 10 imágenes */}
                        {errorArchivos && (
                            <span style={{ color: 'red', fontSize: '0.85rem', display: 'block', marginBottom: '15px' }}>
                                {errorArchivos}
                            </span>
                        )}

                        <div className="previewImagenes">
                            {imagenes.map((imagen, index) => (
                                <img
                                    key={`${imagen}-${index}`}
                                    src={imagen}
                                    alt={`Fotografía ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="formularioBotonEnviar">
                        <button type='submit'>Enviar</button>
                    </div>
                </form>
            </section>

            <Footer/>
        </>
    );
}