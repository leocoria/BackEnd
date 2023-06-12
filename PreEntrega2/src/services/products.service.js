import { productModel } from "../models/product.model.js";

class ProductsService {
  constructor() {
    this.model = productModel;
  }

  async getAllProducts() {
    return await this.model.find().lean();
  }

  async getProductById(pid) {
    return await this.model.findOne({ _id: pid });
  }

  async addProduct(product) {
    return await this.model.create(product);
  }

  async deleteProduct(pid) {
    return await this.model.deleteOne({ _id: pid });
  }

  async updateProduct(pid, product) {
    return await this.model.updateOne({ _id: pid }, product);
  }
}

export const productsService = new ProductsService();
