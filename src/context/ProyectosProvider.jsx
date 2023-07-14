/* eslint-disable react/prop-types */
// Objetivo: Contexto para los proyectos

import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { showNotification } from '../utils/alerts'; // Función para mostrar notificaciones

import io from 'socket.io-client'; // Librería para conectar con el servidor de socket.io

// eslint-disable-next-line no-unused-vars
let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [buscador, setBuscador] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get('/proyectos', config);

        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, [auth]);

  // Conectar con el servidor de socket.io para recibir actualizaciones en tiempo real
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  // fn Submit para el formulario de proyectos || Crear y Editar
  const submitProyecto = async proyecto => {
    if (proyecto?.id) {
      // await editarProyecto(proyecto);
      editarProyecto(proyecto);

      // Setear el proyecto actualizado en el state con la nueva informacion
      setProyecto(proyecto);

      return;
    }

    await nuevoProyecto(proyecto);
  };

  // Función que edita un proyecto
  const editarProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config,
      );

      // sincronizar el state, agregar el nuevo proyecto con los proyectos actuales
      const proyectosActualizados = proyectos.map(proyectoState =>
        proyectoState._id === data._id ? data : proyectoState,
      );
      setProyectos(proyectosActualizados);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  // Función que agrega un nuevo proyecto
  const nuevoProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post('/proyectos', proyecto, config);

      // sincronizar el state, agregar el nuevo proyecto con los proyectos actuales
      setProyectos([...proyectos, data]);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  const obtenerProyecto = async id => {
    try {
      setCargando(true);
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
      setProyecto(data);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
      setTimeout(() => {
        navigate('/proyectos');
      }, 5000);
    } finally {
      setCargando(false);
    }
  };

  // Función que elimina un proyecto por su id
  const eliminarProyecto = async id => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // ELIMINAR DE LA API
      await clienteAxios.delete(`/proyectos/${id}`, config);

      // ELIMINAR-SINCRONIZAR DEL STATE
      const proyectosActualizados = proyectos.filter(
        proyectoState => proyectoState._id !== id,
      );
      setProyectos(proyectosActualizados);

      navigate('/proyectos');
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async tarea => {
    // identificar en base al id si es Editar o Crear una tarea
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const editarTarea = async tarea => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config,
      );

      setModalFormularioTarea(false);

      // SOCKET IO | EMITIR UNA TAREA EDITADA AL SERVIDOR PARA QUE LA ENVIE A TODOS LOS USUARIOS
      socket.emit('editar-tarea', data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTarea = async tarea => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post('/tareas', tarea, config);

      setModalFormularioTarea(false);

      // SOCKET IO | EMITIR UNA TAREA NUEVA AL SERVIDOR PARA QUE LA ENVIE A TODOS LOS USUARIOS
      socket.emit('agregar-tarea', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = tarea => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const eliminarTarea = async id => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Eliminar tarea de la API
      await clienteAxios.delete(`/tareas/${id}`, config);

      // Eliminar tarea del state
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
        tareaState => tareaState._id !== id,
      );

      setProyecto(proyectoActualizado);

      // SOCKET IO | EMITIR UNA TAREA ELIMINADA AL SERVIDOR PARA QUE LA ENVIE A TODOS LOS USERS
      socket.emit('eliminar-tarea', { id: id, proyecto: proyecto });
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async email => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        '/proyectos/colaboradores',
        { email },
        config,
      );

      setColaborador(data);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  const agregarColaborador = async email => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config,
      );

      // Mostrar Alerta con toastify
      showNotification(data.msg, 'success', {
        position: 'top-right',
        hideProgressBar: false,
        theme: 'light',
      });
      setColaborador({});
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Eliminar el colaborador que esta en proyecto de la Api con el id del proyecto y el id del colaborador
      await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: proyecto.colaboradores[0]._id },
        config,
      );

      // Eliminar del state el colaborador
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          colaborador => colaborador._id !== proyecto.colaboradores[0]._id,
        );
      setProyecto(proyectoActualizado);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  const completarTarea = async id => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config,
      );

      // SOCKET IO | EMITIR UNA TAREA COMPLETADA AL SERVIDOR PARA QUE LA ENVIE A TODOS LOS USERS
      socket.emit('cambiar-estado-tarea', data);
    } catch (error) {
      showNotification(error.response.data.msg, 'error');
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  const cerrarSesionProyectos = () => {
    setProyectos([]);
    setProyecto({});
  };

  // /* FUNCIONES para Socket IO *//
  const submitTareasProyecto = tarea => {
    // Agrega la tarea al state
    const proyectosActualizados = { ...proyecto };
    proyectosActualizados.tareas = [...proyectosActualizados.tareas, tarea];

    setProyecto(proyectosActualizados);
  };

  const eliminarTareaProyecto = tarea => {
    console.log(tarea);
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      tareaState => tareaState._id !== tarea._id,
    );

    console.log(tarea._id);

    setProyecto(proyectoActualizado);
  };

  const actualizarTareaProyecto = tarea => {
    // Actualiza la tarea en el state
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
      tareaState._id === tarea._id ? tarea : tareaState,
    );
    setProyecto(proyectoActualizado);
  };

  const cambiarEstadoTarea = tarea => {
    // Actualiza la tarea en el state
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
      tareaState._id === tarea._id ? tarea : tareaState,
    );
    setProyecto(proyectoActualizado);
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        setCargando,
        showNotification,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        eliminarColaborador,
        completarTarea,
        buscador,
        handleBuscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
