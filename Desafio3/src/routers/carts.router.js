import { Router } from "express";


const cartsRouter=Router();

cartsRouter.get('/', (req,res)=>{
  res.send(carts)
})

cartsRouter.post('/', (req,res)=>{
  const cart=req.body;
  carts.push(cart)
  res.status(201).send(cart)
})

export {cartsRouter}