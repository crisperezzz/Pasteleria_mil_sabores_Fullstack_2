// Utilidades generales para el proyecto

// Función para formatear precios
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
}

// Función para obtener parámetros de la URL
function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Eliminar notificaciones existentes
    document.querySelectorAll('.notificacion').forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notificacion notificacion-${tipo}`;
    notification.innerHTML = `
        <p>${mensaje}</p>
        <button class="notificacion-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);


// Hacerla disponible globalmente
window.mostrarNotificacion = mostrarNotificacion;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        background: ${tipo === 'error' ? '#ff4757' : tipo === 'success' ? '#2ed573' : '#1e90ff'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}


// Función para validar edad y aplicar descuentos
function validarDescuentos(edad, email, codigoPromocional) {
    let descuento = 0;
    let mensaje = '';
    
    // Descuento por edad (50% para mayores de 50 años)
    if (edad >= 50) {
        descuento = 0.5;
        mensaje = '¡50% de descuento por ser mayor de 50 años!';
    }
    
    // Descuento por código promocional (10% de por vida)
    if (codigoPromocional === 'FELICES50') {
        descuento = Math.max(descuento, 0.1);
        mensaje = descuento === 0.1 ? '¡10% de descuento permanente!' : mensaje;
    }
    
    // Torta gratis para estudiantes Duoc en cumpleaños
    const hoy = new Date();
    const esCumpleanos = false; // Aquí iría la lógica para verificar el cumpleaños
    
    if (email && email.includes('@duoc.cl') && esCumpleanos) {
        descuento = 1; // 100% de descuento
        mensaje = '¡Torta gratis por tu cumpleaños!';
    }
    
    return { descuento, mensaje };
}

// Función para manejar errores de imágenes
function manejarErrorImagen(imagen) {
    imagen.onerror = null;
    imagen.src = 'images/placeholder.jpg';
}

// Función para calcular total del carrito con descuentos
function calcularTotalConDescuentos(carrito, descuento = 0) {
    const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const totalDescuento = subtotal * descuento;
    const total = subtotal - totalDescuento;
    
    return {
        subtotal: formatearPrecio(subtotal),
        descuento: formatearPrecio(totalDescuento),
        total: formatearPrecio(total),
        numeros: { subtotal, descuento: totalDescuento, total }
    };
}

// Función para guardar en localStorage con validación
function guardarEnLocalStorage(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        mostrarNotificacion('Error al guardar los datos', 'error');
        return false;
    }
}

// Función para cargar desde localStorage con validación
function cargarDesdeLocalStorage(clave) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
        return null;
    }
}

// Función para formatear fechas
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Exportar funciones para uso global
window.mostrarNotificacion = mostrarNotificacion;
window.formatearPrecio = formatearPrecio;
window.obtenerParametroURL = obtenerParametroURL;


// Manejo de errores global
window.addEventListener('error', function(e) {
    console.log('Error capturado:', e.error);
});

// Verificar que los elementos existan antes de manipularlos
function elementoExiste(selector) {
    return document.querySelector(selector) !== null;
}

// Función segura para agregar event listeners
function agregarEventListenerSeguro(selector, evento, callback) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.addEventListener(evento, callback);
    }
}

// Función para clasificar imágenes según su orientación (disponible globalmente)
window.clasificarImagen = function(img) {
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