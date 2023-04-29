// importamos express
import express from "express";
// importamos la clase Product Manager
import ProductManager from "./productManager.js";

// Creamos la aplicacion
const app = express();
// Creamos la instancia de la clase ProductManager
const productManager = new ProductManager();

// Utilizamos el middleware para parsear los datos de la peticion
app.use(express.urlencoded({ extended: true }));

// Definimos el metodo Get para la ruta productos

app.get("/productos", async (req, res) => {
  try {
    // obtengo todos los productos
    let allProducts = await productManager.getProduct();
    res.send(allProducts);
  } catch (err) {
    res.send(err);
  }
});

// Escuchamos el puerto 8080
app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});
