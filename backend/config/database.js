const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskly_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convertir a promesas para usar async/await
const promisePool = pool.promise();

// Probar la conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    return;
  }
  console.log('✅ Conexión a MySQL exitosa');
  connection.release();
});

module.exports = promisePool;
