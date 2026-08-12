$(document).ready(function() {
    // Buscamos el formulario por su ID en español
    $('#formularioDeposito').submit(function(event) {
        event.preventDefault(); // Evita que la página se recargue

        // Obtenemos el valor usando el ID en español: montoDeposito
        let montoInput = $('#montoDeposito').val();
        let monto = parseFloat(montoInput);

        // Validación básica en español
        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingresa un monto válido mayor a 0.");
            return;
        }

        // 1. Obtener datos actuales del almacenamiento local
        let saldoActual = parseFloat(localStorage.getItem("userBalance")) || 0;
        let transacciones = JSON.parse(localStorage.getItem("misTransacciones")) || [];

        // 2. Actualizar saldo y agregar al historial
        saldoActual += monto;
        
        transacciones.push({
            tipo: "depósito",
            descripcion: "Depósito en cuenta",
            monto: monto,
            fecha: new Date().toLocaleDateString()
        });

        // 3. Guardar en el localStorage
        localStorage.setItem("userBalance", saldoActual);
        localStorage.setItem("misTransacciones", JSON.stringify(transacciones));

        // 4. Notificar éxito en español y redirigir
        alert("¡Depósito exitoso! Tu nuevo saldo es: $" + saldoActual.toLocaleString());
        window.location.href = 'menu.html';
    });
});