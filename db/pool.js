// pool.js
// Este archivo crea el pool de conexión a PostgreSQL

require('dotenv').config();
const { Pool } = require('pg');

// Creamos pool usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Probamos conexión
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error conexión:", err));

module.exports = pool;