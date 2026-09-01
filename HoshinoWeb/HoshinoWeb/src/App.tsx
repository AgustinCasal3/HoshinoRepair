import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';

// import { AuthProvider } from './context/AuthContext'; // Esto es para la cuenta, lo saque de https://github.com/AgustinCasal3/Fate-Umbrella.ver/blob/main/0%20Fate%20Umbrella.ver%20Web/Fate%20Umbrella.ver/src/context/AuthContext.tsx

import { Home } from './instances/00 home/Home.tsx';  // 01

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
        index: true, // Ruta: / 01
        element: <Index />,
      },
      {
        path: 'home', // Ruta: /home
        element: <Home />,
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