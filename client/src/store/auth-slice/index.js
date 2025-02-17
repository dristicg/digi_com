

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
    const response = await axios.post("http://localhost:5000/api/auth/register", formData);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token); // Store token if needed
      return response.data;
    }
    return thunkAPI.rejectWithValue(response.data.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (formData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", formData, { withCredentials: true });
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }
    return thunkAPI.rejectWithValue(response.data.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Login failed");
  }
});

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

console.log('Token in localStorage:', localStorage.getItem('token')); // Check token


export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    const response = await axios.get("http://localhost:5000/api/auth/check", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (response.data.success) {
      return response.data;
    }
    return thunkAPI.rejectWithValue(response.data.message);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Auth check failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      console.log(action);

      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
  },
});


// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//   }
// })

export const { setUser } = authSlice.actions;
export default authSlice.reducer;






