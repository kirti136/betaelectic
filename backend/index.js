require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/product.route.js");
const cartRoutes = require("./routes/cart.route.js");
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
