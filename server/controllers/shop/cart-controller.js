

const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[itemIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("❌ Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Error", error });
  }
};

// Get Cart Items

// const getCartItems = async (req, res) => {
//   try {
//       const { userId } = req.params;
//       const cart = await Cart.findOne({ userId });

//       if (!cart) {
//           return res.status(404).json({ message: "Cart not found" });
//       }

//       res.status(200).json(cart);
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//   }
// };

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetch cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price salePrice image",
      model: "Product",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Format the response to ensure title is included
    const formattedCart = {
      _id: cart._id,
      userId: cart.userId,
      items: cart.items.map((item) => ({
        productId: item.productId?._id ?? null,
        title: item.productId?.title || "❌ No Product Title",
        price: item.productId?.price ?? null,
        salePrice: item.productId?.salePrice ?? null,
        image: item.productId?.image ?? null,
        quantity: item.quantity,
      })),
    };

    console.log("✅ Cart Response:", JSON.stringify(formattedCart, null, 2));

    res.status(200).json(formattedCart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// Update Cart Item Quantity

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found!",
      });
    }

    // ✅ If quantity is 0, remove item instead of rejecting request
    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    // ✅ Ensure populate() works
    await cart.populate({ path: "items.productId", select: "image title price salePrice" });

    // ✅ Extra check for productId
    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id ?? null,
      image: item.productId?.image ?? null,
      title: item.productId?.title ?? "Product not found",
      price: item.productId?.price ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedCartItems },
    });
  } catch (error) {
    console.error("❌ Error in updateCartItemQty:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
};


// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);
    await cart.save();

    await cart.populate({ path: "items.productId", select: "image title price salePrice" });

    const populatedCartItems = cart.items.map((item) => ({
      productId: item.productId?._id || null,
      image: item.productId?.image || null,
      title: item.productId?.title || "Product not found",
      price: item.productId?.price || null,
      salePrice: item.productId?.salePrice || null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedCartItems },
    });
  } catch (error) {
    console.error("❌ Error in deleteCartItem:", error);
    res.status(500).json({ success: false, message: "Error", error });
  }
};

module.exports = {
  addToCart,
  //fetchCartItems,
  getCartItems,
  updateCartItemQty,
  deleteCartItem,
};
