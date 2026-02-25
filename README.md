# GestorDeTareasCRUD
🛠️E3-M7 Ejercicio
Gestor de Tareas CRUD 🛠️
Objetivo: Desarrollar un conjunto de funciones para manipular registros en una base de datos. Implementarás las operaciones de Crear (INSERT), Actualizar (UPDATE) y Borrar (DELETE), utilizando consultas parametrizadas para garantizar la seguridad y manejando la respuesta de la base de datos para confirmar que las operaciones fueron exitosas.

Prerrequisitos:

Tener tu conexión a la base de datos configurada (pool).

Necesitas una tabla tareas. Conéctate a tu base de datos y ejecuta la siguiente sentencia SQL para crearla:

-- Crear la tabla de tareas
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    completada BOOLEAN DEFAULT FALSE
);

-- Insertar una tarea inicial de ejemplo
INSERT INTO tareas (titulo, descripcion) VALUES
('Aprender Node.js', 'Completar los ejercicios de la guía.');

 
Instrucciones:

Crea un archivo (app.js o tareas-db.js) que contenga tu pool de conexión y las tres funciones asíncronas que se describen a continuación.

1. Función insertarTarea
Esta función recibirá los datos de una nueva tarea y la agregará a la tabla.

Define la función: Crea una función async llamada insertarTarea que acepte dos parámetros: titulo y descripcion.

Consulta SQL: Escribe la sentencia INSERT INTO utilizando marcadores de posición ($1, $2) para los valores.

const consulta = 'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2)';
const valores = [titulo, descripcion];

 
Ejecuta y verifica: Dentro de un bloque try...catch, ejecuta la consulta con pool.query().

La respuesta de una inserción exitosa contiene la propiedad rowCount, que indica cuántas filas fueron afectadas (debería ser 1).

Imprime un mensaje en la consola confirmando la creación, por ejemplo: Tarea "${titulo}" insertada con éxito. Filas afectadas: ${resultado.rowCount}.

2. Función actualizarTarea
Esta función modificará una tarea existente, identificada por su id.

Define la función: Crea una función async llamada actualizarTarea que acepte tres parámetros: id, nuevoTitulo y nuevaDescripcion.

Consulta SQL: Escribe la sentencia UPDATE utilizando marcadores de posición.

const consulta = 'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3';
const valores = [nuevoTitulo, nuevaDescripcion, id];

 
Ejecuta y verifica: Llama a pool.query() dentro de un try...catch.

Usa resultado.rowCount para verificar si se actualizó alguna fila. Si el id no existe, rowCount será 0.

Muestra un mensaje indicando el resultado, por ejemplo: Tarea con ID ${id} actualizada. Filas afectadas: ${resultado.rowCount}.

3. Función eliminarTarea
Esta función eliminará una tarea de la base de datos, identificada por su id.

Define la función: Crea una función async llamada eliminarTarea que acepte un parámetro: id.

Consulta SQL: Escribe la sentencia DELETE FROM utilizando un marcador de posición para el id.

const consulta = 'DELETE FROM tareas WHERE id = $1';
const valores = [id];
 
Ejecuta y verifica: Llama a pool.query() dentro de un try...catch.

Nuevamente, comprueba el valor de resultado.rowCount para saber si la eliminación fue exitosa.

Imprime un mensaje en la consola, como: Tarea con ID ${id} eliminada. Filas afectadas: ${resultado.rowCount}.

Ejecución de las Funciones:

Para probar tu trabajo, llama a estas funciones desde tu script. Puedes crear una función async principal para orquestar las llamadas y ver el resultado en orden.

// Ejemplo de cómo orquestar las llamadas para probar
async function main() {
    await insertarTarea('Nueva Tarea', 'Descripción de la nueva tarea.');
    await actualizarTarea(1, 'Aprender PostgreSQL', 'Completar todos los ejercicios de la guía de base de datos.');
    await eliminarTarea(2); // Asumiendo que insertaste una tarea que ahora tiene el id 2
}

main();

 
Conceptos a Aplicar:

INSERT INTO: La sentencia SQL para añadir nuevos registros (filas) a una tabla.

UPDATE: La sentencia SQL para modificar registros existentes en una tabla, usualmente combinada con una cláusula WHERE para especificar qué filas actualizar.

DELETE FROM: La sentencia SQL para eliminar registros de una tabla, también combinada con WHERE para especificar las filas a borrar.

result.rowCount: Una propiedad clave del objeto de respuesta del driver pg que te informa cuántas filas fueron afectadas por tu consulta INSERT, UPDATE o DELETE. Es fundamental para confirmar que tu operación tuvo el efecto esperado.

Entrega:

El trabajo deberá ser entregado a través de un repositorio público en GitHub. No incluyas tus credenciales de conexión en el código. Por favor, comparte únicamente el enlace a dicho repositorio. 📤
