import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showNotification } from '../utils/alerts';
import { ToastContainer } from 'react-toastify';
import useProyectos from '../hooks/useProyectos';
import { useNavigate } from 'react-router-dom';

const FormularioProyecto = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { submitProyecto, proyecto } = useProyectos();

  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [cliente, setCliente] = useState('');

  useEffect(() => {
    // Si hay un ID en params y en el proyecto, entonces existe el proyecto, por lo tanto seteamos los campos
    if (params.id && proyecto._id) {
      // Setear los campos del formulario con los valores del proyecto || Actualizar
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega.split('T')[0]);
      setCliente(proyecto.cliente);
    }
  }, [
    params.id,
    proyecto._id,
    proyecto.nombre,
    proyecto.descripcion,
    proyecto.fechaEntrega,
    proyecto.cliente,
  ]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
      showNotification('Todos Los Campos Son Obligatorios.', 'error', {
        position: 'bottom-center',
      });
      return;
    }

    // Validad la fecha no sea menor a la fecha actual
    const fechaActual = new Date();
    const fechaEntregaFormateada = new Date(fechaEntrega);
    if (fechaEntregaFormateada < fechaActual) {
      showNotification(
        'La Fecha De Entrega No Puede Ser Menor A La Fecha Actual.',
        'error',
        { position: 'bottom-center' },
      );
      return;
    }

    // Pasar los datos del proyecto hacia el ProyectosProvider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

    // Reiniciar el formulario
    setId(null);
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');

    // Mostrar notificación de éxito
    showNotification(
      params.id
        ? 'Proyecto Actualizado Correctamente.'
        : 'Proyecto Creado Correctamente.',
      'success',
      {
        position: 'top-right',
        hideProgressBar: false,
        theme: 'light',
      },
    );

    // Redireccionar al listado de proyectos
    setTimeout(() => {
      navigate('/proyectos');
    }, 4000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md'
      >
        <div className='mb-5'>
          <label
            className='text-gray-700 uppercase font-bold text-md mb-2'
            htmlFor='nombre'
          >
            Nombre Proyecto
          </label>

          <input
            id='nombre'
            type='text'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            placeholder='Nombre Proyecto'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            className='text-gray-700 uppercase font-bold text-md mb-2'
            htmlFor='descripcion'
          >
            Descripción
          </label>

          <textarea
            id='descripcion'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            placeholder='Descripción Proyecto'
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            className='text-gray-700 uppercase font-bold text-md mb-2'
            htmlFor='fecha-entrega'
          >
            Fecha Entrega
          </label>

          <input
            id='fecha-entrega'
            type='date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            value={fechaEntrega}
            onChange={e => setFechaEntrega(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            className='text-gray-700 uppercase font-bold text-md mb-2'
            htmlFor='cliente'
          >
            Nombre Cliente
          </label>

          <input
            id='cliente'
            type='text'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            placeholder='Nombre del Cliente'
            value={cliente}
            onChange={e => setCliente(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value={params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors duration-300 ease-in-out'
        />
      </form>

      <ToastContainer />
    </>
  );
};

export default FormularioProyecto;
