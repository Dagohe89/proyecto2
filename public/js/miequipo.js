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

