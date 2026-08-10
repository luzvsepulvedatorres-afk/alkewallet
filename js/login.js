document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validación simple
    if (email === "usuario@wallet.com" && password === "12345") {
        // Al iniciar sesión, inicializamos el saldo si es la primera vez
        if (!localStorage.getItem("userBalance")) {
            localStorage.setItem("userBalance", 1000); 
        }
        
        alert("¡Bienvenido! Iniciando sesión...");
        window.location.href = "menu.html"; // Redirige al menú
    } else {
        alert("Credenciales incorrectas.");
    }
});