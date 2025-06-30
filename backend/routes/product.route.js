const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controller.js");

const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

module.exports = router;
