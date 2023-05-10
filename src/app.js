// importamos express
import express from "express";
// importamos los endpoints
import productRouter from "./routers/product.router.js";
import cartRouter from "./routers/cart.router.js";

// Creamos la aplicacion
const app = express();
// Creamos la instancia de la clase ProductManager

// Utilizamos el middleware para parsear los datos de la peticion
app.use(express.urlencoded({ extended: true }));

// ejecutamos los midelware

//app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cart", cartRouter);

app.use("/api/products", productRouter);

// Definimos el metodo Get para la ruta productos

/* app.get("/products", async (req, res) => {
  try {
    // obtengo todos los productos
    let allProducts = await productRouter.getProduct();
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
}); */

// Escuchamos el puerto 8080
app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});
