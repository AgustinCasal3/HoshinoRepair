import './Login.css'

export function Login() {
    return (
        <>

        {/*Div contenedor del login, el que lo acomoda en el medio*/}
        <div className='loginContenedor'>

            {/* Form del login (el cuadrado gris para adentro)*/}
                <form className='loginForm'>

                    {/* Div con todo el contenido del login */}
                    <div className='loginDiv'>

                        {/* Titulo del formulario de login */}
                        <h1 className='loginTitulo'>inicio de sesión</h1>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='loginCampos'>
                            <label className='loginLabel' htmlFor="email">Email:</label>
                            <input className='loginInput' type="email" required minLength={5} id='email' name='email' />
                        </div>

                        {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                        <div className='loginCampos'>
                            <label className='loginLabel' htmlFor="password">Contraseña:</label>
                            <input className='loginInput' type="password" required minLength={8} id='password' name='password'/>
                            <a className='loginLink' href="">¿Olvidaste tu contraseña?</a>
                        </div>

                        {/* Boton que envia el formulario de inicio de sesión */}
                        <button className='loginButton' type='submit'>Iniciar sesión</button>

                        <a className='loginLink' href="">¿aun no tenes una cuenta?</a>
                    </div>
                </form>
        </div>
        </>
    )
}