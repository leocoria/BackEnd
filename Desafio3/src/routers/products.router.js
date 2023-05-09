import { Router } from "express";
import productManager from "../../productManager";


const productsRouter=Router();

productsRouter.get('/', async (req,res)=>{
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
})

productsRouter.post('/', async (req,res)=>{
  try{
    const product=req.body;
    await prodManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock)
    res.status(201).send(product)
  } catch(err){
    res.send(err)
  }
 
})

export {productsRouter}