// Objetivo: Componente Mostrar notificaciones-Toast al usuario en el frontend
/** libreria React-Toastify */

import { toast } from 'react-toastify'; // Librería para mostrar notificaciones React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Estilos de las notificaciones

//
// Función para mostrar notificaciones
export const showNotification = (message, type, options) => {
  // Opciones de las notificaciones por defecto
  const toastOptions = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    ...options,
  };

  // Mostrar notificación según el tipo de mensaje
  if (type === 'error') {
    toast.error(message, toastOptions);
  } else if (type === 'success') {
    toast.success(message, toastOptions);
  }
};
