import axios from "axios";
import { LOAD_NOTES, GET_NOTE } from "./types";

// Loads all notes from the DB
export const loadNotes = () => async dispatch => {
  const res = await axios.get("/api/notes");
  dispatch({ type: LOAD_NOTES, payload: res.data });
};

// Get note by id
export const getNote = id => async dispatch => {
  const res = await axios.get(`/api/notes/${id}`);
  console.log(res.data);
  dispatch({ type: GET_NOTE, payload: res.data });
};

// Create or update note
export const createNote = editorData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWNkYTRlMzlhNTEyMWE1MzFlOTI3ZDg3In0sImlhdCI6MTU1NzgxNDk1NCwiZXhwIjoxNTU4MTc0OTU0fQ.Wjk0x1ED5F1WCscAbgIknGfVWemi7NHP98pHXx_zfYE",
      },
    };

    const res = await axios.post("/api/notes", editorData, config);

    dispatch({ type: GET_NOTE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
