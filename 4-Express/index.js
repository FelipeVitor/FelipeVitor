const express = require("express"); // Importando
const app = express(); // Inicializando

app.get("/", function(req,res){
    res.send("<h1>Bem vindo ao guia do programador</h1>")
});

app.get("/ola/:nome", function(req,res){
    var nome = req.params.nome;
    res.send("<h1>Oi " + nome + " </h1>")
});

app.listen(4000, function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    } else {
        console.log("Servidor iniciado com sucesso!");
    }
});