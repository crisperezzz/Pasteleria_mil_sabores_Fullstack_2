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
  // Validación de nuevo producto (CORREGIDO)
  // =======================
  const formProducto = document.getElementById("formProducto");
  if (formProducto) {
    formProducto.addEventListener("submit", (e) => { // QUITÉ EL ASYNC
      e.preventDefault();

      const codigo = document.getElementById("codigo").value.trim();
      const nombre = document.getElementById("nombre").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const precio = parseFloat(document.getElementById("precio").value);
      const stock = parseInt(document.getElementById("stock").value);
      const stockCritico = parseInt(document.getElementById("stockCritico").value) || 0;
      const categoria = document.getElementById("categoria").value;

      let errores = [];

      if (codigo.length < 3) errores.push("El código debe tener al menos 3 caracteres.");
      if (nombre.length === 0 || nombre.length > 100) errores.push("El nombre es obligatorio y debe tener máximo 100 caracteres.");
      if (descripcion.length > 500) errores.push("La descripción no puede exceder los 500 caracteres.");
      if (isNaN(precio) || precio < 0) errores.push("El precio debe ser un número mayor o igual a 0.");
      if (isNaN(stock) || stock < 0) errores.push("El stock debe ser un número entero mayor o igual a 0.");
      if (categoria === "") errores.push("Debes seleccionar una categoría.");

      if (!isNaN(stockCritico) && stock <= stockCritico && stockCritico > 0) {
        alert("⚠️ ¡Stock crítico alcanzado!");
      }

      if (errores.length > 0) {
        alert("Errores:\n" + errores.join("\n"));
      } else {
        const nuevoProducto = {
          codigo,
          nombre,
          descripcion,
          precio,
          stock,
          stockCritico: stockCritico || 0,
          categoria,
          // Campos para compatibilidad con la tienda
          id: Date.now(), // ID temporal
          imagen: "/assets/images/placeholder.jpg" // Imagen por defecto
        };

        // CORREGIDO: Quité el await
        const exito = guardarProducto(nuevoProducto);
        if (exito) {
          formProducto.reset();
          setTimeout(() => {
            window.location.href = "productos.html";
          }, 1000);
        }
      }
    });
  }

  // =======================
  // Validación de nuevo usuario (MANTENIENDO TODO IGUAL)
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
      "Metropolitana": ["Santiago", "Puente Alto", "La Florida", "Providencia", "Las Condes", "Maipú"],
      "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué", "Villa Alemana", "Limache"],
      "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán", "Coronel"]
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
      if (!/^[0-9]+[0-9kK]{1}$/.test(run)) return false;
      
      const cuerpo = run.slice(0, -1);
      const dv = run.slice(-1).toUpperCase();
      
      if (!/^[0-9]+$/.test(cuerpo)) return false;
      
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
      return correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com");
    }

    function validarCorreo(correo) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correo);
    }

    formUsuario.addEventListener("submit", (e) => {
      e.preventDefault();
      let valido = true;

      const runLimpio = runInput.value.replace(/\./g, "").replace("-", "");
      if (!validarRUN(runInput.value)) {
        errorRun.textContent = "RUN inválido";
        valido = false;
      } else if (runLimpio.length < 7 || runLimpio.length > 9) {
        errorRun.textContent = "El RUN debe tener entre 7 y 9 dígitos";
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
        const nuevoUsuario = {
          run: runLimpio,
          nombre: document.getElementById("nombre").value.trim(),
          apellido: document.getElementById("apellido").value.trim(),
          correo: correoInput.value.trim(),
          tipo: document.getElementById("tipo").value,
          region: regionSelect.value,
          comuna: comunaSelect.value,
          direccion: document.getElementById("direccion").value.trim(),
          fechaCreacion: new Date().toISOString()
        };

        guardarUsuario(nuevoUsuario);
        alert("✅ Usuario guardado correctamente.");
        formUsuario.reset();
        comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
        
        setTimeout(() => {
          window.location.href = "usuarios.html";
        }, 1000);
      }
    });
  }

  // Cargar datos al iniciar
  cargarProductos();
  cargarUsuarios();
});

// =======================
// FUNCIONES PRINCIPALES - CORREGIDAS
// =======================

// Cargar productos - CORREGIDO (quitado async y carga de JSON)
function cargarProductos() {
  const tabla = document.getElementById("tablaProductos");
  if (!tabla) return;

  // SOLO cargar desde localStorage
  const productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
  console.log("📦 Productos cargados:", productosLocal);
  mostrarProductosEnTabla(productosLocal);
}

// Cargar usuarios - MANTENIENDO
// Cargar usuarios - MEJORADA
async function cargarUsuarios() {
  const tabla = document.getElementById("tablaUsuarios");
  if (!tabla) return;

  try {
    // Intentar cargar usuarios desde JSON
    let usuarios = await cargarUsuariosDesdeJSON();
    console.log("👥 Usuarios cargados desde JSON:", usuarios);
    
    // Si no hay usuarios en JSON, cargar desde localStorage
    if (usuarios.length === 0) {
      usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      console.log("👥 Usuarios cargados desde localStorage:", usuarios);
    }
    
    // Si no hay usuarios en ningún lado, cargar ejemplos
    if (usuarios.length === 0) {
      usuarios = await cargarUsuariosDeEjemplo();
      console.log("👥 Usuarios cargados de ejemplo:", usuarios);
    }
    
    mostrarUsuariosEnTabla(usuarios);
    
  } catch (error) {
    console.error("Error cargando usuarios:", error);
    // Fallback a localStorage
    const usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
    mostrarUsuariosEnTabla(usuariosLocal);
  }
}

// Nueva función para cargar usuarios desde JSON
async function cargarUsuariosDesdeJSON() {
  try {
    const response = await fetch('../assets/data/usuarios.json');
    if (!response.ok) throw new Error('No se pudo cargar el JSON');
    
    const data = await response.json();
    return data.usuarios || [];
    
  } catch (error) {
    console.log("No se pudo cargar usuarios.json, usando datos locales");
    return [];
  }
}

// Función para cargar usuarios de ejemplo si no hay JSON
// Cargar usuarios - VERSIÓN SIMPLIFICADA
// Cargar usuarios - SOLO DESDE JSON (como lo piden)
async function cargarUsuarios() {
  const tabla = document.getElementById("tablaUsuarios");
  if (!tabla) return;

  try {
    // 1. Cargar ÚNICAMENTE desde el JSON
    const response = await fetch('/assets/js_admin/usuarios.json');
    
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    
    const data = await response.json();
    const usuariosJSON = data.usuarios || [];
    
    console.log("✅ Usuarios cargados desde JSON:", usuariosJSON);

    // 2. Combinar con usuarios de localStorage (evitando duplicados por RUN)
    const usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosCombinados = combinarUsuarios(usuariosJSON, usuariosLocal);
    
    // 3. Mostrar en tabla
    mostrarUsuariosEnTabla(usuariosCombinados);
    
  } catch (error) {
    console.error("Error cargando JSON:", error);
    
    // Fallback: usar solo localStorage
    const usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("✅ Usuarios cargados desde localStorage:", usuariosLocal);
    mostrarUsuariosEnTabla(usuariosLocal);
    
    alert("⚠️ No se pudo cargar el archivo de usuarios. Usando datos locales.");
  }
}

// Función para combinar sin duplicados
function combinarUsuarios(usuariosJSON, usuariosLocal) {
  const usuariosCombinados = [...usuariosJSON]; // Primero los del JSON
  
  // Agregar usuarios de localStorage que no existan en el JSON
  usuariosLocal.forEach(usuarioLocal => {
    const existeEnJSON = usuariosJSON.some(user => user.run === usuarioLocal.run);
    if (!existeEnJSON) {
      usuariosCombinados.push(usuarioLocal);
    }
  });
  
  return usuariosCombinados;
}
// =======================
// FUNCIONES GUARDAR - CORREGIDAS
// =======================

// GUARDAR PRODUCTO - CORREGIDO (quitado async)
function guardarProducto(producto) {
  try {
    let productosLocal = JSON.parse(localStorage.getItem("productos")) || [];
    
    if (productosLocal.find(p => p.codigo === producto.codigo)) {
      alert("❌ Ya existe un producto con ese código");
      return false;
    }
    
    productosLocal.push(producto);
    localStorage.setItem("productos", JSON.stringify(productosLocal));
    console.log("💾 Producto guardado:", producto);
    
    alert("✅ Producto guardado correctamente");
    return true;
    
  } catch (error) {
    alert("❌ Error: " + error.message);
    return false;
  }
}

// GUARDAR USUARIO - MANTENIENDO
function guardarUsuario(usuario) {
  let usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
  
  if (usuariosLocal.find(u => u.run === usuario.run)) {
    alert("❌ Ya existe un usuario con ese RUN");
    return false;
  }
  
  usuariosLocal.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosLocal));
  return true;
}

// =======================
// FUNCIONES ELIMINAR - CORREGIDAS
// =======================

// ELIMINAR PRODUCTO - CORREGIDO
function eliminarProducto(codigo) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.codigo === codigo);
    
    if (!producto) {
        alert('❌ No se encontró el producto con código: ' + codigo);
        return;
    }
    
    if (confirm(`¿Eliminar el producto "${producto.nombre}"?`)) {
        const nuevosProductos = productos.filter(p => p.codigo !== codigo);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
        cargarProductos(); // ACTUALIZAR LA TABLA
        alert('✅ Producto eliminado correctamente');
    }
}

// ELIMINAR USUARIO - CORREGIDA (sin await)
function eliminarUsuario(run) {
    // Obtener usuarios de localStorage
    const usuariosLocal = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuariosLocal.find(u => u.run === run);
    
    if (usuario) {
        // Usuario está en localStorage - eliminar normalmente
        if (confirm(`¿Eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`)) {
            const nuevosUsuarios = usuariosLocal.filter(u => u.run !== run);
            localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
            cargarUsuarios();
            alert('✅ Usuario eliminado correctamente');
        }
    } else {
        // Usuario no está en localStorage - probablemente viene del JSON
        alert('⚠️ Este usuario viene del archivo JSON y no puede ser eliminado. Solo se pueden eliminar usuarios agregados desde el sistema.');
    }
}


// =======================
// FUNCIONES AUXILIARES - MANTENIENDO
// =======================

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

function mostrarProductosEnTabla(productos) {
  const tabla = document.getElementById("tablaProductos");
  if (!tabla) return;

  if (productos.length === 0) {
    tabla.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No hay productos registrados</td></tr>';
    return;
  }

  tabla.innerHTML = productos.map(producto => `
    <tr>
      <td>${producto.codigo}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString('es-CL')}</td>
      <td>${producto.stock}</td>
      <td>${obtenerNombreCategoria(producto.categoria)}</td>
      <td>
        <button class="btn-editar" onclick="editarProducto('${producto.codigo}')">✏️ Editar</button>
        <button class="btn-eliminar" onclick="eliminarProducto('${producto.codigo}')">🗑️ Eliminar</button>
      </td>
    </tr>
  `).join('');
}

function mostrarUsuariosEnTabla(usuarios) {
  const tabla = document.getElementById("tablaUsuarios");
  if (!tabla) return;

  if (usuarios.length === 0) {
    tabla.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No hay usuarios registrados</td></tr>';
    return;
  }

  tabla.innerHTML = usuarios.map(usuario => `
    <tr>
      <td>${formatearRUN(usuario.run)}</td>
      <td>${usuario.nombre} ${usuario.apellido}</td>
      <td>${usuario.correo}</td>
      <td>${usuario.tipo}</td>
      <td>
        <button class="btn-editar" onclick="editarUsuario('${usuario.run}')">✏️ Editar</button>
        <button class="btn-eliminar" onclick="eliminarUsuario('${usuario.run}')">🗑️ Eliminar</button>
      </td>
    </tr>
  `).join('');
}

function obtenerNombreCategoria(codigo) {
  const categorias = {
    "TC": "Tortas Cuadradas", "TT": "Tortas Circulares", "PI": "Postres Individuales",
    "PSA": "Productos Sin Azúcar", "PT": "Pastelería Tradicional", "PG": "Productos Sin Gluten",
    "PV": "Productos Veganos", "TE": "Tortas Especiales"
  };
  return categorias[codigo] || codigo;
}

function formatearRUN(run) {
  if (run.length <= 1) return run;
  return run.slice(0, -1) + '-' + run.slice(-1).toUpperCase();
}

// =======================
// FUNCIONES EDITAR (solo una vez cada una)
// =======================

function editarUsuario(run) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.run === run);
    
    if (!usuario) {
        alert('❌ No se encontró el usuario con RUN: ' + run);
        return;
    }
    
    localStorage.setItem('usuarioEditar', JSON.stringify(usuario));
    alert(`📝 Preparando edición de: ${usuario.nombre} ${usuario.apellido}`);
}

function editarProducto(codigo) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos.find(p => p.codigo === codigo);
    
    if (!producto) {
        alert('❌ No se encontró el producto con código: ' + codigo);
        return;
    }
    
    localStorage.setItem('productoEditar', JSON.stringify(producto));
    alert(`📝 Preparando edición de: ${producto.nombre}`);
}

// =======================
// FUNCIÓN DE PRUEBA
// =======================

function agregarDatosPrueba() {
  // Limpiar primero
  localStorage.removeItem('productos');
  
  const productosEjemplo = [
    {
      codigo: "TC001",
      nombre: "Torta Chocolate",
      precio: 45000,
      stock: 10,
      categoria: "TC",
      descripcion: "Torta de chocolate deliciosa",
      id: 1,
      imagen: "/assets/images/torta-chocolate.jpg"
    }
  ];
  
  localStorage.setItem("productos", JSON.stringify(productosEjemplo));
  alert("✅ Datos de prueba agregados");
  cargarProductos();
}

// Hacer funciones disponibles globalmente
window.eliminarUsuario = eliminarUsuario;
window.editarUsuario = editarUsuario;
window.eliminarProducto = eliminarProducto;
window.editarProducto = editarProducto;
window.agregarDatosPrueba = agregarDatosPrueba;
window.cargarProductos = cargarProductos;