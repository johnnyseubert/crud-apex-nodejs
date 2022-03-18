//importações
const express = require("express");
const handle = require("express-handlebars");
const bodyParser = require("body-parser");
const routes = require('./routes');

//instanciação
const app = express();

//Template
app.engine('handlebars', handle.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//liberar acesso a arquivos externos/estaticos
app.use(express.static(__dirname + '/public'));

//rotas
app.use(routes);

//executar servidor
app.listen(8081, () => console.log("Servidor rodando http://localhost:8081"))