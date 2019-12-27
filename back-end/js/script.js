function buscaDisp() {
    fetch("http://localhost:8080/back-end/php/index.php")
      .then(res => res.json())
      .then(json => inserir(json));
}

function inserir(dispositivos){
    let areaDisp = document.querySelector("#area-disp");
    let rows = "";
    for (let disp of dispositivos) {
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
    }
    areaDisp.innerHTML = rows;
}

buscaDisp()

function pageConfig(){
    window.open('config.html')
}