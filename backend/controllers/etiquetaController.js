const { validationResult } = require('express-validator');
const EtiquetaModel = require('../models/Etiqueta');

class EtiquetaController {
  // Obtener todas las etiquetas del usuario
  static async obtenerTodas(req, res) {
    try {
      const etiquetas = await EtiquetaModel.obtenerPorUsuario(req.userData.userId);
      
      res.json({
        success: true,
        data: etiquetas
      });
    } catch (error) {
      console.error('Error al obtener etiquetas:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener etiquetas' 
      });
    }
  }

  // Obtener una etiqueta específica
  static async obtenerUna(req, res) {
    try {
      const { id } = req.params;
      const etiqueta = await EtiquetaModel.obtenerPorId(id, req.userData.userId);

      if (!etiqueta) {
        return res.status(404).json({ 
          success: false,
          message: 'Etiqueta no encontrada' 
        });
      }

      res.json({
        success: true,
        data: etiqueta
      });
    } catch (error) {
      console.error('Error al obtener etiqueta:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener etiqueta' 
      });
    }
  }

  // Crear nueva etiqueta
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

      const { nombre, color } = req.body;

      const etiquetaId = await EtiquetaModel.crear(
        nombre,
        color || '#95E1D3',
        req.userData.userId
      );

      res.status(201).json({
        success: true,
        message: 'Etiqueta creada exitosamente',
        data: { id: etiquetaId }
      });
    } catch (error) {
      console.error('Error al crear etiqueta:', error);
      
      // Error de duplicado
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ 
          success: false,
          message: 'Ya existe una etiqueta con ese nombre' 
        });
      }

      res.status(500).json({ 
        success: false,
        message: 'Error al crear etiqueta' 
      });
    }
  }

  // Actualizar etiqueta
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, color } = req.body;

      const resultado = await EtiquetaModel.actualizar(
        id,
        nombre,
        color,
        req.userData.userId
      );

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Etiqueta no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Etiqueta actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar etiqueta:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al actualizar etiqueta' 
      });
    }
  }

  // Eliminar etiqueta
  static async eliminar(req, res) {
    try {
      const { id } = req.params;

      const resultado = await EtiquetaModel.eliminar(id, req.userData.userId);

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Etiqueta no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Etiqueta eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar etiqueta:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al eliminar etiqueta' 
      });
    }
  }

  // Obtener etiquetas de una tarea
  static async obtenerPorTarea(req, res) {
    try {
      const { tareaId } = req.params;
      const etiquetas = await EtiquetaModel.obtenerPorTarea(tareaId);

      res.json({
        success: true,
        data: etiquetas
      });
    } catch (error) {
      console.error('Error al obtener etiquetas de tarea:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener etiquetas' 
      });
    }
  }
}

module.exports = EtiquetaController;
