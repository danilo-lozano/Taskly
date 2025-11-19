const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener resumen completo para dashboard
router.get('/dashboard', AnalyticsController.resumenDashboard);

// Obtener estadísticas generales
router.get('/estadisticas', AnalyticsController.obtenerEstadisticas);

// Obtener tareas por categoría
router.get('/tareas-categoria', AnalyticsController.tareasPorCategoria);

// Obtener tareas por estado
router.get('/tareas-estado', AnalyticsController.tareasPorEstado);

// Obtener tareas por prioridad
router.get('/tareas-prioridad', AnalyticsController.tareasPorPrioridad);

// Obtener productividad semanal
router.get('/productividad-semanal', AnalyticsController.productividadSemanal);

// Obtener tareas próximas a vencer
router.get('/proximas-vencer', AnalyticsController.tareasProximasVencer);

// Obtener actividad reciente
router.get('/actividad-reciente', AnalyticsController.actividadReciente);

module.exports = router;
