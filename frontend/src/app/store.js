import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducer/authReducer';
import linkSlice from '../reducer/linkReducer';

export const store = configureStore({
  reducer: {
    authUser: authSlice,
    link: linkSlice
  },
});
