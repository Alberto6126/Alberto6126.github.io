let nombre = "";
let fecha = "";
let contacto = "";
let telefono = "";
let color = "";
let mensaje = "";

function prueba(evento) {
    evento.preventDefault();
    
    nombre = document.getElementById("nombreForm");
    telefono = document.getElementById("telefonoForm");
    contacto = document.getElementById("emailForm");
    fecha = document.getElementById("fechaForm");
    color = document.getElementById("colorForm");
    mensaje = document.getElementById("mensajeForm");

    console.log("Procesando envio");
    console.log("Nombre:", nombre.value);
    console.log("Teléfono:", telefono.value);
    console.log("Email:", contacto.value);
    console.log("Fecha:", fecha.value);
    console.log("Color:", color.value);
    console.log("Mensaje:", mensaje.value);

    if (nombre.value.length < 2) {
        console.log("El nombre tiene que ser mayor a 1 caracter");
        return;
    }

    if (contacto.value.length < 5) {
        console.log("El correo no es correcto");
        return;
    }

    if (telefono.value.length <= 9 || fecha.value.length >= 20) {
        console.log("El teléfono o la fecha no son correctos");
        return;
    }

    // Si todos los datos son correctos, redirigir a una nueva página
    window.location.href = "nueva_pagina.html";
}

