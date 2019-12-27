class Disp{
    constructor(nome, tipo, endereco, senha = ''){
        this.nome = nome;
        this.tipo = tipo;
        this.endereco = endereco;
        this.senha = senha;
    }
}

function buscaDisp() {
    fetch("http://localhost:8080/back-end/php/index.php")
      .then(res => res.json())
      .then(json => inserir(json));
}

function inserir(dispositivos){
    for (let disp of dispositivos) {
        inserirDisp(disp)
    }
}

function inserirDisp(disp){
    let areaDisp = document.querySelector("#area-disp");
    let rows = "";
    rows += `<tr>
    <td>${disp.id}</td>
    <td>${disp.nome}</td>
    <td>${disp.tipo}</td>
    <td>${disp.endereco}</td>
    <td>
        <button type="button" id='${disp.id}' onclick='pageConfig()'>
            <i class="fas fa-cogs"></i>
        </button>
        <button type="button" id='${disp.id}' onclick='deletaDisp()'>
            <i class="fas fa-trash-alt"></i>
        </button>
    </tr>`;
    areaDisp.innerHTML = rows;
}

buscaDisp()

function adicionarDispositivo(){
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let tipo = document.getElementById('dispositivo').value;
    let endereco = document.getElementById('ip').value;
    let senha = document.getElementById('senha').value;
    let maquina = new Disp(nome, tipo, endereco, senha);
    //fetch("http://localhost:8080/back-end/php/insere.php?maquina=${maquina}")
    //    .then(res => res.json())
    //    .then(json => inserirDisp(json));
}

function pageConfig(){
    window.open('config.html')
}