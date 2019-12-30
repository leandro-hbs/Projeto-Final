function inserirInfo(info, dado){
  let infoDisp = document.querySelector("#info-disp");
  let rows = "";
  rows += `<tr>
  <td>${info}</td>
  <td>${dado}</td>
  </tr>`;
  infoDisp.innerHTML += rows;
}