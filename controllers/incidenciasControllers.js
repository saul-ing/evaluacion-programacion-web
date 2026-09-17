const incidencias = [];

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



const obtenerIncidencias = (req, res) => {
    const id = Number(req.params.id);
    const incidencia = incidencias.find((inc) => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada",
        });
    }   

    let clasificacion = "";

    switch (incidencia.prioridad) {
        case "Alta":
            clasificacion = "Urgente";
            break;
        case "Media":
            clasificacion = "Importante";
            break;
        case "Baja":
            clasificacion = "Normal";
            break;
        default:
            clasificacion = "Desconocida";
            break;
    }

    return res.status(200).json({
        id: incidencia.id,
        clasificacion,
    });
};

module.exports = {
    obtenerEstadisticas,
    obtenerIncidencias,
};
