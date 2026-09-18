const express = require("express");
const router = express.Router();
const {

    obtenerIncidencias,
    obtenerIncidenciaPorId,
    crearIncidencia,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas
} = require("../controllers/incidenciasControllers");

router.get("/estadisticas", obtenerEstadisticas);
router.get("/", obtenerIncidencias);
router.get("/:id", obtenerIncidenciaPorId);
router.post("/", crearIncidencia);
router.patch("/:id/estado", cambiarEstadoIncidencia);
router.delete("/:id", eliminarIncidencia);


module.exports = router;