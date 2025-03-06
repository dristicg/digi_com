

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

const initialState = {
  cartItems: [],
  isLoading: false,
};



export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

// export const addToCart = async (productId, quantity) => {
//   const userId = localStorage.getItem("userId"); // Or get from Redux/Context
//   console.log("🔍 Sending API request with:", { userId, productId, quantity });

//   const response = await fetch("http://localhost:5000/api/shop/cart/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userId, productId, quantity }),
//   });

//   const data = await response.json();
//   console.log("✅ Response:", data);
// };

// export const fetchCartItems = createAsyncThunk(
//   "cart/fetchCartItems",
//   async (_, { getState }) => {
//     const auth = getAuth();
//     const user = auth.currentUser; // Firebase Auth user

//     console.log("🔍 Checking auth.currentUser:", user); // Debug Firebase User

//     const userId =
//       user?.uid || // First check Firebase
//       getState().auth?.user?.uid || // Then check Redux store (if exists)
//       localStorage.getItem("userId"); // Finally check localStorage

//     console.log("✅ Retrieved userId:", userId); // Check the final userId value

//     if (!userId) {
//       console.error("❌ Error: userId is undefined! User must be logged in.");
//       return { data: [] }; // Avoid crashing
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/shop/cart/${userId}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("❌ Error fetching cart:", error);
//       return { data: [] };
//     }
//   }
// );



export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    const auth = getAuth();
    const user = auth.currentUser; // Firebase authenticated user

    console.log("🔍 Checking auth.currentUser:", user); // Debugging

    if (!user) {
      console.error("❌ Error: No authenticated user found.");
      return rejectWithValue("User not logged in");
    }

    const userId = user.uid; // Firebase user ID

    console.log("✅ Retrieved userId:", userId);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/${userId}`
      );
      return response.data; // Return the cart data
    } catch (error) {
      console.error("❌ Error fetching cart:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);




export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
      
  },
});

export default shoppingCartSlice.reducer;