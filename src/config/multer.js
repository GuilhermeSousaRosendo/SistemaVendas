// =======================================================
// Configuração do Multer
//
// Responsável por definir onde as imagens serão salvas
// e como será o nome dos arquivos.
// =======================================================

const multer = require("multer");

const path = require("path");

// =======================================================
// Configuração de armazenamento
// =======================================================

const storage = multer.diskStorage({

    // Pasta onde as imagens serão salvas
    destination(req, file, callback){

        callback(

            null,

            path.resolve("uploads")

        );

    },

    // Nome do arquivo
    filename(req, file, callback){

        const nomeArquivo =

            Date.now() +

            "-" +

            file.originalname;

        callback(

            null,

            nomeArquivo

        );

    }

});

module.exports = multer({

    storage

});