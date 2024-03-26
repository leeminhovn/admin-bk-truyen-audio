import { get } from "./base";
import endpoints from "./endpoints";

export const apiStaticticsAdmin = async () => {
  const endpoint = endpoints.ADMIN_GET_STATISTICS;
  try {
    const { data } = await get(endpoint);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const apiStaticticsAuhtor = async (author_id) => {
  const endpoint = endpoints.ADMIN_GET_STATISTICS_AUTHOR;

  try {
    const { data } = await get(endpoint, {
      params: { user_id: author_id },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
