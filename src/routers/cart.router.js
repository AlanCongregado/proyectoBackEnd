import { Router } from "express";

const cart = [];
const cartRouter = Router();

cartRouter.get("/", (req, res) => {
  res.send(cart);
});

cartRouter.post("/", (req, res) => {
  if (!req.file) {
    return res.status(401).send();
  }
  const cart = req.body;
  cart.push(cart);
});

export default cartRouter;
