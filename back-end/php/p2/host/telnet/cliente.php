<?php

$ip = $_GET['ip'];
$nome = $_GET['nome'];
$senha = $_GET['senha'];
$conexao = "sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$instala = "(sleep 1; echo 'su -'; sleep 1; echo 'root'; sleep 1; echo 'apt-get install telnetd'; sleep 5; echo 'systemctl start inetd'; sleep 1) | ";
$comando = $instala.$conexao;
$result = shell_exec($comando);

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode($result);