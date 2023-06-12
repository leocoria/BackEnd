import { Router } from "express";
import { cartsService } from "../services/carts.service.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartsService.getCart(cid);
    res.send(cart);
  } catch (err) {
    res.status(500).send({ err });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await cartsService.addCart();
    res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cart = await cartsService.addProductToCart(cid, pid);
    res.status(201).send(cart);
  } catch (err) {
    res.status(500).send({ err });
  }
});

export default cartsRouter;
