// =======================================================
// Importa a biblioteca mysql2 utilizando Promise.
// Promises permitem trabalhar com código assíncrono de
// forma mais organizada usando async/await.
// =======================================================
const mysql = require('mysql2/promise');


// =======================================================
// Carrega as variáveis do arquivo .env.
//
// Exemplo:
//
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=123456
//
// Essas informações ficam fora do código por segurança.
// =======================================================
require('dotenv').config();


// =======================================================
// Cria um Pool de Conexões.
//
// Em vez de abrir uma conexão toda vez que o sistema
// precisa acessar o banco, o Pool mantém conexões prontas.
//
// Isso melhora MUITO o desempenho.
// =======================================================
const pool = mysql.createPool({

    // Endereço do banco
    host: process.env.DB_HOST,

    // Usuário do MySQL
    user: process.env.DB_USER,

    // Senha do usuário
    password: process.env.DB_PASSWORD,

    // Nome do banco
    database: process.env.DB_NAME,

    // Porta do MySQL
    port: process.env.DB_PORT,

    // Número máximo de conexões simultâneas
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});


// =======================================================
// Exporta o Pool.
//
// Qualquer arquivo do projeto poderá fazer:
//
// const db = require('../database/connection');
//
// e utilizar:
//
// await db.query(...)
// =======================================================
module.exports = pool;