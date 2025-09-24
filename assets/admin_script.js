// =======================
// VARIABLES GLOBALES
// =======================
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// =======================
// FUNCIONES DE USUARIOS - DEFINIDAS GLOBALMENTE
// =======================

// Función para formatear RUN
function formatearRUN(run) {
    if (!run || run.length <= 1) return run || 'N/A';
    const runLimpio = run.replace(/-/g, '');
    return runLimpio.slice(0, -1) + '-' + runLimpio.slice(-1).toUpperCase();
}

// Función para eliminar usuario - VERSIÓN MEJORADA
window.eliminarUsuario = function(run) {
    console.log('🔍 Buscando usuario con RUN:', run);
    
    if (!run) {
        alert('❌ Error: RUN no válido');
        return;
    }

    // Limpiar el RUN para búsqueda
    const runLimpio = run.replace(/-/g, '').toUpperCase();
    console.log('RUN limpio:', runLimpio);

    // Cargar usuarios actualizados
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log('Usuarios encontrados:', usuarios);

    // Buscar usuario
    const usuarioIndex = usuarios.findIndex(u => {
        const runUsuario = (u.run || '').replace(/-/g, '').toUpperCase();
        return runUsuario === runLimpio;
    });

    if (usuarioIndex === -1) {
        alert('❌ No se encontró el usuario con RUN: ' + run);
        return;
    }

    const usuario = usuarios[usuarioIndex];
    
    if (confirm(`¿Estás seguro de eliminar al usuario?\n\nNombre: ${usuario.nombre} ${usuario.apellido}\nRUN: ${formatearRUN(usuario.run)}\nCorreo: ${usuario.correo}`)) {
        // Eliminar usuario
        usuarios.splice(usuarioIndex, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        // Recargar tabla
        cargarUsuarios();
        alert('✅ Usuario eliminado correctamente');
    }
};

// Función para editar usuario
window.editarUsuario = function(run) {
    console.log('✏️ Editando usuario RUN:', run);
    
    const runLimpio = run.replace(/-/g, '').toUpperCase();
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuario = usuarios.find(u => {
        const runUsuario = (u.run || '').replace(/-/g, '').toUpperCase();
        return runUsuario === runLimpio;
    });

    if (!usuario) {
        alert('❌ Usuario no encontrado');
        return;
    }

    // Guardar usuario para edición
    localStorage.setItem('usuarioEditar', JSON.stringify(usuario));
    alert(`📝 Editando usuario: ${usuario.nombre} ${usuario.apellido}\n\n(En un sistema completo, se redirigiría a página de edición)`);
    
    console.log('Datos del usuario:', usuario);
};

// =======================
// FUNCIONES DE PRODUCTOS - DEFINIDAS GLOBALMENTE
// =======================

window.editarProducto = function(codigo) {
    console.log('✏️ Editando producto:', codigo);
    
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos.find(p => p.codigo === codigo);
    
    if (!producto) {
        alert('❌ Producto no encontrado');
        return;
    }

    localStorage.setItem('productoEditar', JSON.stringify(producto));
    alert(`📝 Editando producto: ${producto.nombre}\n\n(En un sistema completo, se redirigiría a página de edición)`);
};

window.eliminarProducto = function(codigo) {
    console.log('🗑️ Eliminando producto:', codigo);
    
    if (!codigo) {
        alert('❌ Error: Código no válido');
        return;
    }

    productos = JSON.parse(localStorage.getItem("productos")) || [];
    const productoIndex = productos.findIndex(p => p.codigo === codigo);

    if (productoIndex === -1) {
        alert('❌ No se encontró el producto con código: ' + codigo);
        return;
    }

    const producto = productos[productoIndex];
    
    if (confirm(`¿Estás seguro de eliminar el producto?\n\nCódigo: ${producto.codigo}\nNombre: ${producto.nombre}\nPrecio: $${producto.precio}`)) {
        productos.splice(productoIndex, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        cargarProductos();
        alert('✅ Producto eliminado correctamente');
    }
};

// =======================
// FUNCIONES DE CARGA
// =======================

window.cargarUsuarios = function() {
    const tabla = document.getElementById("tablaUsuarios");
    if (!tabla) {
        console.log('⚠️ No hay tabla de usuarios en esta página');
        return;
    }

    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log('👥 Cargando', usuarios.length, 'usuarios');

    if (usuarios.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: #666;">No hay usuarios registrados</td></tr>';
        return;
    }

    tabla.innerHTML = usuarios.map(usuario => `
        <tr>
            <td><strong>${formatearRUN(usuario.run)}</strong></td>
            <td>${usuario.nombre} ${usuario.apellido}</td>
            <td>${usuario.correo}</td>
            <td><span class="badge-tipo">${usuario.tipo}</span></td>
            <td>
                <button class="btn-editar" onclick="editarUsuario('${usuario.run}')">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarUsuario('${usuario.run}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
};

window.cargarProductos = function() {
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) {
        console.log('⚠️ No hay tabla de productos en esta página');
        return;
    }

    productos = JSON.parse(localStorage.getItem("productos")) || [];
    console.log('📦 Cargando', productos.length, 'productos');

    if (productos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px; color: #666;">No hay productos registrados</td></tr>';
        return;
    }

    tabla.innerHTML = productos.map(producto => `
        <tr>
            <td><strong>${producto.codigo}</strong></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio?.toLocaleString('es-CL') || '0'}</td>
            <td>${producto.stock || '0'}</td>
            <td>${obtenerNombreCategoria(producto.categoria)}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto('${producto.codigo}')">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto('${producto.codigo}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
};

// =======================
// FUNCIONES AUXILIARES
// =======================

function obtenerNombreCategoria(codigo) {
    const categorias = {
        "TC": "Tortas Cuadradas", "TT": "Tortas Circulares", "PI": "Postres Individuales",
        "PSA": "Productos Sin Azúcar", "PT": "Pastelería Tradicional", "PG": "Productos Sin Gluten",
        "PV": "Productos Veganos", "TE": "Tortas Especiales"
    };
    return categorias[codigo] || codigo;
}

// =======================
// INICIALIZACIÓN
// =======================

document.addEventListener("DOMContentLoaded", function() {
    console.log('🚀 Admin cargado - Funciones listas');
    
    // Cargar datos según la página
    if (document.getElementById('tablaUsuarios')) {
        console.log('📋 Página de usuarios detectada');
        cargarUsuarios();
    }
    
    if (document.getElementById('tablaProductos')) {
        console.log('📦 Página de productos detectada');
        cargarProductos();
    }
    
    // Verificar que las funciones estén disponibles
    console.log('eliminarUsuario disponible:', typeof eliminarUsuario);
    console.log('editarUsuario disponible:', typeof editarUsuario);
    console.log('eliminarProducto disponible:', typeof eliminarProducto);
    console.log('editarProducto disponible:', typeof editarProducto);
});

// =======================
// DATOS DE PRUEBA
// =======================

window.agregarDatosPrueba = function() {
    const usuariosEjemplo = [
        {
            run: "123456789",
            nombre: "Ana",
            apellido: "Gómez",
            correo: "ana@duoc.cl",
            tipo: "Administrador",
            region: "Metropolitana",
            comuna: "Santiago",
            direccion: "Av. Principal 123"
        }
    ];
    
    const productosEjemplo = [
        {
            codigo: "TC001",
            nombre: "Torta Chocolate",
            precio: 45000,
            stock: 10,
            categoria: "TC",
            descripcion: "Torta de chocolate deliciosa"
        }
    ];
    
    localStorage.setItem("usuarios", JSON.stringify(usuariosEjemplo));
    localStorage.setItem("productos", JSON.stringify(productosEjemplo));
    
    alert('✅ Datos de prueba agregados');
    
    // Recargar si estamos en las páginas correspondientes
    if (document.getElementById('tablaUsuarios')) cargarUsuarios();
    if (document.getElementById('tablaProductos')) cargarProductos();
};
// =======================
// FUNCIÓN DE PRUEBA
// =======================

window.probarFunciones = function() {
    console.log('=== 🧪 PROBANDO FUNCIONES ===');
    console.log('cargarUsuarios:', typeof cargarUsuarios);
    console.log('eliminarUsuario:', typeof eliminarUsuario);
    console.log('editarUsuario:', typeof editarUsuario);
    console.log('cargarProductos:', typeof cargarProductos);
    console.log('eliminarProducto:', typeof eliminarProducto);
    console.log('editarProducto:', typeof editarProducto);
    
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    console.log('Usuarios en localStorage:', usuarios);
    console.log('Productos en localStorage:', productos);
    console.log('Tabla usuarios existe:', document.getElementById('tablaUsuarios'));
    console.log('Tabla productos existe:', document.getElementById('tablaProductos'));
    
    alert('✅ Revisa la consola (F12) para ver los resultados de la prueba');
};