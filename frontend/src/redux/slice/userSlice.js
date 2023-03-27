import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName:"",
    userEmail:"",
    profileImg:"",
    userNickname: "",
    userGenre1:"",
    userGenre2:"",
    userGenre3:"",
    userGender:"",
    userFrequency:"",
    userOnoff: "",
    userRegion:"",
    userAge:"",
    myTeam:"",
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
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.profileImg = action.payload.profileImg;
      state.userNickname = action.payload.userNickname;
      state.userGenre1 = action.payload.userGenre1;
      state.userGenre2 = action.payload.userGenre2;
      state.userGenre3 = action.payload.userGenre3;
      state.userGender = action.payload.userGender;
      state.userFrequency = action.payload.userFrequency;
      state.userOnoff = action.payload.userOnoff;
      state.userRegion = action.payload.userRegion;
      state.userAge = action.payload.userAge;

    }
  },
});

export const { login, logout, getUserInfo } =userSlice.actions
export default userSlice.reducer;
