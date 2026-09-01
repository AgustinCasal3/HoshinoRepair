import './Login.css'

export function Login() {
    return (
        <>
        {/*Div contenedor de el login*/}
        <div className='loginContenedor'>

            {/* Div del login */}
            <div>

                <form className='login' action="">
                    <div className="loginTitulo">
                        <h1>inicio de sesión</h1>
                    </div>
                    <label htmlFor="">Email:</label>
                    <input className='loginInput' type="text" />
                    <label htmlFor="">Contraseña:</label>
                    <input className='loginInput' type="text" />
                    <a href="">¿Olvidaste tu contraseña?</a>
                    <button className='loginButton'>Inciar sesión</button>
                </form>
            </div>
        </div>
        </>
    )
}