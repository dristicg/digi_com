import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/config/firebase"; // Firebase Auth Instance

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// ✅ Register User
// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const { uid, email: userEmail, displayName, photoURL } = userCredential.user; // 🔹 Extract serializable fields
//       return { uid, email: userEmail, displayName, photoURL };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const registerUser = createAsyncThunk(
  "/auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName, photoURL } = userCredential.user;

      // Ensure all values are valid
      return { 
        uid, 
        email: userEmail, 
        displayName: displayName || "User", 
        photoURL: photoURL || "" 
      };
    } catch (error) {
      console.error("Firebase Registration Error:", error); // Debugging
      return rejectWithValue(error.message);
    }
  }
);


// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName, photoURL } = userCredential.user; // 🔹 Extract serializable fields
      
      return { success: true, user: { uid, email: userEmail, displayName, photoURL } };
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Logout User
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  await signOut(auth);
});

// ✅ Check Auth (Firebase keeps track of the logged-in user)
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user; // 🔹 Extract serializable fields
        resolve({ uid, email, displayName, photoURL });
      } else {
        resolve(null);
      }
    });
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("User registered successfully:", action.payload);
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
