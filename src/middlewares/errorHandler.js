// ==========================================================
// Middleware global de tratamento de erros
//
// Toda exceção lançada na aplicação chegará aqui.
// ==========================================================

module.exports = (err, req, res, next) => {

    console.error("====================================");
    console.error("ERRO NA APLICAÇÃO");
    console.error(err);
    console.error("====================================");

    return res.status(err.statusCode || 500).json({

        sucesso: false,

        mensagem: err.message || "Erro interno do servidor."

    });

};