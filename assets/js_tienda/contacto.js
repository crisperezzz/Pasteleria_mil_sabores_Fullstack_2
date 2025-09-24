// contacto.js - Funcionalidad para la página de contacto

document.addEventListener('DOMContentLoaded', function() {
    inicializarContadoresCaracteres();
});

function inicializarContadoresCaracteres() {
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const comentarioInput = document.getElementById('comentario');
    
    function actualizarContador(input, contadorId) {
        const contador = document.getElementById(contadorId);
        if (contador) {
            contador.textContent = input.value.length;
        }
    }
    
    if (nombreInput) {
        nombreInput.addEventListener('input', () => actualizarContador(nombreInput, 'contador-nombre'));
        actualizarContador(nombreInput, 'contador-nombre');
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => actualizarContador(emailInput, 'contador-email'));
        actualizarContador(emailInput, 'contador-email');
    }
    
    if (comentarioInput) {
        comentarioInput.addEventListener('input', () => actualizarContador(comentarioInput, 'contador-comentario'));
        actualizarContador(comentarioInput, 'contador-comentario');
    }
}

function validarContacto(formulario) {
    // Mostrar estado de carga
    const botonEnviar = formulario.querySelector('.btn-enviar');
    const btnText = botonEnviar.querySelector('.btn-text');
    const btnLoading = botonEnviar.querySelector('.btn-loading');
    
    // Cambiar a estado de carga
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    botonEnviar.disabled = true;
    botonEnviar.classList.add('loading');
    
    // Simular envío (en un caso real, aquí iría una petición AJAX)
    setTimeout(function() {
        // Restaurar botón
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        botonEnviar.disabled = false;
        botonEnviar.classList.remove('loading');
        
        // Mostrar mensaje de éxito
        mostrarNotificacion('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        
        // Limpiar formulario
        formulario.reset();
        
        // Reiniciar contadores
        inicializarContadoresCaracteres();
        
    }, 2000);
    
    // Prevenir envío real del formulario (para demo)
    return false;
}

// Hacer las funciones disponibles globalmente
window.validarContacto = validarContacto;
window.inicializarContadoresCaracteres = inicializarContadoresCaracteres;