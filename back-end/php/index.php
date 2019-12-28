<?php

const DB = 'mysql';
const DBSENHA = 'root';
const DBNOME = 'dispositivos';
const DBUSER = 'admin';
const DBPWD = 'admin';

function connect(){
  $dsn = DB.":dbname=".DBNOME.";host=".DB;
  try {
    return new PDO($dsn, DBUSER, DBPWD);
  } catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
  }
}