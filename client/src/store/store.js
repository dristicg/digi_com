

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
  }, // Add your reducers here
});

export default store;