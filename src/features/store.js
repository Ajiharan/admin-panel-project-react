import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import userListReducer from "./auth/userListSlice";
import userIdsReducer from "./auth/userOnlineList";
import searchDataReducer from "./auth/searchSlice";
import adminDataReducer, { adminUpdateReducer } from "./admin/AdminSlice";
import adminGetDataReducer from "./admin/AdminEntrySlice";

const appReducer = combineReducers({
  user: userReducer,
  userList: userListReducer,
  userIdsList: userIdsReducer,
  searchList: searchDataReducer,
  adminAdd: adminDataReducer,
  adminGet: adminGetDataReducer,
  adminUpdate: adminUpdateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/setSignOut") {
    // console.log("action.type", action.type);
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
