const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

// Ruta de prueba

router.post("/crear", ArticuloControlador.insertar);
router.get("/articulos", ArticuloControlador.listar);

module.exports = router;
