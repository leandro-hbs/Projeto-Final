const url = window.location.href;
const id = new URL(url).searchParams.get("id");

class Montar{
  constructor(id){
    this.id = id;
    this.url = 'http://localhost:8080/back-end/php/p2/';
    fetch(this.url + `busca.php?id=${this.id}`)
      .then(res => res.json())
      .then(disp => this.Montagem(disp));
  }

  Montagem(dispositivo){
    this.endereco = dispositivo[0].endereco;
    this.nome = dispositivo[0].nome;
    this.senha = dispositivo[0].senha;

    if (dispositivo[0].tipo == 'Host'){
      let titulo = document.querySelector("#titulo");
      titulo.innerHTML = 'Configure seu Host';
      fetch(this.url + `host.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}`)
        .then(res => res.json())
        .then(json => this.InfoHost(json));
    }

    if (dispositivo[0].tipo == 'Roteador'){
      let titulo = document.querySelector("#titulo");
      titulo.innerHTML = 'Configure seu Roteador';
      fetch(this.url + `router.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}`)
        .then(res => res.json())
        .then(json => this.InfoRoteador(json));
    }
  }

  InfoHost(dados){
    let infoDisp = document.querySelector("#info-disp");
    let confDisp = document.querySelector("#conf-disp");
    let rows = "";
    rows += `<tr>
    <td>Processador</td>
    <td>${dados[0]}</td>
    </tr>
    <tr>
    <td>Placa de Video</td>
    <td>${dados[1]}</td>
    </tr>
    <tr>
    <td>Memória Total</td>
    <td>${dados[2]}</td>
    </tr>
    <tr>
    <td>Memória Livre</td>
    <td>${dados[3]}</td>
    </tr>`;
    infoDisp.innerHTML += rows;
    rows = ""
    rows += `<tr>
    <td>Update</td>
    <td>
    <button type="button" onclick="Atualiza()" class="btn" style="background-color: #B0E0E6;">Atualizar</button>
    </td>
    </tr>
    <tr>
    <tr>
    <td>Telnet</td>
    <td>
    <button type="button" onclick="Cliente_Telnet()" class="btn" style="background-color: #B0E0E6;">Cliente</button>
    <button type="button" type="button" data-toggle="modal" data-target="#modal-telnet" class="btn" style="background-color: #B0E0E6;">Servidor</button>
    </td>
    </tr>
    <tr>
    <td>SSH</td>
    <td>
    <button type="button" onclick="Cliente_SSH()" class="btn" style="background-color: #B0E0E6;">Cliente</button>
    <button type="button" type="button" data-toggle="modal" data-target="#modal-SSH" class="btn" style="background-color: #B0E0E6;">Servidor</button>
    </td>
    </tr>
    <tr>`
    confDisp.innerHTML += rows;
  }
  
  InfoRoteador(dados){
    let infoDisp = document.querySelector("#info-disp");
    let confDisp = document.querySelector("#conf-disp");
    let rows = "";
    rows += `<tr>
    <td>Versão</td>
    <td>${dados[0]}</td>
    </tr>
    <tr>
    <td>Processador</td>
    <td>${dados[1]}</td>
    </tr>
    <tr>
    <td>Ram Principal</td>
    <td>${dados[2]}</td>
    </tr>
    <tr>
    <td>Ram Compartilhada</td>
    <td>${dados[3]}</td>
    </tr>`;
    infoDisp.innerHTML += rows;
    rows = ""
    rows += `<tr>
    <td>RIP</td>
    <td>
    <button type="button" class="btn" style="background-color: #B0E0E6;">Configurar</button>
    </td>
    </tr>
    <tr>
    <td>BGP</td>
    <td>
    <button type="button" class="btn" style="background-color: #B0E0E6;">Configurar</button>
    </td>
    </tr>
    <tr>
    <td>OSPF</td>
    <td>
    <button type="button" class="btn" style="background-color: #B0E0E6;">Configurar</button>
    </td>
    </tr>`
    confDisp.innerHTML += rows;
  }
}

let montar = new Montar(id);

class Funcionalidades{
  constructor(id){
    this.id = id;
    this.url = 'http://localhost:8080/back-end/php/p2/';
    fetch(this.url + `busca.php?id=${this.id}`)
      .then(res => res.json())
      .then(disp => this.Variaveis(disp));
  }

  Variaveis(dispositivo){
    this.endereco = dispositivo[0].endereco;
    this.nome = dispositivo[0].nome;
    this.senha = dispositivo[0].senha;
  }

  Alerta(dados){
    alert(dados);
  }

  Configuração(comando){
    let saida = document.querySelector("#saida");
    fetch(this.url + `configura.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}&comando=${comando}`)
      .then(res => res.json())
      .then(json => saida.innerHTML = json);
  }

  Update(){
    fetch(this.url + `host/update.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}`)
        .then(res => res.json())
        .then(json => this.Alerta(json));
  }

  Telnet(modo, op1 = '', op2 = ''){
    if (modo == 'cliente'){
      fetch(this.url + `host/telnet/cliente.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}`)
        .then(res => res.json())
        .then(json => this.Alerta(json));
    }
    if (modo == 'servidor'){
      fetch(this.url + `host/telnet/servidor.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}&allow=${op1}&deny=${op2}`)
        .then(res => res.json())
        .then(json => this.Alerta(json));
    }
  }

  SSH(modo, op1 = '', op2 = ''){
    if (modo == 'cliente'){
      fetch(this.url + `host/ssh/cliente.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}`)
        .then(res => res.json())
        .then(json => this.Alerta(json));
    }
    if (modo == 'servidor'){
      fetch(this.url + `host/ssh/servidor.php?ip=${this.endereco}&nome=${this.nome}&senha=${this.senha}&port=${op1}&root=${op2}`)
        .then(res => res.json())
        .then(json => this.Alerta(json));
    }
  }
}

funcionalidades = new Funcionalidades(id)

function Configurar(){
  event.preventDefault();
  let comando = document.getElementById('comando').value;
  funcionalidades.Configuração(comando);
}

function Atualiza(){
  event.preventDefault();
  funcionalidades.Update();
}

function Cliente_Telnet(){
  event.preventDefault();
  funcionalidades.Telnet('cliente');
}

function Servidor_Telnet(){
  event.preventDefault();
  let allow = document.getElementById('allow').value;
  let deny = document.getElementById('deny').value;
  funcionalidades.Telnet('servidor', allow, deny);
}

function Cliente_SSH(){
  event.preventDefault();
  funcionalidades.SSH('cliente');
}

function Servidor_SSH(){
  event.preventDefault();
  let port = document.getElementById('port').value;
  let root = document.getElementById('root').value;
  funcionalidades.SSH('servidor', port, root);
}