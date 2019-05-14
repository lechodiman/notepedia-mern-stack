import axios from "axios";
import {
  LOAD_NOTES,
  GET_NOTE,
  NOTE_ERROR,
  DELETE_NOTE,
  ADD_NOTE
} from "./types";
import { setAlert } from "./alertActions";

// Loads all notes from the DB
export const loadNotes = () => async dispatch => {
  try {
    const res = await axios.get("/api/notes");
    dispatch({ type: LOAD_NOTES, payload: res.data });
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

// Get note by id
export const getNote = id => async dispatch => {
  try {
    const res = await axios.get(`/api/notes/${id}`);
    dispatch({ type: GET_NOTE, payload: res.data });
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete note by id
export const deleteNote = id => async dispatch => {
  try {
    await axios.delete(`/api/notes/${id}`);

    dispatch({
      type: DELETE_NOTE,
      payload: id
    });

    dispatch(setAlert("Note Removed", "success"));
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: { message: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update note
export const createNote = editorData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/notes", editorData, config);

    dispatch({ type: ADD_NOTE, payload: res.data });

    dispatch(setAlert("Note created", "success"));
  } catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: {
        message: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
