import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id:"",
    profileImg:"",
    nickName: "",
    isLogin: false,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    getUserInfo: (state, action) => {
      // console.log(`액션페이로드: ${action.payload.profileImg}`)
      state.profileImg = action.payload.profileImg;
    }
  },
});

export const { login, logout, getUserInfo } =userSlice.actions
export default userSlice.reducer;
