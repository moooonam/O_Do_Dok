import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: true,
  },
  reducers: {},
});

// export const { clicked } =secondSlice.actions
export default userSlice.reducer;
