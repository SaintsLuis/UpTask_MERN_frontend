import { Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import useAuth from '../hooks/useAuth';
import Busqueda from './Busqueda';

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionProyectos();
    cerrarSesionAuth();

    // Resetear el localStorage
    localStorage.removeItem('token');
  };

  return (
    <header className='px-4 py-5 bg-white border-b shadow'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
          UpTask 👻
        </h2>

        <div className='flex flex-col md:flex-row items-center gap-5'>
          <button
            type='button'
            className='font-bold uppercase'
            onClick={handleBuscador}
          >
            Buscar Proyecto
          </button>

          <Link to='/proyectos' className='font-bold uppercase'>
            Proyectos
          </Link>

          <button
            type='button'
            className='text-white text-sm bg-sky-600 rounded-lg p-3 uppercase font-bold'
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
