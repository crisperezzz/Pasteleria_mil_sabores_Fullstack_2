// Funciones generales
document.addEventListener("DOMContentLoaded", () => {
  const btnInventario = document.getElementById("btnInventario");

  if (btnInventario) {
    btnInventario.addEventListener("click", () => {
      alert("Inventario actualizado 🍰");
    });
  }
});
//validacion del nuevo producto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");

  form.addEventListener("submit", (e) => {
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
      alert("✅ Producto guardado correctamente.");
      form.reset();
    }
  });
});

//validación de nuevo usuario
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
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

  // Cargar comunas según región
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

  // Validar RUN chileno
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

  // Validar correo
  function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  // Validar formulario completo
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    // Validar RUN
    if (!validarRUN(runInput.value)) {
      errorRun.textContent = "RUN inválido";
      valido = false;
    } else {
      errorRun.textContent = "";
    }

    // Validar correo
    if (!validarCorreo(correoInput.value)) {
      errorCorreo.textContent = "Correo inválido";
      valido = false;
    } else {
      errorCorreo.textContent = "";
    }

    // Validar selects
    if (regionSelect.value === "" || comunaSelect.value === "" || document.getElementById("tipo").value === "") {
      alert("Debe seleccionar tipo de usuario, región y comuna");
      valido = false;
    }

    // Validar campos vacíos
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
      form.reset();
      comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
    }
  });
});
