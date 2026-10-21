
const MIN = 4;
const MAX = 100; 

const formulario = document.getElementById("formulario");
const campoCantidad = document.getElementById("cantidad");
const mensaje = document.getElementById("mensaje");
const contenedor = document.getElementById("serie");
const detalle = document.getElementById("detalle");
const resumen = document.getElementById("resumen");
const botonCopiar = document.getElementById("copiar");

let serieActual = [];


function validar(texto) {
    const numero = Number(texto);

    if (texto.trim() === "") return "Escribe un número.";
    if (!Number.isInteger(numero)) return "Debe ser un número entero.";
    if (numero < MIN) return `Debe ser ${MIN} o más.`;
    if (numero > MAX) return `El máximo es ${MAX}.`;
    return "";
}

function pedirCantidad() {
    let texto = prompt(`¿Cuántos números de Fibonacci quieres ver? (de ${MIN} a ${MAX})`, MIN);

    while (texto !== null) { 
        const error = validar(texto);
        if (error === "") {
            return Number(texto);
        }
        texto = prompt(`${error}\nIntenta de nuevo (de ${MIN} a ${MAX}):`, MIN);
    }
    return MIN; 
}

function generarFibonacci(cantidad) {
    const serie = [];
    let a = 0n;
    let b = 1n;

    for (let i = 0; i < cantidad; i++) {
        serie.push(a);
        const siguiente = a + b;
        a = b;
        b = siguiente;
    }
    return serie;
}


function formatear(numero) {
    return numero.toLocaleString("es-CO");
}

function seleccionar(ficha, i) {
    const anterior = contenedor.querySelector(".activa");
    if (anterior) anterior.classList.remove("activa");
    ficha.classList.add("activa");

    const valor = formatear(serieActual[i]);
    if (i < 2) {
        detalle.textContent = `Posición ${i + 1}: ${valor} es un valor inicial.`;
    } else {
        const x = formatear(serieActual[i - 2]);
        const y = formatear(serieActual[i - 1]);
        detalle.textContent = `Posición ${i + 1}: ${valor} = ${x} + ${y}`;
    }
}


function mostrarSerie(cantidad) {
    serieActual = generarFibonacci(cantidad);
    contenedor.innerHTML = "";
    detalle.textContent = "Toca un número para ver de dónde sale.";

    const ultimo = serieActual[serieActual.length - 1];
    const maxDigitos = ultimo.toString().length;

    serieActual.forEach((valor, i) => {
        const ficha = document.createElement("button");
        ficha.type = "button";
        ficha.className = "ficha";

        const proporcion = valor.toString().length / maxDigitos;
        ficha.style.setProperty("--fill", `${Math.max(proporcion, 0.08) * 100}%`);
        ficha.style.setProperty("--retraso", `${Math.min(i * 25, 800)}ms`);

        ficha.innerHTML =
            `<span class="posicion">n.º ${i + 1}</span>` +
            `<span class="valor">${formatear(valor)}</span>`;

        ficha.addEventListener("click", () => seleccionar(ficha, i));
        contenedor.appendChild(ficha);
    });

    resumen.textContent = `${cantidad} números. El último es ${formatear(ultimo)}.`;


    console.log(`Los primeros ${cantidad} números de Fibonacci:`);
    console.log(serieActual.join(", "));
}


formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); 

    const error = validar(campoCantidad.value);
    mensaje.textContent = error;

    if (error === "") {
        mostrarSerie(Number(campoCantidad.value));
    }
});

botonCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(serieActual.join(", "))
        .then(() => { botonCopiar.textContent = "Copiado"; })
        .catch(() => { botonCopiar.textContent = "No se pudo copiar"; });

    setTimeout(() => { botonCopiar.textContent = "Copiar serie"; }, 1500);
});


function iniciar() {
    const cantidad = pedirCantidad();
    campoCantidad.value = cantidad;
    mostrarSerie(cantidad);
}

setTimeout(iniciar, 150);