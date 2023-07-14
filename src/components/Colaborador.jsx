/* eslint-disable react/prop-types */
import useProyectos from '../hooks/useProyectos';
import { AlertDeleteColaborador } from './SweetAlert';

const Colaborador = ({ colaborador }) => {
  const { eliminarColaborador } = useProyectos();
  const { nombre, email, _id } = colaborador;

  return (
    <>
      <div className='border-b p-5 flex justify-between items-center'>
        <div>
          <p>{nombre}</p>
          <p className='text-sm text-gray-700'>{email}</p>
        </div>
        <div>
          <button
            type='button'
            onClick={() => AlertDeleteColaborador(eliminarColaborador, _id)}
            className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default Colaborador;
