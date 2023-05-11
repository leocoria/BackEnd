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
    const foundCart = carts.find((cart) => cart.id === cid);
    const notFound = "No se encuentra el carrito";
    if (found) {
      return foundCart.products;
    } else {
      return notFound;
    }
  }

  async addCart(cartProducts) {
    const cart = {
      cartProducts,
    };
    cart.id = await this.#getID();
    try {
      const actualCarts = await this.#getCarts();
      actualCarts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(actualCarts));
    } catch (err) {
      console.log("No puedo agregar el carrito");
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const actualCarts = await this.#getCarts();
      const foundCart = actualCarts.find((cart) => cart.id === cid);
      if (foundCart) {
        const foundProduct = foundCart.products.find(
          (product) => product.id === pid
        );
        if (foundProduct) {
          foundProduct.quantity++;
        } else {
          newProduct = { id: pid, quantity: 1 };
          foundCart.products.push(newProduct);
        }
      }
      console.log("No encuentro el carrito con ese id");
    } catch (err) {
      console.log("No puedo agregar el prodcuto al carrito");
    }
  }

  async #getID() {
    this.#id++;
    return this.#id;
  }
}
