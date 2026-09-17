const express = require("express");
const app = express();
app.use(express.json());
const incidencias = [];
let siguienteId = 1;


app.get("/",(req,res) => {
    res.send("Servidor funcionando correctamente")
   
});

app.post("/incidencias",(req,res)=> {
    const empleado = req.body.empleado;
    const problema = req.body.problema;
    const prioridad = req.body.prioridad; 

    if (empleado === "" || problema === "" || prioridad === ""){
        return   res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja"){
        return res.status(400).json({
            mensaje: "La prioridad debe de ser Alta, Media o Baja"
        });
    }


    const incidencia = {
    id: siguienteId,
    empleado: empleado,
    problema: problema,
    prioridad: prioridad,
    estado: "Pendiente"
    };

    incidencias.push(incidencia);

    siguienteId++;

    res.status(201).json(incidencia);


});
    app.get("/incidencias", (req, res) => {
    res.json(incidencias);
});

app.get("/incidencias/:id", (req, res) => {
const id = Number(req.params.id);

const incidencia = incidencias.find((incidencia)=> incidencia.id === id);

if (!incidencia){
    return res.status(404).json({
        mensaje: "Incidencia no encontrada"
    });
}

res.json(incidencia);
});

app.listen(3000, () => {;
    console.log("Servidor ejecutandoce en el puerto 3000")
});

const incidenciasRoutes = require("./routes/incidencias");
app.use(incidenciasRoutes);