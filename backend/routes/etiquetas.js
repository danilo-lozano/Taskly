const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const EtiquetaController = require('../controllers/etiquetaController');
const authMiddleware = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todas las etiquetas
router.get('/', EtiquetaController.obtenerTodas);

// Obtener etiquetas de una tarea
router.get('/tarea/:tareaId', EtiquetaController.obtenerPorTarea);

// Obtener una etiqueta específica
router.get('/:id', EtiquetaController.obtenerUna);

// Crear nueva etiqueta
router.post('/',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color inválido (formato #RRGGBB)')
  ],
  EtiquetaController.crear
);

// Actualizar etiqueta
router.put('/:id',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color inválido (formato #RRGGBB)')
  ],
  EtiquetaController.actualizar
);

// Eliminar etiqueta
router.delete('/:id', EtiquetaController.eliminar);

module.exports = router;
