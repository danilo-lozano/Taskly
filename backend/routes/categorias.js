const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const CategoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todas las categorías
router.get('/', CategoriaController.obtenerTodas);

// Obtener una categoría específica
router.get('/:id', CategoriaController.obtenerUna);

// Crear nueva categoría
router.post('/',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color inválido (formato #RRGGBB)')
  ],
  CategoriaController.crear
);

// Actualizar categoría
router.put('/:id',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('color').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Color inválido (formato #RRGGBB)')
  ],
  CategoriaController.actualizar
);

// Eliminar categoría
router.delete('/:id', CategoriaController.eliminar);

module.exports = router;
