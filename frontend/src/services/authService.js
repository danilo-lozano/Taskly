import api from './api';

export const authService = {
  // Registrar nuevo usuario
  registrar: async (nombre, email, password) => {
    const response = await api.post('/auth/registrar', { nombre, email, password });
    return response.data;
  },

  // Iniciar sesión
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.data.usuario));
    }
    return response.data;
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  // Obtener perfil
  obtenerPerfil: async () => {
    const response = await api.get('/auth/perfil');
    return response.data;
  },

  // Actualizar perfil
  actualizarPerfil: async (formData) => {
    const response = await api.put('/auth/perfil', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Cambiar contraseña
  cambiarPassword: async (passwordActual, passwordNueva) => {
    const response = await api.put('/auth/cambiar-password', { 
      passwordActual, 
      passwordNueva 
    });
    return response.data;
  },

  // Verificar si hay sesión activa
  estaAutenticado: () => {
    return !!localStorage.getItem('token');
  },

  // Obtener usuario actual
  obtenerUsuarioActual: () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
};
