import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  entryData: null,
  error: null,
};

const adminAddSlice = createSlice({
  name: "adminAdd",
  initialState,
  reducers: {
    addEntryRequest: (state) => {
      state.entryData = null;
      state.loading = false;
      state.error = null;
    },
    addEntrySuccess: (state, action) => {
      state.entryData = action.payload.entryData;
      state.loading = action.payload.loading;
      state.error = null;
    },
    addEntryFailure: (state, action) => {
      state.entryData = null;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    resetData: (state) => {
      state.entryData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { resetData, addEntryFailure, addEntryRequest, addEntrySuccess } =
  adminAddSlice.actions;

export const selectEntryData = (state) => state.adminAdd.entryData;
export const selectDataLoading = (state) => state.adminAdd.loading;
export const selectDataError = (state) => state.adminAdd.error;

export default adminAddSlice.reducer;
