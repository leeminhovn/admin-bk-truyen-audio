import { get } from "./base";
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
