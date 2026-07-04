// =====================================================
// app.js
//
// Este arquivo é responsável por configurar toda a
// aplicação Express.
//
// Ele NÃO inicia o servidor.
// Apenas prepara a aplicação.
// =====================================================

const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
// Cria a aplicação
const app = express();

const path = require("path");


// Permite receber JSON nas requisições
app.use(express.json());

app.use(

    "/uploads",

    express.static(

        path.resolve("uploads")

    )

);

// Permite acessar arquivos da pasta public
app.use(express.static("public"));

app.use(routes);

app.use(errorHandler);


// Exporta a aplicação
module.exports = app;