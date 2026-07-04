// ==========================================================
// Middleware de Autenticação
//
// Responsável por verificar se o usuário enviou
// um Token válido.
//
// Se estiver tudo certo,
// adiciona o usuário em req.usuario.
// ==========================================================

const jwt = require("jsonwebtoken");

const jwtConfig = require("../config/jwt");

const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {

    //--------------------------------------------------------
    // Procura o cabeçalho Authorization
    //--------------------------------------------------------

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return next(
            new AppError(
                "Token não informado.",
                401
            )
        );

    }

    //--------------------------------------------------------
    // Divide o texto:
    //
    // Bearer TOKEN
    //--------------------------------------------------------

    const partes = authHeader.split(" ");

    //--------------------------------------------------------
    // Deve possuir duas partes
    //--------------------------------------------------------

    if (partes.length !== 2) {

        return next(
            new AppError(
                "Token inválido.",
                401
            )
        );

    }

    const [tipo, token] = partes;

    //--------------------------------------------------------
    // Verifica se começa com Bearer
    //--------------------------------------------------------

    if (tipo !== "Bearer") {

        return next(
            new AppError(
                "Formato do Token inválido.",
                401
            )
        );

    }

    //--------------------------------------------------------
    // Valida o Token
    //--------------------------------------------------------

    try {

        const payload = jwt.verify(

            token,

            jwtConfig.secret

        );

        //----------------------------------------------------
        // Guarda os dados do usuário
        //----------------------------------------------------

        req.usuario = payload;

        next();

    }

    catch (erro) {

        return next(

            new AppError(

                "Token expirado ou inválido.",

                401

            )

        );

    }

};