import axios from "axios";

import { GET_SEARCH_RESULTS, SEARCH_ERROR } from "./types";

// TODO: create action searchInitialResults and searchNotesByQuery
// the first one is to reset the results array with the results of the new query
// the last one is to increase the results array

// get note by query string param
export const searchNotesByQuery = text => async dispatch => {
  try {
    const res = await axios.get(`/api/notes/search`, {
      params: {
        text
      }
    });

    dispatch({ type: GET_SEARCH_RESULTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
