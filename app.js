const express = require("express");
const app = express();
app.use(express.json());
const incidenciasRoutes = require('./routes/incidencias');
app.use('/incidencias', incidenciasRoutes);


app.get("/",(req,res) => {
    res.send("Servidor funcionando correctamente")
});


app.listen(3000, () => {;
    console.log("Servidor ejecutandoce en el puerto 3000")
});