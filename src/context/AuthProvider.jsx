/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }

      // Agregar token a los headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Consultar a la API para obtener el usuario autenticado
      try {
        // Obtenemos el usuario autenticado
        const { data } = await clienteAxios.get('/usuarios/perfil', config);

        setAuth(data); // Guardamos el usuario en el state
        // navigate('/proyectos'); // Redireccionamos a la ruta /proyectos
      } catch (error) {
        setAuth({}); // Si hay un error, limpiamos el state
      }

      setCargando(false);
    };
    autenticarUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
