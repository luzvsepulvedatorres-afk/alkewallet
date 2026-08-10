document.getElementById("depositForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue por defecto

    // 1. Obtener el monto ingresado
    let amount = parseFloat(document.getElementById("depositAmount").value);

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingresa un monto válido.");
        return;
    }

    // 2. Obtener el saldo actual de localStorage (si no existe, comienza en 0 o un monto base)
    let currentBalance = parseFloat(localStorage.getItem("userBalance")) || 1000; // Asumimos 1000 de base si no hay nada

    // 3. Sumar el depósito al saldo
    let newBalance = currentBalance + amount;

    // 4. Guardar el nuevo saldo en localStorage
    localStorage.setItem("userBalance", newBalance);

    // 5. Registrar el movimiento para la pantalla de transacciones
    let transactions = JSON.parse(localStorage.getItem("userTransactions")) || [];
    transactions.push({
        type: "Depósito",
        amount: amount,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem("userTransactions", JSON.stringify(transactions));

    alert("¡Depósito realizado con éxito! Nuevo saldo: $" + newBalance);

    // 6. Redirigir al menú principal
    window.location.href = "menu.html";
});