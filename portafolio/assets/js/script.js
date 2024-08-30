document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtener el valor del campo de nombre
        const name = document.getElementById("name").value;

        // Mostrar el mensaje de agradecimiento
        formMessage.innerHTML = `<div class="alert alert-primary" role="alert">Gracias por enviar, ${name}.</div>`;

        // Limpiar los campos del formulario si deseas
        form.reset();
    });
});

function iconoGrande(var1,var2){
    document.getElementById(var2).style.display = "none";
    
    setTimeout(function() {
        document.getElementById(var1).style.display= "block";
    }, 500); 

}

function iconoChico(var1,var2){
    document.getElementById(var1).style.display= "none";
    setTimeout(function() {
        document.getElementById(var2).style.display = "block";
    }, 500); 
}

function agrandarIcono(icono) {
    const iconoGrande = document.getElementById(icono);
    iconoGrande.style.transform = 'scale(2)'; // Agrandar el ícono al 120%
}

// Función para volver al tamaño normal
function volverTamanoNormal(icono) {
    const iconoNormal = document.getElementById(icono);
    iconoNormal.style.transform = 'scale(1)'; // Volver al tamaño original
}

