// componente para el formulario de colaborador
import { useState } from 'react';
import useProyectos from '../hooks/useProyectos';
import { ToastContainer } from 'react-toastify';

const FormularioColaborador = () => {
  const [email, setEmail] = useState('');

  const { showNotification, submitColaborador } = useProyectos();

  const handleSubmit = e => {
    e.preventDefault();

    if (email === '') {
      showNotification('El Email es Obligatorio', 'error');
      return;
    }

    submitColaborador(email);
  };

  return (
    <>
      <form
        className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
      >
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-gray-700 uppercase font-bold text-sm '
          >
            Email Colaborador
          </label>
          <input
            type='email'
            id='email'
            placeholder='Email Colaborador'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type='submit'
            value={'Buscar Colaborador'}
            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-md text-sm mt-5'
          />
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default FormularioColaborador;
