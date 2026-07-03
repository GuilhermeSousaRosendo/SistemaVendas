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

// Cria a aplicação
const app = express();

// Permite receber JSON nas requisições
app.use(express.json());

// Permite acessar arquivos da pasta public
app.use(express.static("public"));

// Rota temporária de teste
app.get("/", (req, res) => {

    res.send("Sistema de Vendas funcionando!");

});

// Exporta a aplicação
module.exports = app;