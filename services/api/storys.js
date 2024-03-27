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
export const apiGetAllStorysOfAuthor = async (
  { page, limit, search },
  user_id
) => {
  const endpoint = endpoints.GET_STORY_OF_AUTHOR;

  try {
    const res = await get(endpoint, {
      params: {
        limit: limit,
        page: page,
        search: search,
        user_id,
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
export const getAllGenres = async () => {
  const endpoint = endpoints.GET_ALL_GENRES;
  try {
    const result = await get(endpoint);
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const addGenre = async (genreName, token) => {
  const endpoint = endpoints.ADMIN_ADD_GENRE;
  try {
    const result = await post(
      endpoint,
      { genreName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteGenre = async (genreId, token) => {
  const endpoint = endpoints.ADMIN_DELETE_GENRE;
  try {
    const result = await post(
      endpoint,
      { genreId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const getChapterById = async (chapter_id) => {
  const endpoint = endpoints.GET_CHAPTER_BY_ID;

  try {
    const { data } = await get(endpoint, { params: { chapter_id } });
    return data;
  } catch (err) {
    return null;
  }
};
