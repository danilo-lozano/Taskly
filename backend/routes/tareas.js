const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const TareaController = require('../controllers/tareaController');
const authMiddleware = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todas las tareas del usuario
router.get('/', TareaController.obtenerTodas);

// Obtener tareas por estado
router.get('/estado/:estado', TareaController.obtenerPorEstado);

// Obtener tareas por categoría
router.get('/categoria/:categoriaId', TareaController.obtenerPorCategoria);

// Obtener una tarea específica
router.get('/:id', TareaController.obtenerUna);

// Crear nueva tarea
router.post('/',
  [
    body('titulo').trim().notEmpty().withMessage('El título es requerido'),
    body('prioridad').optional().isIn(['baja', 'media', 'alta']).withMessage('Prioridad inválida')
  ],
  TareaController.crear
);

// Actualizar tarea
router.put('/:id', TareaController.actualizar);

// Cambiar estado de tarea
router.patch('/:id/estado',
  [
    body('estado').isIn(['pendiente', 'en_progreso', 'completada']).withMessage('Estado inválido')
  ],
  TareaController.cambiarEstado
);

// Asignar etiqueta a tarea
router.post('/:id/etiquetas',
  [
    body('etiquetaId').notEmpty().withMessage('ID de etiqueta requerido')
  ],
  TareaController.asignarEtiqueta
);

// Remover etiqueta de tarea
router.delete('/:id/etiquetas/:etiquetaId', TareaController.removerEtiqueta);

// Eliminar tarea
router.delete('/:id', TareaController.eliminar);

module.exports = router;
