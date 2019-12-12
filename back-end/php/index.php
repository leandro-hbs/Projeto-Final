<?php
  $id = $_GET['id'] ?? 'null';
  $json_file = file_get_contents('../database/db.json');
  $dados = json_decode($json_file,true);
  foreach ( $dados['dispositivos']["$id"] as $dado ){
    echo $dado;
  }
  $result = [];
  $result['response'] = shell_exec("echo '$conf' | sshpass -p '$senha' ssh -o 'StrictHostKeyChecking no' $nome@$address");
  echo json_encode($result);
?>