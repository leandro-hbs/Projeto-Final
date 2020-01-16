function buscaDisp() {
  fetch("http://localhost:8080/back-end/php/p2/busca.php?id=1")
    .then(res => res.json())
    .then(json => informacoes(json));
}

function informacoes(dispositivo){
  if (dispositivo[0].tipo == 'Host'){
    let titulo = document.querySelector("#titulo");
    titulo.innerHTML += 'Configure seu Host';
    fetch(`http://localhost:8080/back-end/php/p2/info.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
      .then(res => res.json())
      .then(json => inserirInfo(json));
  }
}

function inserirInfo(dados){
  let infoDisp = document.querySelector("#info-disp");
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
}

buscaDisp()

function Configurar(){
  event.preventDefault();
  let comando = document.getElementById('comando').value;
  fetch(`http://localhost:8080/back-end/php/p2/configura.php?comando=${comando}`)
      .then(res => res.json())
      .then(json => saida(json));
}

function saida(texto){
  let saida = document.querySelector("#saida");
  saida.innerHTML = texto;
}