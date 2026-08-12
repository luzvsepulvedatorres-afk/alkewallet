document.addEventListener("DOMContentLoaded", function () {
    let currentBalance = localStorage.getItem("userBalance");

    if (currentBalance === null) {
        currentBalance = 1000;
        localStorage.setItem("userBalance", currentBalance);
    }

    document.getElementById("balanceDisplay").innerText = "$" + parseFloat(currentBalance).toLocaleString();
});

// Función para mostrar la leyenda exigida por el profesor y luego redirigir
function redirigir(url, nombrePantalla) {
    let mensajeDiv = document.getElementById("mensajeRedireccion");
    mensajeDiv.innerText = "Redirigiendo a " + nombrePantalla + "...";

    setTimeout(function () {
        window.location.href = url;
    }, 800); // Espera 0.8 segundos para que se lea la leyenda antes de abrir la otra página
}