const db = require('../config/database');

class CategoriaModel {
  // Obtener todas las categorías de un usuario
  static async obtenerPorUsuario(usuarioId) {
    const [rows] = await db.execute(
      'SELECT * FROM categorias WHERE usuario_id = ? ORDER BY fecha_creacion DESC',
      [usuarioId]
    );
    return rows;
  }

  // Obtener una categoría por ID
  static async obtenerPorId(id, usuarioId) {
    const [rows] = await db.execute(
      'SELECT * FROM categorias WHERE id = ? AND usuario_id = ?',
      [id, usuarioId]
    );
    return rows[0];
  }

  // Crear nueva categoría
  static async crear(nombre, color, icono, usuarioId) {
    const [result] = await db.execute(
      'INSERT INTO categorias (nombre, color, icono, usuario_id) VALUES (?, ?, ?, ?)',
      [nombre, color, icono, usuarioId]
    );
    return result.insertId;
  }

  // Actualizar categoría
  static async actualizar(id, nombre, color, icono, usuarioId) {
    const [result] = await db.execute(
      'UPDATE categorias SET nombre = ?, color = ?, icono = ? WHERE id = ? AND usuario_id = ?',
      [nombre, color, icono, id, usuarioId]
    );
    return result.affectedRows;
  }

  // Eliminar categoría
  static async eliminar(id, usuarioId) {
    const [result] = await db.execute(
      'DELETE FROM categorias WHERE id = ? AND usuario_id = ?',
      [id, usuarioId]
    );
    return result.affectedRows;
  }

  // Obtener categorías con conteo de tareas
  static async obtenerConConteo(usuarioId) {
    const [rows] = await db.execute(`
      SELECT c.*, COUNT(t.id) as total_tareas
      FROM categorias c
      LEFT JOIN tareas t ON c.id = t.categoria_id
      WHERE c.usuario_id = ?
      GROUP BY c.id
      ORDER BY c.fecha_creacion DESC
    `, [usuarioId]);
    return rows;
  }
}

module.exports = CategoriaModel;
