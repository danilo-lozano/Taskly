import api from './api';

export const analyticsService = {
  // Obtener resumen completo para dashboard
  obtenerResumenDashboard: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  // Obtener estadísticas generales
  obtenerEstadisticas: async () => {
    const response = await api.get('/analytics/estadisticas');
    return response.data;
  },

  // Obtener tareas por categoría
  obtenerTareasPorCategoria: async () => {
    const response = await api.get('/analytics/tareas-categoria');
    return response.data;
  },

  // Obtener tareas por estado
  obtenerTareasPorEstado: async () => {
    const response = await api.get('/analytics/tareas-estado');
    return response.data;
  },

  // Obtener tareas por prioridad
  obtenerTareasPorPrioridad: async () => {
    const response = await api.get('/analytics/tareas-prioridad');
    return response.data;
  },

  // Obtener productividad semanal
  obtenerProductividadSemanal: async () => {
    const response = await api.get('/analytics/productividad-semanal');
    return response.data;
  },

  // Obtener tareas próximas a vencer
  obtenerTareasProximasVencer: async () => {
    const response = await api.get('/analytics/proximas-vencer');
    return response.data;
  },

  // Obtener actividad reciente
  obtenerActividadReciente: async (limite = 20) => {
    const response = await api.get(`/analytics/actividad-reciente?limite=${limite}`);
    return response.data;
  }
};
