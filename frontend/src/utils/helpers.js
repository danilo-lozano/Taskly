// Formatear fecha
export const formatearFecha = (fecha) => {
  if (!fecha) return 'Sin fecha';
  const date = new Date(fecha);
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', opciones);
};

// Formatear fecha corta
export const formatearFechaCorta = (fecha) => {
  if (!fecha) return 'Sin fecha';
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES');
};

// Obtener días restantes
export const diasRestantes = (fechaLimite) => {
  if (!fechaLimite) return null;
  const hoy = new Date();
  const limite = new Date(fechaLimite);
  const diferencia = Math.ceil((limite - hoy) / (1000 * 60 * 60 * 24));
  return diferencia;
};

// Verificar si está vencida
export const estaVencida = (fechaLimite, estado) => {
  if (!fechaLimite || estado === 'completada') return false;
  return diasRestantes(fechaLimite) < 0;
};

// Obtener color por prioridad
export const colorPrioridad = (prioridad) => {
  const colores = {
    alta: '#DC2626',      // Rojo oscuro para mejor contraste
    media: '#EA580C',     // Naranja oscuro
    baja: '#0891B2'       // Cyan oscuro
  };
  return colores[prioridad] || '#0891B2';
};

// Obtener color por estado
export const colorEstado = (estado) => {
  const colores = {
    pendiente: '#6B7280',     // Gris
    en_progreso: '#D97706',   // Naranja/ámbar oscuro
    completada: '#16A34A'     // Verde oscuro
  };
  return colores[estado] || '#6B7280';
};

// Validar email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validar contraseña (mínimo 6 caracteres)
export const validarPassword = (password) => {
  return password && password.length >= 6;
};

// Capitalizar primera letra
export const capitalizar = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncar texto
export const truncarTexto = (texto, maxLength = 100) => {
  if (!texto) return '';
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength) + '...';
};

// Calcular luminancia para contraste
const getLuminance = (hex) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Obtener color de texto con buen contraste
export const getTextColor = (bgColor) => {
  if (!bgColor) return '#FFFFFF';
  const luminance = getLuminance(bgColor);
  return luminance > 0.5 ? '#1F2937' : '#FFFFFF';
};
