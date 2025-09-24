// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(idProducto) {
    // Buscar en todos los productos
    let producto = window.productosCompletos?.find(p => p.id === idProducto) || 
                  window.productosDestacados?.find(p => p.id === idProducto);
    
    if (producto) {
        const itemExistente = carrito.find(item => item.id === idProducto);
        
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            });
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        
        // Mostrar notificación bonita
        mostrarNotificacion(`¡${producto.nombre} añadido al carrito!`, 'success');
    } else {
        console.error('Producto no encontrado:', idProducto);
        mostrarNotificacion('Error al agregar el producto', 'error');
    }
}

function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    // Actualizar todos los contadores en la página
    const contadores = document.querySelectorAll('#contador-carrito, .contador-carrito');
    contadores.forEach(contador => {
        if (contador) {
            contador.textContent = totalItems;
        }
    });
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito ya está vacío', 'info');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        mostrarCarrito();
        mostrarNotificacion('Carrito vaciado', 'success');
    }
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const container = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('total-container');
    
    if (!container) return;
    
    if (carrito.length === 0) {
        container.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        if (totalContainer) totalContainer.style.display = 'none';
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    carrito.forEach(item => {
        const itemSubtotal = item.precio * item.cantidad;
        subtotal += itemSubtotal;
        
        html += `
            <div class="carrito-item">
                <div class="carrito-item-image">
                    <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='/assets/images/placeholder.jpg'; this.classList.add('img-error')">
                </div>
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="precio-unitario">$${item.precio.toLocaleString('es-CL')} c/u</p>
                    <div class="carrito-item-cantidad">
                        <button onclick="modificarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="modificarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                    </div>
                </div>
                <div class="carrito-item-precio">
                    <p class="subtotal">$${itemSubtotal.toLocaleString('es-CL')}</p>
                    <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar" title="Eliminar producto">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    if (totalContainer) {
        // Calcular total (podrías agregar descuentos aquí)
        const descuento = 0; // Puedes implementar lógica de descuentos
        const total = subtotal - descuento;
        
        document.getElementById('subtotal-precio').textContent = `$${subtotal.toLocaleString('es-CL')}`;
        document.getElementById('descuento-precio').textContent = `$${descuento.toLocaleString('es-CL')}`;
        document.getElementById('total-precio').textContent = `$${total.toLocaleString('es-CL')}`;
        totalContainer.style.display = 'block';
    }
}

function modificarCantidad(idProducto, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(idProducto);
        return;
    }
    
    const item = carrito.find(item => item.id === idProducto);
    if (item) {
        item.cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

function eliminarDelCarrito(idProducto) {
    const producto = carrito.find(item => item.id === idProducto);
    if (producto) {
        if (confirm(`¿Eliminar ${producto.nombre} del carrito?`)) {
            carrito = carrito.filter(item => item.id !== idProducto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
            mostrarCarrito();
            mostrarNotificacion('Producto eliminado del carrito', 'success');
        }
    }
}

function procesarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío', 'error');
        return;
    }
    
    // Confirmación antes de procesar la compra
    if (confirm('¿Estás seguro de que quieres finalizar la compra?')) {
        // Aquí podrías agregar lógica de validación y procesamiento de pago
        mostrarNotificacion('¡Compra procesada con éxito!', 'success');
        
        // Opcional: guardar historial de compras
        const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
        historial.push({
            fecha: new Date().toISOString(),
            productos: carrito,
            total: carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
        });
        localStorage.setItem('historialCompras', JSON.stringify(historial));
        
        // Vaciar carrito después de procesar la compra
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        mostrarCarrito();
        
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 2000);
    }
}

// Solo actualizar contador si estamos en una página que lo tiene
function deberiaActualizarContador() {
    return document.querySelector('#contador-carrito, .contador-carrito');
}

// Actualizar contador al cargar la página solo si es necesario
if (deberiaActualizarContador()) {
    document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
}

// Si estamos en la página del carrito, mostrarlo al cargar
if (window.location.pathname.includes('carrito.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        mostrarCarrito();
        actualizarContadorCarrito();
    });
}