// Importamos file system
import { promises as fs } from "fs";
// Creamos la Class Product Manager
export default class ProductManager {
  constructor() {
    // En el constructor creamos el path que va a ser la ruta
    this.path = "./productos.json";
    // products va a ser el array de productos donde vamos a pushear los productos
    this.products = [];
  }
  static id = 0;
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(product);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  getProduct = async () => {
    let product = await this.readProducts();
    return product;
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProductById = async (id) => {
    let productById = await this.readProducts();
    let filter = productById.find((product) => product.id === id);
    if (!filter) {
      console.log("Producto no encontrado");
    } else {
      console.log(filter);
    }
  };

  deleteProduct = async (id) => {
    let respuesta = await this.readProducts();
    let productFilter = respuesta.filter((products) => products.id != id);

    await fs.writeFile(this.path, JSON.stringify(productFilter));
    console.log(`El producto con el id:${id} ha sido eliminado`);
  };

  updateProduct = async ({ id, ...producto }) => {
    await this.deleteProduct(id);
    let productOld = await this.readProducts();
    let productUpdated = await [{ id, ...producto }, ...productOld];
    await fs.writeFile(this.path, JSON.stringify(productUpdated));
    console.log(productUpdated);
  };
}
const productos = new ProductManager();
/* 
productos.addProduct(
  "JBL flip 6",
  "parlante portatil",
  58500,
  "sin imagen",
  "JBL123",
  30
);
productos.addProduct(
  "JBL 510T",
  "Auriculares JBL",
  13000,
  "Sin imagen2",
  "JBL321",
  25
);

productos.addProduct(
  "Notebook HP",
  "11th Gen Intel(R) Core(TM) i3-1115G4 @ 3.00GHz   2.90 GHz",
  150000,
  "Sin imagen3",
  "nhp111",
  18
); */

//productos.getProduct();
