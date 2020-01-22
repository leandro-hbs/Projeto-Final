<?php

$ip = $_GET['ip'];
$nome = $_GET['nome'];
$senha = $_GET['senha'];
$allow = $_GET['allow'];
$deny = $_GET['deny'];
$conexao = "sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$instala = "(sleep 1; echo 'su -'; sleep 1; echo 'root'; sleep 1; echo 'apt-get install telnetd'; sleep 5; ";
$permitir = " echo 'echo in.telnetd:$allow > /etc/hosts.allow'; sleep 1; echo 'echo in.telnetd:$deny > /etc/hosts.deny'; sleep 1; echo 'systemctl restart inetd'; sleep 1) |";
$comando = $instala.$permitir.$conexao;
$result = shell_exec($comando);

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode($result);