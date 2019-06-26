import axios from "axios";
import {
  LOAD_NOTEBOOKS,
  ADD_NOTEBOOK,
  DELETE_NOTEBOOK,
  NOTEBOOK_ERROR,
} from "./types";
import { setAlert } from "./alertActions";


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

// Create or update note
export const createNotebook = editorData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/notebooks", editorData, config);

    dispatch({ type: ADD_NOTEBOOK, payload: res.data });

    dispatch(setAlert("Notebook created", "success"));
  } catch (err) {
    dispatch({
      type: NOTEBOOK_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Delete notebook
export const deleteNotebook = id => async dispatch => {
  try {
    await axios.delete(`/api/notebooks/${id}`);

    dispatch({
      type: DELETE_NOTEBOOK,
      payload: id
    });

    dispatch(setAlert("Notebook Deleted", "success"));
  } catch (err) {
    dispatch({
      type: NOTEBOOK_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};