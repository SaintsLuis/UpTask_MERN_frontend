// Objetivo: Configurar el cliente axios para realizar las peticiones al servidor de forma más sencilla y ordenada.
import axios from 'axios'; // Importamos libreria axios

// .create() crea una nueva instancia de axios con una configuración personalizada.
const clienteAxios = axios.create({
  // baseURL: 'http://localhost:4000/api',
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default clienteAxios;
