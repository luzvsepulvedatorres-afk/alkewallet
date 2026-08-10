document.addEventListener("DOMContentLoaded", function() {
    let lista = document.getElementById("transactionsList");
    let transactions = JSON.parse(localStorage.getItem("userTransactions")) || [];

    if (transactions.length === 0) {
        lista.innerHTML = `<li class="list-group-item text-center text-muted">No hay movimientos registrados todavía.</li>`;
        return;
    }

    lista.innerHTML = "";
    transactions.forEach(t => {
        let badgeColor = t.amount > 0 ? "text-success" : "text-danger";
        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${t.type}</strong><br>
                    <small class="text-muted">${t.date}</small>
                </div>
                <span class="${badgeColor} fw-bold fs-5">$${t.amount}</span>
            </li>
        `;
    });
});