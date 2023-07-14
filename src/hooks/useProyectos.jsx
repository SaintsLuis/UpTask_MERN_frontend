// Objetivo: hook para obtener el context de proyectos y evitar importar useContext en cada componente que lo necesite.

import { useContext } from 'react';
import ProyectosContext from '../context/ProyectosProvider';

const useProyectos = () => {
  return useContext(ProyectosContext);
};

export default useProyectos;
