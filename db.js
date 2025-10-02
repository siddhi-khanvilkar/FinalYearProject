

const mysql = require('mysql');

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
  });

  db.connect(err => {
    if (err) {
      console.error('❌ Error connecting to DB:', err);
      setTimeout(handleDisconnect, 2000); // Retry after 2s
    } else {
      console.log('✅ Connected to MySQL DB');
    }
  });

  db.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.warn('⚠️ Connection lost. Reconnecting...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
