import { cartModel } from "../models/cart.model.js";

class CartsService {
  constructor() {
    this.model = cartModel;
  }

  async addCart() {
    return await this.model.create();
  }

  async getCart(cid) {
    return await this.model.findOne({ _id: cid });
  }

  async addProductToCart(cid, pid) {}
}

export const cartService = new CartsService();
