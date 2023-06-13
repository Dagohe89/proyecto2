// Obtén una referencia al botón y al formulario
var btnModificar = document.getElementById("btnModificar");
var btnModificar2 = document.getElementById("btnModificar2");
var btnModificar3 = document.getElementById("btnModificar3");
var mdfdelegadoForm = document.getElementById("mdfdelegadoForm");
var mdfequipoForm = document.getElementById("mdfequipoForm");
var mdfjugadorForm = document.getElementById("mdfjugadorForm");

// Oculta el formulario inicialmente
mdfdelegadoForm.style.display = "none";
mdfequipoForm.style.display = "none";
mdfjugadorForm.style.display = "none";




// Agrega un evento click al botón para mostrar u ocultar el formulario
btnModificar.addEventListener("click", function () {
    if (mdfdelegadoForm.style.display === "none") {
        mdfdelegadoForm.style.display = "block";
    } else {
        mdfdelegadoForm.style.display = "none";
    }
});
btnModificar2.addEventListener("click", function () {
    if (mdfequipoForm.style.display === "none") {
        mdfequipoForm.style.display = "block";
    } else {
        mdfequipoForm.style.display = "none";
    }
});
btnModificar3.addEventListener("click", function () {
    if (mdfjugadorForm.style.display === "none") {
        mdfjugadorForm.style.display = "block";
    } else {
        mdfjugadorForm.style.display = "none";
    }
});

function toggleTab(tabId) {
    var tabContent = document.getElementById(tabId);
    if (tabContent.style.display === "none") {
        tabContent.style.display = "block";
    } else {
        tabContent.style.display = "none";
    }
}

document.getElementById("campoActualizar").addEventListener("change", function() {
    var opcionSeleccionada = this.value;
    var campoAdicional = document.getElementById("campoAdicional");

    switch (opcionSeleccionada) {
        case "opcion1":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Nombre:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion2":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - 1r Apellido:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion3":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - 2º Apellido:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion4":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - DNI:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion5":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Teléfono:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion6":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Email:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion7":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Usuario:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion8":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Contraseña:</label>' +
                '<input type="password" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion9":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Foto:</label>' +
                '<input type="file" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        default:
            campoAdicional.innerHTML = ''; // Limpiar el campo adicional si no se selecciona ninguna opción válida
            break;
    }
});

document.getElementById("campoActualizar").addEventListener("change", function() {
    var opcionSeleccionada = this.value;
    var campoAdicional = document.getElementById("campoAdicional");

    switch (opcionSeleccionada) {
        case "opcion1":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Nombre:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion2":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Camiseta 1:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion3":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Camiseta 2:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion4":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Dirección</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion5":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Escudo</label>' +
                '<input type="file" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;

        default:
            campoAdicional.innerHTML = ''; // Limpiar el campo adicional si no se selecciona ninguna opción válida
            break;
    }
});

document.getElementById("campoActualizar").addEventListener("change", function() {
    var opcionSeleccionada = this.value;
    var campoAdicional = document.getElementById("campoAdicional");

    switch (opcionSeleccionada) {
        case "opcion1":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Nombre:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion2":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - 1r Apellido:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion3":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - 2º Apellido:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion4":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - DNI:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
        case "opcion5":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Fecha Nacimiento:</label>' +
                '<input type="date" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
            case "opcion5":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Dorsal:</label>' +
                '<input type="text" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;
            case "opcion5":
            campoAdicional.innerHTML = '<label for="campoAdicionalInput">Campo Adicional - Foto:</label>' +
                '<input type="file" id="campoAdicionalInput" name="campoAdicionalInput">';
            break;

        default:
            campoAdicional.innerHTML = ''; // Limpiar el campo adicional si no se selecciona ninguna opción válida
            break;
    }
});
