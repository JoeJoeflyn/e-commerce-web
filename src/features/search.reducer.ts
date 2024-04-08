import { createSlice } from "@reduxjs/toolkit";
export type SearchState = {
  search: string;
};

const initialState: SearchState = {
  search: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      return {
        search: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
