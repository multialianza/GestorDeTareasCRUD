// app.js
// CRUD Gestor de Tareas usando PostgreSQL

const pool = require('./db/pool');

/////////////////////////////////////////////////////////
// 1. INSERTAR TAREA
/////////////////////////////////////////////////////////

// Función para insertar tarea
async function insertarTarea(titulo, descripcion) {
  try {
    const consulta = `
      INSERT INTO tareas (titulo, descripcion)
      VALUES ($1, $2)
    `;
    const valores = [titulo, descripcion];

    const resultado = await pool.query(consulta, valores);

    console.log(`✅ Tarea "${titulo}" insertada. Filas afectadas: ${resultado.rowCount}`);

  } catch (error) {
    console.error("❌ Error al insertar tarea:", error.message);
  }
}

/////////////////////////////////////////////////////////
// 2. ACTUALIZAR TAREA
/////////////////////////////////////////////////////////

async function actualizarTarea(id, nuevoTitulo, nuevaDescripcion) {
  try {
    const consulta = `
      UPDATE tareas
      SET titulo = $1, descripcion = $2
      WHERE id = $3
    `;
    const valores = [nuevoTitulo, nuevaDescripcion, id];

    const resultado = await pool.query(consulta, valores);

    if (resultado.rowCount === 0) {
      console.log(`⚠️ No existe tarea con ID ${id}`);
    } else {
      console.log(`✅ Tarea ID ${id} actualizada. Filas afectadas: ${resultado.rowCount}`);
    }

  } catch (error) {
    console.error("❌ Error al actualizar tarea:", error.message);
  }
}

/////////////////////////////////////////////////////////
// 3. ELIMINAR TAREA
/////////////////////////////////////////////////////////

async function eliminarTarea(id) {
  try {
    const consulta = `
      DELETE FROM tareas
      WHERE id = $1
    `;
    const valores = [id];

    const resultado = await pool.query(consulta, valores);

    if (resultado.rowCount === 0) {
      console.log(`⚠️ No existe tarea con ID ${id}`);
    } else {
      console.log(`🗑️ Tarea ID ${id} eliminada. Filas afectadas: ${resultado.rowCount}`);
    }

  } catch (error) {
    console.error("❌ Error al eliminar tarea:", error.message);
  }
}

/////////////////////////////////////////////////////////
// FUNCIÓN PRINCIPAL PARA PROBAR
/////////////////////////////////////////////////////////

async function main() {
  await insertarTarea('Nueva Tarea', 'Descripción de la nueva tarea.');

  await actualizarTarea(
    1,
    'Aprender PostgreSQL',
    'Completar todos los ejercicios de base de datos.'
  );

  await eliminarTarea(2);

  process.exit(); // Terminar programa
}

main();