document.addEventListener("DOMContentLoaded", function() {
    cargarContactos();

    // 1. Guardar nuevo contacto desde el formulario emergente
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("contactName").value;
        let cbu = document.getElementById("contactCbu").value;
        let alias = document.getElementById("contactAlias").value;
        let bank = document.getElementById("contactBank").value;

        let contactos = JSON.parse(localStorage.getItem("userContacts")) || [];
        contactos.push({ name, cbu, alias, bank });
        localStorage.setItem("userContacts", JSON.stringify(contactos));

        alert("¡Contacto agregado con éxito!");
        document.getElementById("contactForm").reset();
        
        // Recargar la lista de contactos
        cargarContactos();
    });

    // 2. Enviar dinero al contacto seleccionado
    document.getElementById("btnSendMoney").addEventListener("click", function() {
        let selectedContact = document.querySelector('input[name="selectedContact"]:checked');
        let amount = parseFloat(document.getElementById("sendAmount").value);

        if (!selectedContact) {
            alert("Por favor, selecciona un contacto de la lista.");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Por favor, ingresa un monto válido a enviar.");
            return;
        }

        let currentBalance = parseFloat(localStorage.getItem("userBalance")) || 1000;

        if (amount > currentBalance) {
            alert("Saldo insuficiente para realizar esta transferencia.");
            return;
        }

        // Restar saldo
        let newBalance = currentBalance - amount;
        localStorage.setItem("userBalance", newBalance);

        // Registrar movimiento
        let transactions = JSON.parse(localStorage.getItem("userTransactions")) || [];
        transactions.push({
            type: "Envío de dinero a " + selectedContact.value,
            amount: -amount,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem("userTransactions", JSON.stringify(transactions));

        alert("¡Transferencia de $" + amount + " realizada con éxito a " + selectedContact.value + "!");
        window.location.href = "menu.html";
    });
});

// Función para mostrar los contactos en pantalla
function cargarContactos() {
    let container = document.getElementById("contactsList");
    container.innerHTML = "";

    let contactos = JSON.parse(localStorage.getItem("userContacts")) || [
        { name: "Juan Pérez", cbu: "1234567890", alias: "juan.perez", bank: "Banco Estado" } // Contacto por defecto de prueba
    ];

    // Si no hay contactos guardados, guardamos el de prueba por defecto
    if (localStorage.getItem("userContacts") === null) {
        localStorage.setItem("userContacts", JSON.stringify(contactos));
    }

    contactos.forEach((c, index) => {
        container.innerHTML += `
            <label class="list-group-item d-flex gap-3">
                <input class="form-check-input flex-shrink-0" type="radio" name="selectedContact" value="${c.name} (${c.bank})" style="font-size: 1.375rem;">
                <span>
                    <strong>${c.name}</strong><br>
                    <small class="text-muted">CBU: ${c.cbu} | Alias: ${c.alias} | Banco: ${c.bank}</small>
                </span>
            </label>
        `;
    });
}