import express from "express";
import productManager from "../productManager.js";

const app = express();

const prodManager = new productManager("./productManager.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    let limit = req.query.limit;
    let products = await prodManager.getProducts();
    if (limit && limit !== 0 && limit < products.length) {
      let limitedProducts = products.slice(0, limit);
      res.send(limitedProducts);
    } else res.send(products);
  } catch (err) {
    res.send(err);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const products = await prodManager.getProducts();
    const producto = products.find((elemento) => elemento.id === pid);
    producto ? res.send(producto) : res.send({ error: "No existe el producto con el id proporcionado" });
  } catch (err) {
    res.send(err);
  }
});

app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});
