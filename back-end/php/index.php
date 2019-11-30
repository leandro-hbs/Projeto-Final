
<?php
  $conf = $_GET['conf'] ?? '';
  $address = $_GET['address'] ?? '';
  $nome = $_GET['nome'] ?? '';
  $senha = $_GET['senha'] ?? '';
  $result = [];
  $result['response'] = shell_exec("echo '$conf' | sshpass -p '$senha' ssh -o 'StrictHostKeyChecking no' $nome@$address");
  echo json_encode($result);
?>