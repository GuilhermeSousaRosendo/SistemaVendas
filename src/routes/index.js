// ======================================================
// Arquivo central de rotas
// ======================================================

const express = require("express");

const router = express.Router();


// Importa as rotas
const usuarioRoutes = require("./usuarioRoutes");


// Página inicial
router.get("/", (req, res) => {

    res.send("🚀 Sistema de Vendas");

});


// Todas as rotas de usuários
router.use("/usuarios", usuarioRoutes);


// Exporta
module.exports = router;