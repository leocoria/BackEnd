import express from "express";
import productManager from "../productManager.js";

const app = express();

const prodManager = new productManager("./productManager.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    let products = await prodManager.getProducts();
    res.send(products);
  } catch (err) {
    res.send(err);
  }
});

app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});
