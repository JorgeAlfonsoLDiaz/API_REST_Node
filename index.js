const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("APP de Node arrancada");

// Conectar a la base de datos
conexion();

// Crear el servidor de node
const app = express();
const puerto = 3900;

// Convertir el body en un objeto js
app.use(express.json()); // El app.use sirve para crear un Middleware
app.use(express.urlencoded({ extended: true }));
// Configurar CORS
app.use(cors());

// Crear rutas
/*
app.get("/probando", (req, res) => {
  console.log("Se está ejecutando el endpoint: 'probando' ...");
   return res.status(200).send(`
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Probando ruta GET</title>
        </head>
        <body>
            <div>
                <h1> Probando ruta node.js </h1>
                <p> Creando API REST con node </p>
                <ul>
                    <li> Master en Mongo </li>
                    <li> Master en Programación </li>
                </ul>
            </div>
        </body>
    `);
  return res.status(200).send({
    curso: "Mongo",
    autor: "Alfonso",
    url: "www.utectulancingo.edu.mx",
  });
});
*/
// Rutas
const rutas_articulo = require("./rutas/articulo");

// Cargó las rutas
app.use("/api", rutas_articulo);

// Escuchar las peticiones HTTP
app.listen(puerto, () => {
	console.log("Servidor corriendo en el puerto " + puerto);
});
