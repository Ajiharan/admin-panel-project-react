import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userslist: [],
  loading: false,
  error: "",
};

const userListSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {
    getUserListRequest: (state) => {
      state.userslist = [];
      state.loading = true;
      state.error = "";
    },
    getUserListSucess: (state, action) => {
      state.userslist = action.payload.userlist;
      state.loading = action.payload.loading;
      state.error = "";
    },
    getUserListEror: (state, action) => {
      state.userslist = [];
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    setUserListDefault: (state) => {
      state.userslist = [];
      state.loading = false;
      state.error = "";
    },
  },
});

export const {
  getUserListEror,
  getUserListRequest,
  setUserListDefault,
  getUserListSucess,
} = userListSlice.actions;

export const selectuserslist = (state) => state.userList.userslist;
export const selectLoading = (state) => state.userList.loading;
export const selectError = (state) => state.userList.error;

export default userListSlice.reducer;
