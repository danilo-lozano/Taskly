# 📋 TASKLY - Sistema de Gestión de Tareas

Sistema completo de gestión de tareas desarrollado con Node.js, Express, React, Vite y MySQL. Incluye autenticación, CRUD completo, analytics y perfil de usuario.

**🌐 Ver aplicación en producción:** [https://taskly-phi-nine.vercel.app](https://taskly-phi-nine.vercel.app)

![Taskly](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![React](https://img.shields.io/badge/react-19.2.0-blue)

---

## 📑 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Despliegue](#despliegue)
- [Solución de Problemas](#solución-de-problemas)

---

## ✨ Características

### Funcionalidades Principales
- ✅ **Autenticación completa** (Registro, Login, JWT)
- ✅ **CRUD de Tareas** (Crear, Leer, Actualizar, Eliminar)
- ✅ **Categorías personalizables** con colores e iconos
- ✅ **Etiquetas** para organizar tareas
- ✅ **Dashboard** con estadísticas en tiempo real
- ✅ **Analytics** con gráficos y métricas de productividad
- ✅ **Perfil de usuario** con carga de foto
- ✅ **Filtros avanzados** por estado, categoría y prioridad
- ✅ **Responsive design** (móvil y escritorio)
- ✅ **Validaciones** frontend y backend

### Tecnologías Utilizadas

#### Backend
- Node.js (v16+)
- Express.js
- MySQL2
- JWT para autenticación
- Bcrypt para encriptación
- Multer para carga de archivos
- Express-validator para validaciones

#### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Chart.js para gráficos
- SweetAlert2 para notificaciones
- React Icons

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 16 o superior)
   - Descargar desde: https://nodejs.org/
   - Verificar instalación: `node --version`

2. **npm** (viene con Node.js)
   - Verificar instalación: `npm --version`

3. **MySQL** (versión 8.0 o superior)
   - Descargar desde: https://dev.mysql.com/downloads/mysql/
   - O usar XAMPP: https://www.apachefriends.org/

4. **Git** (opcional, para clonar el proyecto)
   - Descargar desde: https://git-scm.com/

---

## 🚀 Instalación

### Paso 1: Descargar el Proyecto

Si tienes Git instalado:
\`\`\`bash
git clone <url-del-repositorio>
cd Taskly
\`\`\`

O descarga el archivo ZIP y extráelo en tu computadora.

### Paso 2: Configurar la Base de Datos

1. **Iniciar MySQL**
   - Si usas XAMPP: Inicia Apache y MySQL desde el panel de control
   - Si usas MySQL directamente: Inicia el servicio MySQL

2. **Crear la base de datos**
   - Abre tu cliente MySQL (phpMyAdmin, MySQL Workbench, o terminal)
   - Ejecuta el archivo `database/schema.sql`

   **Usando terminal:**
   \`\`\`bash
   mysql -u root -p < database/schema.sql
   \`\`\`

   **Usando phpMyAdmin:**
   - Abre phpMyAdmin (http://localhost/phpmyadmin)
   - Clic en "Importar"
   - Selecciona el archivo `database/schema.sql`
   - Clic en "Continuar"

3. **Verificar la instalación**
   - La base de datos `taskly_db` debe estar creada
   - Deben existir las tablas: usuarios, tareas, categorias, etiquetas, tareas_etiquetas, actividad_usuario

### Paso 3: Instalar Dependencias del Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Esto instalará:
- express
- mysql2
- cors
- dotenv
- bcrypt
- jsonwebtoken
- multer
- express-validator

### Paso 4: Instalar Dependencias del Frontend

\`\`\`bash
cd ../frontend
npm install
\`\`\`

Esto instalará:
- react
- react-dom
- react-router-dom
- axios
- chart.js
- react-chartjs-2
- react-icons
- sweetalert2
- date-fns

---

## ⚙️ Configuración

### Configuración del Backend

1. **Archivo `.env`**

El archivo `backend/.env` ya está configurado con valores por defecto:

\`\`\`env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taskly_db
DB_PORT=3306
JWT_SECRET=taskly_super_secret_key_2025
NODE_ENV=development
\`\`\`

**Modifica estos valores según tu configuración:**

- `DB_USER`: Tu usuario de MySQL (por defecto: root)
- `DB_PASSWORD`: Tu contraseña de MySQL (vacío por defecto en XAMPP)
- `DB_NAME`: Nombre de la base de datos (taskly_db)
- `JWT_SECRET`: Cambia esto en producción por una clave secreta única

### Configuración del Frontend

1. **Archivo `.env`**

El archivo `frontend/.env` ya está configurado:

\`\`\`env
VITE_API_URL=http://localhost:3000/api
\`\`\`

Si cambias el puerto del backend, actualiza esta URL.

---

## 🎮 Ejecución

### Modo Desarrollo (Recomendado para principiantes)

Necesitarás **2 terminales abiertas** (una para backend, otra para frontend).

#### Terminal 1 - Backend

\`\`\`bash
cd backend
npm run dev
\`\`\`

Deberías ver:
\`\`\`
=================================
🚀 Servidor Taskly iniciado
📍 Puerto: 3000
🌐 URL: http://localhost:3000/api
🔧 Entorno: development
=================================
✅ Conexión a MySQL exitosa
\`\`\`

#### Terminal 2 - Frontend

\`\`\`bash
cd frontend
npm run dev
\`\`\`

Deberías ver:
\`\`\`
  VITE v7.2.2  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
\`\`\`

### Acceder a la Aplicación

1. Abre tu navegador
2. Ve a: **http://localhost:5173**
3. Verás la página de login de Taskly

### Usuario de Prueba

Puedes crear una nueva cuenta o usar el usuario de ejemplo (si ejecutaste el schema.sql completo):
- **Email:** demo@taskly.com
- **Password:** 123456

---

## 📁 Estructura del Proyecto

\`\`\`
Taskly/
│
├── backend/                    # Servidor Node.js + Express
│   ├── config/
│   │   └── database.js        # Configuración de MySQL
│   ├── controllers/           # Lógica de negocio
│   │   ├── authController.js
│   │   ├── tareaController.js
│   │   ├── categoriaController.js
│   │   ├── etiquetaController.js
│   │   └── analyticsController.js
│   ├── middleware/            # Middlewares
│   │   ├── auth.js           # Verificación JWT
│   │   └── upload.js         # Carga de archivos
│   ├── models/                # Modelos de datos
│   │   ├── Usuario.js
│   │   ├── Tarea.js
│   │   ├── Categoria.js
│   │   ├── Etiqueta.js
│   │   └── Actividad.js
│   ├── routes/                # Rutas de la API
│   │   ├── auth.js
│   │   ├── tareas.js
│   │   ├── categorias.js
│   │   ├── etiquetas.js
│   │   └── analytics.js
│   ├── uploads/               # Archivos subidos
│   ├── .env                   # Variables de entorno
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Punto de entrada
│
├── frontend/                   # Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/           # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Páginas principales
│   │   │   ├── Login.jsx
│   │   │   ├── Registro.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Perfil.jsx
│   │   │   └── Analytics.jsx
│   │   ├── services/          # Llamadas a la API
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── tareaService.js
│   │   │   ├── categoriaService.js
│   │   │   ├── etiquetaService.js
│   │   │   └── analyticsService.js
│   │   ├── utils/             # Utilidades
│   │   │   └── helpers.js
│   │   ├── App.jsx            # Componente principal
│   │   ├── App.css
│   │   ├── index.css          # Estilos globales
│   │   └── main.jsx           # Punto de entrada
│   ├── .env                   # Variables de entorno
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql             # Script de base de datos
│
├── public/
│   └── images/                # Imágenes del proyecto
│
├── index.html                 # Landing page
└── README.md                  # Este archivo
\`\`\`

---

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/registrar` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/perfil` - Obtener perfil (requiere auth)
- `PUT /api/auth/perfil` - Actualizar perfil (requiere auth)
- `PUT /api/auth/cambiar-password` - Cambiar contraseña (requiere auth)

### Tareas
- `GET /api/tareas` - Obtener todas las tareas
- `GET /api/tareas/:id` - Obtener una tarea
- `POST /api/tareas` - Crear tarea
- `PUT /api/tareas/:id` - Actualizar tarea
- `PATCH /api/tareas/:id/estado` - Cambiar estado
- `DELETE /api/tareas/:id` - Eliminar tarea
- `GET /api/tareas/estado/:estado` - Filtrar por estado
- `GET /api/tareas/categoria/:categoriaId` - Filtrar por categoría

### Categorías
- `GET /api/categorias` - Obtener todas
- `POST /api/categorias` - Crear categoría
- `PUT /api/categorias/:id` - Actualizar
- `DELETE /api/categorias/:id` - Eliminar

### Etiquetas
- `GET /api/etiquetas` - Obtener todas
- `POST /api/etiquetas` - Crear etiqueta
- `PUT /api/etiquetas/:id` - Actualizar
- `DELETE /api/etiquetas/:id` - Eliminar

### Analytics
- `GET /api/analytics/dashboard` - Resumen completo
- `GET /api/analytics/estadisticas` - Estadísticas generales
- `GET /api/analytics/tareas-categoria` - Tareas por categoría
- `GET /api/analytics/tareas-estado` - Tareas por estado
- `GET /api/analytics/productividad-semanal` - Productividad semanal

---

## 🌐 Despliegue

### ✅ Aplicación en Producción

**La aplicación está desplegada y funcionando:**

- **🌐 Frontend:** https://taskly-phi-nine.vercel.app
- **⚙️ Backend:** https://taskly-production-8a47.up.railway.app
- **🗄️ Base de Datos:** MySQL 8+ en Railway

### Arquitectura Cloud

```
Frontend (Vercel) → Backend (Railway) → MySQL (Railway)
```

### Cómo Fue Desplegado

#### Frontend en Vercel
1. Repositorio conectado desde GitHub
2. Configuración:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Variable de entorno: `VITE_API_URL=https://taskly-production-8a47.up.railway.app/api`
4. Deploy automático con cada push a `main`

#### Backend en Railway
1. Servicio MySQL agregado
2. Repositorio conectado desde GitHub
3. Configuración: `railway.json` + `nixpacks.toml`
4. Variables de entorno configuradas (DB, JWT, CORS)
5. Dominio público generado automáticamente
6. Deploy automático con cada push a `main`

### Desarrollo Local

Para ejecutar el proyecto localmente:

**Requisitos:** Node.js 16+, MySQL 8+

1. Clonar repositorio y configurar base de datos (`database/schema.sql`)
2. Crear archivos `.env` (ver `.env.example`)
3. Instalar dependencias: `npm install` en `backend/` y `frontend/`
4. Ejecutar: `npm run dev` en ambas carpetas

📖 Más detalles en [DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md)

---

## 🐛 Solución de Problemas

### El backend no inicia

**Error: "Cannot connect to MySQL"**
- Verifica que MySQL esté corriendo
- Revisa las credenciales en `.env`
- Asegúrate que la base de datos `taskly_db` existe

**Error: "Port 3000 already in use"**
- Cambia el puerto en `backend/.env`
- O cierra la aplicación que usa el puerto 3000

### El frontend no se conecta al backend

**Error: "Network Error" o "CORS error"**
- Verifica que el backend esté corriendo
- Revisa la URL en `frontend/.env`
- Asegúrate que CORS está habilitado en el backend

### No aparecen los estilos

- Ejecuta `npm install` en la carpeta frontend
- Verifica que el archivo `index.css` existe
- Limpia caché del navegador (Ctrl + F5)

### La base de datos está vacía

- Ejecuta nuevamente `database/schema.sql`
- Verifica que estés conectado a la base de datos correcta
- Revisa los logs de MySQL para errores

---

## 📧 Contacto y Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Solución de Problemas](#solución-de-problemas)
2. Verifica que todos los pasos de instalación se hayan completado
3. Revisa los logs en las terminales del backend y frontend

---

## 📝 Notas Adicionales

### Seguridad
- **En producción**, cambia `JWT_SECRET` por una clave segura
- Nunca subas el archivo `.env` a repositorios públicos
- Usa HTTPS en producción

### Performance
- El proyecto está optimizado para desarrollo
- Para producción, considera usar PM2 para el backend
- Habilita compresión gzip en tu servidor

### Actualización
- Mantén actualizadas las dependencias: `npm update`
- Revisa vulnerabilidades: `npm audit`

---

## 🎉 ¡Proyecto Listo!

Si seguiste todos los pasos correctamente, deberías tener:

✅ Backend funcionando en http://localhost:3000  
✅ Frontend funcionando en http://localhost:5173  
✅ Base de datos MySQL configurada  
✅ Sistema completo de gestión de tareas operativo  

¡Felicitaciones! Ahora puedes empezar a usar Taskly para organizar tus tareas.

---

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2025
