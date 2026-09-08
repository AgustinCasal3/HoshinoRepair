import './Register.css';

import flechaVolver from '../../assets/imgs/01 login/FlechaVolver.png';

export function Register() {
    return (
        <>

        {/* Div body del registro, el que lo acomoda en el medio */}
        <div className='registerBody'>

            {/* Div del registro (del cuadrado gris para adentro) */}
            <div className='registerDiv'>

                {/* Form con todo el contenido del registro */}
                <form className='registerForm'>

                    {/* Anchor con la imagen de la flecha para hacer el boton del home */}
                    <a className='registerFlechaVolver' href="/home"><img src={flechaVolver} alt="volver" /></a>

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
                </form>
            </div>
        </div>
        </>
    )
}