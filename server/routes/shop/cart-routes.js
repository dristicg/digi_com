

const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

// Debugging logs
console.log("✅ Cart routes file loaded!");

router.get("/test", (req, res) => {
  console.log("🔥 Cart Test API Hit!");
  res.send("Cart API is working!");
});


router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
