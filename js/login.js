$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Evita que recargue la página

        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        if (email === "" || password === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Guardamos un dato básico del usuario si lo deseas
        localStorage.setItem("userEmail", email);

        // Redirige al menú principal en tiempo real
        window.location.href = 'menu.html';
    });
});