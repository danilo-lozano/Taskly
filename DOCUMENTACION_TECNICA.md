# 📄 Documentación Técnica - Taskly

## 1. Información General del Proyecto

### Nombre del Proyecto
**Taskly - Sistema de Gestión de Tareas**

### URL de Producción
🌐 [https://taskly-phi-nine.vercel.app](https://taskly-phi-nine.vercel.app)

### Repositorio
📦 [https://github.com/danilo-lozano/Taskly](https://github.com/danilo-lozano/Taskly)

---

## 2. Objetivo de la Aplicación

Taskly es una aplicación web completa para la gestión de tareas personales y profesionales que permite a los usuarios:

- **Organizar su trabajo** mediante un sistema de tareas con categorías, etiquetas y prioridades
- **Aumentar su productividad** con un dashboard intuitivo que muestra estadísticas en tiempo real
- **Analizar su desempeño** a través de gráficos y métricas detalladas de productividad
- **Personalizar su experiencia** con categorías y etiquetas customizables con colores e iconos

El objetivo principal es proporcionar una herramienta robusta, segura y fácil de usar que centralice la gestión de tareas y brinde insights sobre la productividad del usuario.

---

## 3. Descripción de Funcionalidades

### 3.1 Autenticación y Seguridad
- **Registro de usuarios** con validación de email único
- **Login seguro** con JWT (JSON Web Tokens)
- **Encriptación de contraseñas** usando bcrypt
- **Protección de rutas** tanto en frontend como backend
- **Validación de sesión** automática al cargar la aplicación
- **Cierre de sesión** con limpieza de tokens

### 3.2 Gestión de Tareas (CRUD Completo)
- **Crear tareas** con título, descripción, fecha límite, prioridad y categoría
- **Visualizar tareas** con filtros por estado, categoría y prioridad
- **Actualizar tareas** incluyendo cambio de estado (pendiente, en progreso, completada)
- **Eliminar tareas** con confirmación
- **Asignar etiquetas** múltiples a cada tarea
- **Estados disponibles:** Pendiente, En Progreso, Completada
- **Prioridades:** Baja, Media, Alta
- **Fechas límite** con visualización clara

### 3.3 Categorías Personalizadas
- **Crear categorías** con nombre personalizado
- **Asignar colores** mediante selector de color hexadecimal
- **Seleccionar iconos** de Font Awesome
- **Editar categorías** existentes
- **Eliminar categorías** (las tareas asociadas quedan sin categoría)
- **Categorías predefinidas:** Personal, Trabajo, Estudios, Hogar

### 3.4 Sistema de Etiquetas
- **Crear etiquetas** personalizadas con nombre y color
- **Asignar múltiples etiquetas** a una tarea
- **Visualización de etiquetas** en formato de badges de colores
- **Gestión completa** (crear, editar, eliminar)

### 3.5 Dashboard Interactivo
- **Estadísticas en tiempo real:**
  - Total de tareas
  - Tareas completadas
  - Tareas pendientes
  - Tareas en progreso
  - Tareas vencidas
- **Tarjetas visuales** con colores distintivos
- **Distribución por estado** con gráficos visuales
- **Listado de tareas** con filtros y búsqueda

### 3.6 Analytics y Reportes
- **Gráfico de distribución por estado** (Pie Chart)
- **Gráfico de tareas por prioridad** (Bar Chart)
- **Gráfico de tareas por categoría** (Bar Chart)
- **Gráfico de productividad semanal** (Line Chart)
- **Métricas de productividad:**
  - Tasa de completitud
  - Promedio de tareas por día
  - Tiempo promedio de completación
- **Visualización interactiva** con Recharts

### 3.7 Perfil de Usuario
- **Visualización de datos personales** (nombre, email, fecha de registro)
- **Carga de foto de perfil** con vista previa
- **Última conexión** registrada
- **Actualización de información** personal

### 3.8 Interfaz de Usuario
- **Diseño responsive** adaptable a móviles, tablets y escritorio
- **Navbar intuitivo** con navegación fluida
- **Colores consistentes** en toda la aplicación
- **Feedback visual** en todas las acciones (loading, success, error)
- **Modales** para confirmaciones y formularios
- **Animaciones suaves** en transiciones

---

## 4. Arquitectura del Sistema

### 4.1 Stack Tecnológico

#### Frontend
```
React 19.0.0          - Biblioteca para interfaces de usuario
React Router DOM 7.0.2 - Navegación y enrutamiento
Vite 6.0.1            - Build tool y dev server
Axios 1.7.9           - Cliente HTTP para APIs
Recharts 2.15.0       - Librería de gráficos
CSS3                  - Estilos personalizados
```

#### Backend
```
Node.js 16+           - Entorno de ejecución JavaScript
Express 4.21.2        - Framework web para APIs REST
MySQL2 3.11.5         - Driver de base de datos
jsonwebtoken 9.0.2    - Autenticación JWT
bcrypt 5.1.1          - Encriptación de contraseñas
cors 2.8.5            - Cross-Origin Resource Sharing
multer 1.4.5-lts.1    - Manejo de archivos
dotenv 16.4.7         - Variables de entorno
```

#### Base de Datos
```
MySQL 8+              - Sistema de gestión de BD relacional
```

#### Deployment
```
Vercel                - Hosting del frontend
Railway               - Hosting del backend y base de datos
GitHub                - Control de versiones
Nixpacks              - Sistema de empaquetado para Railway
```

### 4.2 Estructura de la Base de Datos

```sql
usuarios
├── id (PK)
├── nombre
├── email (UNIQUE)
├── password (HASH)
├── foto_perfil
├── fecha_registro
└── ultima_conexion

categorias
├── id (PK)
├── nombre
├── color
├── icono
├── usuario_id (FK)
└── fecha_creacion

etiquetas
├── id (PK)
├── nombre
├── color
├── usuario_id (FK)
└── fecha_creacion

tareas
├── id (PK)
├── titulo
├── descripcion
├── fecha_limite
├── prioridad (ENUM)
├── estado (ENUM)
├── usuario_id (FK)
├── categoria_id (FK)
├── fecha_creacion
├── fecha_completada
└── fecha_actualizacion

tareas_etiquetas (Tabla intermedia)
├── id (PK)
├── tarea_id (FK)
└── etiqueta_id (FK)

actividad_usuario
├── id (PK)
├── usuario_id (FK)
├── tipo_actividad (ENUM)
├── fecha_actividad
└── detalles
```

### 4.3 API Endpoints

#### Autenticación
```
POST   /api/auth/registro      - Registrar nuevo usuario
POST   /api/auth/login         - Iniciar sesión
GET    /api/auth/perfil        - Obtener perfil del usuario
PUT    /api/auth/perfil        - Actualizar perfil
POST   /api/auth/perfil/foto   - Subir foto de perfil
```

#### Tareas
```
GET    /api/tareas             - Listar todas las tareas del usuario
POST   /api/tareas             - Crear nueva tarea
GET    /api/tareas/:id         - Obtener tarea específica
PUT    /api/tareas/:id         - Actualizar tarea
DELETE /api/tareas/:id         - Eliminar tarea
```

#### Categorías
```
GET    /api/categorias         - Listar categorías del usuario
POST   /api/categorias         - Crear categoría
PUT    /api/categorias/:id     - Actualizar categoría
DELETE /api/categorias/:id     - Eliminar categoría
```

#### Etiquetas
```
GET    /api/etiquetas          - Listar etiquetas del usuario
POST   /api/etiquetas          - Crear etiqueta
PUT    /api/etiquetas/:id      - Actualizar etiqueta
DELETE /api/etiquetas/:id      - Eliminar etiqueta
```

#### Analytics
```
GET    /api/analytics/estadisticas           - Estadísticas generales
GET    /api/analytics/distribucion-estado    - Tareas por estado
GET    /api/analytics/distribucion-prioridad - Tareas por prioridad
GET    /api/analytics/distribucion-categoria - Tareas por categoría
GET    /api/analytics/productividad-semanal  - Productividad de 7 días
```

---

## 5. Librerías y Dependencias Utilizadas

### 5.1 Dependencias del Frontend

#### React y Ecosystem
- **react (19.0.0)**: Biblioteca principal para construir interfaces de usuario basadas en componentes
- **react-dom (19.0.0)**: Punto de entrada al DOM y renderizado del servidor
- **react-router-dom (7.0.2)**: Enrutamiento declarativo para aplicaciones React, permite navegación entre páginas

#### Comunicación HTTP
- **axios (1.7.9)**: Cliente HTTP basado en promesas para hacer peticiones al backend, maneja interceptores y headers

#### Visualización de Datos
- **recharts (2.15.0)**: Librería de gráficos construida con componentes React, usada para crear gráficos de barras, líneas y pie charts en analytics

#### Herramientas de Desarrollo
- **vite (6.0.1)**: Build tool moderno, extremadamente rápido para desarrollo y producción
- **@vitejs/plugin-react (4.3.4)**: Plugin oficial de Vite para Fast Refresh de React
- **eslint (9.17.0)**: Linter para mantener código JavaScript consistente y sin errores

### 5.2 Dependencias del Backend

#### Framework y Servidor
- **express (4.21.2)**: Framework web minimalista para Node.js, maneja rutas, middleware y peticiones HTTP

#### Base de Datos
- **mysql2 (3.11.5)**: Cliente MySQL rápido y moderno con soporte para promesas, usado para todas las operaciones de base de datos

#### Seguridad y Autenticación
- **jsonwebtoken (9.0.2)**: Implementación de JWT para crear y verificar tokens de autenticación
- **bcrypt (5.1.1)**: Librería para hashear contraseñas usando el algoritmo bcrypt, más seguro que MD5 o SHA
- **cors (2.8.5)**: Middleware para habilitar CORS (Cross-Origin Resource Sharing), permite que el frontend se comunique con el backend

#### Manejo de Archivos
- **multer (1.4.5-lts.1)**: Middleware para manejar multipart/form-data, usado para subir fotos de perfil

#### Configuración
- **dotenv (16.4.7)**: Carga variables de entorno desde archivo .env para configuración segura

---

## 6. Dificultades Encontradas y Soluciones

### 6.1 Problema de Seguridad: Bypass de Autenticación

**Dificultad:** Al acceder a la URL raíz (`/`), la aplicación redirigía directamente al dashboard sin verificar si el usuario estaba autenticado, permitiendo acceso no autorizado.

**Causa:** La ruta raíz estaba configurada para redirigir a `/dashboard` sin pasar por el componente `PrivateRoute`.

**Solución Implementada:**
1. Cambiar la redirección de `/` para que apunte a `/login` en lugar de `/dashboard`
2. Agregar validación de token en `AuthContext` al cargar la aplicación
3. Implementar un estado de carga (`cargando`) para evitar renderizado prematuro
4. Modificar `Login.jsx` y `Registro.jsx` para verificar autenticación antes de redirigir

**Código corregido en App.jsx:**
```javascript
<Route path="/" element={<Navigate to="/login" replace />} />
```

### 6.2 Inconsistencia en Colores de la UI

**Dificultad:** El Dashboard y Analytics usaban diferentes colores para representar los mismos estados y prioridades, causando confusión.

**Causa:** Colores hardcodeados en diferentes componentes sin una fuente única de verdad.

**Solución Implementada:**
1. Crear funciones centralizadas `colorEstado()`, `colorPrioridad()`, `colorCategoria()` en `helpers.js`
2. Importar y usar estas funciones en todos los componentes que necesiten colores
3. Unificar la paleta de colores:
   - Pendiente: #6B7280 (gris)
   - En Progreso: #D97706 (naranja)
   - Completada: #16A34A (verde)
   - Alta: #DC2626 (rojo)
   - Media: #EA580C (naranja)
   - Baja: #0891B2 (cyan)

### 6.3 Color Predeterminado de Categoría "Personal"

**Dificultad:** La categoría "Personal" tenía un color morado (#6C63FF) que no coincidía con el nuevo esquema de colores.

**Solución Implementada:**
1. Modificar `authController.js` para usar #EC4899 (rosa/pink) en nuevos registros
2. Crear script `update_color.js` para actualizar registros existentes en la base de datos
3. Ejecutar el script en desarrollo para migrar datos

### 6.4 Despliegue en Railway: Detección de Node.js

**Dificultad:** Railway no detectaba que era un proyecto Node.js y fallaba al intentar instalar dependencias con npm.

**Error:** `npm: command not found`

**Causa:** La configuración de Nixpacks no incluía Node.js en los paquetes.

**Solución Implementada:**
1. Crear archivo `nixpacks.toml` con configuración explícita:
```toml
[phases.setup]
nixPkgs = ['nodejs_20']

[phases.install]
cmds = ['cd backend && npm install']

[start]
cmd = 'cd backend && node server.js'
```
2. Crear `railway.json` para configurar el despliegue
3. Especificar el directorio raíz como `backend`

### 6.5 Estructura del Proyecto con Frontend y Backend

**Dificultad:** El proyecto tiene dos carpetas separadas (frontend y backend) cada una con su propio `package.json`, lo que complicó el despliegue.

**Solución Implementada:**
- **Vercel:** Configurar Root Directory como `frontend`
- **Railway:** Usar `cd backend` en todos los comandos del `nixpacks.toml`
- Mantener `railway.json` en la raíz del proyecto

### 6.6 Configuración de CORS en Producción

**Dificultad:** El frontend en Vercel no podía comunicarse con el backend en Railway por políticas CORS.

**Solución Implementada:**
1. Configurar CORS dinámico en `server.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
```
2. Agregar variable de entorno `FRONTEND_URL` en Railway con la URL de Vercel
3. Actualizar `FRONTEND_URL` después de obtener la URL definitiva de Vercel

### 6.7 Variables de Entorno en Producción

**Dificultad:** Gestionar múltiples variables de entorno entre desarrollo local y producción.

**Solución Implementada:**
1. Crear archivos `.env.example` tanto en frontend como backend
2. Documentar todas las variables necesarias
3. Configurar variables en Railway:
   - Credenciales de base de datos (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)
   - Configuración del servidor (PORT, NODE_ENV)
   - Seguridad (JWT_SECRET)
   - Frontend (FRONTEND_URL)
4. Configurar variables en Vercel:
   - URL del backend (VITE_API_URL)

### 6.8 Conexión a Base de Datos MySQL de Railway

**Dificultad:** Dificultad para conectarse a la base de datos MySQL de Railway usando TablePlus para ejecutar el schema.

**Problema:** El error "Failed to open the referenced table 'usuarios'" al intentar ejecutar todas las sentencias CREATE TABLE juntas.

**Solución Implementada:**
1. Parsear correctamente la URL de conexión MySQL separando host, puerto, usuario, contraseña y base de datos
2. Ejecutar las sentencias CREATE TABLE de forma individual en lugar de todas juntas
3. Omitir las sentencias `CREATE DATABASE` y `USE` ya que Railway pre-crea la base de datos
4. Refrescar TablePlus después de crear cada tabla

---

## 7. Aprendizajes Obtenidos

### 7.1 Seguridad en Aplicaciones Web

**Aprendizajes:**
- La importancia de **validar autenticación en múltiples capas**: frontend (rutas protegidas), backend (middleware), y al cargar la aplicación
- **Nunca confiar en el frontend**: siempre validar tokens en el servidor
- Implementar **estados de carga** para evitar renderizado prematuro que pueda exponer información
- El uso de **bcrypt** para hashear contraseñas es esencial (nunca almacenar passwords en texto plano)
- Los **JWT tokens** deben tener expiración y ser validados en cada petición

### 7.2 Gestión de Estado Global en React

**Aprendizajes:**
- El patrón **Context API** es efectivo para compartir estado de autenticación entre componentes
- Crear **hooks personalizados** (`useAuth`) mejora la reutilización y legibilidad del código
- Es crucial manejar **estados de carga** (`cargando`) para evitar comportamientos inesperados durante llamadas asíncronas
- La limpieza de estado (`localStorage.clear()`) es importante al cerrar sesión

### 7.3 Consistencia en el Diseño de UI

**Aprendizajes:**
- Centralizar **funciones de utilidad** (como colores) en un solo lugar evita inconsistencias
- Mantener una **paleta de colores definida** mejora la experiencia de usuario
- Documentar las decisiones de diseño ayuda al mantenimiento
- La **coherencia visual** aumenta la profesionalidad del producto

### 7.4 Arquitectura de APIs REST

**Aprendizajes:**
- Separar rutas por **dominio** (auth, tareas, categorías, etc.) mejora la organización
- Usar **middleware** para validaciones y autenticación mantiene el código DRY
- Implementar **códigos de estado HTTP** apropiados facilita el debugging
- Las **respuestas consistentes** (siempre con estructura similar) simplifican el frontend

### 7.5 Manejo de Bases de Datos Relacionales

**Aprendizajes:**
- El diseño de **relaciones** (1:N, N:M) debe planificarse desde el inicio
- Usar **foreign keys** con `ON DELETE CASCADE` o `SET NULL` previene datos huérfanos
- Los **índices** en columnas frecuentemente consultadas mejoran el rendimiento
- Las **transacciones** son importantes para operaciones que afectan múltiples tablas

### 7.6 Despliegue en la Nube

**Aprendizajes:**
- **Separar frontend y backend** en diferentes plataformas (Vercel + Railway) es una práctica común y efectiva
- Las plataformas modernas (Vercel, Railway) simplifican el despliegue pero requieren **configuración específica**
- Entender cómo funcionan los **build tools** (Nixpacks, Vite) es crucial para resolver errores de despliegue
- Las **variables de entorno** deben gestionarse cuidadosamente entre desarrollo y producción
- Configurar correctamente **CORS** es esencial para aplicaciones distribuidas

### 7.7 Git y Control de Versiones

**Aprendizajes:**
- Hacer **commits frecuentes** con mensajes descriptivos facilita el debugging
- Usar **.gitignore** para excluir archivos sensibles (.env, node_modules) es fundamental
- Los archivos **.example** son útiles para documentar configuración sin exponer datos sensibles
- **GitHub** como repositorio remoto permite despliegue continuo (CD) con Vercel y Railway

### 7.8 Debugging y Resolución de Problemas

**Aprendizajes:**
- Leer **logs de error** cuidadosamente proporciona pistas valiosas
- **Aislar el problema** (¿es frontend o backend?) acelera la solución
- Probar en **múltiples entornos** (local, staging, producción) ayuda a identificar problemas específicos del ambiente
- Las **herramientas de desarrollo** (DevTools, Railway Logs, Vercel Logs) son esenciales
- **Buscar en documentación oficial** antes que en fuentes de terceros

### 7.9 Trabajo con Archivos Multimedia

**Aprendizajes:**
- **Multer** es la solución estándar para manejar uploads en Express
- Es importante **validar tipos de archivo** y **tamaño** en el servidor
- Almacenar archivos en el **servidor vs. cloud storage** tiene pros y contras
- Generar **nombres únicos** para archivos previene sobrescrituras

### 7.10 Performance y Optimización

**Aprendizajes:**
- **Vite** es significativamente más rápido que Webpack para desarrollo
- Usar **React.memo** y **useMemo** puede optimizar re-renders
- Las **consultas SQL optimizadas** (con JOINs eficientes) mejoran tiempos de respuesta
- **Lazy loading** de componentes reduce el bundle inicial

### 7.11 Experiencia de Usuario (UX)

**Aprendizajes:**
- Proporcionar **feedback visual** (loading, success, error) mejora la percepción de calidad
- El **diseño responsive** no es opcional en aplicaciones modernas
- Las **animaciones sutiles** mejoran la experiencia sin distraer
- La **consistencia** en colores, tipografía y espaciado es crucial

### 7.12 Documentación Técnica

**Aprendizajes:**
- La documentación debe escribirse **mientras se desarrolla**, no al final
- Un buen **README.md** facilita que otros (o uno mismo en el futuro) entiendan el proyecto
- Documentar **decisiones de diseño** y **problemas resueltos** tiene valor educativo
- Los **diagramas** y **ejemplos de código** hacen la documentación más accesible

---

## 8. Conclusiones

El desarrollo de Taskly fue un proyecto integral que abarcó todos los aspectos del desarrollo web full-stack moderno. Las principales conclusiones son:

### 8.1 Técnicas
- La arquitectura **cliente-servidor separada** permite escalabilidad independiente
- El uso de **tecnologías modernas** (React 19, Vite, Express) acelera el desarrollo
- La **seguridad** debe considerarse desde el inicio, no como agregado posterior
- Las **buenas prácticas** (separación de concerns, código limpio) pagan dividendos a largo plazo

### 8.2 Proceso
- El **desarrollo iterativo** con feedback constante mejora el resultado final
- Encontrar y resolver **problemas** es una parte natural del proceso
- La **documentación continua** facilita el mantenimiento
- El **testing manual** en múltiples escenarios previene bugs en producción

### 8.3 Competencias Desarrolladas
- **Frontend:** React, gestión de estado, routing, consumo de APIs
- **Backend:** Node.js, Express, APIs REST, autenticación JWT
- **Base de Datos:** MySQL, diseño de schemas, relaciones, queries
- **DevOps:** Despliegue en cloud, variables de entorno, CI/CD básico
- **Seguridad:** Hashing, tokens, CORS, validaciones
- **UI/UX:** Diseño responsive, feedback visual, consistencia

### 8.4 Próximos Pasos Sugeridos
Para mejorar aún más el proyecto, se podrían implementar:
- Tests unitarios y de integración (Jest, React Testing Library)
- Notificaciones push para tareas próximas a vencer
- Colaboración entre usuarios (tareas compartidas)
- Exportación de reportes en PDF
- Modo oscuro (dark mode)
- Internacionalización (i18n)
- PWA (Progressive Web App) para uso offline
- Integración con calendarios (Google Calendar, Outlook)

---

**Documento elaborado por:** Danilo Lozano  
**Fecha:** 19 de Noviembre, 2025  
**Versión del Proyecto:** 1.0.0  
**Aplicación en Producción:** [https://taskly-phi-nine.vercel.app](https://taskly-phi-nine.vercel.app)
