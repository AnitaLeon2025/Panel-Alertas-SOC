// registrar.js  (Ana María)
// Maneja el formulario de registrar.html: validar, guardar y también EDITAR.
// Para editar se entra con registrar.html?editar=ALT-001

const formulario = document.getElementById("formAlerta");

if (formulario) {
  const CAMPOS = ["fuente", "severidad", "activo", "descripcion", "fecha", "responsable", "estado"];
  const parametros = new URLSearchParams(window.location.search);
  const idEditando = parametros.get("editar");   // null si es una alerta nueva
  const mensajeForm = document.getElementById("mensaje-form");

  // Fecha y hora actual en el formato del campo datetime-local.
  function fechaActual() {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    return ahora.toISOString().slice(0, 16);
  }

  // Pone los valores de una alerta dentro del formulario (modo edición).
  function llenarFormulario(alerta) {
    CAMPOS.forEach(function (campo) {
      document.getElementById(campo).value = alerta[campo] || "";
    });
  }

  // Revisa los campos. Devuelve un objeto con los errores: { campo: "mensaje" }
  function validar(datos) {
    const errores = {};
    if (!datos.fuente) errores.fuente = "Selecciona una fuente.";
    if (!datos.severidad) errores.severidad = "Selecciona la severidad.";
    if (datos.activo.length < 2) errores.activo = "Escribe el activo afectado (mínimo 2 caracteres).";
    if (datos.descripcion.length < 10 || datos.descripcion.length > 300) {
      errores.descripcion = "La descripción debe tener entre 10 y 300 caracteres (tiene " + datos.descripcion.length + ").";
    }
    if (!datos.fecha) errores.fecha = "Indica la fecha y hora.";
    if (!datos.estado) errores.estado = "Selecciona el estado.";
    return errores;
  }

  // Muestra (o limpia) el mensaje de error de cada campo.
  function mostrarErrores(errores) {
    CAMPOS.forEach(function (campo) {
      const lugar = document.getElementById("error-" + campo);
      if (lugar) lugar.textContent = errores[campo] || "";
    });
  }

  // Al abrir la página:
  if (idEditando) {
    const alerta = buscarAlerta(idEditando);
    if (alerta) {
      llenarFormulario(alerta);
      document.getElementById("titulo-form").textContent = "Editar alerta " + idEditando;
      document.getElementById("guardarBtn").textContent = "Guardar cambios";
    } else {
      mensajeForm.textContent = "No se encontró la alerta " + idEditando + ".";
    }
  } else {
    document.getElementById("fecha").value = fechaActual();
  }

  // Al enviar el formulario:
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();   // evita que la página se recargue

    const datos = {};
    CAMPOS.forEach(function (campo) {
      datos[campo] = document.getElementById(campo).value.trim();
    });

    const errores = validar(datos);
    mostrarErrores(errores);
    if (Object.keys(errores).length > 0) {
      mensajeForm.textContent = "Revisa los campos marcados.";
      return;
    }

    if (idEditando) {
      actualizarAlerta(idEditando, datos);
      window.location.href = "alertas.html";   // vuelve a la lista
    } else {
      const nueva = agregarAlerta(datos);
      mensajeForm.textContent = "Alerta " + nueva.id + " guardada correctamente.";
      formulario.reset();
      document.getElementById("fecha").value = fechaActual();
    }
  });
}
