//Importaciones del archivo QuienesSomos.tsx
import './QuienesSomos.css';

import { Header } from '../0 header/Header';

//Funcion QuienesSomos
export function QuienesSomos() {

    return (
        <>
            
            {/* Etiqueta del header para que se vea arriba de la pantalla */}
            <Header/>

            <div className="quienesSomosContenedor">

                <div className="quienesSomosMenu">
                    <h4>
                        Quienes Somos
                    </h4>
                    <h4>
                        Servicio Tecnico
                    </h4>
                    <h4>
                        Reparación en el Local
                    </h4>
                    <h4>
                        Reparación a Domicilio
                    </h4>

                    <h5>
                        Politicas y Privacidad
                    </h5>
                        
                    <h5>
                        Garantia y Devoluciones
                    </h5>
                        
                    <h5>
                        Retirar tu Compra
                    </h5>
                        
                    <h5>
                        Contactanos
                    </h5>
                </div>

                <div className="quienesSomosBody">

                    <div className="quienesSomosTitulo">
                    <h1>Quienes Somos</h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit proin ultrices tortor, lacus accumsan taciti auctor egestas odio fermentum lectus commodo, tincidunt nostra etiam at vestibulum nisl vulputate cubilia maecenas. Odio facilisis dictum vulputate class ac nibh quis fames faucibus penatibus proin, primis senectus diam iaculis augue porttitor sed integer neque sociosqu. Tellus massa vehicula sociosqu cursus platea dignissim nunc vel, dapibus mus potenti senectus sodales tempus sed, primis aenean nisi euismod dis viverra elementum.</p>

                    <p>Habitant diam vivamus gravida fringilla ut natoque, malesuada sem lectus phasellus quisque condimentum, nam nisl nullam hac massa. Proin laoreet eget fermentum pellentesque ridiculus ad nec cum, facilisi fames nibh libero neque torquent himenaeos gravida, ornare ligula metus interdum ullamcorper iaculis velit. Mus faucibus litora bibendum felis vehicula natoque suspendisse dignissim dictum dui ligula ac torquent donec, sollicitudin rutrum volutpat per urna elementum et nunc euismod venenatis ornare cras imperdiet.</p>

                    <p>Taciti duis erat accumsan magnis augue faucibus justo imperdiet molestie massa maecenas, facilisis dui rhoncus venenatis dapibus id nec tristique phasellus. Sed blandit class neque sagittis leo aenean habitant sodales aliquet nam aptent tempus, phasellus nascetur praesent ligula tellus enim curabitur ridiculus justo lacinia placerat, arcu nisi sociosqu molestie imperdiet odio est eros proin euismod ultrices. Mauris venenatis turpis ut risus aliquet taciti volutpat dictum eget maecenas varius litora, platea rhoncus blandit potenti iaculis tempor pulvinar sociis commodo lectus duis. Neque scelerisque aliquet montes dictumst class primis tincidunt auctor fermentum, augue rhoncus senectus ridiculus netus sapien ante convallis.</p>

                    <p>Sem torquent class sapien viverra vulputate fusce montes est, integer vestibulum pulvinar duis facilisi hac porta blandit ridiculus, varius rutrum purus lacus magna consequat primis. Sagittis vivamus nibh nullam elementum suspendisse metus dignissim dictumst, etiam in mus tristique tellus montes velit suscipit leo, rutrum faucibus feugiat facilisi inceptos parturient est. Suscipit bibendum litora himenaeos nascetur donec curae ullamcorper hendrerit auctor varius duis, magnis montes netus nullam velit vestibulum diam lobortis libero malesuada tempus, imperdiet mattis nisl dignissim facilisis cras ligula porttitor torquent nam.</p>
                </div>
            </div>
        </>
    )
}