
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
    let cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price salePrice image",
      model: "Product", // ✅ Ensure it correctly references the Product model
    });

    if (!cart) {
      console.log("🆕 No cart found, creating a new one...");
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    // ✅ Ensure the correct product data is sent to the frontend
    const formattedCart = {
      _id: cart._id,
      userId: cart.userId,
      items: cart.items.map((item) => ({
        productId: item.productId?._id ?? null,
        title: item.productId?.title || "❌ Product Title Missing",
        price: item.productId?.price ?? null,
        salePrice: item.productId?.salePrice ?? null,
        image: item.productId?.image ?? null,
        quantity: item.quantity,
      })),
    };

    res.json(formattedCart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});






router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
