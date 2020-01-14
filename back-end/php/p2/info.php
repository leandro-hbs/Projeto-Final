<?php

function verificaDisp() {
  $ip = $_GET['ip'];
  $nome = $_GET['nome'];
  $senha = $_GET['senha'];
  $comando = ".././info.sh $nome $senha | telnet $ip";
  echo $comando;
  $result = shell_exec($comando);
  return $result;
}

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode(verificaDisp());