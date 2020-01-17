<?php

$ip = $_GET['ip'];
$nome = $_GET['nome'];
$senha = $_GET['senha'];
$comando = $_GET['comando'];
$comando = "(sleep 1; echo '".$comando."'; sleep 1) | sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$result = shell_exec($comando);

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode($result);