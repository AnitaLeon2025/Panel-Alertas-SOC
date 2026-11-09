# Pruebas manuales

Proyecto: Panel de Alertas SOC · Equipo 3
Navegador usado: Microsoft Edge
Fecha de las pruebas: 09 de noviembre de 2026

| N.º | Caso | Pasos | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| 1 | Cargar datos de ejemplo | Alertas → pulsar "Cargar datos de ejemplo" | Aparecen 10 tarjetas | ✔ Pasó: aparecieron 10 tarjetas |
| 2 | Los datos persisten | Registrar una alerta nueva y recargar la página con F5 | La alerta sigue en la lista | ✔ Pasó: la alerta nueva sigue en la lista después de recargar |
| 3 | Descripción demasiado corta | En Registrar, escribir "abc" en la descripción y guardar | Mensaje de error junto al campo y no se guarda | ✔ Pasó: apareció un mensaje de error junto a la descripción y no se guardó |
| 4 | Activo demasiado largo | Escribir más de 40 caracteres en Activo afectado y guardar | Mensaje de error junto al campo y no se guarda | ✔ Pasó: apareció un mensaje de error junto al campo Activo y no se guardó |
| 5 | Crítica cerrada sin responsable | Intentar cerrar una alerta crítica sin responsable | Se impide y se explica por qué | ✔ Pasó: el sistema impidió cerrarla y explicó que una alerta crítica necesita responsable |
| 6 | Cerrar con responsable | Asignar un responsable a esa alerta y cerrarla | Pide nota de cierre y el Panel actualiza los contadores | ✔ Pasó: pidió la nota de cierre y el Panel actualizó el contador de cerradas |
| 7 | Nota de cierre demasiado corta | Al cerrar una alerta, escribir "ok" en la nota | Mensaje de error y no se cierra | ✔ Pasó: mostró un error y no se cerró |
| 8 | Búsqueda y filtros | Buscar "firewall" y filtrar por severidad | Solo se ven las alertas que coinciden | ✔ Pasó: al buscar "firewall" y filtrar por severidad solo salieron las alertas que coinciden |
| 9 | Ordenar por severidad | Elegir ordenar por severidad | Las críticas aparecen primero | ✔ Pasó: con orden por severidad las críticas salieron primero |
| 10 | Editar una alerta | Pulsar Editar, cambiar el activo y guardar | Se ve el cambio en la lista | ✔ Pasó: el cambio se ve en la lista |
| 11 | Eliminar con confirmación | Pulsar Eliminar y cancelar; luego Eliminar y aceptar | Cancelar no borra; aceptar la borra | ✔ Pasó: al cancelar no se borró y al aceptar la alerta desapareció |
| 12 | Exportar JSON | Pulsar "Exportar JSON" | Se descarga un archivo con las alertas | ✔ Pasó: se descargó un archivo con las alertas |
| 13 | Texto con código | Escribir `<b>prueba</b>` en Activo afectado y guardar | Se muestra tal cual como texto, no en negrita | ✔ Pasó: la tarjeta muestra <b>prueba</b> como texto, sin negrita |
| 14 | Sin datos | Borrar los datos guardados y abrir Alertas | Aparece un mensaje claro de que no hay alertas | ✔ Pasó: en el Panel salió "Todavía no hay alertas. Registra la primera" |
| 15 | Vista móvil | Abrir con ancho de 375 px | Menú con botón, todo legible y sin scroll horizontal | ✔ Pasó: el menú se abre con el botón y no hay scroll horizontal |