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
