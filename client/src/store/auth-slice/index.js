

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async (formData) => {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/register",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => { },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//   }
// });

export const registerUser = createAsyncThunk("auth/registerUser", async (formData, thunkAPI) => {
  try {
    const response = await axios.post("/api/auth/register", formData);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token); // Store token if needed
      return response.data;
    }
    return thunkAPI.rejectWithValue(response.data.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Registration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true; // ✅ Ensure authentication is updated
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});


// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//   }
// })

export const { setUser } = authSlice.actions;
export default authSlice.reducer;




