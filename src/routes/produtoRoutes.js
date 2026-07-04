// ==========================================================
// Rotas de Produtos
//
// Todas as URLs relacionadas aos produtos ficam aqui.
//
// Exemplo:
//
// GET     /produtos
// POST    /produtos
// PUT     /produtos/:id
// DELETE  /produtos/:id
// ==========================================================

const express = require("express");

const router = express.Router();

const ProdutoController = require("../controllers/ProdutoController");

const asyncHandler = require("../utils/asyncHandler");

const auth = require("../middlewares/auth");

const isAdmin = require("../middlewares/isAdmin");

const multer = require("../config/multer");

// ==========================================================
// Listar produtos
// ==========================================================

router.get(

    "/",

    auth,

    asyncHandler(

        ProdutoController.listar

    )

);

// ==========================================================
// Buscar produto pelo ID
// ==========================================================

router.get(

    "/:id",

    auth,

    asyncHandler(

        ProdutoController.buscarPorId

    )

);

// ==========================================================
// Cadastrar produto
// Apenas ADMIN
// ==========================================================

router.post(

    "/",

    auth,

    isAdmin,

    multer.single("imagem"),

    asyncHandler(

        ProdutoController.cadastrar

    )

);


router.put(

    "/:id",

    auth,

    isAdmin,

    asyncHandler(

        ProdutoController.atualizar

    )

);

router.delete(

    "/:id",

    auth,

    isAdmin,

    asyncHandler(

        ProdutoController.excluir

    )

);

module.exports = router;