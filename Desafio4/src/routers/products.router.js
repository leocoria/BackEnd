import { Router } from "express";
import productManager from "../models/productManager.js";

const productsRouter = Router();
const prodManager = new productManager("./products.json");

productsRouter.get("/", async (req, res) => {
  try {
    let limit = req.query.limit;
    let products = await prodManager.getProducts();
    if (limit && limit !== 0 && limit < products.length) {
      let limitedProducts = products.slice(0, limit);
      res.send(limitedProducts);
    } else {
      res.send(products);
    }
  } catch (err) {
    res.send(err);
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    await prodManager.addProduct(
      product.title,
      product.description,
      product.code,
      product.price,
      product.status,
      product.stock,
      product.category,
      product.thumbnails
    );
  } catch (err) {
    res.send(err);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await prodManager.getProductById(pid);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const productToUpdate = req.body;
    const productUpdated = await prodManager.updateProduct(
      pid,
      productToUpdate
    );
    console.log(productUpdated);
    res.status(201).send(productUpdated);
  } catch (err) {
    res.send(err);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    await prodManager.deleteProduct(pid);
  } catch (err) {
    res.send(err);
  }
});

export { productsRouter };
