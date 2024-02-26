import { get, post } from "./base";
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
export const getStorysInfo = async (story_id) => {
  const endpoint = endpoints.GET_STORY_INFO;
  try {
    const result = await get(endpoint, { params: { story_id: story_id } });
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const updateStoryInfoAdmin = async (infoUpdate, token) => {
  const endpoint = endpoints.ADMIN_UPDATE_STORY_INFO;
  try {
    const result = await post(
      endpoint,
      { storyInfoUpdate: { ...infoUpdate } },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
