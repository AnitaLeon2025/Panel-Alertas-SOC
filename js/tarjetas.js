// tarjetas.js  (Ana Paula)
// Construye la tarjeta de una alerta. Se usa en el Panel y en Alertas.
// IMPORTANTE (seguridad): todo texto va con textContent, NUNCA con innerHTML.

const NOMBRE_SEVERIDAD = { critica: "Crítica", alta: "Alta", media: "Media", baja: "Baja" };
const NOMBRE_ESTADO = { abierta: "Abierta", "en-revision": "En revisión", cerrada: "Cerrada" };
const NOMBRE_FUENTE = { firewall: "Firewall", antivirus: "Antivirus", ids: "IDS", correo: "Correo" };

// Crea un elemento con texto: elemento("p", "Hola", "clase")
function elemento(etiqueta, texto, clase) {
  const nodo = document.createElement(etiqueta);
  if (texto !== undefined) nodo.textContent = texto;
  if (clase) nodo.className = clase;
  return nodo;
}

// acciones = null  -> tarjeta simple (Panel)
// acciones = { alCambiarEstado(id, nuevoEstado), alEliminar(id) } -> tarjeta con botones (Alertas)
function crearTarjeta(alerta, acciones) {
  const tarjeta = elemento("article", undefined, "tarjeta sev-" + alerta.severidad);

  const cabecera = elemento("div", undefined, "tarjeta-cabecera");
  cabecera.appendChild(elemento("span", NOMBRE_SEVERIDAD[alerta.severidad], "insignia sev-" + alerta.severidad));
  cabecera.appendChild(elemento("span", NOMBRE_FUENTE[alerta.fuente] + " · " + alerta.id));
  tarjeta.appendChild(cabecera);

  tarjeta.appendChild(elemento("h3", alerta.activo));
  tarjeta.appendChild(elemento("p", alerta.descripcion));
  tarjeta.appendChild(elemento("p", "Fecha: " + alerta.fecha.replace("T", " "), "dato"));
  tarjeta.appendChild(elemento("p", "Responsable: " + (alerta.responsable || "sin asignar"), "dato"));

  if (!acciones) {
    tarjeta.appendChild(elemento("p", "Estado: " + NOMBRE_ESTADO[alerta.estado], "dato"));
    return tarjeta;
  }

  // --- Solo en la página Alertas: cambiar estado, editar y eliminar ---
  const campo = elemento("div", undefined, "campo");
  const etiqueta = elemento("label", "Estado");
  const selector = document.createElement("select");
  etiqueta.htmlFor = "estado-" + alerta.id;
  selector.id = "estado-" + alerta.id;
  Object.keys(NOMBRE_ESTADO).forEach(function (valor) {
    const opcion = elemento("option", NOMBRE_ESTADO[valor]);
    opcion.value = valor;
    if (valor === alerta.estado) opcion.selected = true;
    selector.appendChild(opcion);
  });
  selector.addEventListener("change", function () {
    acciones.alCambiarEstado(alerta.id, selector.value);
  });
  campo.appendChild(etiqueta);
  campo.appendChild(selector);
  tarjeta.appendChild(campo);

  const botones = elemento("div", undefined, "acciones");
  const editar = elemento("a", "Editar", "boton-enlace");
  editar.href = "registrar.html?editar=" + encodeURIComponent(alerta.id);
  const eliminar = elemento("button", "Eliminar", "btn-peligro");
  eliminar.type = "button";
  eliminar.addEventListener("click", function () {
    acciones.alEliminar(alerta.id);
  });
  botones.appendChild(editar);
  botones.appendChild(eliminar);
  tarjeta.appendChild(botones);

  return tarjeta;
}
