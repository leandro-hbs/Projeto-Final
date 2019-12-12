function carregaDados() {
    fetch("../php/index.php/")
      .then(res => res.json());
}

carregaDados()