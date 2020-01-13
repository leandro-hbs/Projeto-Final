function buscaDisp() {
    fetch("http://localhost:8080/back-end/php/p1/recebe.php")
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
    areaDisp.innerHTML += rows;
}

buscaDisp()

function adicionarDispositivo(){
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let tipo = document.getElementById('dispositivo').value;
    let endereco = document.getElementById('ip').value;
    let senha = document.getElementById('senha').value;
    fetch(`http://localhost:8080/back-end/php/p1/insere.php?nome=${nome}&tipo=${tipo}&endereco=${endereco}&senha=${senha}`)
        .then(res => res.json())
        .then(json => inserirDisp(json[0]));
}

function deletaDisp(){
    let id = event.target.parentNode.id;
    fetch(`http://localhost:8080/back-end/php/p1/deleta.php?id=${id}`)
        .then(event.target.parentNode.parentNode.parentNode.remove());
}

function pageConfig(){
    window.open('config.html')
}