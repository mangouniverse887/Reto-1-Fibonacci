let a = 0;
let b = 1;

const cantidad = 20;

let resultado = "";

for (let i = 1; i <= cantidad; i++) {
    resultado += a;
    if (i < cantidad) {
        resultado += ", ";
    }

    const siguiente = a + b;

    a = b;
    b = siguiente;
}

console.log("Los primeros " + cantidad + "números de Fibonacci:");
console.log(resultado);