import GatoHoshino from '../../assets/imgs/0 header/Gato Hoshino.png'

export function Header() {
    return (
        <>
        <header>
            <div className="headerImg">
                <img src={GatoHoshino} alt="Mascota Hoshino Repair" />
            </div>

            <div className="headerContenido">
                <p><a href="/home">Inicio</a></p>
                <p><a href="/tienda">Tienda</a></p>
                <p><a href="/home">Chatbot</a></p>
                <p><a href="/reclamos">Reclamos</a></p>
                <p><a href="/reparaciones">Reparaciones</a></p>
            </div>

            <div className="headerCuenta">
                <p><a href="/login">Iniciar Sesion</a></p>
            </div>
        </header>
        </>
    )
}