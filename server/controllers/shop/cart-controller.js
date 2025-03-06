

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

// Fetch Cart Items
// const fetchCartItems = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID is mandatory!",
//       });
//     }

//     const cart = await Cart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "image title price salePrice",
//     });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found!",
//       });
//     }

//     // Remove invalid items (products that are deleted)
//     const validItems = cart.items.filter((item) => item.productId);
//     if (validItems.length !== cart.items.length) {
//       cart.items = validItems;
//       await cart.save();
//     }

//     const populatedCartItems = validItems.map((item) => ({
//       productId: item.productId._id,
//       image: item.productId.image,
//       title: item.productId.title,
//       price: item.productId.price,
//       salePrice: item.productId.salePrice,
//       quantity: item.quantity,
//     }));

//     res.status(200).json({
//       success: true,
//       data: { ...cart._doc, items: populatedCartItems },
//     });
//   } catch (error) {
//     console.error("❌ Error in fetchCartItems:", error);
//     res.status(500).json({ success: false, message: "Error", error });
//   }
// };


const getCartItems = async (req, res) => {
  try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json(cart);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};



// Update Cart Item Quantity
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
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

    cart.items[itemIndex].quantity = quantity;
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
    console.error("❌ Error in updateCartItemQty:", error);
    res.status(500).json({ success: false, message: "Error", error });
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
