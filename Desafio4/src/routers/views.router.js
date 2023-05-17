import { Router } from "express";
import productManager from "../models/productManager.js";

const viewsRouter = Router();
const prodManager = new productManager("./products.json");

viewsRouter.get("/", async (req, res) => {
  let products = await prodManager.getProducts();
  res.render("home", { products });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

export { viewsRouter };
