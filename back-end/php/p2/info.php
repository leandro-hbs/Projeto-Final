<?php

function verificaDisp() {
  $ip = $_GET['ip'];
  $nome = $_GET['nome'];
  $senha = $_GET['senha'];
  $comando = "(sleep 1; echo 'ls -la'; sleep 1) | sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
  $result = shell_exec($comando);
  return $result;
}

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode(verificaDisp());