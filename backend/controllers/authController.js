const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UsuarioModel = require('../models/Usuario');
const ActividadModel = require('../models/Actividad');
const CategoriaModel = require('../models/Categoria');

class AuthController {
  // Registro de nuevo usuario
  static async registrar(req, res) {
    try {
      // Validar datos
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { nombre, email, password } = req.body;

      // Verificar si el usuario ya existe
      const usuarioExistente = await UsuarioModel.obtenerPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ 
          success: false,
          message: 'El correo electrónico ya está registrado' 
        });
      }

      // Hashear la contraseña
      const passwordHash = await bcrypt.hash(password, 10);

      // Crear usuario
      const usuarioId = await UsuarioModel.crear(nombre, email, passwordHash);

      // Crear categorías por defecto
      const categoriasDefecto = [
        { nombre: 'Personal', color: '#EC4899', icono: 'fas fa-user' },
        { nombre: 'Trabajo', color: '#F38181', icono: 'fas fa-briefcase' },
        { nombre: 'Estudios', color: '#95E1D3', icono: 'fas fa-book' },
        { nombre: 'Hogar', color: '#FFD93D', icono: 'fas fa-home' }
      ];

      for (const cat of categoriasDefecto) {
        await CategoriaModel.crear(cat.nombre, cat.color, cat.icono, usuarioId);
      }

      // Registrar actividad
      await ActividadModel.registrar(usuarioId, 'login', 'Usuario registrado exitosamente');

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: { usuarioId }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al registrar usuario' 
      });
    }
  }

  // Inicio de sesión
  static async login(req, res) {
    try {
      // Validar datos
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;

      // Buscar usuario
      const usuario = await UsuarioModel.obtenerPorEmail(email);
      if (!usuario) {
        return res.status(404).json({ 
          success: false,
          message: 'No existe una cuenta con este correo electrónico' 
        });
      }

      // Verificar contraseña
      const passwordValido = await bcrypt.compare(password, usuario.password);
      if (!passwordValido) {
        return res.status(401).json({ 
          success: false,
          message: 'La contraseña es incorrecta' 
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          userId: usuario.id,
          email: usuario.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Actualizar última conexión
      await UsuarioModel.actualizarUltimaConexion(usuario.id);

      // Registrar actividad
      await ActividadModel.registrar(usuario.id, 'login', 'Inicio de sesión exitoso');

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          token,
          usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            foto_perfil: usuario.foto_perfil
          }
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al iniciar sesión' 
      });
    }
  }

  // Obtener perfil del usuario autenticado
  static async obtenerPerfil(req, res) {
    try {
      const usuario = await UsuarioModel.obtenerPorId(req.userData.userId);
      
      if (!usuario) {
        return res.status(404).json({ 
          success: false,
          message: 'Usuario no encontrado' 
        });
      }

      res.json({
        success: true,
        data: usuario
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener perfil' 
      });
    }
  }

  // Actualizar perfil
  static async actualizarPerfil(req, res) {
    try {
      const { nombre, email } = req.body;
      const foto_perfil = req.file ? req.file.filename : req.body.foto_perfil;

      const resultado = await UsuarioModel.actualizarPerfil(
        req.userData.userId,
        nombre,
        email,
        foto_perfil
      );

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Usuario no encontrado' 
        });
      }

      res.json({
        success: true,
        message: 'Perfil actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al actualizar perfil' 
      });
    }
  }

  // Cambiar contraseña
  static async cambiarPassword(req, res) {
    try {
      const { passwordActual, passwordNueva } = req.body;

      // Obtener usuario
      const usuario = await UsuarioModel.obtenerPorEmail(req.userData.email);

      // Verificar contraseña actual
      const passwordValido = await bcrypt.compare(passwordActual, usuario.password);
      if (!passwordValido) {
        return res.status(400).json({ 
          success: false,
          message: 'La contraseña actual es incorrecta' 
        });
      }

      // Hashear nueva contraseña
      const passwordHash = await bcrypt.hash(passwordNueva, 10);

      // Actualizar contraseña
      await UsuarioModel.cambiarPassword(req.userData.userId, passwordHash);

      res.json({
        success: true,
        message: 'Contraseña cambiada exitosamente'
      });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al cambiar contraseña' 
      });
    }
  }
}

module.exports = AuthController;
