// ======================================================
// Rotas dos usuários
// ======================================================

const express = require("express");

const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

const asyncHandler = require("../utils/asyncHandler");

// ======================================
// GET /usuarios
// Lista usuários
// ======================================
router.get(
    "/",
    asyncHandler(UsuarioController.listar)
);

router.post(
    "/cadastrar",
    asyncHandler(UsuarioController.cadastrar)
);

router.post(
    "/login",
    asyncHandler(UsuarioController.login)
);

router.put(
    "/:id",
    asyncHandler(UsuarioController.atualizar)
);

router.delete(
    "/:id",
    asyncHandler(UsuarioController.excluir)
);


module.exports = router;