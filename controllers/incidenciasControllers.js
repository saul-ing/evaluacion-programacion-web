const incidencias = [];
let siguienteId = 1;

const obtenerIncidencias = (req, res) => {
    res.json(incidencias);
};

const obtenerIncidenciaPorId = (req, res) => {
    const id = Number(req.params.id);
    const incidencia = incidencias.find((inc) => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    res.json(incidencia);
};

const crearIncidencia = (req, res) => {
    const { empleado, problema, prioridad } = req.body;

    if (!empleado || !problema || !prioridad) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja") {
        return res.status(400).json({ mensaje: "La prioridad debe de ser Alta, Media o Baja" });
    }

    const incidencia = {
        id: siguienteId,
        empleado,
        problema,
        prioridad,
        estado: "Pendiente"
    };

    incidencias.push(incidencia);
    siguienteId++;

    res.status(201).json(incidencia);
};

const cambiarEstadoIncidencia = (req, res) => {

    const id = Number(req.params.id);
    const { estado } = req.body;

    const incidencia = incidencias.find((inc) => inc.id === id);
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    switch (estado) {
        case "Pendiente":
        case "En proceso":
        case "Resuelto":
            incidencia.estado = estado;
            break;
        default:
            return res.status(400).json({
                mensaje: "Estado no válido. Los estados permitidos son: Pendiente, En proceso, Resuelto."
            });
    }

    res.json({ mensaje: "Estado actualizado correctamente", incidencia });
};

const eliminarIncidencia = (req, res) => {
    const id = Number(req.params.id);
    const index = incidencias.findIndex((inc) => inc.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const incidenciaEliminada = incidencias.splice(index, 1);

    res.json({ mensaje: "Incidencia eliminada correctamente", incidencia: incidenciaEliminada[0] });
};

const obtenerEstadisticas = (req, res) => {
    const totalIncidencias = incidencias.length;

    const conteoEstados = incidencias.reduce((conteo, inc) => {
        if (inc.estado == "Pendiente") conteo.Pendiente++;
        else if (inc.estado == "En Proceso") conteo["En Proceso"]++;
        else if (inc.estado == "Resuelta") conteo.Resuelta++;
        else if (inc.estado == "Cerrada") conteo.Cerrada++;
        return conteo;
    }, { Pendiente: 0, "En Proceso": 0, Resuelta: 0, Cerrada: 0 });

    return res.status(200).json({
        totalIncidencias,
        ...conteoEstados,
    });
};

module.exports = {
    obtenerIncidencias,
    obtenerIncidenciaPorId,
    crearIncidencia,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas
};

       
        