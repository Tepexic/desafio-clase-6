/**
 * >> Consigna:
 * Realizar un proyecto de servidor basado en node.js que utilice el middleware
 * express e implemente los siguientes endpoints en el puerto 8080:
 * - Ruta get '/productos' que devuelva un array con todos los productos disponibles
 * en el servidor
 * - Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos
 * los productos disponibles
 * Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
 *
 * Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
 *
 */

const express = require("express");
const app = express();
const PORT = 3031;

const Contenedor = require("./Contenedor");

// Crear instancia de la clase
const contenedor = new Contenedor("./productos.json");

app.get("/productos", async (req, res, next) => {
  res.json(await contenedor.getAll());
});

app.get("/productoRandom", async (req, res, next) => {
  const productos = await contenedor.getAll();
  // crear un arreglo con todos los ids disponibles de los productos
  const ids = productos.map((p) => p.id);
  // Generar un numero aleatorio entre 0 y la longitud del arreglo de ids
  const randomIdIndex = Math.round(Math.random() * ids.length);
  res.json(await contenedor.getById(ids[randomIdIndex]));
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
server.on("error", (error) => console.error(error));
