const btnMenu = document.getElementById("btnMenu");
const menuLista = document.getElementById("menuLista");

if (btnMenu && menuLista) {
  btnMenu.addEventListener("click", function () {
    const abierto = menuLista.classList.toggle("abierto");
    btnMenu.setAttribute("aria-expanded", abierto);
  });
}