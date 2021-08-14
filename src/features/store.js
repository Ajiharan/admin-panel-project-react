import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import userListReducer from "./auth/userListSlice";
import userIdsReducer from "./auth/userOnlineList";
import searchDataReducer from "./auth/searchSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
    userIdsList: userIdsReducer,
    searchList: searchDataReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
