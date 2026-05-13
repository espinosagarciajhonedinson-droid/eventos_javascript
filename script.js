const boton = document.getElementById("btnCalcular");

boton.addEventListener("click", function () {

    const num1 = Number(document.getElementById("num1").value);

    const num2 = Number(document.getElementById("num2").value);

    const operacion = document.getElementById("operacion").value;

    let resultado;

    if (operacion === "+") {
        resultado = num1 + num2;
    }

    else if (operacion === "-") {
        resultado = num1 - num2;
    }

    else if (operacion === "*") {
        resultado = num1 * num2;
    }

    else if (operacion === "/") {
        resultado = num1 / num2;
    }

    console.log("Resultado:", resultado);

});