import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import userListReducer from "./auth/userListSlice";
import userIdsReducer from "./auth/userOnlineList";
import searchDataReducer from "./auth/searchSlice";
import adminDataReducer from "./admin/AdminSlice";
import adminGetDataReducer from "./admin/AdminEntrySlice";
export default configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
    userIdsList: userIdsReducer,
    searchList: searchDataReducer,
    adminAdd: adminDataReducer,
    adminGet: adminGetDataReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
