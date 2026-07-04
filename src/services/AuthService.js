// ==========================================================
// Serviço responsável pela autenticação.
//
// Toda regra relacionada ao login ficará aqui.
// ==========================================================

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const UsuarioModel = require("../models/UsuarioModel");

const jwtConfig = require("../config/jwt");

const AppError = require("../utils/AppError");

class AuthService {

    async login(email, senha){

        //----------------------------------------------------
        // Procura usuário pelo email
        //----------------------------------------------------

        const usuario =
            await UsuarioModel.buscarPorEmail(email);

        if(!usuario){

            throw new AppError(

                "Email ou senha inválidos.",

                401

            );

        }

        //----------------------------------------------------
        // Verifica a senha
        //----------------------------------------------------

        const senhaValida =
            await bcrypt.compare(

                senha,

                usuario.senha

            );

        if(!senhaValida){

            throw new AppError(

                "Email ou senha inválidos.",

                401

            );

        }

        //----------------------------------------------------
        // Gera o Token
        //----------------------------------------------------

        const token = jwt.sign(

            {

                id: usuario.id,

                tipo: usuario.tipo

            },

            jwtConfig.secret,

            {

                expiresIn: jwtConfig.expiresIn

            }

        );

        //----------------------------------------------------
        // Nunca devolvemos a senha
        //----------------------------------------------------

        delete usuario.senha;

        return{

            usuario,

            token

        };

    }

}

module.exports = new AuthService();