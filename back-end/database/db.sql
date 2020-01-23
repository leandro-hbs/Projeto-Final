USE dispositivos;
DELETE FROM hosts;
CREATE hosts;
CREATE TABLE hosts (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  senha varchar(100) NOT NULL,
  endereco varchar(100),
  tipo varchar(100) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO hosts VALUES (1, 'aluno', 'aluno', '172.16.0.70', 'Host');
INSERT INTO hosts VALUES (2, 'R1', 'cisco', '200.10.10.10', 'Router');
INSERT INTO hosts VALUES (3, 'PC1', 'linux', '172.16.0.77', 'Host');
INSERT INTO hosts (nome, senha, endereco, tipo) VALUES
      ('R2', 'cisco', '200.10.10.11', 'Router'),
      ('PC2', 'linux', '192.168.1.2', 'Host');