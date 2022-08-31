let emailLogin = document.getElementById('email-login');
let passwordLogin = document.getElementById('password-login');
let formularioLogin = document.getElementById('login');

formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    function logar() {
        let usuarios = buscarUsuarios();
        console.log("usuarios", usuarios);
        let usuariosEncontrado = usuarios.find((usuario) => usuario.email === emailLogin.value && usuario.password === passwordLogin.value);
        if (!usuariosEncontrado) {
            alert("E-mail ou senha incorretas! Verifique e tente novamente.");
            formularioLogin.reset();
            return;
        }
    
        localStorage.setItem('usuarioLogado', usuariosEncontrado.email);
        window.location.href = 'home.html';
    
    }
    logar();
});


/*function logar() {
    let usuarios = buscarUsuarios();
    let usuariosEncontrado = usuarios.find((usuario) => usuario.email === emailLogin.value && usuario.password === passwordLogin.value);
    if (!usuarioEncontrado) {
        alert("E-mail ou senha incorretas! Verifique e tente novamente.");
        formularioLogin.reset();
        return;
    }

    localStorage.setItem('usuarioLogado', usuariosEncontrado.email);
    window.location.href = 'home.html';
}*/

function buscarUsuarios() {
    console.log(localStorage.getItem('usuarios'));
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}