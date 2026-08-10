document.addEventListener("DOMContentLoaded", function() {
    // Obtener el saldo de localStorage o inicializarlo en 1000 si no existe
    let currentBalance = localStorage.getItem("userBalance");
    
    if (currentBalance === null) {
        currentBalance = 1000;
        localStorage.setItem("userBalance", currentBalance);
    }

    // Mostrar el saldo en pantalla
    document.getElementById("balanceDisplay").innerText = "$" + parseFloat(currentBalance).toLocaleString();
});