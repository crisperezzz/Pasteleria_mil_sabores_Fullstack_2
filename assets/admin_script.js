// Funciones generales
document.addEventListener("DOMContentLoaded", () => {
  const btnInventario = document.getElementById("btnInventario");

  if (btnInventario) {
    btnInventario.addEventListener("click", () => {
      alert("Inventario actualizado 🍰");
    });
  }
});
