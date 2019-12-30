<?php
require_once('../index.php');

$connection = connect();

function insertDisp() {
  global $connection;
  $nome = $_GET['nome'];
  $tipo = $_GET['tipo'];
  $endereco = $_GET['endereco'];
  $senha = $_GET['senha'];
  $sql = "INSERT INTO hosts (nome, senha, endereco, tipo) VALUES ('{$nome}', '{$senha}', '{$endereco}', '{$tipo}')";
  $pdoStm = $connection->query($sql);
  return $pdoStm ? $pdoStm->fetchAll(PDO::FETCH_ASSOC) : null;
}

function returnDisp(){
    global $connection;
    $sql = "SELECT * from hosts WHERE ID = (SELECT MAX(ID) FROM hosts)";
    $pdoStm = $connection->query($sql);
    return $pdoStm ? $pdoStm->fetchAll(PDO::FETCH_ASSOC) : null;
}

insertDisp();

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode(returnDisp());