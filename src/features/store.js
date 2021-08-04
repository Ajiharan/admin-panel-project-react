import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
