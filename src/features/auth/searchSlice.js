import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
};

const searchListSlice = createSlice({
  name: "searchList",
  initialState: initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload.searchData;
    },
    resetSearchData: (state) => {
      state.searchData = [];
    },
  },
});

export const { resetSearchData, setSearchData } = searchListSlice.actions;

export const selectSearchData = (state) => state.searchList.searchData;

export default searchListSlice.reducer;
