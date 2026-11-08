// panel.js  (Ana Paula)
// Panel (index.html): contadores, barra de proporción y últimas 5 alertas.

const cajaUltimas = document.getElementById("ultimas-alertas");

if (cajaUltimas) {
  const SEVERIDADES = ["critica", "alta", "media", "baja"];
  const ESTADOS = ["abierta", "en-revision", "cerrada"];

  function mostrarPanel() {
    const lista = obtenerAlertas();

    // Contadores por severidad y por estado.
    SEVERIDADES.forEach(function (sev) {
      const cantidad = lista.filter(function (a) { return a.severidad === sev; }).length;
      document.getElementById("cont-" + sev).textContent = cantidad;
    });
    ESTADOS.forEach(function (est) {
      const cantidad = lista.filter(function (a) { return a.estado === est; }).length;
      document.getElementById("cont-" + (est === "en-revision" ? "revision" : est)).textContent = cantidad;
    });

    // Barra de proporción: un tramo de color por severidad, hecho con CSS.
    const barra = document.getElementById("barra-severidad");
    barra.textContent = "";
    SEVERIDADES.forEach(function (sev) {
      const cantidad = lista.filter(function (a) { return a.severidad === sev; }).length;
      if (cantidad > 0) {
        const tramo = document.createElement("span");
        tramo.className = "sev-" + sev;
        tramo.style.width = (cantidad / lista.length * 100) + "%";
        tramo.title = NOMBRE_SEVERIDAD[sev] + ": " + cantidad;
        barra.appendChild(tramo);
      }
    });

    // Las 5 alertas más recientes.
    const recientes = lista.slice().sort(function (a, b) {
      return b.fecha.localeCompare(a.fecha);
    }).slice(0, 5);

    cajaUltimas.textContent = "";
    if (recientes.length === 0) {
      const aviso = elemento("p", "Todavía no hay alertas. ", "vacio");
      const enlace = elemento("a", "Registra la primera");
      enlace.href = "registrar.html";
      aviso.appendChild(enlace);
      cajaUltimas.appendChild(aviso);
    }
    recientes.forEach(function (alerta) {
      cajaUltimas.appendChild(crearTarjeta(alerta, null));
    });
  }

  mostrarPanel();
  // Si otra pestaña cambia los datos, el panel se actualiza solo.
  window.addEventListener("storage", mostrarPanel);
}
