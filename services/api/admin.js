import { get } from "./base";
import endpoints from "./endpoints";

export const apiAdminGetInfoAccount = async (token) => {
  const endpoint = endpoints.ADMIN_GET_ACCOUNT_ADMIN_INFO;

  try {
    const res = await get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

