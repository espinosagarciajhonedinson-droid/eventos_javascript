/**
 * TALLER: SISTEMA DE GESTIÓN DE EMPLEADOS CON PERSISTENCIA (localStorage)
 * 
 * Este programa permite administrar empleados y mantiene los datos guardados
 * incluso si cierras el navegador o recargas la página.
 */

"use strict";

// =============================================================================
// VARIABLES GLOBALES Y CARGA INICIAL
// =============================================================================

/**
 * empleados: Ahora inicializamos el arreglo intentando leer datos de localStorage.
 * JSON.parse: Convierte el texto guardado de vuelta a un arreglo de objetos.
 * || []: Si no hay datos (primera vez), inicializa un arreglo vacío.
 */
let empleados = JSON.parse(localStorage.getItem("db_empleados")) || [];

// =============================================================================
// FUNCIONES DE PERSISTENCIA
// =============================================================================

/**
 * Nombre: guardarEnBD
 * Objetivo: Guardar el estado actual del arreglo en el localStorage del navegador.
 * JSON.stringify: Convierte el arreglo de objetos a una cadena de texto (string).
 */
function guardarEnBD() {
    localStorage.setItem("db_empleados", JSON.stringify(empleados));
    console.log("Sistema: Datos sincronizados con localStorage.");
}

// =============================================================================
// FUNCIONES DEL SISTEMA
// =============================================================================

function registrarEmpleado() {
    const idInput = prompt("Ingrese la identificación:");
    if (idInput === null) return; 
    const identificacion = idInput.trim();

    // Validar duplicados
    if (empleados.some(emp => emp.identificacion === identificacion)) {
        alert("ERROR: Esta identificación ya existe.");
        return;
    }

    const nombre = prompt("Nombre completo:")?.trim();
    const cargo = prompt("Cargo:")?.trim();
    const salario = parseFloat(prompt("Salario:"));
    const area = prompt("Área:")?.trim();

    if (!identificacion || !nombre || !cargo || isNaN(salario) || !area) {
        alert("ERROR: Datos inválidos o incompletos.");
        return;
    }

    const nuevoEmpleado = { identificacion, nombre, cargo, salario, area };
    
    empleados.push(nuevoEmpleado);
    
    // GUARDADO PERSISTENTE: Llamamos a la función para guardar en el disco duro del navegador
    guardarEnBD();

    alert("¡Empleado guardado permanentemente!");
}

function listarEmpleados() {
    if (empleados.length === 0) {
        alert("No hay registros guardados.");
        return;
    }

    let listado = "===== EMPLEADOS GUARDADOS EN SISTEMA =====\n\n";
    empleados.forEach(emp => {
        listado += `ID: ${emp.identificacion} | Nombre: ${emp.nombre} | Área: ${emp.area}\n`;
    });
    alert(listado);
    console.table(empleados);
}

function buscarEmpleado() {
    const id = prompt("ID a buscar:")?.trim();
    const encontrado = empleados.find(emp => emp.identificacion === id);
    if (encontrado) {
        alert(`Encontrado: ${encontrado.nombre} - ${encontrado.cargo}`);
    } else {
        alert("No existe ese registro.");
    }
}

function borrarTodo() {
    if (confirm("¿Estás seguro de borrar TODA la base de datos?")) {
        empleados = [];
        localStorage.removeItem("db_empleados");
        alert("Todos los datos han sido borrados.");
    }
}

function mostrarMenu() {
    let continuar = true;
    while (continuar) {
        const menu = "SISTEMA CON PERSISTENCIA (localStorage)\n" +
                     "1. Registrar\n2. Listar\n3. Buscar\n4. Borrar Todo\n5. Salir";
        const op = prompt(menu);
        if (op === null) break;
        switch (op.trim()) {
            case "1": registrarEmpleado(); break;
            case "2": listarEmpleados(); break;
            case "3": buscarEmpleado(); break;
            case "4": borrarTodo(); break;
            case "5": alert("¡Hasta pronto!"); continuar = false; break;
            default: alert("Opción inválida.");
        }
    }
}

mostrarMenu();
