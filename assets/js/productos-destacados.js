// Array de productos destacados
const productosDestacados = [
    {
        id: 1,
        codigo: "TC001",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        imagen: "images/torta-chocolate.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y avellanas",
        destacado: true
    },
    {
        id: 2,
        codigo: "TC002",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        imagen: "images/torta-frutas.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Frutas frescas y crema chantilly sobre bizcocho de vainilla",
        destacado: true
    },
    {
        id: 5,
        codigo: "PI001",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        imagen: "images/mousse-chocolate.jpg",
        categoria: "Postres Individuales",
        descripcion: "Postre cremoso hecho con chocolate de alta calidad",
        destacado: true
    }
];

window.productosDestacados = productosDestacados;

// Variable para controlar si ya se mostraron los productos
let productosMostrados = false;

function mostrarProductosDestacados() {
    const container = document.getElementById('productos-container');
    
    if (!container || productosMostrados) return;
    
    let html = '';
    
    productosDestacados.forEach(producto => {
        html += `
            <div class="producto-card">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='images/placeholder.jpg'">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toLocaleString('es-CL')}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                <a href="detalle-producto.html?id=${producto.id}">Ver detalles</a>
            </div>
        `;
    });
    
    container.innerHTML = html;
    productosMostrados = true;
}

// Mostrar productos solo una vez al cargar completamente la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mostrarProductosDestacados);
} else {
    mostrarProductosDestacados();
}