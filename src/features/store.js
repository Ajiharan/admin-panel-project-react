import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import userListReducer from "./auth/userListSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
