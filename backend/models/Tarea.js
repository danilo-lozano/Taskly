const db = require('../config/database');

class TareaModel {
  // Obtener todas las tareas de un usuario
  static async obtenerPorUsuario(usuarioId) {
    const [rows] = await db.execute(`
      SELECT t.*, c.nombre as categoria_nombre, c.color as categoria_color,
             GROUP_CONCAT(DISTINCT e.nombre) as etiquetas
      FROM tareas t
      LEFT JOIN categorias c ON t.categoria_id = c.id
      LEFT JOIN tareas_etiquetas te ON t.id = te.tarea_id
      LEFT JOIN etiquetas e ON te.etiqueta_id = e.id
      WHERE t.usuario_id = ?
      GROUP BY t.id
      ORDER BY t.fecha_creacion DESC
    `, [usuarioId]);
    return rows;
  }

  // Obtener una tarea por ID
  static async obtenerPorId(id, usuarioId) {
    const [rows] = await db.execute(
      'SELECT * FROM tareas WHERE id = ? AND usuario_id = ?',
      [id, usuarioId]
    );
    return rows[0];
  }

  // Crear nueva tarea
  static async crear(datos) {
    const { titulo, descripcion, fecha_limite, prioridad, usuario_id, categoria_id } = datos;
    const [result] = await db.execute(
      'INSERT INTO tareas (titulo, descripcion, fecha_limite, prioridad, usuario_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_limite, prioridad, usuario_id, categoria_id]
    );
    return result.insertId;
  }

  // Actualizar tarea
  static async actualizar(id, datos, usuarioId) {
    const { titulo, descripcion, fecha_limite, prioridad, estado, categoria_id } = datos;
    const [result] = await db.execute(
      'UPDATE tareas SET titulo = ?, descripcion = ?, fecha_limite = ?, prioridad = ?, estado = ?, categoria_id = ? WHERE id = ? AND usuario_id = ?',
      [titulo, descripcion, fecha_limite, prioridad, estado, categoria_id, id, usuarioId]
    );
    return result.affectedRows;
  }

  // Cambiar estado de tarea
  static async cambiarEstado(id, estado, usuarioId) {
    const fechaCompletada = estado === 'completada' ? new Date() : null;
    const [result] = await db.execute(
      'UPDATE tareas SET estado = ?, fecha_completada = ? WHERE id = ? AND usuario_id = ?',
      [estado, fechaCompletada, id, usuarioId]
    );
    return result.affectedRows;
  }

  // Eliminar tarea
  static async eliminar(id, usuarioId) {
    const [result] = await db.execute(
      'DELETE FROM tareas WHERE id = ? AND usuario_id = ?',
      [id, usuarioId]
    );
    return result.affectedRows;
  }

  // Obtener tareas por estado
  static async obtenerPorEstado(usuarioId, estado) {
    const [rows] = await db.execute(
      'SELECT * FROM tareas WHERE usuario_id = ? AND estado = ? ORDER BY fecha_creacion DESC',
      [usuarioId, estado]
    );
    return rows;
  }

  // Obtener tareas por categoría
  static async obtenerPorCategoria(usuarioId, categoriaId) {
    const [rows] = await db.execute(
      'SELECT * FROM tareas WHERE usuario_id = ? AND categoria_id = ? ORDER BY fecha_creacion DESC',
      [usuarioId, categoriaId]
    );
    return rows;
  }

  // Obtener estadísticas de tareas
  static async obtenerEstadisticas(usuarioId) {
    const [rows] = await db.execute(
      `SELECT 
        COUNT(*) AS total_tareas,
        SUM(CASE WHEN estado = 'completada' THEN 1 ELSE 0 END) AS completadas,
        SUM(CASE WHEN estado = 'pendiente' THEN 1 ELSE 0 END) AS pendientes,
        SUM(CASE WHEN estado = 'en_progreso' THEN 1 ELSE 0 END) AS en_progreso,
        SUM(CASE WHEN prioridad = 'alta' THEN 1 ELSE 0 END) AS alta_prioridad,
        SUM(CASE WHEN fecha_limite < CURDATE() AND estado != 'completada' THEN 1 ELSE 0 END) AS vencidas
      FROM tareas
      WHERE usuario_id = ?`,
      [usuarioId]
    );
    return rows[0];
  }

  // Asignar etiqueta a tarea
  static async asignarEtiqueta(tareaId, etiquetaId) {
    try {
      const [result] = await db.execute(
        'INSERT INTO tareas_etiquetas (tarea_id, etiqueta_id) VALUES (?, ?)',
        [tareaId, etiquetaId]
      );
      return result.insertId;
    } catch (error) {
      // Si ya existe la relación, ignorar
      return null;
    }
  }

  // Remover etiqueta de tarea
  static async removerEtiqueta(tareaId, etiquetaId) {
    const [result] = await db.execute(
      'DELETE FROM tareas_etiquetas WHERE tarea_id = ? AND etiqueta_id = ?',
      [tareaId, etiquetaId]
    );
    return result.affectedRows;
  }
}

module.exports = TareaModel;
