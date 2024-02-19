import { get } from "./base";
import endpoints from "./endpoints";

export const apiGetAllStorys = async ({ page, limit, search }) => {
  const endpoint = endpoints.GET_ALL_STORYS;

  try {
    const res = await get(endpoint, {
      params: {
        limit: limit,
        page: page,
        search: search,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
