const express = require("express");
const router = express.Router();
const {
    obtenerEstadisticas,
    obtenerIncidencias,
} = require("../controllers/incidenciasControllers");

router.get("/estadisticas", obtenerEstadisticas);

router.get("/incidencias/:id/clasificacion", obtenerIncidencias);

module.exports = router;