// ==========================================================
// Model de Usuários
//
// Este arquivo é o ÚNICO responsável por acessar
// a tabela "usuarios".
//
// Toda consulta SQL ficará aqui.
// ==========================================================


// Importa a conexão com o banco
const db = require("../database/connection");

class UsuarioModel {

    // ======================================================
    // LISTAR TODOS OS USUÁRIOS
    // ======================================================
    async listar() {

        // Executa a consulta SQL
        const [rows] = await db.query(`
            SELECT
                id,
                nome,
                email,
                tipo,
                ativo,
                criado_em
            FROM usuarios
        `);

        // Retorna os usuários encontrados
        return rows;

    }

    // ======================================================
    // BUSCAR USUÁRIO PELO E-MAIL
    // ======================================================
    async buscarPorEmail(email) {

        const [rows] = await db.query(

            `
            SELECT *
            FROM usuarios
            WHERE email = ?
            `,

            [email]

        );

        return rows[0];

    }

    // ======================================================
    // BUSCAR PELO ID
    // ======================================================
    async buscarPorId(id) {

        const [rows] = await db.query(

            `
            SELECT *
            FROM usuarios
            WHERE id = ?
            `,

            [id]

        );

        return rows[0];

    }

    // ======================================================
    // CADASTRAR USUÁRIO
    // ======================================================
    async cadastrar(usuario) {

        const [resultado] = await db.query(

            `
            INSERT INTO usuarios
            (nome,email,senha,tipo)

            VALUES (?,?,?,?)
            `,

            [

                usuario.nome,

                usuario.email,

                usuario.senha,

                usuario.tipo

            ]

        );

        return resultado.insertId;

    }

    // ======================================================
    // ATUALIZAR
    // ======================================================
    async atualizar(id, usuario) {

        await db.query(

            `
            UPDATE usuarios

            SET

                nome = ?,

                email = ?,

                tipo = ?

            WHERE id = ?
            `,

            [

                usuario.nome,

                usuario.email,

                usuario.tipo,

                id

            ]

        );

    }

    // ======================================================
    // EXCLUIR
    // ======================================================
    async excluir(id) {

        await db.query(

            `
            DELETE FROM usuarios

            WHERE id = ?
            `,

            [id]

        );

    }

}

// Exporta apenas uma instância
module.exports = new UsuarioModel();
