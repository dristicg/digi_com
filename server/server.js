require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//  const cookieParser = require("cookie-parser"); jwt
const cors = require("cors");
//  const authRouter = require("./routes/auth/auth-routes"); jwt
const adminProductsRouter = require("./routes/admin/products-routes");
 //const adminOrderRouter = require("./routes/admin/order-routes");
const shopCartRouter = require("./routes/shop/cart-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopSearchRouter = require("./routes/shop/search-routes");


// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cookieParser()); jwt

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
// app.use("/api/auth", authRouter); jwt
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/search", shopSearchRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
