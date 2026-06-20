/**
 * TALLER: SISTEMA DE GESTIÓN DE EMPLEADOS - SOLUCIONES EMPRESARIALES S.A.S.
 * 
 * Este programa permite administrar la información de los empleados de una empresa.
 * Analizado, depurado y optimizado por: Senior Developer & Instructor SENA.
 * 
 * @author Desarrollo Senior & Instructor SENA
 */

"use strict";

// =============================================================================
// VARIABLES GLOBALES Y CONSTANTES
// =============================================================================

/**
 * empleados: Es un arreglo (Array) que servirá como nuestra "Base de Datos" temporal.
 * Aquí almacenaremos cada empleado como un objeto individual.
 */
let empleados = [];

// =============================================================================
// FUNCIONES DEL SISTEMA
// =============================================================================

/**
 * Nombre: registrarEmpleado
 * Objetivo: Solicitar datos al usuario y agregar un nuevo empleado al arreglo.
 * Incluye validación de duplicados y limpieza de datos (trim).
 */
function registrarEmpleado() {
    console.log("Iniciando registro de empleado...");

    const idInput = prompt("Ingrese la identificación del empleado:");
    if (idInput === null) return; 
    const identificacion = idInput.trim();

    // VALIDACIÓN DE DUPLICADOS
    const existe = empleados.some(emp => emp.identificacion === identificacion);
    if (existe) {
        alert("ERROR: Ya existe un empleado registrado con esa identificación.");
        return;
    }

    const nombreInput = prompt("Ingrese el nombre completo del empleado:");
    if (nombreInput === null) return;
    const nombre = nombreInput.trim();

    const cargoInput = prompt("Ingrese el cargo del empleado:");
    if (cargoInput === null) return;
    const cargo = cargoInput.trim();

    const salarioInput = prompt("Ingrese el salario del empleado:");
    if (salarioInput === null) return;
    const salario = parseFloat(salarioInput);

    const areaInput = prompt("Ingrese el área de trabajo (ej. Ventas, TI, RRHH):");
    if (areaInput === null) return;
    const area = areaInput.trim();

    // VALIDACIÓN DE CAMPOS VACÍOS E INTEGRIDAD
    if (identificacion === "" || nombre === "" || cargo === "" || area === "") {
        alert("ERROR: Todos los campos son obligatorios. No se permiten espacios vacíos.");
        return;
    }

    if (isNaN(salario) || salario <= 0) {
        alert("ERROR: El salario debe ser un número válido y mayor a cero.");
        return;
    }

    const nuevoEmpleado = {
        identificacion,
        nombre,
        cargo,
        salario,
        area
    };

    empleados.push(nuevoEmpleado);

    alert("¡Empleado registrado con éxito!");
    console.log("Empleado agregado:", nuevoEmpleado);
}

/**
 * Nombre: listarEmpleados
 * Objetivo: Mostrar en pantalla la lista de todos los empleados de forma organizada.
 */
function listarEmpleados() {
    if (empleados.length === 0) {
        alert("No hay empleados registrados en el sistema.");
        return;
    }

    let listado = "===== LISTADO TOTAL DE EMPLEADOS =====\n\n";

    for (const empleado of empleados) {
        listado += `ID: ${empleado.identificacion}\n`;
        listado += `Nombre: ${empleado.nombre}\n`;
        listado += `Cargo: ${empleado.cargo}\n`;
        listado += `Salario: $${empleado.salario.toLocaleString()}\n`;
        listado += `Área: ${empleado.area}\n`;
        listado += "--------------------------------------\n";
    }

    alert(listado);
    console.log("Listado de empleados actualizado:");
    console.table(empleados);
}

/**
 * Nombre: buscarEmpleado
 * Objetivo: Localizar un empleado específico mediante su número de identificación.
 */
function buscarEmpleado() {
    const busqueda = prompt("Ingrese la identificación del empleado que desea buscar:");
    if (busqueda === null) return;
    const idABuscar = busqueda.trim();

    const empleadoEncontrado = empleados.find(emp => emp.identificacion === idABuscar);

    if (empleadoEncontrado) {
        let detalle = "--- EMPLEADO ENCONTRADO ---\n\n";
        detalle += `ID: ${empleadoEncontrado.identificacion}\n`;
        detalle += `Nombre: ${empleadoEncontrado.nombre}\n`;
        detalle += `Cargo: ${empleadoEncontrado.cargo}\n`;
        detalle += `Salario: $${empleadoEncontrado.salario.toLocaleString()}\n`;
        detalle += `Área: ${empleadoEncontrado.area}\n`;
        alert(detalle);
    } else {
        alert(`No se encontró ningún registro para la identificación: ${idABuscar}`);
    }
}

/**
 * Nombre: contarEmpleados
 * Objetivo: Mostrar la cantidad total de empleados registrados.
 */
function contarEmpleados() {
    alert(`El sistema tiene un total de ${empleados.length} empleados registrados.`);
}

/**
 * Nombre: mostrarMenu
 * Objetivo: Orquestar el flujo principal de la aplicación.
 */
function mostrarMenu() {
    let continuar = true;

    while (continuar) {
        const menu = "SISTEMA DE GESTIÓN - SOLUCIONES EMPRESARIALES S.A.S.\n" +
                     "----------------------------------------------------\n" +
                     "1. Registrar Empleado\n" +
                     "2. Listar Todos los Empleados\n" +
                     "3. Buscar Empleado por Identificación\n" +
                     "4. Cantidad Total de Empleados\n" +
                     "5. Salir del Sistema\n\n" +
                     "Seleccione una opción (1-5):";

        const opcion = prompt(menu);

        if (opcion === null) {
            alert("Saliendo del sistema...");
            break;
        }

        switch (opcion.trim()) {
            case "1":
                registrarEmpleado();
                break;
            case "2":
                listarEmpleados();
                break;
            case "3":
                buscarEmpleado();
                break;
            case "4":
                contarEmpleados();
                break;
            case "5":
                alert("Saliendo del sistema... ¡Muchas gracias!");
                continuar = false;
                break;
            default:
                alert("Opción no válida. Por favor, intente de nuevo.");
                break;
        }
    }
}

// Lanzamiento de la aplicación
mostrarMenu();

/* 
=============================================================================
EXPLICACIÓN DETALLADA DEL FUNCIONAMIENTO (PARA EL ESTUDIANTE)
=============================================================================

1. VARIABLES Y CONSTANTES (let y const):
   - 'let': Se usó para el arreglo 'empleados' y la variable 'continuar'.
   - 'const': Se usó para los datos capturados y el objeto del empleado.

2. ARREGLOS (Arrays):
   - 'empleados' almacena toda la colección de objetos empleado.

3. OBJETOS:
   - Cada empleado es un objeto con propiedades específicas.

4. FUNCIONES:
   - Modularizan el código, facilitando el mantenimiento.

5. CICLOS (while):
   - Mantiene el programa en ejecución hasta que se cumpla la condición de salida.

6. ESTRUCTURAS CONDICIONALES (switch e if):
   - Toman decisiones basadas en la entrada del usuario.

7. MÉTODOS DE ARREGLOS (push, length, find, some):
   - 'push()': Añade elementos.
   - 'length': Reporta el tamaño.
   - 'find()': Busca un elemento.
   - 'some()': Verifica la existencia de al menos un elemento (usado para duplicados).

=============================================================================
POSIBLES PREGUNTAS DE SUSTENTACIÓN (INSTRUCTOR SENA)
=============================================================================

1. ¿Por qué es importante validar duplicados?
   R: Para asegurar la integridad de los datos y que cada ID sea único.
2. ¿Qué hace el método trim()?
   R: Elimina espacios en blanco al inicio y al final de una cadena.
3. ¿Para qué sirve "use strict"?
   R: Para ejecutar el código en un modo más riguroso, evitando errores comunes como variables no declaradas.
... (resto de preguntas similares a la versión anterior)
*/
