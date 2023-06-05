import { cartModel } from "../models/cart.model.js";

class CartsService {
  constructor() {
    this.model = cartModel;
  }

  async addCart() {
    return await this.model.create();
  }

  async addProductToCart() {}

  async;
}

export const CartService = new CartsService();
