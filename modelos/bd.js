const { MongoClient } = require("mongodb");
const configDB = require("../configuracion/bd.config");
const url = `mongodb://${configDB.SERVIDOR}:${configDB.PUERTO}`;

const cliente = new MongoClient(url);

let basedatos;
module.exports = {
  conectar: async () => {
    try {
      await cliente.connect();
      console.log("Se ha establecido conexión al servidor de MONGO");
      basedatos = cliente.db(configDB.BASEDATOS);
    } catch (error) {
      console.log(error);
    }
  },
  obtenerBaseDatos: () => {
    return basedatos;
  },
};
