// Validaciones de formularios
function validarEmail(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.includes(dominio));
}

function validarRun(run) {
    // Validar RUN chileno (formato: 12345678-9)
    const runRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;
    return runRegex.test(run);
}

function validarLogin(form) {
    const email = form.email.value;
    const password = form.password.value;
    
    if (!email) {
        alert('El correo electrónico es requerido');
        return false;
    }
    
    if (!validarEmail(email)) {
        alert('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        return false;
    }
    
    if (!password) {
        alert('La contraseña es requerida');
        return false;
    }
    
    if (password.length < 4 || password.length > 10) {
        alert('La contraseña debe tener entre 4 y 10 caracteres');
        return false;
    }
    
    return true;
}

function validarRegistro(form) {
    const run = form.run.value;
    const nombre = form.nombre.value;
    const apellidos = form.apellidos.value;
    const email = form.email.value;
    
    if (!run) {
        alert('El RUN es requerido');
        return false;
    }
    
    if (!validarRun(run)) {
        alert('El RUN debe tener el formato 12345678-9');
        return false;
    }
    
    if (!nombre) {
        alert('El nombre es requerido');
        return false;
    }
    
    if (nombre.length > 50) {
        alert('El nombre no puede tener más de 50 caracteres');
        return false;
    }
    
    if (!apellidos) {
        alert('Los apellidos son requeridos');
        return false;
    }
    
    if (apellidos.length > 100) {
        alert('Los apellidos no pueden tener más de 100 caracteres');
        return false;
    }
    
    if (!email) {
        alert('El correo electrónico es requerido');
        return false;
    }
    
    if (!validarEmail(email)) {
        alert('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        return false;
    }
    
    return true;
}

function validarContacto(form) {
    const nombre = form.nombre.value;
    const email = form.email.value;
    const comentario = form.comentario.value;
    
    if (!nombre) {
        alert('El nombre es requerido');
        return false;
    }
    
    if (nombre.length > 100) {
        alert('El nombre no puede tener más de 100 caracteres');
        return false;
    }
    
    if (email && !validarEmail(email)) {
        alert('Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        return false;
    }
    
    if (!comentario) {
        alert('El comentario es requerido');
        return false;
    }
    
    if (comentario.length > 500) {
        alert('El comentario no puede tener más de 500 caracteres');
        return false;
    }
    
    return true;
}