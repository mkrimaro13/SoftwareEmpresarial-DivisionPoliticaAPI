const region = require("../modelos/region.modelo");

exports.listar = (solicitud, respuesta) => {
  region.listar(solicitud.params.id, (error, datos) => {
    if (error) {
      return respuesta.status(500).send({
        mensaje: "Error obteniendo la lista de regiones",
      });
    }
    return respuesta.send(datos);
  });
};

exports.agregar = (solicitud, respuesta) => {
  if (!solicitud.body) {
    return respuesta.status(400).send({
      mensaje: "El contenido de la solicitud debe incluir la región",
    });
  }
  region.agregar(solicitud.params.id, solicitud.body, (error, datos) => {
    if (error) {
      return respuesta.status(500).send({
        mensaje: "Error agregando región",
      });
    }
    return respuesta.send(datos);
  });
};

exports.modificar = (solicitud, respuesta) => {
  if (!solicitud.body || !solicitud.body.nombre) {
    return respuesta.status(400).send({
      mensaje: "El contenido de la solicitud debe incluir la región",
    });
  }
  region.modificar(solicitud.params.id, solicitud.body, (error, datos) => {
    if (error) {
      return respuesta.status(500).send({
        mensaje: "Error modificando región",
      });
    }
    return respuesta.send(datos);
  });
};

exports.eliminar = (solicitud, respuesta) => {
  region.eliminar(
    solicitud.params.id,
    solicitud.params.nombre,
    (error, datos) => {
      if (error) {
        return respuesta.status(500).send({
          mensaje: "Error eliminando región",
        });
      }
      return respuesta.send({Detalle: datos});
    }
  );
};
