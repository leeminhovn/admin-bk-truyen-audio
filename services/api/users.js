import { get, post } from "./base";
import endpoints from "./endpoints";

export const getListUser = async ({ page, limit, search }) => {
  const endpoint = endpoints.ADMIN_GET_LIST_USER;

  try {
    const result = await get(endpoint, {
      params: {
        page,
        limit,
        search,
      },
    });
    return result.data;
  } catch (err) {
    return [];
  }
};
export const getListAuthor = async ({ page, limit, search }) => {
  const endpoint = endpoints.ADMIN_GET_LIST_AUTHOR;

  try {
    const result = await get(endpoint, {
      params: {
        page,
        limit,
        search,
      },
    });
    return result.data;
  } catch (err) {
    return [];
  }
};

export const getUserInfoAccount = async (user_id) => {
  try {
    const endpoint = endpoints.GET_USER_INFO_ACCOUNT;
    const { data } = await get(endpoint, { params: { user_id } });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateUserBlockStatus = async (status, token, user_id) => {
  try {
    const endpoint = endpoints.ADMIN_ADD_GENREUSER_UPDATE_BLOCK_STATUS;
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

