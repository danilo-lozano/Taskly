const { validationResult } = require('express-validator');
const CategoriaModel = require('../models/Categoria');

class CategoriaController {
  // Obtener todas las categorías del usuario
  static async obtenerTodas(req, res) {
    try {
      const categorias = await CategoriaModel.obtenerConConteo(req.userData.userId);
      
      res.json({
        success: true,
        data: categorias
      });
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener categorías' 
      });
    }
  }

  // Obtener una categoría específica
  static async obtenerUna(req, res) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaModel.obtenerPorId(id, req.userData.userId);

      if (!categoria) {
        return res.status(404).json({ 
          success: false,
          message: 'Categoría no encontrada' 
        });
      }

      res.json({
        success: true,
        data: categoria
      });
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener categoría' 
      });
    }
  }

  // Crear nueva categoría
  static async crear(req, res) {
    try {
      // Validar datos
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { nombre, color, icono } = req.body;

      const categoriaId = await CategoriaModel.crear(
        nombre,
        color || '#6C63FF',
        icono || 'fas fa-folder',
        req.userData.userId
      );

      res.status(201).json({
        success: true,
        message: 'Categoría creada exitosamente',
        data: { id: categoriaId }
      });
    } catch (error) {
      console.error('Error al crear categoría:', error);
      
      // Error de duplicado
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ 
          success: false,
          message: 'Ya existe una categoría con ese nombre' 
        });
      }

      res.status(500).json({ 
        success: false,
        message: 'Error al crear categoría' 
      });
    }
  }

  // Actualizar categoría
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, color, icono } = req.body;

      const resultado = await CategoriaModel.actualizar(
        id,
        nombre,
        color,
        icono,
        req.userData.userId
      );

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Categoría no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Categoría actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al actualizar categoría' 
      });
    }
  }

  // Eliminar categoría
  static async eliminar(req, res) {
    try {
      const { id } = req.params;

      const resultado = await CategoriaModel.eliminar(id, req.userData.userId);

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Categoría no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Categoría eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al eliminar categoría' 
      });
    }
  }
}

module.exports = CategoriaController;
