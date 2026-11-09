# Revisión de seguridad

Proyecto: Panel de Alertas SOC · Equipo 3

## 1. Sin claves ni credenciales; datos ficticios

**Cómo se cumple:** Todos los datos de ejemplo son ficticios (activos como SRV-WEB-01 y analistas con nombres inventados). El proyecto no tiene contraseñas, claves ni tokens.

**Evidencia:** `git grep -n -i "password\|token\|apikey\|secret"` no devolvió coincidencias en el código.

## 2. Datos del usuario con textContent, nunca innerHTML; sin eval

**Cómo se cumple:** Las tarjetas se crean con `createElement` y se llenan con `textContent`. Así, si alguien escribe código en un campo, se muestra como texto y no se ejecuta.

**Evidencia:** `git grep -n innerHTML` solo devuelve un comentario en `js/tarjetas.js` y la ficha S12, no código. `git grep -n "eval("` no devuelve resultados.

## 3. Validación en JavaScript (no sustituye al servidor)

**Cómo se cumple:** La función `validar` de `registrar.js` comprueba que los campos obligatorios (fuente, severidad, activo, fecha y estado) estén completos, que el activo afectado tenga entre 2 y 40 caracteres y que la descripción tenga entre 10 y 300. Cuando el estado es "cerrada", además aplica las dos reglas de cierre definidas en `reglas.js`: una alerta crítica no puede cerrarse sin responsable, y toda alerta cerrada necesita una nota de cierre de 5 a 200 caracteres. Cada error se muestra junto a su campo.

**Límite:** Esta validación se hace en el navegador, así que cualquier persona puede saltársela, por ejemplo editando el código desde las herramientas del navegador o modificando directamente los datos guardados. Sirve para ayudar al usuario a corregir errores, pero no para proteger el sistema. Si hubiera un servidor, este tendría que volver a validar todos los datos.

## 4. Enlaces externos con rel="noopener noreferrer"; solo http o https

**Cómo se cumple:** Las páginas del sitio no tienen enlaces externos. Los enlaces a otras direcciones solo están en el README y en las fichas (PR y referencias).

**Evidencia:** `git grep -n "https\?://"` solo devuelve líneas del README y de `docs/`.

## 5. localStorage solo para datos no sensibles

**Cómo se cumple:** El proyecto guarda en localStorage únicamente la lista de alertas, que son datos ficticios. Se guarda como texto JSON (con `JSON.stringify`) bajo la clave "alertasSOC" y se lee de nuevo con `JSON.parse`.

**Límites:** localStorage no sirve para guardar secretos porque cualquier persona que use ese navegador puede verlo y modificarlo desde las herramientas del desarrollador, no está cifrado, y cualquier script de la misma página puede leerlo (por ejemplo, si hubiera un ataque XSS). Además, solo guarda texto, tiene un tamaño máximo de unos 5 MB y se borra si el usuario limpia los datos del navegador. Por eso no se guardan contraseñas, claves ni datos personales reales.

## 6. Política de contenido en `<meta>` y sin scripts de terceros

**Cómo se cumple:** Las 3 páginas incluyen la etiqueta `Content-Security-Policy`, que solo permite cargar scripts, estilos e imágenes del propio sitio. Todos los scripts son archivos de la carpeta `js/`.

**Evidencia:** `git grep -n "Content-Security-Policy"` devuelve una línea por página, y `git grep -n "<script"` muestra que todos los scripts apuntan a `js/`.