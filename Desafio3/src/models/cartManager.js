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
    if (foundCart) {
      return foundCart.cartProducts;
    } else {
      return notFound;
    }
  }

  async addCart() {
    let cartProducts=[];
    const cart = {
      cartProducts,
    };
    try {
      const actualCarts = await this.#getCarts();
      console.log(actualCarts)
      cart.id = await this.#getID(actualCarts);
      actualCarts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(actualCarts));
      return cart
    } catch (err) {
      console.log("No puedo agregar el carrito", err);
      throw err;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const actualCarts = await this.#getCarts();
      const cartIndex = actualCarts.findIndex((cart) => cart.id === cid);
      if (cartIndex!==-1) {
        const foundCart=actualCarts[cartIndex];
        const foundProduct = foundCart.cartProducts.find(
          (product) => product.id === pid
        );
        if (foundProduct) {
          foundProduct.quantity++;
          actualCarts[cartIndex]=foundCart;
          console.log(actualCarts)
          await fs.promises.writeFile(this.path, JSON.stringify(actualCarts));
          return foundCart;
        } else {

          const newProduct = { "id": pid, "quantity": 1 };
          foundCart.cartProducts.push(newProduct);
          actualCarts[cartIndex]=foundCart;
          console.log(actualCarts)
          await fs.promises.writeFile(this.path, JSON.stringify(actualCarts));
          return foundCart;
        }
      }
      console.log("No encuentro el carrito con ese id");
    } catch (err) {
      console.log("No puedo agregar el producto al carrito");
    }
  }

  async #getID(actualCarts) {
    let id = 0;
    actualCarts.forEach((elemento) => {
      if (elemento.id > id) {
        id = elemento.id;
      }
    });
    return id + 1;
  }
}
