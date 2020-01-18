<?php

function cpu_encode($comando){
  $result = shell_exec($comando);
  $regex = "/model name\s+:\s+(.+)/";
  preg_match_all($regex, $result, $matches);
  return $matches[1][0];
}

function mem_encode($comando){
  $result = shell_exec($comando);
  $regex = "/MemTotal:\s+(.+)\nMemFree:\s+(.+)/";
  preg_match_all($regex, $result, $matches);
  return $matches;
}

function vga_encode($comando){
  $result = shell_exec($comando);
  $regex = "/VGA compatible controller:\s+(.+)/";
  preg_match_all($regex, $result, $matches);
  return $matches[1][0];
}

$informacoes = [];
$ip = $_GET['ip'];
$nome = $_GET['nome'];
$senha = $_GET['senha'];
$comando = "(sleep 1; echo 'cat /proc/cpuinfo'; sleep 1) | sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$informacoes[] = cpu_encode($comando);
$comando = "(sleep 1; echo 'lspci'; sleep 1) | sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$informacoes[] = vga_encode($comando);
$comando = "(sleep 1; echo 'cat /proc/meminfo'; sleep 1) | sshpass -p "."$senha"." ssh -o 'StrictHostKeyChecking no' $nome@$ip";
$memoria = mem_encode($comando);
$informacoes[] = $memoria[1][0];
$informacoes[] = $memoria[2][0];

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode($informacoes);