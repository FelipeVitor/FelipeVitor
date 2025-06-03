const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./database/database");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/index",(req,res) => {
    var nome = "Felipe";
    var lang = "JavaScript";
    var exibirMsg = false;

    var listaProdutos = [
        {nome: "Notebook", preco: 2500},
        {nome: "Monitor", preco: 1500},
        {nome: "Teclado", preco: 200},
        {nome: "Mouse", preco: 100},
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "Seidor",
        ano: 2025,
        msg: exibirMsg,
        produtos: listaProdutos
    });
});

app.get("/perguntar",(req,res) => {

    res.render("perguntar",{

    });
});

app.listen(8080, ()=>{
    console.log("App rodando!")
});

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido com sucesso! Titulo: " + titulo + " Descrição: " + descricao);
})