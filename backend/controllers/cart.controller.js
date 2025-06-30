const Product = require("../models/product.model.js");
const Cart = require("../models/cart.model.js");
const { applyDiscounts } = require("../utils/discount.js");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = (await Cart.findOne()) || new Cart();

    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: 0, discount: 0 });
    }

    const populatedCart = await cart.populate("items.product");
    const { items, totalPrice, totalDiscount } = applyDiscounts(
      populatedCart.items
    );

    cart.items = items;
    cart.totalPrice = totalPrice;
    cart.totalDiscount = totalDiscount;

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne().populate("items.product");
    if (!cart) return res.json({ items: [], totalPrice: 0, totalDiscount: 0 });
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addToCart, getCart };
