import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    nickName: "",
    isLogin: false,
  },
  reducers: {},
});

// export const { clicked } =secondSlice.actions
export default userSlice.reducer;
