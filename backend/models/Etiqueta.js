const db = require('../config/database');

class EtiquetaModel {
  // Obtener todas las etiquetas de un usuario
  static async obtenerPorUsuario(usuarioId) {
    const [rows] = await db.execute(
      'SELECT * FROM etiquetas WHERE usuario_id = ? ORDER BY fecha_creacion DESC',
      [usuarioId]
    );
    return rows;
  }

  // Obtener una etiqueta por ID
  static async obtenerPorId(id, usuarioId) {
    const [rows] = await db.execute(
      'SELECT * FROM etiquetas WHERE id = ? AND usuario_id = ?',
      [id, usuarioId]
    );
    return rows[0];
  }

  // Crear nueva etiqueta
  static async crear(nombre, color, usuarioId) {
    const [result] = await db.execute(
      'INSERT INTO etiquetas (nombre, color, usuario_id) VALUES (?, ?, ?)',
      [nombre, color, usuarioId]
    );
    return result.insertId;
  }

  // Actualizar etiqueta
  static async actualizar(id, nombre, color, usuarioId) {
    const [result] = await db.execute(
      'UPDATE etiquetas SET nombre = ?, color = ? WHERE id = ? AND usuario_id = ?',
      [nombre, color, id, usuarioId]
    );
    return result.affectedRows;
  }

  // Eliminar etiqueta
  static async eliminar(id, usuarioId) {
    const [result] = await db.execute(
      'DELETE FROM etiquetas WHERE id = ? AND usuario_id = ?',
      [id, usuarioId]
    );
    return result.affectedRows;
  }

  // Obtener etiquetas de una tarea
  static async obtenerPorTarea(tareaId) {
    const [rows] = await db.execute(`
      SELECT e.* FROM etiquetas e
      INNER JOIN tareas_etiquetas te ON e.id = te.etiqueta_id
      WHERE te.tarea_id = ?
    `, [tareaId]);
    return rows;
  }
}

module.exports = EtiquetaModel;
