import './Register.css';

export function Register() {
    return (
        <>

        {/*Div contenedor del registro, el que lo acomoda en el medio*/}
        <div className='registerContenedor'>

            {/* Form del registro (el cuadrado gris para adentro)*/}
            <form className='registerForm'>

                {/* Div con todo el contenido del registro */}
                <div className='registerDiv'>

                    {/* Titulo del formulario de registro */}
                    <h1 className='registerTitulo'>Registrarse</h1>

                    {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                    <div className='registerCampos'>
                        <label className='registerLabel' htmlFor="email">Email:</label>
                        <input className='registerInput' type="email" required minLength={5} id='email' name='email'/>
                    </div>

                    {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                    <div className='registerCampos'>
                        <label className='registerLabel' htmlFor="password">Contraseña:</label>
                        <input className='registerInput' type="password" required minLength={8} id='password' name='password'/>
                    </div>

                    {/* Div para que juntar las partes de los campos y que tengan el mismo margin */}
                    <div className='registerCampos'>
                        <label className='registerLabel' htmlFor="repeatpassword">Repetir contraseña:</label>
                        <input className='registerInput' type="password" required minLength={8} id='repeatpassword' name='repeatpassword'/>
                    </div>

                    {/* Boton que envia el formulario de registro (Crear cuenta) */}
                    <button className='registerButton'>Crear cuenta</button>

                    {/* Anchor para llevar a la pagina de login /login */}
                    <a className='registerLink' href="/login">¿Ya tenes una cuenta? iniciar sesión</a>
                </div>
            </form>
        </div>
        </>
    )
}