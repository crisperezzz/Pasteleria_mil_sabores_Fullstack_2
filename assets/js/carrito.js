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
        
        alert(`¡${producto.nombre} añadido al carrito!`);
    } else {
        console.error('Producto no encontrado:', idProducto);
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
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    if (typeof mostrarCarrito === 'function') {
        mostrarCarrito();
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