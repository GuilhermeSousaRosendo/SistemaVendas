/**
 * Classe para representar erros da aplicação.
 * Em vez de lançar erros genéricos, lançaremos AppError.
 */
class AppError extends Error {

    constructor(message, statusCode = 400) {

        super(message);

        this.statusCode = statusCode;

    }

}

module.exports = AppError;