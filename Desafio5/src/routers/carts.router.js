import { Router } from "express";
import { cartService } from "../services/cart.service.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  try {
    const cart = await cartService.getCart(cid);
    res.send(cart);
  } catch (err) {
    res.status(500).send({ err });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await cartService.addCart();
    res.status(201).send(cart);
  } catch (err) {
    res.status(500).send({ err });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  try {
    const cart = await cartService.addProductToCart(cid, pid);
    res.status(201).send(cart);
  } catch (err) {
    res.status(500).send({ err });
  }
});

export default cartsRouter;
