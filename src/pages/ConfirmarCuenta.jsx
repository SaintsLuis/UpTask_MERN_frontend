// Objetivo: Confirmar la cuenta del usuario

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios.jsx'; // Importamos el cliente axios configurado
import { ToastContainer } from 'react-toastify'; // Container de la Librería toastify
import { showNotification } from '../utils/alerts.js'; // Componente para mostrar notificaciones-Toastify

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // Obtener el id de la url
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Función para confirmar la cuenta
    const confirmarCuenta = async () => {
      try {
        // Hacer petición a la API para confirmar la cuenta
        const { data } = await clienteAxios.get(`/usuarios/confirmar/${id}`);

        // Mostrar notificación de éxito
        showNotification(data.msg, 'success');

        // Cambiar el state de cuentaConfirmada
        setCuentaConfirmada(true);
      } catch (error) {
        // showNotification(error.response.data.msg, 'error');
        console.log(error.response.data.msg);
      }
    };
    confirmarCuenta();
  }, [id]);

  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>
        Confirma tu cuenta y comienza a crear tus{' '}
        <span className='text-slate-700'>proyectos</span>
      </h1>
      <ToastContainer /> {/* Componente de la librería toastify */}
      {cuentaConfirmada && (
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 uppercase text-sm'
        >
          Iniciar Sesión
        </Link>
      )}
    </>
  );
};

export default ConfirmarCuenta;
