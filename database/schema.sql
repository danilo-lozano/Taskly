-- =====================================================
-- BASE DE DATOS: TASKLY - Sistema de Gestión de Tareas
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS taskly_db;
USE taskly_db;

-- =====================================================
-- TABLA: usuarios
-- Almacena la información de los usuarios del sistema
-- =====================================================
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  foto_perfil VARCHAR(255) DEFAULT 'default-avatar.png',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_conexion TIMESTAMP NULL,
  INDEX idx_email (email),
  INDEX idx_fecha_registro (fecha_registro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: categorias
-- Define las categorías para organizar las tareas
-- =====================================================
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#6C63FF',
  icono VARCHAR(50) DEFAULT 'fas fa-folder',
  usuario_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario_categoria (usuario_id),
  UNIQUE KEY unique_categoria_usuario (nombre, usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: etiquetas
-- Almacena etiquetas personalizadas para las tareas
-- =====================================================
CREATE TABLE etiquetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  color VARCHAR(7) DEFAULT '#95E1D3',
  usuario_id INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario_etiqueta (usuario_id),
  UNIQUE KEY unique_etiqueta_usuario (nombre, usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: tareas
-- Almacena las tareas de cada usuario
-- =====================================================
CREATE TABLE tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha_limite DATE,
  prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media',
  estado ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente',
  usuario_id INT NOT NULL,
  categoria_id INT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_completada TIMESTAMP NULL,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
  INDEX idx_usuario_tarea (usuario_id),
  INDEX idx_categoria_tarea (categoria_id),
  INDEX idx_estado (estado),
  INDEX idx_prioridad (prioridad),
  INDEX idx_fecha_limite (fecha_limite)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: tareas_etiquetas (Relación muchos a muchos)
-- Relaciona las tareas con sus etiquetas
-- =====================================================
CREATE TABLE tareas_etiquetas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tarea_id INT NOT NULL,
  etiqueta_id INT NOT NULL,
  fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
  FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id) ON DELETE CASCADE,
  UNIQUE KEY unique_tarea_etiqueta (tarea_id, etiqueta_id),
  INDEX idx_tarea (tarea_id),
  INDEX idx_etiqueta (etiqueta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: actividad_usuario
-- Registro de actividad para analytics
-- =====================================================
CREATE TABLE actividad_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo_actividad ENUM('login', 'logout', 'tarea_creada', 'tarea_completada', 'tarea_eliminada') NOT NULL,
  fecha_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  detalles TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario_actividad (usuario_id),
  INDEX idx_tipo_actividad (tipo_actividad),
  INDEX idx_fecha_actividad (fecha_actividad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- DATOS INICIALES DE EJEMPLO
-- =====================================================

-- Insertar usuario de prueba (password: 123456)
-- Nota: En producción, las contraseñas deben estar hasheadas con bcrypt
INSERT INTO usuarios (nombre, email, password) VALUES
('Usuario Demo', 'demo@taskly.com', '$2b$10$rXK5Qy0vHqP5wH6P5wH6P5wH6P5wH6P5wH6P5wH6P5wH6P5wH6P5w');

-- Insertar categorías de ejemplo
INSERT INTO categorias (nombre, color, icono, usuario_id) VALUES
('Personal', '#6C63FF', 'fas fa-user', 1),
('Trabajo', '#F38181', 'fas fa-briefcase', 1),
('Estudios', '#95E1D3', 'fas fa-book', 1),
('Hogar', '#FFD93D', 'fas fa-home', 1);

-- Insertar etiquetas de ejemplo
INSERT INTO etiquetas (nombre, color, usuario_id) VALUES
('Urgente', '#FF6B6B', 1),
('Importante', '#FFA500', 1),
('Revisión', '#4ECDC4', 1),
('En espera', '#95A5A6', 1);

-- Insertar tareas de ejemplo
INSERT INTO tareas (titulo, descripcion, fecha_limite, prioridad, estado, usuario_id, categoria_id) VALUES
('Completar documentación del proyecto', 'Terminar la documentación técnica del sistema Taskly', '2025-11-25', 'alta', 'en_progreso', 1, 2),
('Estudiar React Hooks', 'Repasar useState, useEffect y useContext', '2025-11-22', 'media', 'pendiente', 1, 3),
('Comprar víveres', 'Hacer mercado para la semana', '2025-11-20', 'media', 'pendiente', 1, 4),
('Reunión con el equipo', 'Presentar avances del proyecto Taskly', '2025-11-21', 'alta', 'pendiente', 1, 2),
('Ejercicio diario', 'Hacer rutina de 30 minutos', '2025-11-19', 'baja', 'completada', 1, 1);

-- Relacionar tareas con etiquetas
INSERT INTO tareas_etiquetas (tarea_id, etiqueta_id) VALUES
(1, 1), -- Documentación -> Urgente
(1, 2), -- Documentación -> Importante
(2, 3), -- Estudiar -> Revisión
(4, 1), -- Reunión -> Urgente
(4, 2); -- Reunión -> Importante

-- Insertar actividad de ejemplo
INSERT INTO actividad_usuario (usuario_id, tipo_actividad, detalles) VALUES
(1, 'login', 'Usuario ingresó al sistema'),
(1, 'tarea_creada', 'Tarea: Completar documentación del proyecto'),
(1, 'tarea_completada', 'Tarea: Ejercicio diario');

-- =====================================================
-- VISTAS ÚTILES PARA ANALYTICS
-- =====================================================

-- Vista: Resumen de tareas por usuario
CREATE OR REPLACE VIEW vista_resumen_tareas AS
SELECT 
  u.id AS usuario_id,
  u.nombre AS usuario_nombre,
  COUNT(t.id) AS total_tareas,
  SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END) AS tareas_completadas,
  SUM(CASE WHEN t.estado = 'pendiente' THEN 1 ELSE 0 END) AS tareas_pendientes,
  SUM(CASE WHEN t.estado = 'en_progreso' THEN 1 ELSE 0 END) AS tareas_en_progreso
FROM usuarios u
LEFT JOIN tareas t ON u.id = t.usuario_id
GROUP BY u.id, u.nombre;

-- Vista: Tareas por categoría
CREATE OR REPLACE VIEW vista_tareas_categoria AS
SELECT 
  c.id AS categoria_id,
  c.nombre AS categoria_nombre,
  c.color AS categoria_color,
  COUNT(t.id) AS total_tareas,
  c.usuario_id
FROM categorias c
LEFT JOIN tareas t ON c.id = t.categoria_id
GROUP BY c.id, c.nombre, c.color, c.usuario_id;

-- =====================================================
-- PROCEDIMIENTOS ALMACENADOS
-- =====================================================

DELIMITER //

-- Procedimiento: Obtener estadísticas del usuario
CREATE PROCEDURE sp_estadisticas_usuario(IN p_usuario_id INT)
BEGIN
  SELECT 
    COUNT(*) AS total_tareas,
    SUM(CASE WHEN estado = 'completada' THEN 1 ELSE 0 END) AS completadas,
    SUM(CASE WHEN estado = 'pendiente' THEN 1 ELSE 0 END) AS pendientes,
    SUM(CASE WHEN estado = 'en_progreso' THEN 1 ELSE 0 END) AS en_progreso,
    SUM(CASE WHEN prioridad = 'alta' THEN 1 ELSE 0 END) AS alta_prioridad,
    SUM(CASE WHEN fecha_limite < CURDATE() AND estado != 'completada' THEN 1 ELSE 0 END) AS vencidas
  FROM tareas
  WHERE usuario_id = p_usuario_id;
END //

DELIMITER ;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
