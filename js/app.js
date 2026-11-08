const fuente =
document.getElementById("fuente").value;

console.log(fuente);

localStorage.setItem(
"alertas",
JSON.stringify(alertas)
);

const alertasGuardadas =
JSON.parse(
localStorage.getItem("alertas")
);