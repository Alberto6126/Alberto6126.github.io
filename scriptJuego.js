let numeroObjetivo = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let acertado = false;

function verificarNumero() {
    const boton = document.getElementById('verificar');
    if (acertado) {
        // Reiniciar juego
        numeroObjetivo = Math.floor(Math.random() * 100) + 1;
        intentos = 0;
        acertado = false;
        document.getElementById('resultado').innerText = 'Nuevo juego iniciado. ¡Adivina el número!';
        document.getElementById('intentos').innerText = 'Intentos: 0';
        document.getElementById('numero').value = '';
        boton.innerText = 'Verificar';
        return;
    }

    let numeroIngresado = document.getElementById('numero').value;
    let mensaje = '';

    if (numeroIngresado < numeroObjetivo) {
        mensaje = 'El número es mayor.';
    } else if (numeroIngresado > numeroObjetivo) {
        mensaje = 'El número es menor.';
    } else {
        mensaje = 'Has adivinado el número.';
        acertado = true;
        boton.innerText = 'Empezar';
    }

    intentos++;

    document.getElementById('resultado').innerText = mensaje;
    document.getElementById('intentos').innerText = 'Intentos: ' + intentos;
}

// Asignar la función verificarNumero al botón de verificación
document.getElementById('verificar').addEventListener('click', verificarNumero);
