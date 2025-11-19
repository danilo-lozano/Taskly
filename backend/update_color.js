const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'taskly_db'
    });
    
    await conn.execute(
      'UPDATE categorias SET color = ? WHERE nombre = ?',
      ['#EC4899', 'Personal']
    );
    
    console.log('✅ Color actualizado exitosamente');
    await conn.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
