import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

class CartsService {
  constructor() {
    this.model = cartModel;
  }
  async addCart() {
    const cart = await this.model.create({});
    return cart;
  }

  async getCart(cid) {
    return await this.model.findOne({ _id: cid });
  }

  async addProductToCart(cid, pid) {
    const cart = await this.getCart(cid);
    cart.products.push({ product: pid, quantity: 1 });
    cart.save();
  }
}

export const cartsService = new CartsService();
