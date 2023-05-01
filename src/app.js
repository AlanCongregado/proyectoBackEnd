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

app.get("/products", async (req, res) => {
  try {
    // obtengo todos los productos
    let allProducts = await productManager.getProduct();
    let limit = parseInt(req.query.limit);
    if (!limit || limit > allProducts.length) {
      return res.send(allProducts);
    } else {
      let productLimit = allProducts.slice(0, limit);
      res.send(await productLimit);
    }
    res.send(allProducts);
  } catch (err) {
    res.send(err);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let idUser = await productManager.getProductById(id);
    if (idUser) {
      res.send(idUser);
    } else {
      res.send('<h1 style="Color:red">Producto no encontrado</h1>');
    }
  } catch (err) {
    console.log(err);
  }
});

// Escuchamos el puerto 8080
app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});
