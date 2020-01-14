function buscaDisp() {
  fetch("http://localhost:8080/back-end/php/p2/busca.php?id=1")
    .then(res => res.json())
    .then(json => verifica(json));
}

function verifica(dispositivo){
  fetch(`http://localhost:8080/back-end/php/p2/info.php?ip=${dispositivo[0].endereco}&nome=${dispositivo[0].nome}&senha=${dispositivo[0].senha}`)
    .then(res => res.json())
    .then(json => insere(json));
}

function insere(dados){
  for (let dado of dados) {
    inserirInfo(dado[0][0],dado[0][1])
  }
}

function inserirInfo(info, dado){
  let infoDisp = document.querySelector("#info-disp");
  let rows = "";
  rows += `<tr>
  <td>${info}</td>
  <td>${dado}</td>
  </tr>`;
  infoDisp.innerHTML += rows;
}

buscaDisp()