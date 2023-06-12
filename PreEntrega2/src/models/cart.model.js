import mongoose from "mongoose";

export const cartSchema = mongoose.Schema({
  products: {
    default: [],
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          unique: true,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

export const cartModel = mongoose.model("carts", cartSchema);
