const { validationResult } = require('express-validator');
const TareaModel = require('../models/Tarea');
const ActividadModel = require('../models/Actividad');

class TareaController {
  // Obtener todas las tareas del usuario
  static async obtenerTodas(req, res) {
    try {
      const tareas = await TareaModel.obtenerPorUsuario(req.userData.userId);
      
      res.json({
        success: true,
        data: tareas
      });
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener tareas' 
      });
    }
  }

  // Obtener una tarea específica
  static async obtenerUna(req, res) {
    try {
      const { id } = req.params;
      const tarea = await TareaModel.obtenerPorId(id, req.userData.userId);

      if (!tarea) {
        return res.status(404).json({ 
          success: false,
          message: 'Tarea no encontrada' 
        });
      }

      res.json({
        success: true,
        data: tarea
      });
    } catch (error) {
      console.error('Error al obtener tarea:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener tarea' 
      });
    }
  }

  // Crear nueva tarea
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

      const { titulo, descripcion, fecha_limite, prioridad, categoria_id } = req.body;

      const tareaId = await TareaModel.crear({
        titulo,
        descripcion,
        fecha_limite,
        prioridad,
        usuario_id: req.userData.userId,
        categoria_id
      });

      // Registrar actividad
      await ActividadModel.registrar(
        req.userData.userId, 
        'tarea_creada', 
        `Tarea creada: ${titulo}`
      );

      res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente',
        data: { id: tareaId }
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al crear tarea' 
      });
    }
  }

  // Actualizar tarea
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descripcion, fecha_limite, prioridad, estado, categoria_id } = req.body;

      const resultado = await TareaModel.actualizar(
        id,
        { titulo, descripcion, fecha_limite, prioridad, estado, categoria_id },
        req.userData.userId
      );

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Tarea no encontrada' 
        });
      }

      res.json({
        success: true,
        message: 'Tarea actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al actualizar tarea' 
      });
    }
  }

  // Cambiar estado de tarea
  static async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      const resultado = await TareaModel.cambiarEstado(id, estado, req.userData.userId);

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Tarea no encontrada' 
        });
      }

      // Registrar actividad si se completó
      if (estado === 'completada') {
        await ActividadModel.registrar(
          req.userData.userId,
          'tarea_completada',
          `Tarea completada: ID ${id}`
        );
      }

      res.json({
        success: true,
        message: 'Estado de tarea actualizado exitosamente'
      });
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al cambiar estado' 
      });
    }
  }

  // Eliminar tarea
  static async eliminar(req, res) {
    try {
      const { id } = req.params;

      const resultado = await TareaModel.eliminar(id, req.userData.userId);

      if (resultado === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Tarea no encontrada' 
        });
      }

      // Registrar actividad
      await ActividadModel.registrar(
        req.userData.userId,
        'tarea_eliminada',
        `Tarea eliminada: ID ${id}`
      );

      res.json({
        success: true,
        message: 'Tarea eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al eliminar tarea' 
      });
    }
  }

  // Obtener tareas por estado
  static async obtenerPorEstado(req, res) {
    try {
      const { estado } = req.params;
      const tareas = await TareaModel.obtenerPorEstado(req.userData.userId, estado);

      res.json({
        success: true,
        data: tareas
      });
    } catch (error) {
      console.error('Error al obtener tareas por estado:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener tareas' 
      });
    }
  }

  // Obtener tareas por categoría
  static async obtenerPorCategoria(req, res) {
    try {
      const { categoriaId } = req.params;
      const tareas = await TareaModel.obtenerPorCategoria(req.userData.userId, categoriaId);

      res.json({
        success: true,
        data: tareas
      });
    } catch (error) {
      console.error('Error al obtener tareas por categoría:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al obtener tareas' 
      });
    }
  }

  // Asignar etiqueta a tarea
  static async asignarEtiqueta(req, res) {
    try {
      const { id } = req.params;
      const { etiquetaId } = req.body;

      await TareaModel.asignarEtiqueta(id, etiquetaId);

      res.json({
        success: true,
        message: 'Etiqueta asignada exitosamente'
      });
    } catch (error) {
      console.error('Error al asignar etiqueta:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al asignar etiqueta' 
      });
    }
  }

  // Remover etiqueta de tarea
  static async removerEtiqueta(req, res) {
    try {
      const { id, etiquetaId } = req.params;

      await TareaModel.removerEtiqueta(id, etiquetaId);

      res.json({
        success: true,
        message: 'Etiqueta removida exitosamente'
      });
    } catch (error) {
      console.error('Error al remover etiqueta:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error al remover etiqueta' 
      });
    }
  }
}

module.exports = TareaController;
