// Importamos file system
import { promises as fs } from "fs";
// importo router

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

    await this.products.push(product);

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
    let filter = await productById.find((product) => {
      return product.id === id;
    });
    if (!filter) {
      console.log("Producto no encontrado");
    } else {
      return filter;
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

/* productos.addProduct(
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
);

productos.addProduct(
  "JBL Charge 5",
  "Parlante portatil",
  78900,
  "Sin imagen 3",
  "JBL345",
  38
);
productos.addProduct(
  "JBL Charge 4",
  "Parlante portatil",
  68900,
  "Sin imagen 5",
  "JBL765",
  28
);
productos.addProduct(
  "Iphone 14 pro max",
  "Apple",
  420000,
  "Sin imagen 6",
  "MAC142",
  12
);
productos.addProduct(
  "Samsung S22",
  "Celular Samsung",
  32500,
  "Sin imagen 7",
  "SAM123",
  20
);
productos.addProduct(
  "Samsung S21",
  "Celular Samsung",
  300000,
  "Sin imagen 7",
  "SAM456",
  18
);
productos.addProduct(
  "Iphone 13 plus",
  "Apple",
  392000,
  "Sin imagen 8",
  "MAC132",
  22
);
productos.addProduct(
  "Monitor Samsung",
  "Monitor 24 pulgadas",
  68000,
  "Sin imagen 9",
  "SAM853",
  20
);
 */
//productos.getProduct();
