<?php
  $consulta = "SELECT * FROM hosts";
  $con      = $mysqli->query($consulta) or die($mysqli->error);
  foreach( $con as $dado){
    echo $dado;
  }
?>