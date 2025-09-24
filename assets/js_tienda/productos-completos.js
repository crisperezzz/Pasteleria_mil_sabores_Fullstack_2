// Array completo de productos
const productosCompletos = [
    {
        id: 1,
        codigo: "TC001",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        imagen: "/assets/images/torta-chocolate.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
    },
    {
        id: 2,
        codigo: "TC002",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        imagen: "/assets/images/torta-frutas.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."
    },
    {
        id: 3,
        codigo: "TT001",
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        imagen: "/assets/images/torta-vainilla.jpg",
        categoria: "Tortas Circulares",
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."
    },
    {
        id: 4,
        codigo: "TT002",
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        imagen: "/assets/images/torta-manjar.jpg",
        categoria: "Tortas Circulares",
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos."
    },
    {
        id: 5,
        codigo: "PI001",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        imagen: "/assets/images/mousse-chocolate.jpg",
        categoria: "Postres Individuales",
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate."
    },
    {
        id: 6,
        codigo: "PI002",
        nombre: "Tiramisú Clásico",
        precio: 5500,
        imagen: "/assets/images/tiramisu.jpg",
        categoria: "Postres Individuales",
        descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida."
    },
    {
        id: 7,
        codigo: "PSA001",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        imagen: "/assets/images/torta-naranja.jpg",
        categoria: "Productos Sin Azúcar",
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables."
    },
    {
        id: 8,
        codigo: "PSA002",
        nombre: "Cheesecake Sin Azúcar",
        precio: 47000,
        imagen: "/assets/images/cheesecake.jpg",
        categoria: "Productos Sin Azúcar",
        descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa."
    },
    {
        id: 9,
        codigo: "PT001",
        nombre: "Empanada de Manzana",
        precio: 3000,
        imagen: "/assets/images/empanada-manzana.jpg",
        categoria: "Pastelería Tradicional",
        descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda."
    },
    {
        id: 10,
        codigo: "PT002",
        nombre: "Tarta de Santiago",
        precio: 6000,
        imagen: "/assets/images/tarta-santiago.jpg",
        categoria: "Pastelería Tradicional",
        descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos."
    },
    {
        id: 11,
        codigo: "PG001",
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        imagen: "/assets/images/brownie.jpg",
        categoria: "Productos Sin Gluten",
        descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor."
    },
    {
        id: 12,
        codigo: "PG002",
        nombre: "Pan Sin Gluten",
        precio: 3500,
        imagen: "/assets/images/pan-sin-gluten.jpg",
        categoria: "Productos Sin Gluten",
        descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida."
    },
    {
        id: 13,
        codigo: "PV001",
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        imagen: "/assets/images/torta-vegana.jpg",
        categoria: "Productos Veganos",
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos."
    },
    {
        id: 14,
        codigo: "PV002",
        nombre: "Galletas Veganas de Avena",
        precio: 4500,
        imagen: "/assets/images/galletas-avena.jpg",
        categoria: "Productos Veganos",
        descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano."
    },
    {
        id: 15,
        codigo: "TE001",
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        imagen: "/assets/images/torta-cumpleanos.jpg",
        categoria: "Tortas Especiales",
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos."
    },
    {
        id: 16,
        codigo: "TE002",
        nombre: "Torta Especial de Boda",
        precio: 60000,
        imagen: "/assets/images/torta-boda.jpg",
        categoria: "Tortas Especiales",
        descripcion: "Elegante y sofisticada, perfecta para el día más especial de tu vida."
    }
];

window.productosCompletos = productosCompletos;

function mostrarProductosCompletos(categoria = 'todos') {
    const container = document.getElementById('productos-container');
    
    if (!container) return;
    
    let html = '';
    
    const productosFiltrados = categoria === 'todos' 
        ? productosCompletos 
        : productosCompletos.filter(p => p.categoria === categoria);
    
    productosFiltrados.forEach(producto => {
        html += `
            <div class="producto-card">
                <div class="producto-card-image-container">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='/assets/images/placeholder.jpg'; this.classList.add('error')" onload="clasificarImagen(this)">
                </div>
                <div class="producto-card-content">
                    <h3>${producto.nombre}</h3>
                    <p class="producto-descripcion-corta">${producto.descripcion}</p>
                    <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
                    <div class="producto-card-buttons">
                        <button onclick="agregarAlCarrito(${producto.id})" class="btn-carrito">Añadir al carrito</button>
                        <a href="/scr/tienda/detalle-producto.html?id=${producto.id}" class="btn-detalles">Ver detalles</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p class="no-productos">No hay productos en esta categoría.</p>';
    container.classList.add('ready');
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