//cargar librería ExpressJS
const express = require("express");
const app = express();
//realizar la conexión a la BD
const bd = require("./modelos/bd");
bd.conectar();
const puerto = 3030;
//Cargar librería para 'parseo' de contenido JSON
app.use(express.json());
//Dejar disponibles las rutas a los métodos web
require("./rutas/pais.rutas")(app);
require("./rutas/region.rutas")(app);

app.listen(puerto, () => {
  console.log(
    `Servicio iniciado a través de la url http://localhost:${puerto}`
  );
});
