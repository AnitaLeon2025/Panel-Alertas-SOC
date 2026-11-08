// reglas.js  (Etapa 4)
// Las 2 reglas propias del proyecto, en un solo lugar para usarlas en
// registrar.html (formulario) y en alertas.html (cuadro de cierre).
//
//  Regla 1: una alerta CRÍTICA no puede cerrarse sin analista responsable.
//  Regla 2: al cerrar cualquier alerta hay que escribir una nota de cierre.
//
// Devuelve un objeto con los errores: { responsable: "mensaje", notaCierre: "mensaje" }
// Si no hay errores, devuelve un objeto vacío {}.

function errorCierre(severidad, responsable, nota) {
  const errores = {};

  if (severidad === "critica" && String(responsable || "").trim() === "") {
    errores.responsable = "Una alerta crítica no se puede cerrar sin un analista responsable.";
  }

  const largo = String(nota || "").trim().length;
  if (largo < 5 || largo > 200) {
    errores.notaCierre = "Escribe una nota de cierre de 5 a 200 caracteres (tiene " + largo + ").";
  }

  return errores;
}
