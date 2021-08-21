import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  entryDatas: [],
  error: null,
};

const adminGetSlice = createSlice({
  name: "adminGet",
  initialState,
  reducers: {
    getEntryRequest: (state) => {
      state.entryDatas = [];
      state.loading = false;
      state.error = null;
    },
    getEntrySuccess: (state, action) => {
      state.entryDatas = action.payload.entryDatas;
      state.loading = action.payload.loading;
      state.error = null;
    },
    getEntryFailure: (state, action) => {
      state.entryDatas = [];
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    resetEntryData: (state) => {
      state.entryDatas = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getEntryFailure,
  getEntryRequest,
  getEntrySuccess,
  resetEntryData,
} = adminGetSlice.actions;

export const selectEntryDatas = (state) => state.adminGet.entryDatas;
export const selectEntryDatasLoading = (state) => state.adminGet.loading;
export const selectEntryDatasError = (state) => state.adminGet.error;

export default adminGetSlice.reducer;