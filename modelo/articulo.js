const { Schema, model, trusted } = require("mongoose");

const ArticuloSchema = Schema({
	titulo: {
		type: String,
		require: true,
	},
	contenido: {
		type: String,
		require: true,
	},
	fecha: {
		type: Date,
		default: Date.now,
	},
	imagen: {
		type: String,
		default: "default.png",
	},
});

module.exports = model("articulo", ArticuloSchema, "articulos");
