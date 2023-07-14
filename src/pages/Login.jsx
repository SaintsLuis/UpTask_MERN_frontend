import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import clienteAxios from '../config/clienteAxios'; // Importamos el cliente axios configurado
import { ToastContainer } from 'react-toastify';
import { showNotification } from '../utils/alerts';

import useAuth from '../hooks/useAuth'; // Importamos el hook useAuth

const Login = () => {
  // Hook para redireccionar
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuth } = useAuth(); // Obtenemos el método setAuth del context de autenticación

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if ([email, password].includes('')) {
      showNotification('Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token); // Guardamos el token en el localstorage
      setAuth(data);

      navigate('/proyectos'); // Redireccionamos a la ruta /proyectos
    } catch (error) {
      console.log(error);
      showNotification(error.response.data.msg, 'error');
    }
  };

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Inicia sesión y administra tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>

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
            placeholder='Email de Registro'
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
            placeholder='Password de Registro'
            className='w-full mt-3 p-3 border bg-gray-50 shadow hover:shador-lg border-gray-300 rounded-xl focus:outline-none focus:border-sky-500'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors duration-300 '
        />
      </form>

      <ToastContainer />

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/registrar'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          ¿No tienes cuenta? Regístrate
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

export default Login;
