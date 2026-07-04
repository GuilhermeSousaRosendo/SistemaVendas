// =========================================================
// Configuração do JWT
//
// Toda configuração relacionada ao Token ficará aqui.
//
// Caso no futuro precisemos alterar o tempo de expiração
// ou a chave secreta, alteraremos apenas este arquivo.
// =========================================================

module.exports = {

    // Chave secreta utilizada para assinar os Tokens.
    //
    // Em produção ela virá do arquivo .env.
    secret: process.env.JWT_SECRET,

    // Tempo de validade do Token.
    expiresIn: "8h"

};  