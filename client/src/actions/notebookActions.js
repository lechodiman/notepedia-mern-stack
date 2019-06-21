import axios from "axios";
import {
  LOAD_NOTEBOOKS,
  NOTEBOOK_ERROR,
} from "./types";


// Loads all current user notebooks 
export const loadNotebooks = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/me/notebooks`);
    dispatch({ type: LOAD_NOTEBOOKS, payload: res.data });
  } catch (err) {
    dispatch({
      type: NOTEBOOK_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

