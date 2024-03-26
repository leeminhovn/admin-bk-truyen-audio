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

export const apiAdminGetInfoAccountById = async (user_id, token) => {
  const endpoint = endpoints.ADMIN_GET_ACCOUNT_ADMIN_INFO_BY_ID;

  try {
    const res = await get(endpoint, {
      params: { user_id: user_id },
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateAuthorBlockStatus = async (status, token, user_id) => {
  try {
    const endpoint = endpoints.ADMIN_ADD_AUTHOR_UPDATE_BLOCK_STATUS;
    await post(
      endpoint,
      { block: status, user_id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
