// =====================================================
// server.js
//
// Este arquivo apenas inicia o servidor.
// Todas as configurações ficam no app.js
// =====================================================

require("dotenv").config();

const app = require("./src/app");

const db = require("./src/database/connection");

const PORT = process.env.PORT || 3000;

// Testa a conexão com o banco
async function conectarBanco() {

    try {

        const connection = await db.getConnection();

        console.log("✅ Banco conectado com sucesso!");

        connection.release();

    } catch (erro) {

        console.error("Erro ao conectar ao banco:");

        console.error(erro);

    }

}

// Inicia o servidor
app.listen(PORT, () => {

    console.log("--------------------------------");

    console.log("Servidor iniciado!");

    console.log(`http://localhost:${PORT}`);

    console.log("--------------------------------");

    conectarBanco();

});