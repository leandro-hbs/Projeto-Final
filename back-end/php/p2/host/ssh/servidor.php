<?php

$ip = $_GET['ip'];
$nome = $_GET['nome'];
$senha = $_GET['senha'];
$port = $_GET['port'];
$root = $_GET['root'];
$conexao = "sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$instala = "(sleep 1; echo 'su -'; sleep 1; echo 'root'; sleep 1; echo 'apt-get install openssh-server'; sleep 5; ";
$sed1 = "sed -i 's/Port 22/Port $port/' /etc/ssh/sshd_config";
$sed2 = "sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin $root/' /etc/ssh/sshd_config";
$permitir = ' echo "'.$sed1.'"; sleep 1; echo "'.$sed2.'"; sleep 1; echo "systemctl restart sshd"; sleep 1) |';
$comando = $instala.$permitir.$conexao;
$result = shell_exec($comando);

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode($result);