window.addEventListener("load", programa);

function programa() {
    test("Pr");
    test("Sn");
    obtenerYMostrarCotizaciones();
}

// Funciones
function test(terminacion) {
    const inputLinkATestear = document.getElementById("idLinkATestear" + terminacion);
    const inputTituloDeLaPagina = document.getElementById("idTituloPagina" + terminacion);
    const btnTestear = document.getElementById("idBtnTestear" + terminacion);
    const resultado = document.getElementById("idResultado" + terminacion);

    // Mostrar las opciones para enviar el formulario si hay un valor valido.
    inputLinkATestear.addEventListener("input", (evento) => {
        resultado.className = "";
        resultado.textContent = "";

        if (inputLinkATestear.reportValidity() && inputLinkATestear.value != "") {
            mostrarElementosOcultos([inputTituloDeLaPagina, btnTestear, resultado]);
        } else {
            ocultarElementos([inputTituloDeLaPagina, btnTestear, resultado]);
        }
    });

    // Ejecutar el test
    btnTestear.addEventListener("click", async (evento) => {
        evento.preventDefault();

        resultado.className = "";
        resultado.textContent = "Obteniendo título del sitio...";

        let respuesta = await fetch(
            "http://localhost:8080/" +
                terminacion.toLowerCase() +
                "test?url=" +
                inputLinkATestear.value +
                "&title=" +
                inputTituloDeLaPagina.value
        );
        respuesta = await respuesta.json();
        console.log(respuesta);

        if (respuesta.resultado === "error") {
            resultado.textContent = "Ha ocurrido un error, verifica que el link sea correcto";
        } else {
            if (respuesta.resultado) {
                resultado.textContent = "¡Correcto!";
                resultado.classList.add("correcto");
            } else {
                resultado.textContent = "El título correcto es: " + respuesta.valorObtenido;
                resultado.classList.add("incorrecto");
            }
        }
    });
}

async function obtenerYMostrarCotizaciones() {
    let cotizaciones = await fetch("http://localhost:8080/prtest/cotizaciones");
    const { dolar, real, arg } = (await cotizaciones.json()).resultado;
    console.log(cotizaciones);

    document.getElementById("idCompraDolar").textContent = "$ " + dolar[0];
    document.getElementById("idVentaDolar").textContent = "$ " + dolar[1];
    document.getElementById("idCompraReal").textContent = "$ " + real[0];
    document.getElementById("idVentaReal").textContent = "$ " + real[1];
    document.getElementById("idCompraArg").textContent = "$ " + arg[0];
    document.getElementById("idVentaArg").textContent = "$ " + arg[1];
}

function mostrarElementosOcultos(elementos) {
    elementos.forEach((elemento) => {
        if (elemento.classList.contains("disabled")) {
            elemento.classList.remove("disabled");
        }
    });
}

function ocultarElementos(elementos) {
    elementos.forEach((elemento) => {
        if (!elemento.classList.contains("disabled")) {
            elemento.classList.add("disabled");
        }
    });
}
