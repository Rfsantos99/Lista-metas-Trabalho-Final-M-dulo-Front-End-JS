const emailHTML = document.querySelector('#email-cadastro');
const passwordHTML = document.querySelector('#password-cadastro');
const repasswordHTML = document.querySelector('#repassword-cadastro');
const formularioCadastro = document.querySelector('#formulario-cadastro');
formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    let retorno = validarCampos();
    if (!retorno) {
        return;
    }
    cadastrarUsuario();
});
function validarCampos() {
    if (passwordHTML.value.length < 10) {
        alert('A senha curta!');
        return false;
    }
    if (passwordHTML.value !== repasswordHTML.value) {
        alert('Os campos de senha estão divergentes!');
        return false;
    }
    return true;
}
function cadastrarUsuario() {
    let listaUsuarios = buscarUsuariosStorage();
    let existe = listaUsuarios.some((usuario) => usuario.email === emailHTML.value);
    if (existe) {
        alert("Já existe esse email cadastrado na plataforma!");
        return;
    }
    const novoUsuario = {
        email: emailHTML.value,
        password: passwordHTML.value
    };
    listaUsuarios.push(novoUsuario);
    salvarUsuarioStorage(listaUsuarios);
    alert("Conta criada com sucesso!");
    formularioCadastro.reset();
    window.location.href = 'login.html';
}
function salvarUsuarioStorage(listaDados) {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}
function buscarUsuariosStorage() {
    return JSON.parse(localStorage.getItem('usuarios') || "[]");
}