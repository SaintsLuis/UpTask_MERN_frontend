// Objetivo: Layout, Ruta protegida para que el usuario no pueda acceder a las rutas hijas si no está autenticado.

import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { DotSpinner } from '@uiball/loaders';

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando)
    return (
      <div className='flex justify-center my-20'>
        <DotSpinner size={50} speed={0.9} />
      </div>
    );

  return (
    /* Si el usuario está autenticado, renderizamos el componente Outlet que contiene las rutas hijas de la ruta protegida, en este caso, la ruta /proyectos. Si el usuario no está autenticado, redireccionamos a la ruta '/'*/
    <>
      {auth._id ? (
        <div className='bg-gray-100'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />

            <main className='flex-1 p-10'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};

export default RutaProtegida;
