import fs from "fs";

export default class productManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async getProducts() {
    try {
      const actualProducts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(actualProducts);
    } catch (err) {
      console.log("No puedo darte los productos", err);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const found = products.find((producto) => producto.id === id);
    console.log(found)
    const notFound = "No se encuentra el producto";
    if (found) {
      return found;
    } else {
      return notFound;
    }
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    const product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    const campos = Object.values(product);
    let campoVacio = false;
    campos.forEach((elemento) => {
      if (!elemento) {
        campoVacio = true;
      }
    });
    if (!campoVacio) {
      let verifiedCode = false;
      let newCode = campos[2];
      const products = await this.getProducts();
      products.forEach((elemento) => {
        if (elemento.code === newCode) {
          verifiedCode = true;
        }
      });
      if (!verifiedCode) {
        try {
          const actualProducts = await this.getProducts();
          product.id = await this.#getID(actualProducts);
          actualProducts.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(actualProducts)
          );
          res.status(201).send(product);
        } catch (err) {
          console.log("No puedo agregar productos", err);
        }
      } else {
        console.log("El código ya existe");
      }
    } else {
      console.log("Debe ingresar todos los campos del producto");
    }
  }

  async updateProduct(id, productToUpdate) {
    const products = await this.getProducts();
    const index = products.findIndex((producto) => producto.id === id);
    //Me falta chequear el codigo de producto y que esten todos los campos
    if (index !== -1) {
      try {
        productToUpdate.id = id;
        products[index] = productToUpdate;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return productToUpdate;
      } catch (err) {
        console.log("No se puede actualizar el producto");
      }
    } else {
  throw("No se encuentra el id del producto a actualizar", err)
  }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((elemento) => elemento.id === id);
      if (index !== -1) {
        console.log(index);
        products.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } else console.log("No se encuentra el id del producto a eliminar");
    } catch (err) {
      console.log("No se puede eliminar el producto");
    }
  }
  async #getID(actualProducts) {
    let id = 0;
    actualProducts.forEach((elemento) => {
      if (elemento.id > id) {
        id = elemento.id;
      }
    });
    return id + 1;
  }
}
