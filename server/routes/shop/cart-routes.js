
const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart"); // ✅ Import the Cart model

const {
  addToCart,
  //fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
  getCartItems
} = require("../../controllers/shop/cart-controller");



// Debugging logs
console.log("✅ Cart routes file loaded!");

// Test route
router.get("/test", (req, res) => {
  console.log("🔥 Cart Test API Hit!");
  res.send("Cart API is working!");
});

// Cart routes
router.post("/add", addToCart);

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.log("🆕 No cart found, creating a new one...");
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
