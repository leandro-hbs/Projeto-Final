class Disp{
    constructor(nome, dispositivo, ip){
        this.nome = nome;
        this.dispositivo = dispositivo;
        this.ip = ip;
    }
}

class DispServico{
    constructor(url){
        this.url = 'http://localhost:3000/dispositivos/';
    }

    listar(){
        return fetch(this.url, {
            method: "GET"
        }).then(resposta => resposta.json());
    }

    inserir(dispositivo){
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(dispositivo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            resposta => resposta.json()
        );
    }

    remover(id){
        return fetch(this.url+id, {
            method: "DELETE"
        }).then(resposta => resposta.json());
    }

}
let dispositivos = new DispServico();
function adicionarDispositivo(){
    event.preventDefault();
    
    let nome = document.getElementById('nome').value;
    let dispositivo = document.getElementById('dispositivo').value;
    let ip = document.getElementById('ip').value;
    let maquina = new Disp(nome, dispositivo, ip);
    dispositivos.inserir(maquina).then(
    	maquina => inserirTr(maquina)
    );
}

function inserirTr(maquina){
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let botaorm = document.createElement('span');
        let botaoconf = document.createElement('span');
        botaorm.setAttribute('type', "button");
        botaorm.setAttribute('onclick', "deletarDisp()");
        botaorm.setAttribute('class', "btn btn-dark");
        botaorm.innerHTML = "Remover";
        botaoconf.setAttribute('type', "button");
        botaoconf.setAttribute('onclick', "confDisp()");
        botaoconf.setAttribute('class', "btn btn-dark");
        botaoconf.innerHTML = "Configurar";
        th.setAttribute('scope', "row");
        tr.appendChild(th);
        tr.innerHTML = "<th scope='col'>" + maquina.id + "</th>" + "<td>" + maquina.nome + "</td>" + "\n" + "<td>" + maquina.dispositivo + "</td>" + "\n" + "<td>" + maquina.ip + "</td>";
        tr.appendChild(botaorm);
        tr.appendChild(botaoconf);
        let areaDisp = document.querySelector("#area-disp");
        areaDisp.appendChild(tr);
}

function deletarDisp(){
    event.preventDefault();
    let id = event.target.id;  
    dispositivos.remover(id).then(event.target.parentNode.remove());

}

function buscaDisp(){
    
    dispositivos.listar().then(dispositivos => {
            for(let disp of dispositivos){
                inserirTr(disp);
            }
        }
    );
}

buscaDisp()