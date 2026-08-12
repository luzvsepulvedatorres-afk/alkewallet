$(document).ready(function() {
    cargarContactos();

    // Evento para enviar dinero al contacto seleccionado
    $('#btnSendMoney').click(function(event) {
        event.preventDefault();

        // 1. Obtener el monto ingresado
        let montoInput = $('#sendAmount').val();
        let monto = parseFloat(montoInput);

        // 2. Obtener el contacto seleccionado (radio button)
        let contactoSeleccionado = $('input[name="contactoSeleccionado"]:checked').val();

        // 3. Validaciones
        if (!contactoSeleccionado) {
            alert("Por favor, selecciona un contacto para transferir.");
            return;
        }

        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingresa un monto válido mayor a 0.");
            return;
        }

        // 4. Verificar saldo actual en el localStorage
        let saldoActual = parseFloat(localStorage.getItem("userBalance")) || 0;

        if (monto > saldoActual) {
            alert("Saldo insuficiente para realizar esta transferencia.");
            return;
        }

        // 5. Actualizar saldo y registrar la transferencia
        saldoActual -= monto;

        let transacciones = JSON.parse(localStorage.getItem("misTransacciones")) || [];
        transacciones.push({
            tipo: "transferencia",
            descripcion: "Transferencia a " + contactoSeleccionado,
            monto: monto,
            fecha: new Date().toLocaleDateString()
        });

        // 6. Guardar cambios en el localStorage
        localStorage.setItem("userBalance", saldoActual);
        localStorage.setItem("misTransacciones", JSON.stringify(transacciones));

        // 7. Notificar éxito y redirigir
        alert("¡Transferencia exitosa a " + contactoSeleccionado + "! Nuevo saldo: $" + saldoActual.toLocaleString());
        window.location.href = 'menu.html';
    });

    // Evento para guardar un nuevo contacto desde el modal
    $('#contactForm').submit(function(event) {
        event.preventDefault();

        let nuevoContacto = {
            nombre: $('#contactName').val(),
            cbu: $('#contactCbu').val(),
            alias: $('#contactAlias').val(),
            banco: $('#contactBank').val()
        };

        let contactos = JSON.parse(localStorage.getItem("misContactos")) || [];
        contactos.push(nuevoContacto);
        localStorage.setItem("misContactos", JSON.stringify(contactos));

        alert("¡Contacto guardado con éxito!");
        
        // Limpiar formulario y cerrar modal
        this.reset();
        $('#contactModal').modal('hide');
        
        // Recargar lista de contactos
        cargarContactos();
    });
});

// Función para renderizar los contactos en la interfaz
function cargarContactos() {
    let contactos = JSON.parse(localStorage.getItem("misContactos")) || [];
    let contenedorContactos = $('#contactsList');
    contenedorContactos.empty();

    if (contactos.length === 0) {
        contenedorContactos.append('<p class="text-muted text-center my-3">No tienes contactos guardados. Agrega uno nuevo.</p>');
        return;
    }

    contactos.forEach(function(c, index) {
        contenedorContactos.append(`
            <div class="form-check p-3 border rounded mb-2 bg-white">
                <input class="form-check-input" type="radio" name="contactoSeleccionado" id="contacto${index}" value="${c.nombre} (${c.alias})">
                <label class="form-check-label w-100 ms-2" for="contacto${index}">
                    <strong>${c.nombre}</strong><br>
                    <small class="text-muted">Alias: ${c.alias} | CBU: ${c.cbu} | Banco: ${c.banco}</small>
                </label>
            </div>
        `);
    });
}