import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAdminLogin, apiAdminSignup } from "../../services/api/auth";
import { setCookie } from "@/utils/features/localStorage";

const userSlice = createSlice({
  name: "user",
  initialState: { status: "", userInfo: {} },
  reducers: {
    loginAction() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignupAction.pending, (state, action) => {
        state.status = "signup-loading";
      })
      .addCase(userSignupAction.rejected, (state, action) => {
        state.status = "signup-faile";
      })
      .addCase(userSignupAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;

        setCookie("adminToken", action.payload.accessToken, 30 * 60);
        setCookie(
          "adminRefreshToken",
          action.payload.refreshToken,
          24 * 60 * 60
        );

        state.status = "login-success";
      })
      .addCase(userLoginAction.pending, (state, action) => {
        state.status = "login-loading";
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.status = "login-faile";
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;

        setCookie("adminToken", action.payload.accessToken, 30 * 60);
        setCookie(
          "adminRefreshToken",
          action.payload.refreshToken,
          24 * 60 * 60
        );

        state.status = "login-success";
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
      return Promise.reject();
    }
  }
);
export const userSignupAction = createAsyncThunk(
  "admin/userSignupAction",
  async (data) => {
    const setErr = data.setError;

    const responseSignup = await apiAdminSignup({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    const isSignupSuccess = responseSignup.status === 200;
    if (isSignupSuccess) {
      return responseSignup.data;
    } else {
      const err = responseSignup.response.data.error;
      if (err.toLocaleLowerCase().includes("password")) {
        setErr({ password: err });
      } else if (err.toLocaleLowerCase().includes("name")) {
        setErr({ name: err });
      } else {
        setErr({ email: err });
      }
      return Promise.reject();
    }
  }
);
export const userAdminGetInfo = createAsyncThunk(
  "admin/userAdminGetInfo",
  async (data) => {}
);
export default userSlice.reducer;
