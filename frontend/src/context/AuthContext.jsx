import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión válida al cargar
    const verificarSesion = async () => {
      const token = localStorage.getItem('token');
      const usuarioGuardado = authService.obtenerUsuarioActual();
      
      if (token && usuarioGuardado) {
        try {
          // Verificar que el token sea válido haciendo una petición al backend
          await authService.obtenerPerfil();
          setUsuario(usuarioGuardado);
        } catch (error) {
          // Si el token no es válido, limpiar localStorage
          console.log('Sesión expirada o inválida');
          authService.logout();
          setUsuario(null);
        }
      }
      setCargando(false);
    };

    verificarSesion();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.success) {
      setUsuario(response.data.usuario);
    }
    return response;
  };

  const registrar = async (nombre, email, password) => {
    const response = await authService.registrar(nombre, email, password);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  const actualizarUsuario = (nuevosDatos) => {
    const usuarioActualizado = { ...usuario, ...nuevosDatos };
    setUsuario(usuarioActualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
  };

  const value = {
    usuario,
    login,
    registrar,
    logout,
    actualizarUsuario,
    estaAutenticado: !!usuario,
    cargando
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
