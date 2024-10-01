const bd = require("./bd");

const Region = () => {};

Region.listar = async (idPais, respuesta) => {
  const basedatos = bd.obtenerBaseDatos();
  try {
    //***** codigo MONGO para obtener la lista de Region
    const resultado = await basedatos
      .collection("paises")
      .aggregate([
        {
          $match: { id: parseInt(idPais) },
        },
        {
          $project: {
            "regiones.nombre": 1,
            "regiones.area": 1,
            "regiones.poblacion": 1,
          },
        },
      ])
      .toArray();
    //*****
    return respuesta(null, resultado.length > 0 ? resultado[0].regiones : []);
  } catch (error) {
    console.error("Error al listar los Region:", error);
    respuesta(error, null);
  }
};

Region.agregar = async (idPais, region, respuesta) => {
  try {
    const basedatos = bd.obtenerBaseDatos();
    //***** codigo MONGO para agregar un Documento Region
    await basedatos.collection("paises").updateOne(
      { id: parseInt(idPais) },
      {
        $push: {
          regiones: {
            nombre: region.nombre,
            area: region.area,
            poblacion: region.poblacion,
          },
        },
      }
    );
    //*****
    respuesta(null, region);
  } catch (error) {
    console.log("Error agregando región ", error);
    respuesta(error, null);
  }
};

Region.modificar = async (idPais, region, respuesta) => {
  try {
    const basedatos = bd.obtenerBaseDatos();
    //***** codigo MONGO para modificar un Documento Region
    await basedatos.collection("paises").updateOne(
      {
        id: parseInt(idPais),
        regiones: { $elemMatch: { nombre: region.nombre } },
      },
      {
        $set: {
          "regiones.$.area": region.area,
          "regiones.$.poblacion": region.poblacion,
        },
      }
    );
    //*****
    respuesta(null, region);
  } catch (error) {
    console.log("Error modificando región ", error);
    respuesta(error, null);
  }
};

Region.eliminar = async (idPais, nombreRegion, respuesta) => {
  try {
    const basedatos = bd.obtenerBaseDatos();
    //***** codigo MONGO para eliminar un Documento Region
    await basedatos.collection("paises").updateOne(
      { id: parseInt(idPais) },
      {
        $pull: {
          regiones: {
            nombre: nombreRegion,
          },
        },
      }
    );
    //*****
    respuesta(null, `Se ha eliminado ${nombreRegion}`);
    console.log("Región eliminada con nombre :", nombreRegion);
  } catch (error) {
    console.log("Error eliminando región ", error);
    respuesta(error, false);
  }
};

module.exports = Region;
