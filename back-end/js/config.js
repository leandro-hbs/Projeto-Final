function buscaDisp() {
  fetch("http://localhost:8080/back-end/php/p2/busca.php")
    .then(res => res.json())
    .then(json => verifica(json));
}

function verifica(dispositivo){
  fetch(`http://localhost:8080/back-end/php/p2/verifica.php?ip=${dispositivo.endereco}`)
    .then(res => res.json())
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