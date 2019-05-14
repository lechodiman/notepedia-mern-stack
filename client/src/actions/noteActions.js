import axios from "axios";
import { LOAD_NOTES, LOAD_SINGLE_NOTE } from "./types";

// Loads all notes from the DB
export const loadNotes = () => async dispatch => {
  const res = await axios.get("/api/notes");
  dispatch({ type: LOAD_NOTES, payload: res.data });
};

export const loadSingleNote = () => async dispatch => {
  const res = await axios.get("/api/notes/:id")
  dispatch({ type: LOAD_SINGLE_NOTE, payload: res.data})
}
