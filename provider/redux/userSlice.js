import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { status: "" },
  reducers: { loginAction() {} },
});

export const { loginAction } = userSlice.actions;

export default userSlice.reducer;
