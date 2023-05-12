import { Router } from "express";
import productManager from "../../productManager.js";

const productsRouter = Router();
const prodManager = new productManager("./products.json");

productsRouter.get("/", async (req, res) => {
  try {
    let limit = req.query.limit;
    let products = await prodManager.getProducts();
    console.log(products);
    if (limit && limit !== 0 && limit < products.length) {
      let limitedProducts = products.slice(0, limit);
      res.send(limitedProducts);
    } else res.send(products);
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

productsRouter.put("/:pid", async (req, res) => {
  try {
    const productToUpdate = req.body;
    await prodManager.updateProduct(pid, productToUpdate);
  } catch (err) {
    res.send(err);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    await prodManager.deleteProduct(pid);
  } catch (err) {
    res.send(err);
  }
});

export { productsRouter };
