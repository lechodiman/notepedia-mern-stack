import axios from "axios";
import { setAlert } from "./alertActions";

import {
  GET_BOOKMARKS,
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
  BOOKMARK_ERROR
} from "./types";

// Get all bookmarks
export const getBookmarks = userId => async dispatch => {
  try {
    const res = await axios.get(`api/users/${userId}/bookmarks`);

    dispatch({
      type: GET_BOOKMARKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOKMARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add a bookmark
export const addBookmark = (userId, noteId) => async dispatch => {
  try {
    // Assuming this route returns the bookmarked note
    const res = await axios.put(`api/users/${userId}/bookmarks/${noteId}`);

    dispatch({
      type: ADD_BOOKMARK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BOOKMARK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete bookmark
export const deleteBookmark = (userId, noteId) => async dispatch => {
  try {
    await axios.delete(`api/users/${userId}/bookmarks/${noteId}`);

    dispatch({
      type: DELETE_BOOKMARK,
      payload: noteId
    });
  } catch (err) {
    dispatch({
      type: BOOKMARK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
