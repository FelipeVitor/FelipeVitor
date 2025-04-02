var http = require("http");

http.createServer(function(req,res){
    res.end("<h1>Bem vindo ao meu site!</h1>");
}).listen(3000);

console.log("Meu servidor está rodando!");