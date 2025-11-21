const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');
const tareasRoutes = require('./routes/tareas');
const categoriasRoutes = require('./routes/categorias');
const etiquetasRoutes = require('./routes/etiquetas');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 3000;

// ====== MIDDLEWARES ======
// Configurar CORS para producción
const corsOptions = {
  origin: [
    'https://taskly-phi-nine.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ====== RUTAS ======
app.use('/api/auth', authRoutes);
app.use('/api/tareas', tareasRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/etiquetas', etiquetasRoutes);
app.use('/api/analytics', analyticsRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: '✅ API de Taskly funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      tareas: '/api/tareas',
      categorias: '/api/categorias',
      etiquetas: '/api/etiquetas',
      analytics: '/api/analytics'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ====== INICIAR SERVIDOR ======
app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Servidor Taskly iniciado`);
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}/api`);
  console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('=================================');
});

module.exports = app;
