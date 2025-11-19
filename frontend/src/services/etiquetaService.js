import api from './api';

export const etiquetaService = {
  // Obtener todas las etiquetas
  obtenerTodas: async () => {
    const response = await api.get('/etiquetas');
    return response.data;
  },

  // Obtener una etiqueta por ID
  obtenerPorId: async (id) => {
    const response = await api.get(`/etiquetas/${id}`);
    return response.data;
  },

  // Obtener etiquetas de una tarea
  obtenerPorTarea: async (tareaId) => {
    const response = await api.get(`/etiquetas/tarea/${tareaId}`);
    return response.data;
  },

  // Crear nueva etiqueta
  crear: async (etiqueta) => {
    const response = await api.post('/etiquetas', etiqueta);
    return response.data;
  },

  // Actualizar etiqueta
  actualizar: async (id, etiqueta) => {
    const response = await api.put(`/etiquetas/${id}`, etiqueta);
    return response.data;
  },

  // Eliminar etiqueta
  eliminar: async (id) => {
    const response = await api.delete(`/etiquetas/${id}`);
    return response.data;
  }
};
