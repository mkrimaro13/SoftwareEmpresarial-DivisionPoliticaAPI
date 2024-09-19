// //Cargar la librería para operar con bases de datos mongo
// const mongo = require('mongodb').MongoClient;
// //Cargar la configuracion de la BD
// const configBD = require('../configuracion/bd.config');
// //Asignar cadena de conexión
// const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;
// //objeto que contiene la conexión a la bd
const { MongoClient } = require('mongodb');
const configDB = require('../configuracion/bd.config');
const url = `mongodb://${configDB.SERVIDOR}:${configDB.PUERTO}`;

const cliente = new MongoClient(url);

let basedatos;
module.exports = {
	conectar: async () => {
		//conectar al servidor
		// mongo.connect(url, function (err, cliente) {
		// 	if (err || !cliente) {
		// 		console.log(err);
		// 		return err;
		// 	}
		// 	//obtener la base de datos
		// 	basedatos = cliente.db(configBD.BASEDATOS);
		// 	console.log('Se ha establecido conexión al servidor de MONGO');
		// });
		try {
			await cliente.connect();
			console.log('Se ha establecido conexión al servidor de MONGO');
			basedatos = cliente.db(configDB.BASEDATOS);
		} catch (error) {
			console.log(error);
		}
	},
	obtenerBaseDatos: () => {
		return basedatos;
	},
};
