<?php
require_once('../index.php');

$connection = connect();

function buscaDisp() {
  global $connection;
  $id = 1;
  $sql = "SELECT * FROM hosts WHERE id = $id";
  $pdoStm = $connection->query($sql);
  return $pdoStm ? $pdoStm->fetchAll(PDO::FETCH_ASSOC) : null;
}

header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
echo json_encode(buscaDisp());