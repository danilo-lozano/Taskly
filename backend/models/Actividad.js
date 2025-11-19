const db = require('../config/database');

class ActividadModel {
  // Registrar actividad
  static async registrar(usuarioId, tipoActividad, detalles = null) {
    const [result] = await db.execute(
      'INSERT INTO actividad_usuario (usuario_id, tipo_actividad, detalles) VALUES (?, ?, ?)',
      [usuarioId, tipoActividad, detalles]
    );
    return result.insertId;
  }

  // Obtener actividad reciente del usuario
  static async obtenerReciente(usuarioId, limite = 10) {
    const [rows] = await db.execute(
      'SELECT * FROM actividad_usuario WHERE usuario_id = ? ORDER BY fecha_actividad DESC LIMIT ?',
      [usuarioId, limite]
    );
    return rows;
  }

  // Obtener estadísticas de actividad por tipo
  static async obtenerEstadisticas(usuarioId) {
    const [rows] = await db.execute(`
      SELECT 
        tipo_actividad,
        COUNT(*) as total,
        MAX(fecha_actividad) as ultima_actividad
      FROM actividad_usuario
      WHERE usuario_id = ?
      GROUP BY tipo_actividad
    `, [usuarioId]);
    return rows;
  }

  // Obtener actividad por rango de fechas
  static async obtenerPorRango(usuarioId, fechaInicio, fechaFin) {
    const [rows] = await db.execute(
      'SELECT * FROM actividad_usuario WHERE usuario_id = ? AND fecha_actividad BETWEEN ? AND ? ORDER BY fecha_actividad DESC',
      [usuarioId, fechaInicio, fechaFin]
    );
    return rows;
  }
}

module.exports = ActividadModel;
