// Objetivo: exportar el contexto de autenticación para ser usado en otros componentes sin necesidad de pasar props.

import { useContext } from 'react'; // Importamos useContext para acceder al context
import AuthContext from '../context/AuthProvider'; // Importamos el context de autenticación

// Hook para acceder al context de autenticación
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
