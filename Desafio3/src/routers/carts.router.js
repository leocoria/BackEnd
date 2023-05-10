import { Router } from "express";


const cartsRouter=Router();
const cartManager = new cartManager();

cartsRouter.get('/:cid', async (req,res)=>{
  try{
    res.send(cart)
  } catch(err){}
  
})

cartsRouter.post('/', async (req,res)=>{
  const cartProducts=req.body;
  try{
    await cartManager.addCart(cartProducts)
    res.status(201).send(cart)
  } catch(err){
    console.log("No puedo agregar el carrito")
  }
})

cartsRouter.post('/:cid/product/:pid', async (req,res)=>{
  
})

export {cartsRouter}