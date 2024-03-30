import { createSlice } from "@reduxjs/toolkit";
export type UserState = {
  data: {
    name: string;
    email: string;
  } | null;
  token: string | null;
};

const initialState: UserState = {
  data: null,
  token: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action", action);
      return {
        ...state,
        data: action.payload,
      };
    },
    setToken: (state, action) => {
      console.log("action", action);
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
