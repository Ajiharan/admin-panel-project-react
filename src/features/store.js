import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import userListReducer from "./auth/userListSlice";
import userIdsReducer from "./auth/userOnlineList";
export default configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
    userIdsList: userIdsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
