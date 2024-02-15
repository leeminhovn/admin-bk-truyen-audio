import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAdminLogin } from "../../services/api/auth";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { status: "", userInfo: {} },
  reducers: {
    loginAction() {},
  },
  extraReducers: (builder) => {
    builder

      .addCase(userLoginAction.pending, (state, action) => {
        state.status = "login-loading";
      })

      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "login-done";
      });
  },
});

export const userLoginAction = createAsyncThunk(
  "user/loginAction",
  async (data) => {
    const setErr = data.setError;

    const responseLogin = await apiAdminLogin({
      email: data.email,
      password: data.password,
    });
    const isLoginSuccess = responseLogin.status === 200;
    if (isLoginSuccess) {
      return responseLogin.data;
    } else {
      const err = responseLogin.response.data.error;
      if (err.toLocaleLowerCase().includes("password")) {
        setErr({ password: err });
      } else {
        setErr({ email: err });
      }
      return {};
    }
  }
);

export default userSlice.reducer;
