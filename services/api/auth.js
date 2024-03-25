import { get, post } from "./base";
import endpoints from "./endpoints";

export const apiAdminLogin = async ({ email, password }) => {
  const endpoint = endpoints.ADMIN_LOGIN_API;

  try {
    const res = await post(endpoint, { email, password });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const apiAdminSignup = async ({ email, password, name }) => {
  const endpoint = endpoints.ADMIN_SIGNUP_API;

  try {
    const res = await post(endpoint, { email, password, name });
    return res;
  } catch (err) {
    console.log(err);
  }
};
export const apiAdminLogout = async (user_id, token, refresh) => {
  const endpoint = endpoints.ADMIN_LOGOUT_API;

  try {
    const res = await post(
      endpoint,
      { user_id, refreshToken: refresh },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
