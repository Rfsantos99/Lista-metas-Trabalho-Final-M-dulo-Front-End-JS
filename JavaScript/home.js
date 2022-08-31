let novaMeta = document.getElementById("criar-meta");
const descricaoHTML = document.getElementById("descricao");
const detalhamentoHTML = document.getElementById("detalhamento");
let arrayMeta = JSON.parse(localStorage.getItem("listaMetas"));

window.onload = function () {
  listar();
};

function listar() {
  if (localStorage.getItem("listaMetas") === null) return null;

  let arrayMeta = JSON.parse(localStorage.getItem("listaMetas"));
  let tbody = document.getElementById("tbodyMetas");

  tbody.innerHTML = "";

  arrayMeta.map((item) => {
    tbody.innerHTML += `
      <td>${item.id}</td>
      <td> ${item.descricao} </td>
      <td> ${item.detalhamento} </td>
      <td>
        <button type="button" class="" onclick="editar(${item.id})">editar</button>
        <button type="button" class="btn_excluir" onclick="excluir(${item.id})">excluir</button>
      </td> `;
  });
}

let idItemAlterar = null;
novaMeta.addEventListener("submit", (event) => {
  event.preventDefault();

  let valorBotao = document.getElementById("btn-salvar").value;
  let arrayMeta = [];
  let idDados = 1;

  if (valorBotao === "Cadastrar") {
    arrayMeta = localStorage.getItem("listaMetas")
      ? JSON.parse(localStorage.getItem("listaMetas"))
      : [];

    if (arrayMeta.length > 0) {
      const maiorID = arrayMeta.reduce(function (item1, item2) {
        return item1.id > item2.id ? item1.id : item2.id;
      });

      idDados = maiorID + 1;
    }

    const novaMeta = {
      id: idDados,
      descricao: descricaoHTML.value,
      detalhamento: detalhamentoHTML.value,
    };

    arrayMeta.push(novaMeta);
    localStorage.setItem("listaMetas", JSON.stringify(arrayMeta));

    const novo = document.createElement("tr");

    arrayMeta.map((item) => {
      novo.innerHTML = `
      <td>${idDados}</td>
      <td> ${item.descricao} </td>
      <td> ${item.detalhamento} </td>
      
      <td>
        <button type="button" class="" onclick="editar(${item.id})">editar</button>
        <button type="button" class="" onclick="excluir(${item.id})">excluir</button>
      </td> `;
    });

    document.querySelector("#tabela-descricao>tbody").appendChild(novo);
    document.getElementById("criar-meta").reset();
  } else {
    arrayMeta = JSON.parse(localStorage.getItem("listaMetas"));

    for (let i = 0; i < arrayMeta.length; i++) {
      if (arrayMeta[i].id == idItemAlterar) {
        arrayMeta[i].descricao = descricaoHTML.value;
        arrayMeta[i].detalhamento = detalhamentoHTML.value;

        localStorage.setItem("listaMetas", JSON.stringify(arrayMeta));
        document.getElementById("btn-salvar").value = "Cadastrar";
        document.getElementById("criar-meta").reset();
        break;
      }
    }
  }

  listar();
});

function editar(id) {
  document.getElementById("btn-salvar").value = "Salvar";

  for (let i = 0; i < arrayMeta.length; i++) {
    if (arrayMeta[i].id == id) {
      descricaoHTML.value = arrayMeta[i].descricao;
      detalhamentoHTML.value = arrayMeta[i].detalhamento;

      idItemAlterar = arrayMeta[i].id;
      break;
    }
  }
}

function excluir(id) {
  for (let i = 0; i < arrayMeta.length; i++) {
    if (arrayMeta[i].id == id) {
      arrayMeta.splice(i, 1);
    }
  }

  localStorage.setItem("listaMetas", JSON.stringify(arrayMeta));
  listar();
}
