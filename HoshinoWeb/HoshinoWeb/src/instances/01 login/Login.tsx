import './Login.css'

export function Login() {
    return (
        <>
        {/*Div contenedor de el login*/}
        <div className='loginContenedor'>
            
            {/* Form del login */}
                <form className='loginForm' action="">
                    <div className='login'>
                        <h1>inicio de sesión</h1>
                        <label htmlFor="">Email:</label>
                        <input className='loginInput' type="text" />
                        <label htmlFor="">Contraseña:</label>
                        <input className='loginInput' type="text" />
                        <a href="">¿Olvidaste tu contraseña?</a>
                        <button className='loginButton'>Inciar sesión</button>
                    </div>
                </form>
        </div>
        </>
    )
}