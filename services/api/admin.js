import { get, post } from "./base";
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

export const deleteChapterById = async (chapter_id, token) => {
  try {
    const endpoint = endpoints.DELETE_CHAPTER_BY_ID;
    const { data } = await get(endpoint, {
      params: { chapter_id },
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return null;
  }
};
export const addChapter = async (newChapter, token) => {
  try {
    const endpoint = endpoints.ADD_CHAPTER;
    const { data } = await post(
      endpoint,
      { newChapter },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const editChapter = async (editChapter, token) => {
  try {
    const endpoint = endpoints.EDIT_CHAPTER;
    const { data } = await post(
      endpoint,
      { params: { editChapter } },

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (err) {
    return null;
  }
};

export const addStoryByAuthor = async (
  story,
  author_id,
  author_message,
  token
) => {
  const endpoint = endpoints.AUTHOR_ADD_STORY_NEED_APPROVED;
  try {
    await post(
      endpoint,
      { story, author_id, author_message },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
export const getStoryNeedApproved = async (
  page,
  limit,
  token,
  author_id = null
) => {
  const endpoint = endpoints.ADMIN_GET_STORIES_NEED_APPROVED;
  try {
    const dataSend = { page: page, limit };

    author_id !== null && (dataSend.author_id = author_id);
    const { data } = await get(endpoint, {
      params: dataSend,
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const updateModerationStatus = async (
  status,
  moderator_feedback,
  _id,
  token
) => {
  try {
    const endpoint = endpoints.UPDATE_MODERATION_STATUS;
    await post(
      endpoint,
      {
        status,
        moderator_feedback,
        _id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
