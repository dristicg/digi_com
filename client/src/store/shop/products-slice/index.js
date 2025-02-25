
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
  };

  export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }) => {
      console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");
  
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });
  
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
  
      console.log(result);
  
      return result?.data;
    }
  );


// export const fetchAllFilteredProducts = createAsyncThunk(
//     "shopProducts/fetchAllFilteredProducts",
//     async (_, { rejectWithValue }) => {
//         console.log("Fetching products API called...");  // ✅ This appears

//         try {
//             console.log("Making API request to /api/products");  // ✅ Debug API call
//             const response = await fetch("http://localhost:5000/api/shop/products/get");  // Check API URL
//             console.log("Response received:", response);  // ✅ Should show response object

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch products: ${response.statusText}`);
//             }

//             const data = await response.json();
//             console.log("API Response:", data);  // ✅ Should show product data
//             return data;
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             return rejectWithValue(error.message);
//         }
//     }
// );



  export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get/${id}`
      );
  
      return result?.data;
    }
  );

  const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
      setProductDetails: (state) => {
        state.productDetails = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllFilteredProducts.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        })
        .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.productList = [];
        })
        .addCase(fetchProductDetails.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.productDetails = null;
        });
    },
  });
  
  export const { setProductDetails } = shoppingProductSlice.actions;
  
  export default shoppingProductSlice.reducer;