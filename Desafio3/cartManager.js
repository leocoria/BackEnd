import fs from "fs";

export default class cartManager {
  #id = 0;
  constructor() {
    this.path = "./carrito.json";
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async #getCarts() {
    try {
      const actualCarts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(actualCarts);
    } catch (err) {
      console.log("No puedo darte los productos", err);
    }
  }

  async getCartProducts(cid) {
    const carts = await this.#getCarts();
    const found = carts.find((cart) => cart.id === cid);
    const notFound = "No se encuentra el producto";
    if (found) {
      return found;
    } else {
      return notFound;
    }
  }

  async addCart(products) {}

  async addProductToCart(cid, pid) {}

  async #getID() {
    this.#id++;
    return this.#id;
  }
}
