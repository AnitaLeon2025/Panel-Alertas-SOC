# Evaluación de 5 heurísticas de Nielsen (Panel de alertas SOC)

> Plantilla: completa cada heurística con lo que TÚ observaste al usar la web.

Para cada una escribe: qué problema o acierto viste (con la página y el elemento), por qué
incumple o cumple la heurística, y qué mejora hiciste o harías.

## Visibilidad del estado del sistema
- **Dónde lo vi:** Página Alertas, al cerrar una alerta y en la línea que está encima de las tarjetas.
- **Qué observé:** Cuando cierro una alerta aparece un aviso verde que dice que se cerró, y la línea
  "Mostrando 10 de 10 alertas" cambia cuando uso los filtros. Así la persona sabe qué pasó
  sin tener que adivinar. Cumple la heurística porque el sistema informa lo que está ocurriendo.
- **Mejora:** El aviso desaparece solo a los 6 segundos; si la persona se distrae, no lo alcanza a leer.
  Se podría agregar un botón para cerrarlo a mano.

## Coincidencia entre el sistema y el mundo real
- **Dónde lo vi:** En `alertas.html`, en el selector de Estado de cada tarjeta, y en `registrar.html`,
  en los campos Fuente, Severidad y Estado.
- **Qué observé:** La web usa las palabras que un analista de seguridad ya usa en su trabajo:
  "Firewall", "IDS", "Antivirus", y estados como "Abierta", "En revisión" y "Cerrada". Además, el
  programa guarda internamente el estado como `en-revision`, pero en pantalla se ve "En revisión",
  así que la persona lee lenguaje normal y no códigos. Cumple la heurística porque el sistema habla
  el idioma de quien lo usa.
- **Mejora:** Los niveles de severidad (Baja, Media, Alta, Crítica) aparecen sin explicación. Se podría
  agregar un texto de ayuda debajo del campo Severidad en `registrar.html` que diga en una línea
  cuándo usar cada nivel, para que alguien nuevo en el SOC no tenga que adivinar la diferencia.

## Control y libertad del usuario
- **Dónde lo vi:** En las opciones para editar, filtrar o cambiar el estado de las alertas.
- **Qué observé:** El usuario puede modificar filtros, realizar búsquedas y actualizar información fácilmente. Esto le permite corregir acciones o cambiar la visualización según sus necesidades.
- **Mejora:** Incorporar una opción para deshacer cambios recientes, especialmente cuando se modifica o elimina una alerta.

## Prevención de errores
- **Dónde lo vi:** En `registrar.html` (formulario) y en `alertas.html` (botones de eliminar,
  exportar y cargar ejemplos).
- **Qué observé:** La web evita varios errores antes de que pasen. En el formulario, Fuente,
  Severidad y Estado son listas desplegables, así que no se puede escribir un valor inválido; la
  fecha se elige con el selector de fecha y hora; y la descripción tiene un límite de 300
  caracteres con un contador. En Alertas, el botón Eliminar pregunta antes de borrar, Exportar
  JSON se desactiva si no hay alertas y Cargar datos de ejemplo se desactiva cuando ya están
  cargados. Además, una alerta crítica no se puede cerrar sin responsable. Cumple la heurística
  porque el sistema impide el error en vez de esperar a que la persona se equivoque.
- **Mejora:** Mostrar ejemplos de formato correcto mientras se completan los campos para disminuir aún más la posibilidad de errores.

## Consistencia y estándares
- **Dónde lo vi**: En el menú de navegación, botones y diseño general de las páginas.
- **Qué observé:** Los colores, estilos y estructura visual se mantienen similares en todas las páginas del proyecto. Esto facilita la navegación y reduce el tiempo necesario para aprender a usar el sistema.
- **Mejora:** Unificar algunos nombres que cambian entre páginas. Por ejemplo, el menú dice
  "Registrar alerta" pero el título de esa página dice "Registrar Alertas", y el formulario pide
  "Analista responsable" mientras la tarjeta muestra solo "Responsable". Usar siempre las mismas
  palabras evitaría dudas.

## Fuentes
Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. En *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94)* (pp. 152-158). ACM.

Nielsen Norman Group. (s. f.). *10 usability heuristics for user interface design*. https://www.nngroup.com/
