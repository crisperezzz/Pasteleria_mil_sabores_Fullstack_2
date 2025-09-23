// blogs.js - Funcionalidad para la página de blogs

document.addEventListener('DOMContentLoaded', function() {
    cargarBlogs();
});

function cargarBlogs() {
    const blogs = obtenerBlogs();
    const container = document.getElementById('blog-container');
    
    let html = '';
    
    blogs.forEach(blog => {
        html += `
            <article class="blog-card">
                <img src="${blog.imagen}" alt="${blog.titulo}" onerror="this.src='/assets/images/placeholder.jpg'">
                <div class="blog-content">
                    <h3>${blog.titulo}</h3>
                    <p class="blog-date">${blog.fecha}</p>
                    <p class="blog-resumen">${blog.resumen}</p>
                    <a href="detalle-blog.html?id=${blog.id}" class="blog-link">Leer más</a>
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
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


// Hacer la función disponible globalmente si es necesario
window.cargarBlogs = cargarBlogs;