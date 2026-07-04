// =======================================================
// ProdutoService
//
// Responsável pelas regras de negócio dos produtos.
// Nunca acessa o banco diretamente.
// =======================================================

const ProdutoModel = require("../models/ProdutoModel");
const AppError = require("../utils/AppError");

class ProdutoService {

    // ===================================================
    // Lista todos os produtos
    // ===================================================
    async listar(filtros) {

        return await ProdutoModel.listar(

            filtros

        );

    }

    // ===================================================
    // Busca um produto pelo ID
    // ===================================================
    async buscarPorId(id) {

        const produto = await ProdutoModel.buscarPorId(id);

        if (!produto) {

            throw new AppError(
                "Produto não encontrado.",
                404
            );

        }

        return produto;

    }

    // ===================================================
    // Cadastra um novo produto
    // ===================================================
    async cadastrar(dados) {

        // -----------------------------
        // Nome obrigatório
        // -----------------------------
        if (!dados.nome || dados.nome.trim() === "") {

            throw new AppError(
                "O nome do produto é obrigatório.",
                400
            );

        }

        // -----------------------------
        // Preço obrigatório
        // -----------------------------
        if (dados.preco <= 0) {

            throw new AppError(
                "O preço deve ser maior que zero.",
                400
            );

        }

        // -----------------------------
        // Estoque não pode ser negativo
        // -----------------------------
        if (dados.estoque < 0) {

            throw new AppError(
                "O estoque não pode ser negativo.",
                400
            );

        }

        const id = await ProdutoModel.criar(dados);

        return {

            mensagem: "Produto cadastrado com sucesso.",

            id

        };

    }

    // ===================================================
    // Atualizar Produto
    // ===================================================

    async atualizar(id, dados) {

        const produto = await ProdutoModel.buscarPorId(id);

        if (!produto) {

            throw new AppError(

                "Produto não encontrado.",

                404

            );

        }

        if (!dados.nome) {

            throw new AppError(

                "Nome obrigatório.",

                400

            );

        }

        if (dados.preco <= 0) {

            throw new AppError(

                "Preço inválido.",

                400

            );

        }

        await ProdutoModel.atualizar(

            id,

            dados

        );

        return {

            mensagem: "Produto atualizado com sucesso."

        };

    }


    // ===================================================
    // Excluir Produto
    // ===================================================

    async excluir(id) {

        const produto = await ProdutoModel.buscarPorId(id);

        if (!produto) {

            throw new AppError(

                "Produto não encontrado.",

                404

            );

        }

        await ProdutoModel.excluir(id);

        return {

            mensagem: "Produto removido com sucesso."

        };

    }

}

module.exports = new ProdutoService();