import axios from "axios";

// get note by query string param
export const searchNotesByQuery = (text, page) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.get("/api/notes/search", { text, page }, config);

    dispatch({ type: UPDATE_RESULTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
