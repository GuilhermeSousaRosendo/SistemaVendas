// ==========================================================
// asyncHandler
//
// Captura automaticamente erros de funções assíncronas.
//
// Assim não precisamos colocar try/catch em todos os
// controllers.
// ==========================================================

module.exports = (fn) => {

    return (req, res, next) => {

        Promise
            .resolve(fn(req, res, next))
            .catch(next);

    };

};