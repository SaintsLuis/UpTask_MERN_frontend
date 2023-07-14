// page NuevoColaborador
import { useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom';
import FormularioColaborador from '../components/FormularioColaborador';

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, colaborador, agregarColaborador } =
    useProyectos();
  const params = useParams();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  return (
    <>
      <h1 className='text-4xl font-black'>
        Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
      </h1>

      <div className='mt-10 flex justify-center'>
        <FormularioColaborador />
      </div>

      {colaborador?._id && (
        <div className='flex justify-center mt-10'>
          <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
            <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>

            <div className='flex justify-between items-center'>
              <p>{colaborador.nombre}</p>

              <button
                type='button'
                onClick={() =>
                  agregarColaborador({
                    email: colaborador.email,
                  })
                }
                className='bg-slate-500 px-5 py-2 text-white uppercase font-bold rounded-lg text-sm mt-5'
              >
                Agrear al Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NuevoColaborador;
