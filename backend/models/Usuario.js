const db = require('../config/database');

class UsuarioModel {
  // Obtener usuario por email
  static async obtenerPorEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Obtener usuario por ID
  static async obtenerPorId(id) {
    const [rows] = await db.execute(
      'SELECT id, nombre, email, foto_perfil, fecha_registro, ultima_conexion FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Crear nuevo usuario
  static async crear(nombre, email, password) {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );
    return result.insertId;
  }

  // Actualizar perfil de usuario
  static async actualizarPerfil(id, nombre, email, foto_perfil) {
    const [result] = await db.execute(
      'UPDATE usuarios SET nombre = ?, email = ?, foto_perfil = ? WHERE id = ?',
      [nombre, email, foto_perfil, id]
    );
    return result.affectedRows;
  }

  // Actualizar última conexión
  static async actualizarUltimaConexion(id) {
    await db.execute(
      'UPDATE usuarios SET ultima_conexion = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
  }

  // Cambiar contraseña
  static async cambiarPassword(id, nuevaPassword) {
    const [result] = await db.execute(
      'UPDATE usuarios SET password = ? WHERE id = ?',
      [nuevaPassword, id]
    );
    return result.affectedRows;
  }
}

module.exports = UsuarioModel;
