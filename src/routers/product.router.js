import { Router } from "express";
import ProductManager from "../../productManager.js";

const productManager = new ProductManager();
const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const allProducts = await productManager.getProduct();
  res.send(allProducts);
});

productRouter.post("/", (req, res) => {
  if (!req.file) {
    return res.status(401).send();
  }
  const cart = req.body;
  cart.push(cart);
});

export default productRouter;
