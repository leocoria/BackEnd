import { Router } from "express";
import cartManager from "../models/cartManager.js";

const cartsRouter = Router();
const cm = new cartManager();

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cid=parseInt(req.params.cid);
    const cartProducts = await cm.getCartProducts(cid);
    res.send(cartProducts);
  } catch (err) {
    console.log("No puedo obtener los productos del carrito", err);
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart= await cm.addCart();
    res.status(201).send(cart)
  } catch (err) {
    res.status(500).send("Error al agregar el carrito")
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid=parseInt(req.params.cid);
    const pid=parseInt(req.params.pid);
    const cart= await cm.addProductToCart(cid, pid);
    res.status(201).send(cart);
  } catch (err) {
    console.log("No puedo agregar el producto al carrito", err);
  }
});

export { cartsRouter };
