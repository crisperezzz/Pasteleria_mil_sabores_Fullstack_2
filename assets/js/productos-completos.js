// Array completo de productos
const productosCompletos = [
    {
        id: 1,
        codigo: "TC001",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        imagen: "images/torta-chocolate.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
    },
    {
        id: 2,
        codigo: "TC002",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        imagen: "images/torta-frutas.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."
    },
    {
        id: 3,
        codigo: "TT001",
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        imagen: "images/torta-vainilla.jpg",
        categoria: "Tortas Circulares",
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."
    },
    {
        id: 4,
        codigo: "TT002",
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        imagen: "images/torta-manjar.jpg",
        categoria: "Tortas Circulares",
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos."
    },
    {
        id: 5,
        codigo: "PI001",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        imagen: "images/mousse-chocolate.jpg",
        categoria: "Postres Individuales",
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate."
    },
    {
        id: 6,
        codigo: "PI002",
        nombre: "Tiramisú Clásico",
        precio: 5500,
        imagen: "images/placeholder.jpg",
        categoria: "Postres Individuales",
        descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida."
    }
];

window.productosCompletos = productosCompletos;

function mostrarProductosCompletos(categoria = 'todos') {
    const container = document.getElementById('productos-list');
    
    if (!container) return;
    
    let html = '';
    
    const productosFiltrados = categoria === 'todos' 
        ? productosCompletos 
        : productosCompletos.filter(p => p.categoria === categoria);
    
    productosFiltrados.forEach(producto => {
        html += `
            <div class="producto-card">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='images/placeholder.jpg'">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
                <p class="codigo">Código: ${producto.codigo}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                <a href="detalle-producto.html?id=${producto.id}">Ver detalles</a>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p class="no-productos">No hay productos en esta categoría.</p>';
}

function filtrarPorCategoria(categoria) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón clickeado
    event.target.classList.add('active');
    
    mostrarProductosCompletos(categoria);
}

// Mostrar todos los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductosCompletos();
});