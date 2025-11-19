const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Rutas públicas (sin autenticación)
router.post('/registrar',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  AuthController.registrar
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
  ],
  AuthController.login
);

// Rutas protegidas (requieren autenticación)
router.get('/perfil', authMiddleware, AuthController.obtenerPerfil);

router.put('/perfil', 
  authMiddleware,
  upload.single('foto_perfil'),
  AuthController.actualizarPerfil
);

router.put('/cambiar-password',
  authMiddleware,
  [
    body('passwordActual').notEmpty().withMessage('La contraseña actual es requerida'),
    body('passwordNueva').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
  ],
  AuthController.cambiarPassword
);

module.exports = router;
