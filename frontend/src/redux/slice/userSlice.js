import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName:"",
    userEmail:"",
    profileImg:"",
    userNickname: "",
    userPhone: "",
    userGenre1:"",
    userGenre2:"",
    userGenre3:"",
    userGender:"",
    userFrequency:"",
    userOnoff: "",
    userRegion:"",
    userAge:"",
    myTeamId:"",
    myRole:"",
    isLogin: false,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.myTeamId=""
    },
    getUserInfo: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.profileImg = action.payload.profileImg;
      state.userNickname = action.payload.userNickname;
      state.userPhone = action.payload.userPhone;
      state.userGenre1 = action.payload.userGenre1;
      state.userGenre2 = action.payload.userGenre2;
      state.userGenre3 = action.payload.userGenre3;
      state.userGender = action.payload.userGender;
      state.userFrequency = action.payload.userFrequency;
      state.userOnoff = action.payload.userOnoff;
      state.userRegion = action.payload.userRegion;
      state.userAge = action.payload.userAge;
    },
    getTeamId: (state, action) => {
      state.myTeamId = action.payload.myTeamId
    },
    getMyRole: (state, action) => {
      state.myRole = action.payload.myRole
    }
  },
});

export const { login, logout, getUserInfo, getTeamId, getMyRole } =userSlice.actions
export default userSlice.reducer;
