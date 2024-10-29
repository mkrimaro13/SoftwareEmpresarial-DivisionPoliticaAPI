//cargar la librería con la conexión a la bd
var bd = require("./bd");
//constructor
const Pais = () => {};
//método que obtiene la lista de países
Pais.listar = async (respuesta) => {
  //obtener objeto de conexión a la base de datos
  const basedatos = bd.obtenerBaseDatos();
  //Ejecutar la consulta
  try {
    const resultado = await basedatos
      .collection("paises")
      //***** Código Mongo *****
      .find({})
      .project({
        id: 1,
        nombre: 2,
        continente: 3,
        tipoRegion: 4,
        codigoAlfa2: 5,
        codigoAlfa3: 6,
      })
      //************************
      .toArray();
    return respuesta(null, resultado);
  } catch (error) {
    return respuesta(error, null);
  }
};
//método que agrega un registro
Pais.agregar = async (pais, respuesta) => {
  try {
    //obtener objeto de conexión a la base de datos
    const basedatos = bd.obtenerBaseDatos();
    //Ejecutar la inserción de un documento país
    await basedatos.collection("paises").insertOne({
      id: pais.id,
      nombre: pais.nombre,
      tipoRegion: pais.tipoRegion,
      continente: pais.continente,
      codigoAlfa2: pais.codigoAlfa2,
      codigoAlfa3: pais.codigoAlfa3,
    });
    return respuesta(null, pais);
  } catch (error) {
    return respuesta(error, null);
  }
};
//método que modifica un registro
Pais.modificar = async (pais, respuesta) => {
  try {
    //obtener objeto de conexión a la base de datos
    const basedatos = bd.obtenerBaseDatos();
    //Ejecutar la consulta
    await basedatos
      .collection("paises")
      //***** Código Mongo *****
      .updateOne(
        { id: pais.id },
        {
          $set: {
            nombre: pais.nombre,
            continente: pais.continente,
            tipoRegion: pais.tipoRegion,
            codigoAlfa2: pais.codigoAlfa2,
            codigoAlfa3: pais.codigoAlfa3,
          },
        }
      );
    //************************
    respuesta(null, pais);
  } catch (error) {
    respuesta(error, null);
  }
};
//método que elimina un registro
Pais.eliminar = async (idPais, resultado) => {
  try {
    //obtener objeto de conexión a la base de datos
    const basedatos = bd.obtenerBaseDatos();
    //Ejecutar la consulta
    await basedatos
      .collection("paises")
      //***** Código Mongo *****
      .deleteOne({ id: eval(idPais) });
    resultado(null, true);
  } catch (error) {
    respuesta(error, false);
  }
};

Pais.capital = async (nombrePais, respuesta) => {
  try {
    const basedatos = bd.obtenerBaseDatos();
    const capital = await basedatos
      .collection("paises")
      .aggregate([
        { $match: { nombre: nombrePais } },
        { $unwind: "$regiones" },
        { $unwind: "$regiones.ciudades" },
        { $match: { "regiones.ciudades.capitalPais": true } },
        {
          $project: {
            ciudad: "$regiones.ciudades.nombre",
            estado: "$regiones.nombre",
          },
        },
      ])
      .toArray();
    respuesta(null, capital[0]);
  } catch (error) {
    console.log("Error buscando la capital: ", error);
    respuesta(error, false);
  }
};
module.exports = Pais;
