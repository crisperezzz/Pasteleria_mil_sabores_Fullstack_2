// Array de productos destacados
const productosDestacados = [
    {
        id: 1,
        codigo: "TC001",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        imagen: "/assets/images/torta-chocolate.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        destacado: true
    },
    {
        id: 2,
        codigo: "TC002",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        imagen: "/assets/images/torta-frutas.jpg",
        categoria: "Tortas Cuadradas",
        descripcion: "Frutas frescas y crema chantilly sobre bizcocho de vainilla",
        destacado: true
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
        descripcion: "Postre cremoso hecho con chocolate de alta calidad",
        destacado: true
    },
    // Nuevos productos destacados agregados
    {
        id: 7,
        codigo: "PSA001",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        imagen: "/assets/images/torta-naranja.jpg",
        categoria: "Productos Sin Azúcar",
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
        destacado: true
    },
    {
        id: 13,
        codigo: "PV001",
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        imagen: "/assets/images/torta-vegana.jpg",
        categoria: "Productos Veganos",
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
        destacado: true
    },
    {
        id: 15,
        codigo: "TE001",
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        imagen: "/assets/images/torta-cumpleanos.jpg",
        categoria: "Tortas Especiales",
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
        destacado: true
    },
    {
        id: 11,
        codigo: "PG001",
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        imagen: "/assets/images/brownie.jpg",
        categoria: "Productos Sin Gluten",
        descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
        destacado: true
    }
];

window.productosDestacados = productosDestacados;

function mostrarProductosDestacados() {
    const container = document.getElementById('productos-container');
    
    if (!container) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    let html = '';
    
    productosDestacados.forEach(producto => {
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
    
    container.innerHTML = html;
    container.classList.add('ready');
}

// Función para clasificar imágenes según su orientación
function clasificarImagen(img) {
    const container = img.parentElement;
    container.classList.add('loaded');
    
    // Pequeño retraso para asegurar que la imagen esté cargada
    setTimeout(() => {
        if (img.naturalWidth > img.naturalHeight) {
            container.classList.add('img-horizontal');
        } else if (img.naturalHeight > img.naturalWidth) {
            container.classList.add('img-vertical');
        }
        // Si es cuadrada, no añade clase adicional
    }, 100);
}




// Esperar a que todo el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, mostrando productos...');
    mostrarProductosDestacados();
});

// También manejar el caso de que el script se cargue después de que el DOM esté listo
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(mostrarProductosDestacados, 100);
}