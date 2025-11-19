# 🚀 GUÍA DE INICIO RÁPIDO - TASKLY

## Para Principiantes - Pasos Simplificados

### 1. INSTALAR XAMPP (Si no lo tienes)
1. Descargar XAMPP desde: https://www.apachefriends.org/
2. Instalar y abrir el Panel de Control de XAMPP
3. Iniciar Apache y MySQL

### 2. CREAR LA BASE DE DATOS
1. Abrir navegador y visitar: http://localhost/phpmyadmin
2. Clic en "Nueva" en el panel izquierdo
3. Nombre: `taskly_db`
4. Clic en "Crear"
5. Clic en "Importar" en el menú superior
6. Seleccionar el archivo: `Taskly/database/schema.sql`
7. Clic en "Continuar"

### 3. INSTALAR DEPENDENCIAS

**Terminal 1 - Backend:**
\`\`\`
cd Taskly/backend
npm install
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`
cd Taskly/frontend
npm install
\`\`\`

### 4. INICIAR EL PROYECTO

**Terminal 1 - Backend:**
\`\`\`
cd Taskly/backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`
cd Taskly/frontend
npm run dev
\`\`\`

### 5. ABRIR EN EL NAVEGADOR
Ir a: http://localhost:5173

---

## ✅ Verificación

Si todo está bien, deberías ver:

**Terminal Backend:**
\`\`\`
🚀 Servidor Taskly iniciado
📍 Puerto: 3000
✅ Conexión a MySQL exitosa
\`\`\`

**Terminal Frontend:**
\`\`\`
Local: http://localhost:5173/
\`\`\`

---

## 🆘 Problemas Comunes

### Error: "Cannot connect to MySQL"
- ✅ Verifica que MySQL esté corriendo en XAMPP
- ✅ Verifica que la base de datos `taskly_db` exista

### Error: "Port 3000 already in use"
- ✅ Cierra otras aplicaciones que usen el puerto 3000
- ✅ O cambia el puerto en `backend/.env`

### Error: "npm no se reconoce"
- ✅ Instala Node.js desde: https://nodejs.org/

### No aparece la página
- ✅ Verifica que ambos servidores (backend y frontend) estén corriendo
- ✅ Verifica la URL: http://localhost:5173

---

## 📝 Primera Vez

1. Crea una cuenta en el botón "Crear cuenta"
2. Llena los datos y registra
3. Inicia sesión con tu email y contraseña
4. ¡Empieza a crear tareas!

---

## 🎯 Funcionalidades Principales

### Dashboard
- Ver todas tus tareas
- Crear nueva tarea (botón "Nueva Tarea")
- Editar o eliminar tareas
- Filtrar por estado
- Cambiar estado de las tareas

### Analytics
- Ver gráficos de tus tareas
- Estadísticas de productividad
- Análisis por categoría

### Perfil
- Actualizar información personal
- Cambiar foto de perfil
- Cambiar contraseña

---

## 🔧 Configuración Opcional

### Cambiar Puerto del Backend
Edita `backend/.env`:
\`\`\`
PORT=3001
\`\`\`

### Cambiar Puerto del Frontend
Edita `frontend/vite.config.js`:
\`\`\`javascript
export default defineConfig({
  server: {
    port: 5174
  }
})
\`\`\`

---

## 📞 Ayuda

Si tienes problemas:
1. Lee el README.md completo
2. Verifica la sección "Solución de Problemas"
3. Revisa los logs en las terminales

---

**¡Listo! Ya puedes usar Taskly** 🎉
