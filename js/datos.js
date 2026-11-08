// datos.js  (Ana María)
// Aquí se LEE y se GUARDA en localStorage. Este archivo NO toca la pantalla.
//
// Cada alerta es un objeto así (todos los textos van en minúscula, tal como los <option> del HTML):
// {
//   id: "ALT-001",
//   fuente: "firewall" | "antivirus" | "ids" | "correo",
//   severidad: "baja" | "media" | "alta" | "critica",
//   activo: "SRV-WEB-01",
//   descripcion: "texto de 10 a 300 caracteres",
//   fecha: "2026-11-04T09:15",
//   responsable: "Analista Uno",
//   estado: "abierta" | "en-revision" | "cerrada",
//   notaCierre: ""            (se usará en la Etapa 4)
// }

const CLAVE_ALERTAS = "alertasSOC";

// Lee la lista completa. Si no hay nada guardado, devuelve una lista vacía.
function obtenerAlertas() {
  try {
    const texto = localStorage.getItem(CLAVE_ALERTAS);
    return texto ? JSON.parse(texto) : [];
  } catch (error) {
    return [];
  }
}

// Guarda la lista completa (la convierte a texto JSON).
function guardarAlertas(lista) {
  localStorage.setItem(CLAVE_ALERTAS, JSON.stringify(lista));
}

// Crea el siguiente identificador: ALT-001, ALT-002, ...
function generarId(lista) {
  let mayor = 0;
  lista.forEach(function (alerta) {
    const numero = parseInt(alerta.id.replace("ALT-", ""), 10);
    if (numero > mayor) mayor = numero;
  });
  return "ALT-" + String(mayor + 1).padStart(3, "0");
}

// Agrega una alerta nueva y la devuelve.
function agregarAlerta(datos) {
  const lista = obtenerAlertas();
  const nueva = Object.assign({ id: generarId(lista), notaCierre: "" }, datos);
  lista.push(nueva);
  guardarAlertas(lista);
  return nueva;
}

// Busca una alerta por su id (o devuelve null).
function buscarAlerta(id) {
  const encontrada = obtenerAlertas().find(function (a) { return a.id === id; });
  return encontrada || null;
}

// Cambia algunos campos de una alerta. Ejemplo: actualizarAlerta("ALT-001", { estado: "cerrada" })
function actualizarAlerta(id, cambios) {
  const lista = obtenerAlertas();
  const posicion = lista.findIndex(function (a) { return a.id === id; });
  if (posicion === -1) return null;
  lista[posicion] = Object.assign({}, lista[posicion], cambios);
  guardarAlertas(lista);
  return lista[posicion];
}

// Borra una alerta.
function eliminarAlerta(id) {
  const lista = obtenerAlertas().filter(function (a) { return a.id !== id; });
  guardarAlertas(lista);
}

// Devuelve todas las alertas como texto JSON bonito (para exportar).
function exportarComoTexto() {
  return JSON.stringify(obtenerAlertas(), null, 2);
}

// Agrega 10 alertas ficticias de ejemplo. Si ya se cargaron antes, no las repite.
// Devuelve cuántas agregó.
function cargarEjemplos() {
  const lista = obtenerAlertas();
  if (lista.some(function (a) { return a.ejemplo; })) return 0;

  const ejemplos = [
    ["firewall",  "critica", "SRV-WEB-01",  "Múltiples intentos de conexión bloqueados desde una IP de documentación.", "2026-11-04T09:15", "Analista Uno",  "abierta"],
    ["correo",    "media",   "PC-CONTA-03", "Correo sospechoso con adjunto reportado por el usuario.",                  "2026-11-04T08:40", "Analista Dos",  "en-revision"],
    ["antivirus", "baja",    "PC-RRHH-07",  "Archivo de adware eliminado automáticamente.",                             "2026-11-03T17:05", "Analista Uno",  "cerrada"],
    ["ids",       "alta",    "SRV-BD-02",   "Patrón de escaneo de puertos detectado hacia el servidor de base de datos.", "2026-11-03T14:30", "Analista Tres", "en-revision"],
    ["firewall",  "media",   "RTR-SEDE-01", "Regla de acceso modificada fuera del horario habitual.",                   "2026-11-03T11:20", "Analista Dos",  "abierta"],
    ["antivirus", "critica", "PC-GERENCIA-01", "Ransomware simulado detectado en la carpeta de documentos.",             "2026-11-02T16:45", "Analista Tres", "cerrada"],
    ["correo",    "alta",    "PC-VENTAS-05", "Campaña de phishing que suplanta al área de sistemas.",                   "2026-11-02T10:10", "Analista Uno",  "abierta"],
    ["ids",       "baja",    "SRV-ARCH-03", "Tráfico inusual pero dentro de los límites esperados.",                    "2026-11-01T19:00", "Analista Dos",  "cerrada"],
    ["firewall",  "alta",    "SRV-VPN-01",  "Varios inicios de sesión fallidos en la VPN desde un país inusual.",        "2026-11-01T13:25", "Analista Tres", "en-revision"],
    ["antivirus", "media",   "LAP-DOCENTE-02", "Programa potencialmente no deseado encontrado en descargas.",            "2026-10-31T09:50", "Analista Uno",  "abierta"]
  ];

  ejemplos.forEach(function (e) {
    lista.push({
      id: generarId(lista),
      fuente: e[0], severidad: e[1], activo: e[2], descripcion: e[3],
      fecha: e[4], responsable: e[5], estado: e[6],
      notaCierre: e[6] === "cerrada" ? "Revisada y cerrada (ejemplo)." : "",
      ejemplo: true
    });
  });
  guardarAlertas(lista);
  return ejemplos.length;
}
