// Objetivo: Page - Registrar un usuario en la aplicación
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios.jsx'; //  Cliente axios configurado
import { ToastContainer } from 'react-toastify'; // Container de la Librería toastify
import { showNotification } from '../utils/alerts.js'; // Componente para mostrar notificaciones-Toastify

const Registrar = () => {
  // State para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  // Función para registrar un usuario
  const handleSubmit = async e => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if ([nombre, email, password, repetirPassword].includes('')) {
      // Mostrar notificación de error
      showNotification('Por favor, rellene todos los campos.', 'error');
      return;
    }

    // Validar que el password y el repetir password sean iguales
    if (password !== repetirPassword) {
      // Mostrar notificación de error
      showNotification('Los passwords no coinciden.', 'error');
      return;
    }

    // Validar que el password sea de mínimo 6 caracteres
    if (password.length < 6) {
      // Mostrar notificación de error
      showNotification(
        'El Password es muy corto, agrega mínimo 6 caracteres.',
        'error',
      );
      return;
    }

    // Si todo es correcto, se procede a registrar el usuario en la base de datos

    try {
      // Registrar el usuario en la API con axios (POST /api/usuarios)
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      // Mostrar notificación de éxito
      showNotification(data.msg, 'success', {
        position: 'top-right',
        hideProgressBar: false,
        theme: 'light',
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      // Mostrar notificación de error desde la API
      showNotification(error.response.data.msg, 'error');
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Crea tu cuenta y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg p-10'
      >
        <div className='my-5'>
          <label
            htmlFor='nombre'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Nombre
          </label>
          <input
            id='nombre'
            type='text'
            placeholder='Tu Nombre'
            className='w-full mt-3 p-3 border bg-gray-50 shadow hover:shador-lg border-gray-300 rounded-xl focus:outline-none focus:border-sky-500'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

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

        <div className='my-5'>
          <label
            htmlFor='password'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Tu Password'
            className='w-full mt-3 p-3 border bg-gray-50 shadow hover:shador-lg border-gray-300 rounded-xl focus:outline-none focus:border-sky-500'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label
            htmlFor='password2'
            className='uppercase text-gray-600 block text-xl font-bold'
          >
            Repetir Password
          </label>
          <input
            id='password2'
            type='password'
            placeholder='Repetir tu Password'
            className='w-full mt-3 p-3 border bg-gray-50 shadow hover:shador-lg border-gray-300 rounded-xl focus:outline-none focus:border-sky-500'
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Crear Cuenta'
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300'
        />
      </form>

      {/* Toast | Alert  */}
      <ToastContainer />

      {/* Navegación */}
      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          to='/olvide-password'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          Olvide Mi Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
