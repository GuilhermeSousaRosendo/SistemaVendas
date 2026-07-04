// ======================================================
// ProdutoModel
//
// Responsável por acessar SOMENTE a tabela produtos.
//
// Nunca colocamos regras de negócio aqui.
// Apenas SQL.
// ======================================================

const conexao = require("../database/conexao");

class ProdutoModel {

    // =============================================
    // Listar todos os produtos
    // =============================================

    async listar() {

        const sql = `
            SELECT *
            FROM produtos
            ORDER BY id DESC
        `;

        const [rows] = await conexao.query(sql);

        return rows;

    }

    // =============================================
    // Buscar produto pelo ID
    // =============================================

    async buscarPorId(id) {

        const sql = `
            SELECT *
            FROM produtos
            WHERE id = ?
        `;

        const [rows] = await conexao.query(sql, [id]);

        return rows[0];

    }

    // ======================================================
    // Atualiza um produto
    // ======================================================

    async atualizar(id, produto) {

        const sql = `

        UPDATE produtos

        SET

            nome = ?,

            descricao = ?,

            preco = ?,

            estoque = ?,

            categoria_id = ?,

            imagem = ?

        WHERE id = ?

    `;

        await conexao.query(sql, [

            produto.nome,

            produto.descricao,

            produto.preco,

            produto.estoque,

            produto.categoria_id,

            produto.imagem,

            id

        ]);

    }

    // ======================================================
    // Exclui um produto
    // ======================================================

    async excluir(id) {

        const sql = `

        DELETE FROM produtos

        WHERE id = ?

    `;

        await conexao.query(sql, [id]);

    }

    // =============================================
    // Inserir novo produto
    // =============================================

    async criar(produto) {

        const sql = `
            INSERT INTO produtos
            (
                nome,
                descricao,
                preco,
                estoque,
                categoria_id,
                imagem
            )

            VALUES

            (?, ?, ?, ?, ?, ?)
        `;

        const [resultado] = await conexao.query(sql, [

            produto.nome,

            produto.descricao,

            produto.preco,

            produto.estoque,

            produto.categoria_id,

            produto.imagem

        ]);

        return resultado.insertId;

    }

    // ======================================================
// Lista produtos com filtros e paginação
// ======================================================

async listar(filtros) {

    const pagina = Number(filtros.page) || 1;

    const limite = Number(filtros.limit) || 10;

    const offset = (pagina - 1) * limite;

    const nome = filtros.nome || "";

    const ordenar = filtros.ordenar || "id";

    //----------------------------------------------------

    const sql = `

        SELECT *

        FROM produtos

        WHERE nome LIKE ?

        ORDER BY ${ordenar}

        LIMIT ?

        OFFSET ?

    `;

    const [rows] = await conexao.query(

        sql,

        [

            `%${nome}%`,

            limite,

            offset

        ]

    );

    return rows;

}

}

module.exports = new ProdutoModel();