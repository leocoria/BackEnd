import fs from "fs";

export default class cartManager {
  #id = 0;
  constructor() {
    this.path = "./carrito.json";
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }
  async getCartProducts(cid) {}

  async addCart() {}

  async addProductToCart(cid, pid) {}

  async #getID() {
    this.#id++;
    return this.#id;
  }
}
