# S12: JavaScript

¿Qué es el DOM y cómo se modifica?

El DOM es la representación de la página como un árbol de elementos que el navegador crea al leer el HTML. JavaScript puede acceder a esos elementos y cambiarlos sin recargar la página. En mi proyecto, tarjetas.js crea un elemento con createElement, le asigna texto y lo agrega a la página con appendChild, y así se muestra cada alerta.

¿Cómo se guarda y se lee un arreglo de objetos con localStorage?

localStorage solo guarda texto, así que una lista de objetos hay que convertirla primero. Con JSON.stringify se transforma en texto para guardarla, y con JSON.parse se vuelve a convertir en objetos al leerla. En datos.js esto se hace en guardarAlertas y obtenerAlertas, y por eso las alertas siguen ahí al recargar.

¿Por qué textContent y no innerHTML con datos del usuario?

innerHTML interpreta lo que recibe como HTML, así que si el usuario escribe código malicioso, el navegador podría ejecutarlo (ataque XSS). textContent lo muestra como texto plano. Como las descripciones de las alertas las escribe el usuario, el proyecto usa textContent.