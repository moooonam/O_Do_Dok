import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    nickName: "",
    isLogin: false,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    }
  },
});

export const { login, logout } =userSlice.actions
export default userSlice.reducer;
