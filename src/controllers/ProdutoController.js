// ==========================================================
// ProdutoController
//
// Responsável por receber as requisições HTTP
// e chamar o ProdutoService.
//
// Não possui regras de negócio.
// ==========================================================

const ProdutoService = require("../services/ProdutoService");

class ProdutoController {

    // ======================================================
    // GET /produtos
    // Lista todos os produtos
    // ======================================================
    async listar(req, res) {

        const produtos =

            await ProdutoService.listar(

                req.query

            );

        return res.json(produtos);

    }

    // ======================================================
    // GET /produtos/:id
    // Busca um produto pelo ID
    // ======================================================
    async buscarPorId(req, res) {

        const { id } = req.params;

        const produto = await ProdutoService.buscarPorId(id);

        return res.json(produto);

    }

    // ======================================================
    // POST /produtos
    // Cadastra um novo produto
    // ======================================================
    async cadastrar(req,res){

    if(req.file){

        req.body.imagem = req.file.filename;

    }

    const resposta = await ProdutoService.cadastrar(

        req.body

    );

    return res.status(201).json(resposta);

}

    // ======================================================
    // Atualizar Produto
    // ======================================================

    async atualizar(req, res) {

        const { id } = req.params;

        const resposta = await ProdutoService.atualizar(

            id,

            req.body

        );

        return res.json(resposta);

    }


    // ======================================================
    // Excluir Produto
    // ======================================================

    async excluir(req, res) {

        const { id } = req.params;

        const resposta = await ProdutoService.excluir(id);

        return res.json(resposta);

    }

}

module.exports = new ProdutoController();