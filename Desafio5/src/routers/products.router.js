import { Router } from "express";
import { productsService } from "../services/products.service.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.send(products);
  } catch (err) {
    res.status(500).send({ err });
  }
});

productsRouter.post("/", async (req, res) => {
  const product = req.body;
  try {
    const addedProduct = await productsService.addProduct(product);
    res.status(201).send(addedProduct);
  } catch (err) {
    res.status(500).send({ err });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const updatedProduct = await productsService.updateProduct(pid, req.body);
    res.status(201).send(updatedProduct);
  } catch (err) {
    res.status(500).send({ err });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    await productsService.deleteProduct(pid);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send({ err });
  }
});

export default productsRouter;
