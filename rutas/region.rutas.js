module.exports = (app) => {
  const controlador = require("../controladores/region.controlador");

  app.get("/paises/:id/regiones", controlador.listar);
  app.post("/paises/:id/regiones/agregar", controlador.agregar);
  app.put("/paises/:id/regiones/modificar", controlador.modificar);
  app.delete("/paises/:id/regiones/eliminar/:nombre", controlador.eliminar);
};
