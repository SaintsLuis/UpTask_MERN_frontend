// Hook para saber si el usuario es administrador del proyecto o no

import useProyectos from './useProyectos'; // obtener el proyecto actual
import useAuth from './useAuth'; // Hook para obtener el usuario autenticado

const useAdmin = () => {
  const { proyecto } = useProyectos();
  const { auth } = useAuth();

  // si proyecto.creador es igual a auth._id, entonces el usuario es administrador
  return proyecto.creador === auth._id; // true o false
};

export default useAdmin;
