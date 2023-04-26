const fs = require("fs");

class productManager {
  #id = 0;
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
    const notFound = "No se encuentra el producto";
    if (found) {
      return found;
    } else {
      return notFound;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
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
      let newCode = campos[4];
      const products = await this.getProducts();
      products.forEach((elemento) => {
        if (elemento.code === newCode) {
          verifiedCode = true;
        }
      });
      if (!verifiedCode) {
        product.id = await this.#getID();
        try {
          const actualProducts = await this.getProducts();
          actualProducts.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(actualProducts)
          );
        } catch (err) {
          console.log("No puedo agregar productos");
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
    if (index !== -1) {
      try {
        productToUpdate.id = id;
        products[index] = productToUpdate;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
      } catch (err) {console.log("No se puede actualizar el producto")}
    } else console.log("No se encuentra el id del prodcuto a actualizar")
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
  async #getID() {
    this.#id++;
    return this.#id;
  }
}

const pm = new productManager("./productManager.json");

const test = async () => {
  try {
    await pm.addProduct(
      "Mesa",
      "Mesa ratona de living",
      5800,
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/933/006/products/mesa-ratona-de-petiribi-rectang1-cb92fa9399735d29c916403795508628-640-0.jpg",
      12323,
      5
    );

    await pm.addProduct(
      "Silla",
      "Silla de comedor",
      4300,
      "https://i.pinimg.com/236x/c6/ca/b7/c6cab724ffd7d7279a4e05b247f44755.jpg",
      12324,
      10
    );

    console.log(await pm.getProductById(1));

    await pm.updateProduct(1, {
      title: "Mesa grande",
      description: "Mesa de algarrobo",
      price: 23000,
      thumbnail: "url",
      code: 12325,
      stock: 4,
    });

    await pm.deleteProduct(2);

    console.log(await pm.getProducts());
  } catch (err) {
    console.log("Salio mal el test", err);
  }
};


test();

