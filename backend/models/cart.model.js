const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    discount: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
    totalDiscount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
