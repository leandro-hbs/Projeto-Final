const id = 1;

function buscaDisp(id) {
  return fetch(`http://localhost:8080/back-end/php/p2/busca.php?id=${id}`)
    .then(res => res.json());
}

function informacoes(dispositivo){
  if (dispositivo[0].tipo == 'Host'){
    let titulo = document.querySelector("#titulo");
    titulo.innerHTML = 'Configure seu Host';
    fetch(`http://localhost:8080/back-end/php/p2/host.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
      .then(res => res.json())
      .then(json => InfoHost(json));
  }
  if (dispositivo[0].tipo == 'Roteador'){
    let titulo = document.querySelector("#titulo");
    titulo.innerHTML = 'Configure seu Roteador';
    fetch(`http://localhost:8080/back-end/php/p2/router.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
      .then(res => res.json())
      .then(json => InfoRoteador(json));
  }
}

function InfoHost(dados){
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
  <button type="button" onclick="atualiza()" class="btn" style="background-color: #B0E0E6;">Atualizar</button>
  </td>
  </tr>
  <tr>
  <tr>
  <td>Telnet</td>
  <td>
  <button type="button" onclick="client_t()" class="btn" style="background-color: #B0E0E6;">Cliente</button>
  <button type="button" type="button" data-toggle="modal" data-target="#modal-telnet" class="btn" style="background-color: #B0E0E6;">Servidor</button>
  </td>
  </tr>
  <tr>
  <td>SSH</td>
  <td>
  <button type="button" onclick="client_s()" class="btn" style="background-color: #B0E0E6;">Cliente</button>
  <button type="button" type="button" data-toggle="modal" data-target="#modal-SSH" class="btn" style="background-color: #B0E0E6;">Servidor</button>
  </td>
  </tr>
  <tr>`
  confDisp.innerHTML += rows;
}

function InfoRoteador(dados){
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

buscaDisp(id).then(disp => informacoes(disp));

function Configurar(){
  event.preventDefault();
  let comando = document.getElementById('comando').value;
  buscaDisp(id).then(disp => saida(disp, comando));
}

function saida(dispositivo, comando){
  let saida = document.querySelector("#saida");
  fetch(`http://localhost:8080/back-end/php/p2/configura.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}&comando=${comando}`)
    .then(res => res.json())
    .then(json => saida.innerHTML = json);
}

function mostra(dado){
  console.log(dado)
}

function atualiza(){
  event.preventDefault();
  buscaDisp(id).then(disp => Update(disp));
}

function Update(dispositivo){
  fetch(`http://localhost:8080/back-end/php/host/update.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
      .then(res => res.json())
      .then(json => mostra(json));
}

function telnet(){
  event.preventDefault();
  let allow = document.getElementById('allow').value;
  let deny = document.getElementById('deny').value;
  buscaDisp(id).then(disp => configurarTelnet(disp, allow, deny));
}

function configurarTelnet(dispositivo, allow, deny){
  fetch(`http://localhost:8080/back-end/php/host/telnet.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}&allow=${allow}&deny=${deny}`)
      .then(res => res.json())
      .then(json => mostra(json));
}

function SSH(){
  event.preventDefault();
  let port = document.getElementById('port').value;
  let root = document.getElementById('root').value;
  buscaDisp(id).then(disp => configurarSSH(disp, port, root));
}

function configurarSSH(dispositivo, port, root){
  fetch(`http://localhost:8080/back-end/php/host/SSH.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}&port=${port}&root=${root}`)
    .then(res => res.json())
    .then(json => mostra(json));
}

function client_s(){
  event.preventDefault();
  buscaDisp(id).then(disp => cliente_ssh(disp));
}

function cliente_ssh(dispositivo){
  fetch(`http://localhost:8080/back-end/php/host/clientS.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
    .then(res => res.json())
    .then(json => mostra(json));
}

function client_t(){
  event.preventDefault();
  buscaDisp(id).then(disp => cliente_telnet(disp));
}

function cliente_telnet(dispositivo){
  fetch(`http://localhost:8080/back-end/php/host/clientT.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
    .then(res => res.json())
    .then(json => mostra(json));
}