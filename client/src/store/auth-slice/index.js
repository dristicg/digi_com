

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
});

// const store = configureStore({
//     reducer: {
//       auth: authReducer,
//     }
// })

export const {setUser} = authSlice.actions;
export default authSlice.reducer;




