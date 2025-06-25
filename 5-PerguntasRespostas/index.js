const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
require('./database/Pergunta');

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

app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[['id','DESC']] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar",(req,res) => {

    res.render("perguntar",{

    });
});

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

app.get("/pergunta/:id", async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.redirect("/");
    }

    try {
        const pergunta = await Pergunta.findOne({ where: { id } });

        if (pergunta) {
            res.render("pergunta", { pergunta: pergunta.toJSON() }); 
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.error("Erro ao buscar pergunta:", error);
        res.status(500).send("Erro interno do servidor");
    }
});


app.listen(8080, ()=>{
    console.log("App rodando!")
});

