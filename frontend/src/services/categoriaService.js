import api from './api';

export const categoriaService = {
  // Obtener todas las categorías
  obtenerTodas: async () => {
    const response = await api.get('/categorias');
    return response.data;
  },

  // Obtener una categoría por ID
  obtenerPorId: async (id) => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  // Crear nueva categoría
  crear: async (categoria) => {
    const response = await api.post('/categorias', categoria);
    return response.data;
  },

  // Actualizar categoría
  actualizar: async (id, categoria) => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data;
  },

  // Eliminar categoría
  eliminar: async (id) => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  }
};
