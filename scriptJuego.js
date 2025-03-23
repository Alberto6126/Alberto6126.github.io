let numeroObjetivo = Math.floor(Math.random() * 100) + 1;

function verificarNumero() {
    let numeroIngresado = document.getElementById('numero').value;
    let mensaje = '';

    if (numeroIngresado < numeroObjetivo) {
        mensaje = 'El número es mayor.';
    } else if (numeroIngresado > numeroObjetivo) {
        mensaje = 'El número es menor.';
    } else {
        mensaje = 'Has adivinado el número.';
    }

    document.getElementById('resultado').innerText = mensaje;
}

// Asignar la función verificarNumero al botón de verificación
document.getElementById('verificar').addEventListener('click', verificarNumero);
