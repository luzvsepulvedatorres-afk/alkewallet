$(document).ready(function() {
    cargarHistorial();

    // Evento para el filtro
    $('#filtroTransaccion').change(function() {
        cargarHistorial($(this).val());
    });
});

$(window).on('pageshow', function(event) {
    if (event.originalEvent.persisted) {
        cargarHistorial();
    }
});

function cargarHistorial(filtro = 'todos') {
    let transacciones = JSON.parse(localStorage.getItem("misTransacciones")) || [];
    let contenedorLista = $('#listaTransacciones');
    contenedorLista.empty();

    if (transacciones.length === 0) {
        contenedorLista.append('<li class="list-group-item text-center text-muted py-4">No hay movimientos registrados.</li>');
        return;
    }

    // Filtrar transacciones
    let filtradas = transacciones.filter(function(item) {
        if (filtro === 'todos') return true;
        return item.tipo.toLowerCase().includes(filtro);
    });

    if (filtradas.length === 0) {
        contenedorLista.append('<li class="list-group-item text-center text-muted py-4">No hay movimientos para este filtro.</li>');
        return;
    }

    filtradas.forEach(function(item) {
        let esDeposito = item.tipo.toLowerCase().includes('depósito') || item.tipo.toLowerCase().includes('deposito');
        let badgeClass = esDeposito ? 'bg-success' : 'bg-primary';

        contenedorLista.append(`
            <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <div>
                    <span class="fw-bold text-capitalize">${item.tipo}</span><br>
                    <small class="text-muted">${item.descripcion} - ${item.fecha}</small>
                </div>
                <span class="badge ${badgeClass} rounded-pill fs-6">$${parseFloat(item.monto).toLocaleString()}</span>
            </li>
        `);
    });
}