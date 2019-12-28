<?php
require_once('index.php');

$connection = connect();

function deleteDisp() {
  global $connection;
  $id = $_GET['id'];
  $sql = "DELETE FROM hosts WHERE id = {$id}";
  $pdoStm = $connection->query($sql);
  return $pdoStm ? $pdoStm->fetchAll(PDO::FETCH_ASSOC) : null;
}

deleteDisp();