import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const userRegisterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterReq: (state, action) => {
      state.loadingRegister = true;
    },
    userRegisterSuccess: (state, action) => {
      state.loadingRegister = false;
      state.userInfo = action.payload;
    },
    userRegisterFail: (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = action.payload;
    },
  },
});

export default userRegisterSlice.reducer;
export const { userRegisterReq, userRegisterSuccess, userRegisterFail } =
  userRegisterSlice.actions;
