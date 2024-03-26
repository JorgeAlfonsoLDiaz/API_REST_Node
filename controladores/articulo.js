const validator = require("validator");
const Articulo = require("../modelo/articulo");

const insertar = (req, res) => {
	// Recoger parámetros post a guardar
	let parametros = req.body;

	// Validar datos
	try {
		let validar_titulo =
			!validator.isEmpty(parametros.titulo) &&
			validator.isLength(parametros.titulo, { min: 5, max: undefined });
		let validar_contenido = !validator.isEmpty(parametros.contenido);

		if (!validar_titulo || !validar_contenido) {
			throw new Error("No se ha validado la información.");
		}
	} catch (error) {
		// "mensaje" solía ser "Faltan datos por enviar"
		return res.status(400).json({
			status: "error",
			mensaje: error.message,
		});
	}

	// Crear el objeto a guardar
	const articulo = new Articulo(parametros);

	// Guardar el artículo en la base de datos
	articulo
		.save()
		.then((ArticuloGuardado) => {
			return res.status(201).json({
				status: "success",
				message: "El artículo se ha guardado correctamente",
				articulo: ArticuloGuardado,
			});
		})
		.catch((error) => {
			return res.status(400).json({
				status: "error",
				message: "No se ha guardado el artículo" + error.message,
			});
		});
};

const listar = (req, res) => {
	Articulo.find({})
		.sort({ fecha: -1 })
		.then((articulos) => {
			if (!articulos) {
				return res.status(404).json({
					status: "error",
					mensaje: "No se han encontrado artículos",
				});
			}
			let count = articulos.length;
			return res.status(200).send({
				status: "Success",
				numero: count,
				articulos,
			});
		})
		.catch((error) => {
			return res.status(500).json({
				status: "error",
				mensaje: "Ha ocurrido un error al listar los artículos",
				error: error.message,
			});
		});
};

// En este exports voy a pasar el nombre de todos los controladores
module.exports = {
	insertar,
	listar,
};
