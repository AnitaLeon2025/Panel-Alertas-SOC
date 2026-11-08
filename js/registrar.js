// registrar.js  (Etapa 4: validación accesible + reglas de cierre)
// Maneja el formulario de registrar.html: validar, guardar y también EDITAR.
// Para editar se entra con registrar.html?editar=ALT-001

const formulario = document.getElementById("formAlerta");

if (formulario) {
  const CAMPOS = ["fuente", "severidad", "activo", "descripcion", "fecha", "responsable", "estado", "notaCierre"];
  const parametros = new URLSearchParams(window.location.search);
  const idEditando = parametros.get("editar");   // null si es una alerta nueva

  const mensajeExito = document.getElementById("mensaje-exito");
  const mensajeError = document.getElementById("mensaje-error-form");
  const grupoNota = document.getElementById("grupo-nota");
  const campoEstado = document.getElementById("estado");
  const campoDescripcion = document.getElementById("descripcion");
  const contadorDescripcion = document.getElementById("ayuda-descripcion");

  // Vincula cada campo con su ayuda y su mensaje de error (aria-describedby),
  // para que un lector de pantalla los lea junto al campo.
  CAMPOS.forEach(function (campo) {
    const ids = [];
    if (document.getElementById("ayuda-" + campo)) ids.push("ayuda-" + campo);
    ids.push("error-" + campo);
    document.getElementById(campo).setAttribute("aria-describedby", ids.join(" "));
  });

  function fechaActual() {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    return ahora.toISOString().slice(0, 16);
  }

  // Muestra u oculta la nota de cierre según el estado elegido.
  function actualizarNota() {
    grupoNota.hidden = campoEstado.value !== "cerrada";
  }

  // Cuenta los caracteres de la descripción mientras se escribe.
  function actualizarContador() {
    contadorDescripcion.textContent = campoDescripcion.value.length + " / 300 caracteres";
  }

  function llenarFormulario(alerta) {
    CAMPOS.forEach(function (campo) {
      document.getElementById(campo).value = alerta[campo] || "";
    });
    actualizarNota();
    actualizarContador();
  }

  // Revisa los campos. Devuelve { campo: "mensaje" } solo con los que están mal.
  function validar(datos) {
    const errores = {};
    if (!datos.fuente) errores.fuente = "Selecciona una fuente.";
    if (!datos.severidad) errores.severidad = "Selecciona la severidad.";
    if (datos.activo.length < 2 || datos.activo.length > 40) {
      errores.activo = "Escribe el activo afectado (2 a 40 caracteres).";
    }
    if (datos.descripcion.length < 10 || datos.descripcion.length > 300) {
      errores.descripcion = "La descripción debe tener entre 10 y 300 caracteres (tiene " + datos.descripcion.length + ").";
    }
    if (!datos.fecha) errores.fecha = "Indica la fecha y hora.";
    if (!datos.estado) errores.estado = "Selecciona el estado.";

    // Reglas propias (están en reglas.js)
    if (datos.estado === "cerrada") {
      Object.assign(errores, errorCierre(datos.severidad, datos.responsable, datos.notaCierre));
    }
    return errores;
  }

  // Pone el mensaje junto a cada campo y marca el campo con aria-invalid.
  // Devuelve el primer campo con error (para llevarle el foco).
  function mostrarErrores(errores) {
    let primero = null;
    CAMPOS.forEach(function (campo) {
      const input = document.getElementById(campo);
      const lugar = document.getElementById("error-" + campo);
      const mensaje = errores[campo] || "";
      lugar.textContent = mensaje;
      if (mensaje) {
        input.setAttribute("aria-invalid", "true");
        if (!primero) primero = input;
      } else {
        input.removeAttribute("aria-invalid");
      }
    });
    return primero;
  }

  // Al escribir en un campo, se quita su error (el usuario ya lo está corrigiendo).
  CAMPOS.forEach(function (campo) {
    document.getElementById(campo).addEventListener("input", function () {
      document.getElementById("error-" + campo).textContent = "";
      document.getElementById(campo).removeAttribute("aria-invalid");
    });
  });
  campoEstado.addEventListener("change", actualizarNota);
  campoDescripcion.addEventListener("input", actualizarContador);

  // Al abrir la página:
  if (idEditando) {
    const alerta = buscarAlerta(idEditando);
    if (alerta) {
      llenarFormulario(alerta);
      document.getElementById("titulo-form").textContent = "Editar alerta " + idEditando;
      document.getElementById("guardarBtn").textContent = "Guardar cambios";
    } else {
      mensajeError.textContent = "No se encontró la alerta " + idEditando + ".";
    }
  } else {
    document.getElementById("fecha").value = fechaActual();
    actualizarNota();
    actualizarContador();
  }

  // Al enviar el formulario:
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensajeExito.textContent = "";
    mensajeError.textContent = "";

    const datos = {};
    CAMPOS.forEach(function (campo) {
      datos[campo] = document.getElementById(campo).value.trim();
    });
    if (datos.estado !== "cerrada") datos.notaCierre = "";

    const errores = validar(datos);
    const primerCampo = mostrarErrores(errores);
    const cantidad = Object.keys(errores).length;

    if (cantidad > 0) {
      mensajeError.textContent = "No se guardó: hay " + cantidad + (cantidad === 1 ? " campo" : " campos") + " con errores. Revisa los mensajes.";
      primerCampo.focus();   // lleva el teclado al primer error
      return;
    }

    if (idEditando) {
      actualizarAlerta(idEditando, datos);
      window.location.href = "alertas.html?editada=" + encodeURIComponent(idEditando);
    } else {
      const nueva = agregarAlerta(datos);
      mensajeExito.textContent = "Alerta " + nueva.id + " guardada correctamente.";
      formulario.reset();
      document.getElementById("fecha").value = fechaActual();
      actualizarNota();
      actualizarContador();
    }
  });
}
