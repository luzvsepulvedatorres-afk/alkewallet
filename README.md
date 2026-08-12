💳 Wall-et - Billetera Digital
¡Hola! Este repositorio contiene el proyecto final de Wall-et, una billetera digital interactiva desarrollada como parte de mi proceso de aprendizaje y crecimiento en desarrollo web frontend. El objetivo principal fue construir una aplicación web funcional que simule transacciones financieras reales utilizando almacenamiento local (LocalStorage), manipulación del DOM y buenas prácticas con jQuery y Bootstrap.

🚀 Tecnologías Utilizadas
HTML5 (Estructura semántica de pantallas independientes).

CSS3 & Bootstrap 5 (Diseño responsive, tarjetas, modales y alertas estilizadas).

JavaScript (ES6+) (Lógica de negocio, validaciones y eventos).

jQuery (Optimización de selectores, manejo de formularios y eventos submit/change).

LocalStorage API (Persistencia de datos para saldos, contactos y transacciones).

📂 Estructura del Proyecto
Plaintext
wall-et/
│
├── css/
│   └── style.css
├── js/
│   ├── login.js
│   ├── menu.js
│   ├── deposit.js
│   ├── sendmoney.js
│   └── transactions.js
│
├── login.html
├── menu.html
├── deposit.html
├── sendmoney.html
└── transactions.html
🛠️ El Camino del Desarrollo: Retos y Aprendizajes (Debugging)
Construir este proyecto no fue solo "escribir código", sino aprender a pensar como un desarrollador que sabe resolver problemas reales. Durante el proceso de integración, nos encontramos con varios retos técnicos que tuvimos que auditar y reparar para llegar al resultado final:

La "Fuente Única de Verdad" en el LocalStorage:

El problema: Al principio, los depósitos y las transferencias guardaban los datos de forma aislada o con nombres de llaves distintos, lo que hacía que el historial en transactions.html solo mostrara los depósitos y omitiera las transferencias.

La solución: Unificamos la clave del almacenamiento local a "misTransacciones", asegurando que tanto deposit.js como sendmoney.js escriban un objeto estandarizado con el mismo formato (tipo, descripcion, monto, fecha). Ahora el historial lee de una sola fuente confiable.

Sincronización de IDs (El clásico dolor de cabeza):

El problema: En la pantalla de historial, el archivo HTML tenía un contenedor llamado id="transactionsList", mientras que el script JavaScript buscaba $('#listaTransacciones'). Al no coincidir los selectores, la lista se quedaba vacía.

La solución: Realizamos una auditoría exhaustiva de todos los pares HTML + JS para blindar la coincidencia exacta de IDs, utilizando jQuery para una selección más limpia y legible.

Interactividad Avanzada y Filtros Dinámicos:

Implementamos eventos .change() en un elemento <select> para filtrar en tiempo real los movimientos entre "Todos", "Depósitos" y "Transferencias".

Añadimos validaciones de saldo para evitar que el usuario gaste más de lo que tiene (userBalance), inicializando la cuenta con $1000 por defecto si es su primer ingreso.

📱 Vistas Principales (Capturas de Pantalla)
(Aquí puedes insertar tus capturas)

Inicio de Sesión (login.html): Validación de credenciales y acceso seguro.

Menú Principal (menu.html): Visualización del saldo actual y redirecciones fluidas con leyendas de carga.

Depósito (deposit.html): Actualización automática del saldo general.

Enviar Dinero (sendmoney.html): Agenda de contactos mediante un modal y transferencia directa.

Últimos Movimientos (transactions.html): Historial unificado con filtrado dinámico.

⚙️ ¿Cómo ejecutar el proyecto localmente?
Clona este repositorio o descarga los archivos en tu computadora.

Abre la carpeta del proyecto en tu editor de código favorito (ej. VS Code).

Se recomienda utilizar la extensión Live Server en VS Code para abrir los archivos.

Inicia la aplicación abriendo el archivo login.html en tu navegador web.

Proyecto desarrollado con dedicación, enfoque en buenas prácticas y ganas de seguir evolucionando como programador. 💻✨