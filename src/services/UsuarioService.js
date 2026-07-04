// =======================================================
// Service de Usuários
//
// Aqui ficam TODAS as regras de negócio.
//
// O Controller nunca deve conter lógica pesada.
//
// O Model nunca deve validar informações.
//
// =======================================================

const bcrypt = require("bcrypt");

const UsuarioModel = require("../models/UsuarioModel");

class UsuarioService {

    // ===================================================
    // Cadastro
    // ===================================================
    async cadastrar(usuario){

        //--------------------------------------------------
        // Validação
        //--------------------------------------------------

        if(!usuario.nome){

            throw new Error("Nome obrigatório.");

        }

        if(!usuario.email){

            throw new Error("Email obrigatório.");

        }

        if(!usuario.senha){

            throw new Error("Senha obrigatória.");

        }

        //--------------------------------------------------
        // Email já existe?
        //--------------------------------------------------

        const usuarioExistente =
            await UsuarioModel.buscarPorEmail(usuario.email);

        if(usuarioExistente){

            throw new Error("Email já cadastrado.");

        }

        //--------------------------------------------------
        // Criptografa senha
        //--------------------------------------------------

        usuario.senha =
            await bcrypt.hash(usuario.senha,10);

        //--------------------------------------------------
        // Todo cadastro é CLIENTE
        //--------------------------------------------------

        usuario.tipo="CLIENTE";

        //--------------------------------------------------
        // Salva
        //--------------------------------------------------

        const id =
            await UsuarioModel.cadastrar(usuario);

        return{

            id,

            mensagem:"Usuário cadastrado com sucesso."

        };

    }

}

module.exports =
new UsuarioService();