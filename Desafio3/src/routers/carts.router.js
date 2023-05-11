import { Router } from "express";
import cartManager from "../../cartManager.js";

const cartsRouter = Router();
const cm = new cartManager();

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cartProducts = await cm.getCartProducts(cid);
    res.send(cartProducts);
  } catch (err) {
    console.log("No puedo obtener los productos del carrito", err);
  }
});

cartsRouter.post("/", async (req, res) => {
  const cartProducts = req.body;
  try {
    await cm.addCart(cartProducts);
    res.status(201).send(cart);
  } catch (err) {
    console.log("No puedo agregar el carrito");
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    await cm.addProductToCart(cid, pid);
    res.status(201).send(cart);
  } catch (err) {
    console.log("No puedo agregar el producto al carrito", err);
  }
});

export { cartsRouter };
