// Validaciones de formularios
function validarEmail(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com', 'duocuc.cl'];
    return dominiosPermitidos.some(dominio => email.includes(dominio));
}

function validarRun(run) {
    // Validar RUN chileno (formato: 12345678-9)
    const runRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;
    return runRegex.test(run);
}

// Credenciales de administrador
const ADMIN_CREDENTIALS = {
    email: "admin@duoc.cl",
    password: "admin123"
};


function validarLogin(form) {
    const email = form.email.value;
    const password = form.password.value;
    
    if (!email) {
        alert('El correo electrónico es requerido');
        return false;
    }
    
    if (!validarEmail(email)) {
        alert('Solo se permiten correos @duoc.cl, duocuc.cl, @profesor.duoc.cl o @gmail.com');
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
    
    


 // Verificar credenciales de administrador
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Guardar sesión de administrador
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        
        // Redirigir al panel administrativo
        alert('¡Bienvenido al Panel Administrativo!');
        window.location.href = '/scr/admin/admin.html';
        return false; // Prevenir envío del formulario
    }

   // Verificar credenciales de usuario normal
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.correo === email && u.password === password);
    
    if (usuario) {
        // Guardar sesión de usuario
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', `${usuario.nombre} ${usuario.apellido}`);
        
        alert(`¡Bienvenido ${usuario.nombre}!`);
        window.location.href = '/index.html';
        return false;
    }
    
    alert('Credenciales incorrectas. Por favor, intente nuevamente.');
    return false;
} 

function validarRegistro(form) {
    const run = form.run.value;
    const nombre = form.nombre.value;
    const apellidos = form.apellidos.value;
    const email = form.email.value;
    const password = form.password.value;
    const fechaNacimiento = form.fechaNacimiento.value;
    
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
        alert('Solo se permiten correos @duoc.cl, @duocuc.cl, @profesor.duoc.cl o @gmail.com');
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
    
    // Verificar si el usuario ya existe
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(u => u.correo === email || u.run === run);
    
    if (usuarioExistente) {
        alert('Ya existe un usuario con este correo o RUN');
        return false;
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = {
        run: run,
        nombre: nombre,
        apellido: apellidos,
        correo: email,
        password: password,
        fechaNacimiento: fechaNacimiento,
        tipo: 'Cliente',
        region: '',
        comuna: '',
        direccion: ''
    };
    
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert('¡Registro exitoso! Ahora puede iniciar sesión.');
    window.location.href = 'login.html';
    return false;
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
    
    if (!email) {
        alert('El correo es requerido');
        return false;
    }
    

    if (email && !validarEmail(email)) {
        alert('Solo se permiten correos @duoc.cl, @duocuc.cl, @profesor.duoc.cl o @gmail.com');
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


// Función para verificar si hay una sesión activa al cargar la página
function verificarSesion() {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (adminLoggedIn && window.location.pathname.includes('admin.html')) {
        // El admin está en la página correcta
        return true;
    }
    
    if (adminLoggedIn && !window.location.pathname.includes('admin.html')) {
        // Redirigir al admin a su panel
        window.location.href = '/scr/admin/admin.html';
        return false;
    }
    
    if (userLoggedIn && window.location.pathname.includes('admin.html')) {
        // Usuario normal intentando acceder al admin - redirigir al inicio
        alert('No tiene permisos para acceder al panel administrativo');
        window.location.href = '/index.html';
        return false;
    }
    
    return true;
}

// Verificar sesión cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
});

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    alert('Sesión cerrada correctamente');
    window.location.href = '/index.html';
}