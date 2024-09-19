module.exports = (app) => {
	//Importar el controlador
	const controlPais = require('../controladores/pais.controlador');
	//método de la API que obtiene la lista de paises
	app.get('/paises', controlPais.listar);
	//método de la API que agrega un país
	app.post('/paises/agregar', controlPais.agregar);
	//método de la API que modifica un país
	app.post('/paises/modificar', controlPais.modificar);
	//método de la API que elimina un país
	app.delete('/paises/:id', controlPais.eliminar);
};
