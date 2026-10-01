//Importaciones del archivo sobreLaEmpresa.tsx
import './SobreLaEmpresa.css';

//Importacion del componente del header
import { Header } from '../0 header/Header';

//Funcion SobreLaEmpresa
export function SobreLaEmpresa() {

    return (
        <>
            
            {/* Etiqueta del header para que se vea arriba de la pantalla */}
            <Header/>

            {/* Div contenedor principal de toda la pantalla */}
            <div className="sobreLaEmpresaContenedor">

                {/* Div del menu de la izquierda */}
                <div className="sobreLaEmpresaMenu">

                    {/* Titulo del menu de la izquierda (es el que esta con negrita) */}
                    <h4>
                        Quienes Somos
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Servicio Tecnico
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Reparación en el Local
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Reparación a Domicilio
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Politicas y Privacidad
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}   
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Garantia y Devoluciones
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}  
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Retirar tu Compra
                    </h4>

                    {/* Titulo del menu de la izquierda (no esta en negrita gracias a la clase) */}   
                    <h4 className='sobreLaEmpresaMenuTituloSinNegrita'>
                        Contactanos
                    </h4>
                    
                </div>

                {/* Div del body de la información sobre la empresa, la que esta a la derecha */}
                <div className="sobreLaEmpresaBody">

                    {/* div del titulo de la información sobre la empresa, el que esta del lado derecho */}
                    <div className="sobreLaEmpresaTitulo">

                    {/* Titulo de la información sobre la empresa, el que esta del lado derecho */}
                    <h1>Quienes Somos</h1>
                    </div>

                    {/* Ps con los parrafos de informacion del lado de la derecha */}
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit proin ultrices tortor, lacus accumsan taciti auctor egestas odio fermentum lectus commodo, tincidunt nostra etiam at vestibulum nisl vulputate cubilia maecenas. Odio facilisis dictum vulputate class ac nibh quis fames faucibus penatibus proin, primis senectus diam iaculis augue porttitor sed integer neque sociosqu. Tellus massa vehicula sociosqu cursus platea dignissim nunc vel, dapibus mus potenti senectus sodales tempus sed, primis aenean nisi euismod dis viverra elementum.</p>

                    <p>Habitant diam vivamus gravida fringilla ut natoque, malesuada sem lectus phasellus quisque condimentum, nam nisl nullam hac massa. Proin laoreet eget fermentum pellentesque ridiculus ad nec cum, facilisi fames nibh libero neque torquent himenaeos gravida, ornare ligula metus interdum ullamcorper iaculis velit. Mus faucibus litora bibendum felis vehicula natoque suspendisse dignissim dictum dui ligula ac torquent donec, sollicitudin rutrum volutpat per urna elementum et nunc euismod venenatis ornare cras imperdiet.</p>

                    <p>Taciti duis erat accumsan magnis augue faucibus justo imperdiet molestie massa maecenas, facilisis dui rhoncus venenatis dapibus id nec tristique phasellus. Sed blandit class neque sagittis leo aenean habitant sodales aliquet nam aptent tempus, phasellus nascetur praesent ligula tellus enim curabitur ridiculus justo lacinia placerat, arcu nisi sociosqu molestie imperdiet odio est eros proin euismod ultrices. Mauris venenatis turpis ut risus aliquet taciti volutpat dictum eget maecenas varius litora, platea rhoncus blandit potenti iaculis tempor pulvinar sociis commodo lectus duis. Neque scelerisque aliquet montes dictumst class primis tincidunt auctor fermentum, augue rhoncus senectus ridiculus netus sapien ante convallis.</p>

                    <p>Sem torquent class sapien viverra vulputate fusce montes est, integer vestibulum pulvinar duis facilisi hac porta blandit ridiculus, varius rutrum purus lacus magna consequat primis. Sagittis vivamus nibh nullam elementum suspendisse metus dignissim dictumst, etiam in mus tristique tellus montes velit suscipit leo, rutrum faucibus feugiat facilisi inceptos parturient est. Suscipit bibendum litora himenaeos nascetur donec curae ullamcorper hendrerit auctor varius duis, magnis montes netus nullam velit vestibulum diam lobortis libero malesuada tempus, imperdiet mattis nisl dignissim facilisis cras ligula porttitor torquent nam.</p>
                </div>
            </div>
        </>
    )
}