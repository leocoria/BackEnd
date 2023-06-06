import mongoose from "mongoose";
import { productSchema } from "./product.model.js";

export const cartSchema = new mongoose.Schema({
  products: {
    type: [productSchema],
    required: false,
    default: [],
    quantity: {
      type: Number,
      required: false,
    },
  },
});

export const cartModel = mongoose.model("carts", cartSchema);
