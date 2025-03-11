


import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

const initialState = {
  cartItems: [],
  totalAmount: 0,  // ✅ Added total amoun
  isLoading: false,
  error: null, // Added for better error tracking
};

// ✅ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    console.log("🛒 Adding to cart:", { userId, productId, quantity });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/cart/add",
        { userId, productId, quantity }
      );
      console.log("✅ Cart Add Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Cart Add Error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Error adding to cart");
    }
  }
);

// ✅ Fetch Cart Items
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.warn("⚠️ No authenticated user found.");
      return rejectWithValue("User not logged in");
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/${user.uid}`
      );
      console.log("📦 Fetched Cart Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching cart:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

// ✅ Delete Cart Item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/cart/${userId}/${productId}`
      );
      console.log("🗑️ Deleted Item:", response.data);
      return { productId };
    } catch (error) {
      console.error("❌ Delete Cart Error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Error deleting item");
    }
  }
);

// ✅ Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/shop/cart/update-cart",
        { userId, productId, quantity }
      );
      console.log("🔄 Updated Cart:", response.data);
      return { productId, quantity };
    } catch (error) {
      console.error("❌ Update Quantity Error:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Error updating quantity");
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    // ✅ Calculate Total Amount
    calculateTotal: (state) => {
      state.totalAmount = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 📦 Fetch Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.items || [];
        state.totalAmount = state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 0
        );
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🗑️ Delete Cart Item
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload.productId
        );
        state.totalAmount = state.cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 0
        ); // ✅ Update total after delete
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔄 Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedItem = state.cartItems.find(
          (item) => item.productId === action.payload.productId
        );
        if (updatedItem) {
          updatedItem.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default shoppingCartSlice.reducer;
