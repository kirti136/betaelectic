const { Router } = require("express");
const { addToCart, getCart } = require("../controllers/cart.controller.js");

const router = Router();

router.post("/", addToCart);
router.get("/", getCart);

module.exports = router;
