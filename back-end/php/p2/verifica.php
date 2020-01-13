<?php

function verificaDisp() {
  $ip = $_GET['ip'];
  $comando = "ping {$ip}";
  exec($comando, $saida, $retorno);
  if (count($saida)) {
    print('A Máquina está online');
  } else {
    print('A Máquina não está online');
  }
}

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode(verificaDisp());