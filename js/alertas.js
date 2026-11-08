// alertas.js  (Ana Paula)
// Página Alertas: muestra tarjetas, busca, filtra, ordena, cambia estado y elimina.

const contenedor = document.getElementById("lista-alertas");

if (contenedor) {
  const ORDEN_SEVERIDAD = { critica: 0, alta: 1, media: 2, baja: 3 };
  const mensajeVacio = document.getElementById("mensaje-vacio");

  // Paso 1: filtrar según lo que el usuario eligió.
  function filtrar(lista) {
    const texto = document.getElementById("busqueda").value.trim().toLowerCase();
    const fuente = document.getElementById("filtro-fuente").value;
    const severidad = document.getElementById("filtro-severidad").value;
    const estado = document.getElementById("filtro-estado").value;

    return lista.filter(function (a) {
      const coincideTexto = texto === "" ||
        a.activo.toLowerCase().includes(texto) ||
        a.descripcion.toLowerCase().includes(texto) ||
        (a.responsable || "").toLowerCase().includes(texto);
      return coincideTexto &&
        (fuente === "" || a.fuente === fuente) &&
        (severidad === "" || a.severidad === severidad) &&
        (estado === "" || a.estado === estado);
    });
  }

  // Paso 2: ordenar.
  function ordenar(lista) {
    const orden = document.getElementById("orden").value;
    return lista.slice().sort(function (a, b) {
      if (orden === "severidad") {
        // primero las críticas; si empatan, la más reciente primero
        return ORDEN_SEVERIDAD[a.severidad] - ORDEN_SEVERIDAD[b.severidad] || b.fecha.localeCompare(a.fecha);
      }
      if (orden === "fecha-asc") return a.fecha.localeCompare(b.fecha);
      return b.fecha.localeCompare(a.fecha);   // fecha-desc (por defecto)
    });
  }

  // Paso 3: dibujar las tarjetas.
  function mostrarAlertas() {
    const lista = ordenar(filtrar(obtenerAlertas()));
    contenedor.textContent = "";   // vacía el contenedor
    mensajeVacio.hidden = lista.length > 0;

    lista.forEach(function (alerta) {
      contenedor.appendChild(crearTarjeta(alerta, {
        alCambiarEstado: cambiarEstado,
        alEliminar: eliminar
      }));
    });
  }

  function cambiarEstado(id, nuevoEstado) {
    // E4 (Ana María): aquí irán las reglas "crítica cerrada exige responsable" y "nota de cierre".
    actualizarAlerta(id, { estado: nuevoEstado });
    mostrarAlertas();
  }

  function eliminar(id) {
    if (confirm("¿Seguro que quieres eliminar la alerta " + id + "?")) {
      eliminarAlerta(id);
      mostrarAlertas();
    }
  }

  // Cada vez que cambia un filtro, se vuelve a dibujar.
  ["busqueda", "filtro-fuente", "filtro-severidad", "filtro-estado", "orden"].forEach(function (idCampo) {
    document.getElementById(idCampo).addEventListener("input", mostrarAlertas);
  });

  document.getElementById("btn-ejemplo").addEventListener("click", function () {
    const cantidad = cargarEjemplos();
    alert(cantidad > 0 ? "Se cargaron " + cantidad + " alertas de ejemplo." : "Los datos de ejemplo ya estaban cargados.");
    mostrarAlertas();
  });

  document.getElementById("btn-exportar").addEventListener("click", function () {
    const archivo = new Blob([exportarComoTexto()], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "alertas-soc.json";
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  });

  mostrarAlertas();
}
