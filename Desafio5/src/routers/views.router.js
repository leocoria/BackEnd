import { Router } from "express";
import { productsService } from "../services/products.service.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  const products = await productsService.getAllProducts();
  res.render("products", { products });
});

export default viewsRouter;
