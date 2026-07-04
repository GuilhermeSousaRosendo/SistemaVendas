// ======================================================
// Controller de Usuários
//
// Responsável por receber as requisições do navegador,
// validar os dados e chamar o Model.
//
// IMPORTANTE:
// Este arquivo NÃO acessa diretamente o banco de dados.
// ======================================================
const UsuarioModel = require("../models/UsuarioModel");
const UsuarioService =
    require("../services/UsuarioService");
const AuthService =
    require("../services/AuthService");
class UsuarioController {

    // ==========================================
    // Lista todos os usuários
    // ==========================================
    async listar(req, res) {

        try {

            // Busca todos os usuários no banco
            const usuarios = await UsuarioModel.listar();

            // Retorna em formato JSON
            res.json(usuarios);

        } catch (erro) {

            console.error(erro);

            res.status(500).json({

                erro: "Erro ao listar usuários."

            });

        }

    }

    // ==========================================
    // Cadastro de usuário
    // ==========================================
    async cadastrar(req, res) {

        try {

            const resposta =
                await UsuarioService.cadastrar(req.body);

            res.status(201).json(resposta);

        }

        catch (erro) {

            res.status(400).json({

                mensagem: erro.message

            });

        }

    }
    // ==========================================
    // Login
    // ==========================================
async login(req, res) {

    const { email, senha } = req.body;

    const resposta = await AuthService.login(email, senha);

    return res.json(resposta);

}
    // ==========================================
    // Atualização
    // ==========================================
    async atualizar(req, res) {

        res.send("Atualizar usuário");

    }

    // ==========================================
    // Exclusão
    // ==========================================
    async excluir(req, res) {

        res.send("Excluir usuário");

    }

}

// Exporta uma única instância do controller
module.exports = new UsuarioController();