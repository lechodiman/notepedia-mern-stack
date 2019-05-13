import axios from "axios";
import { LOAD_NOTES } from "./types";

// Loads all notes from the DB
export const loadNotes = () => async dispatch => {
  const res = await axios.get("/api/notes");
  dispatch({ type: LOAD_NOTES, payload: res.data });
};
