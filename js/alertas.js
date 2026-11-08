// alertas.js  (Etapa 4: estados de la interfaz, cuadro de cierre y avisos)
// Página Alertas: tarjetas, búsqueda, filtros, orden, cambio de estado y eliminar.

const contenedor = document.getElementById("lista-alertas");

if (contenedor) {
  const ORDEN_SEVERIDAD = { critica: 0, alta: 1, media: 2, baja: 3 };

  const vacioSinDatos = document.getElementById("vacio-sin-datos");
  const vacioSinResultados = document.getElementById("vacio-sin-resultados");
  const resumenLista = document.getElementById("resumen-lista");
  const aviso = document.getElementById("aviso");
  const btnEjemplo = document.getElementById("btn-ejemplo");
  const btnExportar = document.getElementById("btn-exportar");
  const btnLimpiar = document.getElementById("btn-limpiar");

  // Cuadro de cierre
  const dialogo = document.getElementById("dialogo-cierre");
  const formCierre = document.getElementById("form-cierre");
  const textoDialogo = document.getElementById("texto-dialogo");
  const campoResp = document.getElementById("campo-resp");
  const inputResp = document.getElementById("cierre-responsable");
  const inputNota = document.getElementById("cierre-nota");
  const errorResp = document.getElementById("error-cierre-responsable");
  const errorNota = document.getElementById("error-cierre-nota");
  let idCierre = null;           // alerta que se está cerrando
  let necesitaResponsable = false;
  let temporizadorAviso = null;

  // ---------- Avisos de éxito (se leen con lector de pantalla y desaparecen solos) ----------
  function avisar(texto) {
    aviso.textContent = texto;
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function () { aviso.textContent = ""; }, 6000);
  }

  // ---------- Filtrar y ordenar ----------
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

  function ordenar(lista) {
    const orden = document.getElementById("orden").value;
    return lista.slice().sort(function (a, b) {
      if (orden === "severidad") {
        return ORDEN_SEVERIDAD[a.severidad] - ORDEN_SEVERIDAD[b.severidad] || b.fecha.localeCompare(a.fecha);
      }
      if (orden === "fecha-asc") return a.fecha.localeCompare(b.fecha);
      return b.fecha.localeCompare(a.fecha);
    });
  }

  // ---------- Dibujar ----------
  function mostrarAlertas() {
    const todas = obtenerAlertas();
    const lista = ordenar(filtrar(todas));

    contenedor.textContent = "";
    lista.forEach(function (alerta) {
      contenedor.appendChild(crearTarjeta(alerta, {
        alCambiarEstado: cambiarEstado,
        alEliminar: eliminar
      }));
    });

    // Estados de la interfaz: vacío (sin datos), vacío (sin resultados) y contador
    vacioSinDatos.hidden = todas.length !== 0;
    vacioSinResultados.hidden = !(todas.length > 0 && lista.length === 0);
    resumenLista.textContent = todas.length === 0 ? "" :
      "Mostrando " + lista.length + " de " + todas.length + " alertas.";

    // Estados: botones deshabilitados cuando no tienen sentido
    btnExportar.disabled = todas.length === 0;
    btnExportar.title = todas.length === 0 ? "No hay alertas para exportar" : "";
    const ejemplosCargados = todas.some(function (a) { return a.ejemplo; });
    btnEjemplo.disabled = ejemplosCargados;
    btnEjemplo.title = ejemplosCargados ? "Los datos de ejemplo ya están cargados" : "";
  }

  // Devuelve el foco al selector de estado de la alerta (importante para quien usa teclado).
  function enfocarEstado(id) {
    const selector = document.getElementById("estado-" + id);
    if (selector) selector.focus();
  }

  // ---------- Cambiar estado ----------
  function cambiarEstado(id, nuevoEstado) {
    if (nuevoEstado === "cerrada") {
      abrirDialogoCierre(id);   // las reglas de cierre se piden en el cuadro
      return;
    }
    actualizarAlerta(id, { estado: nuevoEstado, notaCierre: "" });
    avisar("Alerta " + id + ": estado cambiado a " + NOMBRE_ESTADO[nuevoEstado] + ".");
    mostrarAlertas();
    enfocarEstado(id);
  }

  // ---------- Cuadro de cierre (reglas propias) ----------
  function limpiarErroresCierre() {
    errorResp.textContent = "";
    errorNota.textContent = "";
    inputResp.removeAttribute("aria-invalid");
    inputNota.removeAttribute("aria-invalid");
  }

  function abrirDialogoCierre(id) {
    const alerta = buscarAlerta(id);
    if (!alerta) return;

    idCierre = id;
    necesitaResponsable = alerta.severidad === "critica" && (alerta.responsable || "").trim() === "";
    campoResp.hidden = !necesitaResponsable;
    inputResp.value = "";
    inputNota.value = alerta.notaCierre || "";
    limpiarErroresCierre();

    textoDialogo.textContent = necesitaResponsable
      ? "La alerta " + id + " es crítica y no tiene responsable. Para cerrarla, asigna un analista y escribe la nota de cierre."
      : "Vas a cerrar la alerta " + id + ". Escribe la nota de cierre.";

    dialogo.showModal();
    (necesitaResponsable ? inputResp : inputNota).focus();
  }

  formCierre.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const alerta = buscarAlerta(idCierre);
    if (!alerta) return;

    const responsable = necesitaResponsable ? inputResp.value.trim() : (alerta.responsable || "");
    const nota = inputNota.value.trim();
    const errores = errorCierre(alerta.severidad, responsable, nota);

    errorResp.textContent = errores.responsable || "";
    errorNota.textContent = errores.notaCierre || "";
    inputResp.toggleAttribute("aria-invalid", Boolean(errores.responsable));
    inputNota.toggleAttribute("aria-invalid", Boolean(errores.notaCierre));

    if (errores.responsable) { inputResp.focus(); return; }
    if (errores.notaCierre) { inputNota.focus(); return; }

    actualizarAlerta(idCierre, { estado: "cerrada", responsable: responsable, notaCierre: nota });
    avisar("Alerta " + idCierre + " cerrada correctamente.");
    dialogo.close();
  });

  document.getElementById("cancelar-cierre").addEventListener("click", function () {
    dialogo.close();
  });

  // Al cerrarse el cuadro (por cerrar, cancelar o tecla Esc) se redibuja la lista.
  // Así el selector vuelve a su valor real si se canceló.
  dialogo.addEventListener("close", function () {
    const id = idCierre;
    idCierre = null;
    mostrarAlertas();
    if (id) enfocarEstado(id);
  });

  // ---------- Eliminar (con confirmación) ----------
  function eliminar(id) {
    if (confirm("¿Seguro que quieres eliminar la alerta " + id + "? Esta acción no se puede deshacer.")) {
      eliminarAlerta(id);
      avisar("Alerta " + id + " eliminada.");
      mostrarAlertas();
    }
  }

  // ---------- Eventos ----------
  ["busqueda", "filtro-fuente", "filtro-severidad", "filtro-estado", "orden"].forEach(function (idCampo) {
    document.getElementById(idCampo).addEventListener("input", mostrarAlertas);
  });

  btnLimpiar.addEventListener("click", function () {
    document.getElementById("busqueda").value = "";
    document.getElementById("filtro-fuente").value = "";
    document.getElementById("filtro-severidad").value = "";
    document.getElementById("filtro-estado").value = "";
    document.getElementById("orden").value = "fecha-desc";
    mostrarAlertas();
    document.getElementById("busqueda").focus();
  });

  btnEjemplo.addEventListener("click", function () {
    const cantidad = cargarEjemplos();
    avisar(cantidad > 0 ? "Se cargaron " + cantidad + " alertas de ejemplo." : "Los datos de ejemplo ya estaban cargados.");
    mostrarAlertas();
  });

  btnExportar.addEventListener("click", function () {
    const archivo = new Blob([exportarComoTexto()], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "alertas-soc.json";
    enlace.click();
    URL.revokeObjectURL(enlace.href);
    avisar("Se exportaron " + obtenerAlertas().length + " alertas a alertas-soc.json.");
  });

  // Si se llegó desde la edición, se avisa que se guardó.
  const idEditada = new URLSearchParams(window.location.search).get("editada");
  if (idEditada) avisar("Alerta " + idEditada + " actualizada correctamente.");

  mostrarAlertas();
}
