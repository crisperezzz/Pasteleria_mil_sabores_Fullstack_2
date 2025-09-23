// detalle-blog.js - Funcionalidad para la página de detalle de blog

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));
    
    if (blogId) {
        cargarDetalleBlog(blogId);
    } else {
        document.getElementById('detalle-blog').innerHTML = `
            <p class="error">Blog no encontrado</p>
            <a href="blogs.html" class="btn-primary">Volver al Blog</a>
        `;
    }
});

function cargarDetalleBlog(id) {
    const blogs = obtenerBlogs();
    const blog = blogs.find(b => b.id === id);
    
    const container = document.getElementById('detalle-blog');
    
    if (blog) {
        container.innerHTML = `
            <article class="blog-completo">
                <div class="blog-header">
                    <h2>${blog.titulo}</h2>
                    <p class="blog-meta">Publicado el ${blog.fecha} | Por ${blog.autor}</p>
                </div>
                
                <img src="${blog.imagen}" alt="${blog.titulo}" class="blog-imagen-principal" onerror="this.src='/assets/images/placeholder.jpg'">
                
                <div class="blog-contenido">
                    ${blog.contenido}
                </div>
                
                <div class="blog-acciones">
                    <a href="blogs.html" class="btn-primary">Volver al Blog</a>
                    <div class="blog-compartir">
                        <span>Compartir:</span>
                        <button onclick="compartirFacebook()">Facebook</button>
                        <button onclick="compartirTwitter()">Twitter</button>
                        <button onclick="compartirWhatsApp()">WhatsApp</button>
                    </div>
                </div>
            </article>
        `;
    } else {
        container.innerHTML = `
            <p class="error">Blog no encontrado</p>
            <a href="blogs.html" class="btn-primary">Volver al Blog</a>
        `;
    }
}


function obtenerBlogs() {
    return [
        {
            id: 1,
            titulo: "El Arte de la Repostería Chilena",
            resumen: "Descubre la rica tradición de la repostería chilena y sus secretos mejor guardados.",
            contenido: `
                <p>La repostería chilena es una fusión de tradiciones indígenas, españolas y europeas que ha evolucionado a lo largo de los siglos. Desde las famosas tortas de mil hojas hasta los clásicos pasteles de choclo, cada receta cuenta una historia.</p>
                
                <h3>Ingredientes Tradicionales</h3>
                <p>El manjar, la harina tostada, los frutos secos nativos y las frutas de temporada son la base de muchas de nuestras recetas tradicionales.</p>
                
                <h3>Técnicas Modernas</h3>
                <p>Hoy combinamos estas tradiciones con técnicas modernas de repostería, creando productos que honran el pasado mientras innovamos para el futuro.</p>
            `,
            imagen: "/assets/images/blog-reposteria.jpg",
            fecha: "15 Noviembre 2024",
            autor: "Chef María González"
        },
        {
            id: 2,
            titulo: "Cómo Elegir la Torta Perfecta para tu Evento",
            resumen: "Guía completa para seleccionar la torta ideal según el tipo de celebración.",
            contenido: `
                <p>Elegir la torta perfecta puede marcar la diferencia en cualquier celebración. Aquí te damos algunos tips:</p>
                
                <h3>Para Cumpleaños</h3>
                <p>Las tortas temáticas y personalizadas son siempre un éxito. Considera los gustos del homenajeado.</p>
                
                <h3>Para Bodas</h3>
                <p>Elegante y sofisticada, la torta de boda debe reflejar el estilo de la pareja.</p>
                
                <h3>Para Eventos Formales</h3>
                <p>Tortas clásicas y elegantes que complementen la decoración del evento.</p>
            `,
            imagen: "/assets/images/blog-torta-perfecta.jpg",
            fecha: "8 Noviembre 2024",
            autor: "Pastelero Juan Pérez"
        },
        {
            id: 3,
            titulo: "Tips para Decoración de Tortas en Casa",
            resumen: "Aprende técnicas simples para decorar tortas como un profesional desde tu hogar.",
            contenido: `
                <p>Decorar tortas en casa puede ser divertido y gratificante. Sigue estos consejos:</p>
                
                <h3>Herramientas Básicas</h3>
                <p>Manga pastelera, boquillas básicas y espátula son suficientes para empezar.</p>
                
                <h3>Técnicas Sencillas</h3>
                <p>Aprende el rosetón básico, bordes decorativos y escritura con glaze.</p>
                
                <h3>Materiales Accesibles</h3>
                <p>Puedes improvisar con materiales de cocina comunes mientras adquieres equipo profesional.</p>
            `,
            imagen: "/assets/images/blog-decoracion.jpg",
            fecha: "1 Noviembre 2024",
            autor: "Estudiante Duoc UC"
        }
    ];
}


function compartirFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function compartirTwitter() {
    const text = encodeURIComponent(document.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function compartirWhatsApp() {
    const text = encodeURIComponent(`${document.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

// Hacer las funciones disponibles globalmente
window.cargarDetalleBlog = cargarDetalleBlog;
window.compartirFacebook = compartirFacebook;
window.compartirTwitter = compartirTwitter;
window.compartirWhatsApp = compartirWhatsApp;