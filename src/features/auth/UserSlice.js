import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  photo: null,
  isEmailVerified: false,
  userlevel: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload?.photo || null;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.userlevel = action.payload.userlevel;
    },
    setSignOut: (state, action) => {
      state.name = null;
      state.email = null;
      state.photo = null;
      state.isEmailVerified = false;
      state.userlevel = 0;
    },
  },
});

export const { setUserLoginDetails, setSignOut } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectEmailVerified = (state) => state.user.isEmailVerified;
export const selectUserLevel = (state) => state.user.userlevel;

export default userSlice.reducer;
