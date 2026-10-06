import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';

// import { AuthProvider } from './context/AuthContext'; // Esto es para la cuenta, lo saque de https://github.com/AgustinCasal3/Fate-Umbrella.ver/blob/main/0%20Fate%20Umbrella.ver%20Web/Fate%20Umbrella.ver/src/context/AuthContext.tsx

import { Home } from './instances/00 home/Home.tsx';  // 00
import { Login } from './instances/01 login/Login.tsx';  // 01
import { Register } from './instances/02 register/Register.tsx';  // 02
import { Cuenta } from './instances/03 cuenta/Cuenta.tsx';  // 03
import { ListaDispositivos } from './instances/04 listaDispositivos/ListaDispositivos.tsx';  // 04
import { Dispositivo } from './instances/05 dispositivo/Dispositivo.tsx';  // 05
import { Reservas } from './instances/06 reservas/Reservas.tsx';  // 06
import { Reparaciones } from './instances/07 reparaciones/Reparaciones.tsx';  // 07
import { ReparacionesFormulario } from './instances/07 reparaciones/formulario/ReparacionesFormulario.tsx';  // 07.5
import { Tienda } from './instances/08 tienda/Tienda.tsx';  // 08
import { Reclamos } from './instances/09 reclamos/Reclamos.tsx';  // 09
import { Chatbot } from './instances/11 chatbot/Chatbot.tsx';  // 11
import { ReservasUsuarios } from './instances/12 reservasUsuarios/ReservasUsuarios.tsx';  // 12
import { Reservar } from './instances/13 reservar/Reservar.tsx';  // 13
import { SobreLaEmpresa } from './instances/14 sobreLaEmpresa/SobreLaEmpresa.tsx';  // 14

function Pagina() {
  return (
    <>
      <Outlet />
    </>
  )
}

function Index() {
  return (
    <>
      <div className="contenedorPlaceholder">
        <div className="botonesPlaceholder">
          <a href="/home">Home</a>
        </div>
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Pagina />,
    errorElement: '',
    children: [
      {
        index: true, // Ruta: /
        element: <Index />,
      },
      {
        path: 'home', // Ruta: /home
        element: <Home />,
      },
      {
        path: 'login', // Ruta: /login
        element: <Login />,
      },
      {
        path: 'register', // Ruta: /register
        element: <Register />,
      },
      {
        path: 'cuenta', // Ruta: /cuenta
        element: <Cuenta />,
      },
      {
        path: 'dispositivos', // Ruta: /dispositivos
        element: <ListaDispositivos />,
      },
      {
        path: 'dispositivo/1', // Ruta: /dispositivo/1
        element: <Dispositivo />,
      },
      {
        path: 'reservas', // Ruta: /reservas
        element: <Reservas />,
      },
      {
        path: 'reparaciones', // Ruta: /reparaciones
        element: <Reparaciones />,
      },
      {
        path: 'reparaciones/formulario', // Ruta: /reparaciones
        element: <ReparacionesFormulario />,
      },
      {
        path: 'tienda', // Ruta: /tienda
        element: <Tienda />,
      },
      {
        path: 'reclamos', // Ruta: /reclamos
        element: <Reclamos />,
      },
      {
        path: 'chatbot', // Ruta: /chatbot
        element: <Chatbot />,
      },
      {
        path: 'reservasUsuarios', // Ruta: /reservasUsuarios
        element: <ReservasUsuarios />,
      },
      {
        path: 'reservar', // Ruta: /reservar
        element: <Reservar />,
      },
      {
        path: 'about', // Ruta: /about
        element: <SobreLaEmpresa />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    //<AuthProvider>
      <RouterProvider router={router} />
    //</AuthProvider>
  )
}

export default App;