// Objetivo: SweetAlert para mostrar Alertas de Éxito, Error y Confirmación de Eliminar Proyecto.

import Swal from 'sweetalert2'; // https://sweetalert2.github.io/
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Alerta Success
export const AlertSuccess = ({ title }) => {
  MySwal.fire({
    position: 'top-end',
    icon: 'success',
    title: title || 'Your work has been saved',
    showConfirmButton: false,
    timer: 2000,
  });
};

// Alerta Error
export const AlertError = ({ text }) => {
  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: text || 'Something went wrong!',
  });
};

// Confirmation Delete, toma la fn eliminarProyecto (u otra fn...) y el id a eliminar
export const AlertDelete = (eliminarProyecto, id) => {
  MySwal.fire({
    title: '¿Estás seguro de eliminar este proyecto?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo',
  }).then(result => {
    if (result.isConfirmed) {
      eliminarProyecto(id);
      Swal.fire('¡Eliminado!', 'Tu proyecto ha sido eliminado.', 'success');
    }
  });
};

export const AlertDeleteTarea = (eliminarTarea, id) => {
  MySwal.fire({
    title: '¿Estás seguro de eliminar esta tarea?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
  }).then(result => {
    if (result.isConfirmed) {
      eliminarTarea(id);
      Swal.fire('¡Eliminado!', 'Tu tarea ha sido eliminada.', 'success');
    }
  });
};

export const AlertDeleteColaborador = (eliminarColaborador, id) => {
  MySwal.fire({
    title: '¿Estás seguro de eliminar este colaborador?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
  }).then(result => {
    if (result.isConfirmed) {
      eliminarColaborador(id);
      Swal.fire('¡Eliminado!', 'Colaborador eliminado.', 'success');
    }
  });
};
