# S11: CSS

**Qué regla gana cuando dos selectores compiten:**
Cuando dos reglas de CSS afectan al mismo elemento, gana la más específica (etiqueta, clase, id); si empatan, gana la última escrita. Por ejemplo, "nav a[aria-current="page"]" pesa más que "nav a", por eso el enlace de la página activa sale en negrita.

**Diferencia entre content-box y border-box:**
Con content-box el padding y el borde se suman por fuera y la caja crece; con border-box van dentro y no crece. Usamos border-box para que los campos al 100% no se salgan de la pantalla en el móvil.

**Cómo funcionan Flexbox, Grid y una media query:**
Flexbox ordena elementos en una sola línea (fila o columna); lo usamos en el menú horizontal. Grid los ordena en filas y columnas a la vez; lo usamos en contadores y tarjetas. Una media query es una condición: "si la pantalla mide al menos 601 px, aplica esta regla", así el diseño cambia entre móvil, tablet y escritorio.