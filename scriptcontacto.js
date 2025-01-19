let nombre = "";
let fecha = "";
let contacto = "";
let telefono = "";
let color = "";
let mensaje = "";


function prueba(evento){
    
    evento.preventDefault();
    nombre = document.getElementById("nombreForm");
    if (document.getElementById(telefonoForm).value.length > 9 && document.getElementById(fechaForm).value.length < 20){
        telefono = document.getElementById("telefonoForm");
    }
    contacto = document.getElementById("emailForm");
    telefono = document.getElementById("");
    color = document.getElementById("");
    mensaje = document.getElementById("");
    console.log("Procesando envio");
    console.log(nombre.value);
    if(nombre.value.length < 2){
        console.log("El nombre tiene que ser mayor a 1 caracter")
    }
    if(contacto.value < 5){
        console,log("El correo no es correcto")
    }


}

