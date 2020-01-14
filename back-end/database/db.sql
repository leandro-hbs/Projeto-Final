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

INSERT INTO hosts VALUES (1, 'aluno', 'aluno', '127.16.0.70', 'Host');
INSERT INTO hosts VALUES (2, 'S0', '*****', '-.-.-.-', 'Switch');
INSERT INTO hosts VALUES (3, 'DNS', '*****', '200.10.10.10', 'Server');
INSERT INTO hosts (nome, senha, endereco, tipo) VALUES
      ('DNS', '*****', '200.10.10.11', 'Server'),
      ('PC2', '*****', '192.168.1.2', 'Host');