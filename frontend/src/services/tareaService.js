import api from './api';

export const tareaService = {
  // Obtener todas las tareas
  obtenerTodas: async () => {
    const response = await api.get('/tareas');
    return response.data;
  },

  // Obtener una tarea por ID
  obtenerPorId: async (id) => {
    const response = await api.get(`/tareas/${id}`);
    return response.data;
  },

  // Obtener tareas por estado
  obtenerPorEstado: async (estado) => {
    const response = await api.get(`/tareas/estado/${estado}`);
    return response.data;
  },

  // Obtener tareas por categoría
  obtenerPorCategoria: async (categoriaId) => {
    const response = await api.get(`/tareas/categoria/${categoriaId}`);
    return response.data;
  },

  // Crear nueva tarea
  crear: async (tarea) => {
    const response = await api.post('/tareas', tarea);
    return response.data;
  },

  // Actualizar tarea
  actualizar: async (id, tarea) => {
    const response = await api.put(`/tareas/${id}`, tarea);
    return response.data;
  },

  // Cambiar estado de tarea
  cambiarEstado: async (id, estado) => {
    const response = await api.patch(`/tareas/${id}/estado`, { estado });
    return response.data;
  },

  // Asignar etiqueta a tarea
  asignarEtiqueta: async (tareaId, etiquetaId) => {
    const response = await api.post(`/tareas/${tareaId}/etiquetas`, { etiquetaId });
    return response.data;
  },

  // Remover etiqueta de tarea
  removerEtiqueta: async (tareaId, etiquetaId) => {
    const response = await api.delete(`/tareas/${tareaId}/etiquetas/${etiquetaId}`);
    return response.data;
  },

  // Eliminar tarea
  eliminar: async (id) => {
    const response = await api.delete(`/tareas/${id}`);
    return response.data;
  }
};
