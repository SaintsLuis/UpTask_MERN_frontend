// Objetivo: Mostrar el formulario para reestablecer el password

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios'; // Importamos el cliente axios configurado
import { ToastContainer } from 'react-toastify';
import { showNotification } from '../utils/alerts';

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  // Obtener el token de la url para comprobar si es válido
  const params = useParams();
  const { token } = params;

  //
  useEffect(() => {
    // Comprobar si el token es válido
    const comprobarToken = async () => {
      try {
        // Hacer petición a la API para comprobar si el token es válido
        await clienteAxios.get(`/usuarios/olvide-password/${token}`);

        setTokenValido(true);
      } catch (error) {
        setTokenValido(false);
        showNotification(error.response.data.msg, 'error');
      }
    };
    comprobarToken();
  }, [token]);

  // Función para enviar el nuevo password
  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      showNotification('El Password debe tener minimo 6 caracteres', 'error');
      return;
    }

    try {
      // Enviar el nuevo password a la API para que lo actualice
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        { password },
      );

      // Mostrar notificación de éxito
      showNotification(data.msg, 'success', {
        position: 'top-right',
        hideProgressBar: false,
        theme: 'light',
      });
      setPasswordModificado(true);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      <ToastContainer />

      {tokenValido && (
        <form
          onSubmit={handleSubmit}
          className='my-10 bg-white shadow rounded-lg p-10'
        >
          <div className='my-5'>
            <label
              htmlFor='password'
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Nuevo Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Ingresa tu Nuevo Password'
              className='w-full mt-3 p-3 border bg-gray-50 shadow hover:shador-lg border-gray-300 rounded-xl focus:outline-none focus:border-sky-500'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value='Guardar Nuevo Password'
            className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 shadow-lg hover:shadow-xl'
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 uppercase font-bold text-sm hover:underline'
        >
          Iniciar Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
