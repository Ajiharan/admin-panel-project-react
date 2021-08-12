import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userUids: [],
  loading: false,
  error: "",
};

const userIdsListSlice = createSlice({
  name: "userIdsList",
  initialState: initialState,
  reducers: {
    getUserIdsRequest: (state) => {
      state.userUids = [];
      state.loading = true;
      state.error = "";
    },
    getUserIdsSucess: (state, action) => {
      state.userUids = action.payload.userUids;
      state.loading = action.payload.loading;
      state.error = "";
    },
    getUserIdsEror: (state, action) => {
      state.userUids = [];
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    setUserIdsDefault: (state) => {
      state.userUids = [];
      state.loading = false;
      state.error = "";
    },
    setUserIdsLoadingDefault: (state) => {
      state.userUids = [];
      state.loading = true;
      state.error = "";
    },
  },
});

export const {
  getUserIdsEror,
  getUserIdsRequest,
  getUserIdsSucess,
  setUserIdsDefault,
  setUserIdsLoadingDefault,
} = userIdsListSlice.actions;

export const selectusersIds = (state) => state.userIdsList.userUids;
export const selectLoading = (state) => state.userIdsList.loading;
export const selectError = (state) => state.userIdsList.error;

export default userIdsListSlice.reducer;
