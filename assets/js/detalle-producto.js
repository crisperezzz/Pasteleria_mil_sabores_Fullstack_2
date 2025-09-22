// Función para cargar el detalle del producto
function cargarDetalleProducto(id) {
    // Buscar en todos los productos
    const todosProductos = [...window.productosDestacados || [], ...window.productosCompletos || []];
    const producto = todosProductos.find(p => p.id === id);
    
    const container = document.getElementById('detalle-producto');
    
    if (producto) {
        container.innerHTML = `
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='/assets/images/placeholder.jpg'">
            </div>
            <div class="producto-info">
                <h2>${producto.nombre}</h2>
                <p class="producto-codigo">Código: ${producto.codigo || 'N/A'}</p>
                <p class="producto-categoria">Categoría: ${producto.categoria}</p>
                <p class="producto-precio">$${producto.precio.toLocaleString('es-CL')}</p>
                <p class="producto-descripcion">${producto.descripcion}</p>
                
                <div class="producto-acciones">
                    <button onclick="agregarAlCarrito(${producto.id})" class="btn-primary">
                        🛒 Añadir al Carrito
                    </button>
                    <a href="/scr/tienda/productos.html" class="btn-secondary">← Volver a Productos</a>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="error-container">
                <p class="error">Producto no encontrado</p>
                <a href="/scr/tienda/productos.html" class="btn-primary">Volver a Productos</a>
            </div>
        `;
    }
}

// Cargar detalle del producto basado en el ID de la URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        cargarDetalleProducto(productId);
    } else {
        document.getElementById('detalle-producto').innerHTML = `
            <div class="error-container">
                <p class="error">Producto no encontrado</p>
                <a href="/scr/tienda/productos.html" class="btn-primary">Volver a Productos</a>
            </div>
        `;
    }
});