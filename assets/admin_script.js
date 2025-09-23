document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Botón de inventario
  // =======================
  const btnInventario = document.getElementById("btnInventario");
  if (btnInventario) {
    btnInventario.addEventListener("click", () => {
      alert("Inventario actualizado 🍰");
    });
  }

// =======================
// Validación de nuevo producto
// =======================
  const formProducto = document.getElementById("formProducto");
  if (formProducto) {
    formProducto.addEventListener("submit", (e) => {
      e.preventDefault();

      const codigo = document.getElementById("codigo").value.trim();
      const nombre = document.getElementById("nombre").value.trim();
      const precio = parseFloat(document.getElementById("precio").value);
      const stock = parseInt(document.getElementById("stock").value);
      const stockCritico = parseInt(document.getElementById("stockCritico").value);
      const categoria = document.getElementById("categoria").value;

      let errores = [];

      if (codigo.length < 3) errores.push("El código debe tener al menos 3 caracteres.");
      if (nombre.length === 0 || nombre.length > 100) errores.push("El nombre es obligatorio y debe tener máximo 100 caracteres.");
      if (isNaN(precio) || precio < 0) errores.push("El precio debe ser un número mayor o igual a 0.");
      if (isNaN(stock) || stock < 0) errores.push("El stock debe ser un número entero mayor o igual a 0.");
      if (categoria === "") errores.push("Debes seleccionar una categoría.");

      if (!isNaN(stockCritico) && stock <= stockCritico) {
        alert("⚠️ ¡Stock crítico alcanzado!");
      }

      if (errores.length > 0) {
        alert("Errores:\n" + errores.join("\n"));
      } else {
        // ✅ Guardar producto en localStorage
        const nuevoProducto = {
          codigo,
          nombre,
          precio,
          stock,
          stockCritico,
          categoria
        };

        let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
        productosGuardados.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(productosGuardados));

        alert("✅ Producto guardado correctamente.");
        formProducto.reset();
      }
    });
  }

  // =======================
  // Validación de nuevo usuario
  // =======================
  const formUsuario = document.getElementById("formUsuario");
  if (formUsuario) {
    const runInput = document.getElementById("run");
    const correoInput = document.getElementById("correo");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const errorRun = document.getElementById("errorRun");
    const errorCorreo = document.getElementById("errorCorreo");

    const comunasPorRegion = {
      "Metropolitana": ["Puente Alto", "La Florida", "Providencia"],
      "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué"],
      "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
    };

    regionSelect.addEventListener("change", () => {
      const region = regionSelect.value;
      comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
      if (comunasPorRegion[region]) {
        comunasPorRegion[region].forEach(comuna => {
          const option = document.createElement("option");
          option.value = comuna;
          option.textContent = comuna;
          comunaSelect.appendChild(option);
        });
      }
    });

    function validarRUN(run) {
      run = run.replace(/\./g, "").replace("-", "");
      const cuerpo = run.slice(0, -1);
      const dv = run.slice(-1).toUpperCase();
      let suma = 0;
      let multiplo = 2;
      for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
      }
      const dvEsperado = 11 - (suma % 11);
      const dvFinal = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
      return dv === dvFinal;
    }

    function validarDominioCorreo(correo) {
    return correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com");}

    function validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    }

    formUsuario.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      if (!validarRUN(runInput.value)) {
        errorRun.textContent = "RUN inválido";
        valido = false;
      } else if (runInput.value.length < 7 || runInput.value.length > 9) {
        errorRun.textContent = "El RUN debe tener entre 7 y 9 caracteres";
        valido = false;
      } else {
        errorRun.textContent = "";
      }

      if (!validarCorreo(correoInput.value)) {
        errorCorreo.textContent = "Formato de correo inválido";
        valido = false;
      } else if (!validarDominioCorreo(correoInput.value)) {
        errorCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
        valido = false;
      } else {
      errorCorreo.textContent = "";
      }


      if (regionSelect.value === "" || comunaSelect.value === "" || document.getElementById("tipo").value === "") {
        alert("Debe seleccionar tipo de usuario, región y comuna");
        valido = false;
      }

      const campos = ["nombre", "apellido", "direccion"];
      campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo.value.trim() === "") {
          alert(`El campo ${id} no puede estar vacío`);
          valido = false;
        }
      });

      if (valido) {
        alert("Usuario guardado correctamente (simulado)");
        formUsuario.reset();
        comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
      }
    });
  }
});
