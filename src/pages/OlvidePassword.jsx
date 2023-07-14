// Objetivo: Page - OlvidePassword

import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios.jsx';
import { ToastContainer } from 'react-toastify'; // Container de la Librería toastify
import { showNotification } from '../utils/alerts.js'; // Componente para mostrar notificaciones-Toastify

const OlvidePassword = () => {
  const [email, setEmail] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email

  // Función para enviar el email para recuperar el password
  const handleSubmit = async e => {
    e.preventDefault();

    // Validar que no haya campos vacios o que el email no sea válido
    if (email === '' || !emailRegex.test(email)) {
      showNotification('Email es requerido o no es válido', 'error');
      return;
    }

    try {
      // Enviar el email para recuperar el password (POST /api/usuarios/olvide-password)
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });

      // Mostrar notificación de éxito
      showNotification(data.msg, 'success', {
        position: 'top-right',
        hideProgressBar: false,
        theme: 'light',
      });
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Recupera tu acceso y no pierdas tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'
      >
        <div className='my-5'>
          <label
            htmlFor='email'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Tu Email'
            className='w-full mt-3 p-3 border bg-gray-50 shadow hover:shador-lg border-gray-300 rounded-xl focus:outline-none focus:border-sky-500'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Enviar Instrucciones'
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300'
        />
      </form>
      <ToastContainer /> {/* Componente de la librería toastify */}
      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to='/registrar'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
