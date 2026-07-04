// ==========================================================
// Permite acesso apenas para administradores.
// ==========================================================

const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {

    if (req.usuario.tipo !== "ADMIN") {

        return next(

            new AppError(

                "Acesso permitido apenas para administradores.",

                403

            )

        );

    }

    next();

};