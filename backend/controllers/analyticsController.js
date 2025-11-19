const TareaModel = require('../models/Tarea');
const ActividadModel = require('../models/Actividad');
const db = require('../config/database');

class AnalyticsController {
  // Obtener estadísticas generales del usuario
  static async obtenerEstadisticas(req, res) {
    try {
      const estadisticas = await TareaModel.obtenerEstadisticas(req.userData.userId);

      res.json({
        success: true,
        data: estadisticas
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener estadísticas' 
      });
    }
  }

  // Obtener tareas por categoría (para gráficos)
  static async tareasPorCategoria(req, res) {
    try {
      const [rows] = await db.execute(`
        SELECT 
          c.nombre as categoria,
          c.color,
          COUNT(t.id) as cantidad
        FROM categorias c
        LEFT JOIN tareas t ON c.id = t.categoria_id
        WHERE c.usuario_id = ?
        GROUP BY c.id, c.nombre, c.color
        ORDER BY cantidad DESC
      `, [req.userData.userId]);

      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error al obtener tareas por categoría:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener datos' 
      });
    }
  }

  // Obtener tareas por estado
  static async tareasPorEstado(req, res) {
    try {
      const [rows] = await db.execute(`
        SELECT 
          estado,
          COUNT(*) as cantidad
        FROM tareas
        WHERE usuario_id = ?
        GROUP BY estado
      `, [req.userData.userId]);

      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error al obtener tareas por estado:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener datos' 
      });
    }
  }

  // Obtener tareas por prioridad
  static async tareasPorPrioridad(req, res) {
    try {
      const [rows] = await db.execute(`
        SELECT 
          prioridad,
          COUNT(*) as cantidad
        FROM tareas
        WHERE usuario_id = ?
        GROUP BY prioridad
      `, [req.userData.userId]);

      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error al obtener tareas por prioridad:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener datos' 
      });
    }
  }

  // Obtener productividad semanal
  static async productividadSemanal(req, res) {
    try {
      const [rows] = await db.execute(`
        SELECT 
          DATE(fecha_completada) as fecha,
          COUNT(*) as tareas_completadas
        FROM tareas
        WHERE usuario_id = ?
        AND estado = 'completada'
        AND fecha_completada >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY DATE(fecha_completada)
        ORDER BY fecha ASC
      `, [req.userData.userId]);

      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error al obtener productividad semanal:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener datos' 
      });
    }
  }

  // Obtener tareas próximas a vencer
  static async tareasProximasVencer(req, res) {
    try {
      const [rows] = await db.execute(`
        SELECT t.*, c.nombre as categoria_nombre, c.color as categoria_color
        FROM tareas t
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = ?
        AND t.estado != 'completada'
        AND t.fecha_limite IS NOT NULL
        AND t.fecha_limite BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
        ORDER BY t.fecha_limite ASC
      `, [req.userData.userId]);

      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error al obtener tareas próximas a vencer:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener datos' 
      });
    }
  }

  // Obtener actividad reciente
  static async actividadReciente(req, res) {
    try {
      const limite = req.query.limite || 20;
      const actividades = await ActividadModel.obtenerReciente(req.userData.userId, parseInt(limite));

      res.json({
        success: true,
        data: actividades
      });
    } catch (error) {
      console.error('Error al obtener actividad reciente:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener actividad' 
      });
    }
  }

  // Obtener resumen completo para dashboard
  static async resumenDashboard(req, res) {
    try {
      // Obtener estadísticas generales
      const estadisticas = await TareaModel.obtenerEstadisticas(req.userData.userId);

      // Obtener tareas recientes
      const [tareasRecientes] = await db.execute(`
        SELECT t.*, c.nombre as categoria_nombre, c.color as categoria_color
        FROM tareas t
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = ?
        ORDER BY t.fecha_creacion DESC
        LIMIT 5
      `, [req.userData.userId]);

      // Obtener actividad reciente
      const actividades = await ActividadModel.obtenerReciente(req.userData.userId, 5);

      res.json({
        success: true,
        data: {
          estadisticas,
          tareasRecientes,
          actividades
        }
      });
    } catch (error) {
      console.error('Error al obtener resumen:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener resumen' 
      });
    }
  }
}

module.exports = AnalyticsController;
