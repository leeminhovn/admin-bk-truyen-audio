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
